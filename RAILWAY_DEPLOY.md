# PythonLearn — Railway + Vercel Deployment Guide

## PART 1 — Backend on Railway

### Step 1: Prepare Django settings

**`backend/backend/settings.py`** — update these sections:

```python
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# --- Security ---
SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-change-in-prod')
DEBUG      = os.environ.get('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.railway.app',           # ← Railway domain
    os.environ.get('RAILWAY_STATIC_URL', ''),
    os.environ.get('ALLOWED_HOST', ''),
]

# --- CORS ---
INSTALLED_APPS = [
    ...
    'corsheaders',            # ← must be present
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',   # ← must be FIRST
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    os.environ.get('FRONTEND_URL', ''),
]
CORS_ALLOW_ALL_ORIGINS = DEBUG   # allows all in dev only

# --- Static files (WhiteNoise) ---
STATIC_URL  = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

---

### Step 2: Add required packages

**`backend/requirements.txt`** — make sure all of these are present:

```
django
djangorestframework
django-cors-headers
gunicorn
whitenoise
```

Run locally to verify nothing is missing:
```bash
cd backend
pip install -r requirements.txt
```

---

### Step 3: Create `railway.json` at repo root

Create `Z:/django/pylearn/railway.json`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd backend && gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

### Step 4: Create `Procfile` inside `backend/`

Create `Z:/django/pylearn/backend/Procfile` (no extension):

```
web: gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT
release: python manage.py migrate && python manage.py seed_data
```

The `release` line runs automatically before each deploy — handles migrations and seeding.

---

### Step 5: Create `runtime.txt` inside `backend/`

If it doesn't exist, create `Z:/django/pylearn/backend/runtime.txt`:

```
python-3.11.0
```

---

### Step 6: Push to GitHub

```bash
git add .
git commit -m "add railway config"
git push
```

---

### Step 7: Deploy on Railway

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **New Project → Deploy from GitHub repo**
4. Select `edwardj414/pythonlearn`
5. Railway detects the project — click **Deploy Now**

---

### Step 8: Set environment variables on Railway

In your Railway project → **Variables** tab → add these:

| Key | Value |
|-----|-------|
| `SECRET_KEY` | any long random string (e.g. `python -c "import secrets; print(secrets.token_hex(50))"`) |
| `DEBUG` | `False` |
| `ALLOWED_HOST` | *(leave blank for now — fill after deploy)* |
| `FRONTEND_URL` | *(leave blank for now — fill after Vercel deploy)* |

---

### Step 9: Set root directory on Railway

In Railway project → **Settings** tab:
- **Root Directory** → `backend`
- **Watch Paths** → `backend/**`

Then click **Redeploy**.

---

### Step 10: Get your Railway URL

After deploy succeeds:
- Go to **Settings → Domains**
- Click **Generate Domain**
- You get: `https://pythonlearn-backend-xxxx.railway.app`

Copy this URL — you need it for Vercel.

Now go back to **Variables** and update:
```
ALLOWED_HOST = pythonlearn-backend-xxxx.railway.app
```

---

## PART 2 — Frontend on Vercel

### Step 1: Create `.env.production` in `frontend/`

Create `Z:/django/pylearn/frontend/.env.production`:

```
VITE_API_URL=https://pythonlearn-backend-xxxx.railway.app/api
```

Replace with your actual Railway URL.

---

### Step 2: Create `vercel.json` in `frontend/`

Create `Z:/django/pylearn/frontend/vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

This fixes React Router — without it, refreshing any page gives a 404.

---

### Step 3: Push changes

```bash
git add .
git commit -m "add vercel config and production env"
git push
```

---

### Step 4: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **New Project → Import** `edwardj414/pythonlearn`
4. Set **Root Directory** → `frontend`
5. **Framework Preset** → Vite (auto-detected)
6. Add environment variable:
   - `VITE_API_URL` = `https://pythonlearn-backend-xxxx.railway.app/api`
7. Click **Deploy**

You get: `https://pythonlearn.vercel.app`

---

### Step 5: Update CORS on Railway

Go back to Railway → Variables → update:

```
FRONTEND_URL = https://pythonlearn.vercel.app
```

Railway redeploys automatically.

---

## PART 3 — Verify Everything Works

```
Browser → https://pythonlearn.vercel.app
           ↓
        Vercel (React frontend)
           ↓ API calls
        https://pythonlearn-backend-xxxx.railway.app/api
           ↓
        Railway (Django backend)
```

Test checklist:
- [ ] Home page loads topics
- [ ] Lesson page renders content
- [ ] Code editor runs code
- [ ] Quiz page loads questions
- [ ] No CORS errors in browser console

---

## PART 4 — Day-to-day Updates

```bash
# Make changes locally, then:
git add .
git commit -m "your message"
git push

# Railway auto-redeploys backend ✅
# Vercel auto-redeploys frontend ✅
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `CORS error` | Check `FRONTEND_URL` env var on Railway matches Vercel URL exactly |
| `502 Bad Gateway` | Check Railway logs — usually a missing package in `requirements.txt` |
| `Static files 404` | Make sure `whitenoise` is in requirements and middleware |
| `seed_data fails` | Check Railway logs for model errors — run `migrate` first |
| Vercel page refresh 404 | Make sure `vercel.json` with rewrites is in `frontend/` |
| Railway can't find `wsgi` | Set Root Directory to `backend` in Railway Settings |
