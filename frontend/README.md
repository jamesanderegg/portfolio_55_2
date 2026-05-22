# James Anderegg Portfolio

Interactive portfolio built with React, D3, Three.js, React Three Fiber, and a
small Flask backend for serving the production build and handling contact forms.

The main navigation is a D3 treemap. Each rectangle is generated from
`src/utilities/treedata.js`. Some rectangles zoom deeper into the tree. Other
rectangles act as portal targets for React components such as the cover page,
tools scene, night ski project, blog, and art gallery.

## Main Features

- D3 treemap navigation with zoom transitions
- React portals for rendering components inside selected treemap nodes
- Three.js and React Three Fiber scenes
- Mosaic art gallery loaded from local image assets
- Blog post component for project writeups
- Portfolio branding in the browser title manifest and favicon

## Project Structure

- `../backend/flask_app.py` serves the built React app and handles form email
- `../backend/requirements.txt` pins the Python dependencies used in production
- `src/Treemap.js` builds the treemap layout and handles zoom behavior
- `src/utilities/treedata.js` defines the portfolio sections and child nodes
- `src/utilities/StateManagment.js` maps selected nodes to React portals
- `src/Components/CoverPage` renders the DataFluent landing text
- `src/Components/AboutPage` renders the tools and skills Three.js scene
- `src/Components/ProjectsPage` contains project specific pages
- `src/Components/Blog` contains blog posts
- `src/Components/ArtGallery` renders artwork from `src/assets/art-gallery`

## Run Locally

Install frontend dependencies from the `frontend` directory.

```bash
npm install
```

Start the development server.

```bash
npm start
```

Open `http://localhost:3000`.

To run the backend locally, create a virtualenv from the `backend` directory and
install the pinned requirements.

```bash
cd ../backend
python -m venv .venv
.\.venv\Scripts\activate
python -m pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
python flask_app.py
```

Copy `backend/.env.example` to `backend/.env` and fill in the mail settings
before testing contact form delivery.

## Build

Create a local production build in `frontend/build`.

```bash
npm run build
```

Create a production build and copy it into `backend/build` for Flask to serve.

```bash
npm run build:backend
```

The `build:backend` script uses `scripts/sync-build-to-backend.js`, so it works
without a machine-specific absolute path.

## PythonAnywhere Deployment

PythonAnywhere is retiring the `glastonbury` system image on May 26, 2026. This
project has been smoke-tested locally on Python 3.13 with the pinned backend
dependencies in `backend/requirements.txt`.

Recommended migration path:

1. Switch the account system image to `innit` from the PythonAnywhere Account
   page.
2. Start a new Bash console so it picks up the new image.
3. Clear cached wheels before rebuilding the virtualenv.
4. Rebuild the web app virtualenv with Python 3.13, or another Python 3.10+
   version available on `innit`.
5. Reload the web app from the Web tab.

Example commands on PythonAnywhere:

```bash
cd /home/juicyjames/path-to-project/backend
rm -rf ~/.cache/pip ~/.cache
python3.13 -m venv ~/.virtualenvs/portfolio
source ~/.virtualenvs/portfolio/bin/activate
python -m pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
```

In the Web tab, set the virtualenv path to
`/home/juicyjames/.virtualenvs/portfolio`. The WSGI file should import the Flask
app from the backend directory:

```python
import sys

path = '/home/juicyjames/path-to-project/backend'
if path not in sys.path:
    sys.path.append(path)

from flask_app import app as application
```

After reloading, verify the homepage, client-side routes, and contact forms.

## Assets

Public images live in `public/images`.

Art gallery images live in `src/assets/art-gallery`. Add image files there and
the gallery imports them automatically.

Models used by Three.js components live in `public/models`.
