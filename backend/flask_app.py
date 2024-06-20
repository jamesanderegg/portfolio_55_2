from flask import Flask, request, render_template, send_from_directory
from flask_cors import CORS, cross_origin
from flask_mail import Mail, Message
from decouple import config

app = Flask(__name__, static_folder='./build')
CORS(app)

# FLASK MAIL CONFIG
app.config['TESTING'] = False
app.config['MAIL_SERVER'] = config('MAIL_SERVER')
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = config('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = config('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = ('Form Submission', 'jamesanderegg@jamesanderegg.com')
app.config['MAIL_MAX_EMAILS'] = None
app.config['MAIL_ASCII_ATTACHMENTS'] = False

mail = Mail(app)

@app.route('/contact_form', methods=['POST'])
def mail_send():
    form = request.get_json()
    msg = Message(form['email'], recipients=['jamesanderegg@jamesanderegg.com'])
    msg.body = 'Portfolio Contact Page: from: ' + form['email'] + "\nMessage: " + form['message']
    msg.html = "<b>HELLO WORLD</b>"
    try:
        mail.send(msg)
        result = "success"
    except Exception as e:
        result = str(e)
    print("EMAIL;  ", result)
    return render_template("index.html")

@app.route('/snoc_form', methods=['POST'])
@cross_origin()
def snoc_form():
    form = request.get_json()
    msg = Message(form['email'], recipients=['jamesanderegg@jamesanderegg.com', 'aumeric@hotmail.com', 'vicweese@gmail.com'])
    msg.body = 'SNOC Contact Page: from: ' + form['email'] + "\nMessage: " + form['message']
    try:
        mail.send(msg)
        result = "success"
    except Exception as e:
        result = str(e)
    print("EMAIL;  ", result)
    return render_template("index.html")

@app.route('/jeffrichards', methods=['POST'])
@cross_origin()
def jeff_richards_form():
    form = request.get_json()
    msg = Message(form['email'], recipients=['jamesanderegg@jamesanderegg.com', 'hexagonart@gmail.com'])
    msg.body = 'Jeff Richards Contact Page: from: ' + form['email'] + "\nMessage: " + form['message']
    try:
        mail.send(msg)
        result = "success"
    except Exception as e:
        result = str(e)
    print("EMAIL;  ", result)
    return render_template("index.html")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("./build/" + path):
        return send_from_directory('./build', path)
    else:
        return send_from_directory('./build', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
