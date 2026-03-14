# PythonLearn — Deployment Guide

## 1. Git Setup

```bash
# From project root (Z:/django/pylearn)
git init
git add .
git commit -m "initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/pylearn.git
git branch -M main
git push -u origin main
```

---

## 2. Backend — Deploy on Render (Free)

### Prepare Django for production

**`backend/settings.py`** — add/update:
```python
import os
from pathlib import Path

SECRET_KEY = os.environ.get('SECRET_KEY', 'your-dev-key')
DEBUG      = os.environ.get('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.onrender.com',          # Render domain
    os.environ.get('ALLOWED_HOST', ''),
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

STATIC_URL  = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    os.environ.get('FRONTEND_URL', ''),
]
```

**`backend/requirements.txt`** — make sure these are present:
```
django
djangorestframework
django-cors-headers
gunicorn
whitenoise
```

**`backend/settings.py` — add WhiteNoise** for static files:
```python
MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',  # ← add after SecurityMiddleware
    ...
]
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

### `render.yaml` (already in your project — update it):
```yaml
services:
  - type: web
    name: pylearn-backend
    env: python
    buildCommand: |
      pip install -r requirements.txt
      python manage.py collectstatic --noinput
      python manage.py migrate
      python manage.py seed_data
    startCommand: gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT
    envVars:
      - key: SECRET_KEY
        generateValue: true
      - key: DEBUG
        value: "False"
      - key: ALLOWED_HOST
        value: your-app-name.onrender.com
      - key: FRONTEND_URL
        value: https://your-frontend.vercel.app
```

### Deploy steps:
1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repo
3. Set **Root Directory** → `backend`
4. Set **Build Command** → `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate && python manage.py seed_data`
5. Set **Start Command** → `gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT`
6. Add environment variables (SECRET_KEY, DEBUG=False, ALLOWED_HOST)
7. Deploy — Render gives you a URL like `https://pylearn-backend.onrender.com`

---

## 3. Frontend — Deploy on Vercel (Free)

### Prepare Vite for production

**`frontend/.env.production`** (create this file):
```
VITE_API_URL=https://pylearn-backend.onrender.com/api
```

**`frontend/vercel.json`** (create this file):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
This ensures React Router works on page refresh.

### Deploy steps:
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Set **Root Directory** → `frontend`
4. Set **Framework Preset** → Vite
5. Add environment variable:
   - `VITE_API_URL` = `https://pylearn-backend.onrender.com/api`
6. Deploy — Vercel gives you `https://pylearn.vercel.app`

---

## 4. After Deploy — Update CORS

Once you have both URLs, go back to Render and update:
```
FRONTEND_URL = https://pylearn.vercel.app
```

And in `settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    'https://pylearn.vercel.app',
]
```

---

## 5. Local Development (quick reference)

```bash
# Terminal 1 — Django backend
cd backend
source venv/bin/activate      # Windows: venv\Scripts\activate
python manage.py runserver

# Terminal 2 — Vite frontend
cd frontend
npm run dev
```

---

## 6. Git Workflow (day-to-day)

```bash
git add .
git commit -m "your message"
git push

# Render auto-deploys on push to main ✅
# Vercel auto-deploys on push to main ✅
```
