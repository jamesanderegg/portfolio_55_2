from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS, cross_origin
from flask_mail import Mail, Message
from flask_limiter import Limiter
from flask_limiter.errors import RateLimitExceeded
from decouple import config
import os
import re
import time

app = Flask(__name__, static_folder='./build', template_folder='./build')
CORS(app)

# FLASK MAIL CONFIG
app.config['TESTING'] = False
app.config['MAIL_SERVER'] = config('MAIL_SERVER')
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = config('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = config('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = 'jamesanderegg@jamesanderegg.com'
app.config['MAIL_MAX_EMAILS'] = None
app.config['MAIL_ASCII_ATTACHMENTS'] = False

mail = Mail(app)

# Basic abuse protection + validation settings
MAX_EMAIL_LENGTH = 254
MAX_NAME_LENGTH = 120
MAX_MESSAGE_LENGTH = 5000
MIN_FORM_SECONDS = 3
MAX_LINK_COUNT = 3
HONEYPOT_FIELDS = ('website', 'company', 'hp_field')
EMAIL_PATTERN = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')
URL_PATTERN = re.compile(r'https?://|www\.', re.IGNORECASE)


def _get_int_config(key, default):
    value = config(key, default=default)
    if value in (None, ''):
        return int(default)
    return int(value)


def _get_bool_config(key, default=False):
    value = config(key, default=default)
    if isinstance(value, bool):
        return value
    if value in (None, ''):
        return bool(default)
    return str(value).strip().lower() in ('1', 'true', 'yes', 'on')


def _get_str_config(key, default):
    value = config(key, default=default)
    if value in (None, ''):
        return str(default)
    return str(value)


RATE_LIMIT_MAX_REQUESTS = _get_int_config('RATE_LIMIT_MAX_REQUESTS', 5)
RATE_LIMIT_WINDOW_SECONDS = _get_int_config('RATE_LIMIT_WINDOW_SECONDS', 600)
FORM_RATE_LIMIT = _get_str_config(
    'FORM_RATE_LIMIT',
    f'{RATE_LIMIT_MAX_REQUESTS} per {max(1, RATE_LIMIT_WINDOW_SECONDS // 60)} minute'
)
RATELIMIT_STORAGE_URI = _get_str_config('RATELIMIT_STORAGE_URI', 'memory://')
FLASK_DEBUG = _get_bool_config('FLASK_DEBUG', False)
FLASK_HOST = _get_str_config('FLASK_HOST', '127.0.0.1')
FLASK_PORT = _get_int_config('FLASK_PORT', 5000)


def _get_client_ip():
    x_forwarded_for = request.headers.get('X-Forwarded-For', '')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()
    return request.remote_addr or 'unknown'


limiter = Limiter(
    key_func=_get_client_ip,
    app=app,
    storage_uri=RATELIMIT_STORAGE_URI,
    headers_enabled=True
)


@app.errorhandler(RateLimitExceeded)
def handle_rate_limit(e):
    retry_after = e.retry_after if e.retry_after is not None else 60
    response = jsonify({
        'ok': False,
        'error': 'Too many requests. Please try again later.',
        'retry_after_seconds': int(retry_after)
    })
    response.headers['Retry-After'] = str(int(retry_after))
    return response, 429


def _get_payload():
    payload = request.get_json(silent=True)
    if isinstance(payload, dict):
        return payload
    if request.form:
        return request.form.to_dict(flat=True)
    return {}


def _honeypot_triggered(payload):
    for field in HONEYPOT_FIELDS:
        if str(payload.get(field, '')).strip():
            return True
    return False


def _validate_payload(payload, require_timing=False):
    errors = {}
    name = str(payload.get('name', '')).strip()
    email = str(payload.get('email', '')).strip()
    message = str(payload.get('message', '')).strip()
    submitted_at = str(payload.get('submitted_at', '')).strip()

    if name and len(name) > MAX_NAME_LENGTH:
        errors['name'] = f'Name must be {MAX_NAME_LENGTH} characters or less.'

    if not email:
        errors['email'] = 'Email is required.'
    elif len(email) > MAX_EMAIL_LENGTH:
        errors['email'] = f'Email must be {MAX_EMAIL_LENGTH} characters or less.'
    elif not EMAIL_PATTERN.match(email):
        errors['email'] = 'Email format is invalid.'

    if not message:
        errors['message'] = 'Message is required.'
    elif len(message) > MAX_MESSAGE_LENGTH:
        errors['message'] = f'Message must be {MAX_MESSAGE_LENGTH} characters or less.'
    elif len(URL_PATTERN.findall(message)) > MAX_LINK_COUNT:
        errors['message'] = f'Message can include up to {MAX_LINK_COUNT} links.'

    if submitted_at:
        try:
            elapsed_seconds = time.time() - (int(submitted_at) / 1000)
            if elapsed_seconds < MIN_FORM_SECONDS:
                errors['form'] = 'Invalid submission.'
        except (TypeError, ValueError):
            errors['form'] = 'Invalid submission.'
    elif require_timing:
        errors['form'] = 'Invalid submission.'

    return errors, name, email, message


def _handle_contact_submission(subject, body_prefix, recipients, require_timing=False):
    payload = _get_payload()

    if _honeypot_triggered(payload):
        return jsonify({
            'ok': False,
            'error': 'Invalid submission.'
        }), 400

    errors, name, email, message = _validate_payload(payload, require_timing)
    if errors:
        return jsonify({
            'ok': False,
            'error': 'Validation failed.',
            'errors': errors
        }), 400

    msg = Message(
        subject=subject,
        sender='jamesanderegg@jamesanderegg.com',
        recipients=recipients
    )
    sender_name = name or 'Not provided'
    source = str(payload.get('source', 'Portfolio')).strip()[:120]
    msg.body = (
        f'{body_prefix}: from: {email}\n'
        f'Name: {sender_name}\n'
        f'Source: {source}\n'
        f'Message: {message}'
    )

    try:
        mail.send(msg)
    except Exception:
        app.logger.exception('Email delivery failed for %s', request.path)
        return jsonify({
            'ok': False,
            'error': 'Email delivery failed.'
        }), 500

    return jsonify({
        'ok': True,
        'message': 'Message sent successfully.'
    }), 200

@app.route('/contact_form', methods=['POST'])
@limiter.limit(FORM_RATE_LIMIT)
def mail_send():
    return _handle_contact_submission(
        subject='Contact Form Submission',
        body_prefix='Portfolio Contact Page',
        recipients=['jamesanderegg@jamesanderegg.com'],
        require_timing=True
    )

@app.route('/snoc_form', methods=['POST'])
@cross_origin()
@limiter.limit(FORM_RATE_LIMIT)
def snoc_form():
    return _handle_contact_submission(
        subject='SNOC Contact Form Submission',
        body_prefix='SNOC Contact Page',
        recipients=[
            'jamesanderegg@jamesanderegg.com',
            'aumeric@hotmail.com',
            'vicweese@gmail.com'
        ]
    )

@app.route('/jeffrichards', methods=['POST'])
@cross_origin()
@limiter.limit(FORM_RATE_LIMIT)
def jeff_richards_form():
    return _handle_contact_submission(
        subject='Jeff Richards Contact Form Submission',
        body_prefix='Jeff Richards Contact Page',
        recipients=['jamesanderegg@jamesanderegg.com', 'hexagonart@gmail.com']
    )

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host=FLASK_HOST, port=FLASK_PORT, debug=FLASK_DEBUG)
