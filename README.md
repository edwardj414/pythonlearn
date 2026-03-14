# 🌿 PythonLearn — Interactive Python Tutorial Website

A GeeksforGeeks-style learning platform for Python with:
- 📖 Rich markdown tutorial content
- ⚡ Live Python code execution (no setup needed)
- 🗄️ Django REST Framework backend
- ⚛️ React + Tailwind frontend

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

---

### 1. Backend Setup (Python)

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate          # Mac/Linux
# venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Seed tutorial content
python manage.py seed_data

# Start development server
python manage.py runserver
```

Backend runs at: **http://localhost:8000**
Admin panel: **http://localhost:8000/admin/**

Create a superuser for admin access:
```bash
python manage.py createsuperuser
```

---

### 2. Frontend Setup (React)

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
# The default VITE_API_URL=http://localhost:8000/api is correct for local dev

# Start development server
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🌐 Free Deployment

### Backend → Render.com (Free)

1. **Sign up** at [render.com](https://render.com)
2. Click **New → Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Root directory:** `backend`
   - **Build command:** `pip install -r requirements.txt && python manage.py migrate && python manage.py seed_data && python manage.py collectstatic --no-input`
   - **Start command:** `gunicorn backend.wsgi:application`
5. Add environment variables:
   - `SECRET_KEY` → click "Generate" for a random value
   - `DEBUG` → `False`
6. Add a **PostgreSQL database** (Render free tier):
   - Go to New → PostgreSQL
   - Copy the **Internal Database URL**
   - Add as `DATABASE_URL` env variable
7. Click **Deploy**

Your API will be live at: `https://your-app-name.onrender.com`

---

### Frontend → Vercel (Free)

1. **Sign up** at [vercel.com](https://vercel.com)
2. Click **New Project** → Import your GitHub repo
3. Set:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
4. Add environment variable:
   - `VITE_API_URL` → `https://your-app-name.onrender.com/api`
5. Click **Deploy**

Your site will be live at: `https://your-project.vercel.app`

---

## 📁 Project Structure

```
pythonlearn/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── render.yaml                    ← Render deployment config
│   ├── backend/
│   │   ├── settings.py                ← Python config
│   │   ├── urls.py                    ← Root URL routing
│   │   └── wsgi.py
│   └── tutorials/
│       ├── models.py                  ← Topic & Lesson models
│       ├── serializers.py             ← DRF serializers
│       ├── views.py                   ← API views
│       ├── urls.py                    ← API routes
│       └── management/commands/
│           └── seed_data.py           ← Tutorial content
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── vercel.json                    ← Vercel deployment config
    └── src/
        ├── App.jsx                    ← Router setup
        ├── api.js                     ← API calls + code runner
        ├── index.css                  ← Tailwind + custom styles
        ├── components/
        │   ├── Navbar.jsx             ← Top navigation + search
        │   ├── Sidebar.jsx            ← Topic/lesson navigation
        │   ├── CodeEditor.jsx         ← Monaco editor + Piston API
        │   └── LessonContent.jsx      ← Markdown renderer
        └── pages/
            ├── Home.jsx               ← Landing page
            ├── TopicPage.jsx          ← Topic overview
            └── LessonPage.jsx         ← Lesson viewer
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/topics/` | All topics with lessons |
| GET | `/api/topics/{slug}/` | Single topic |
| GET | `/api/topics/{topic}/lessons/{lesson}/` | Single lesson |
| GET | `/api/search/?q={query}` | Search lessons |

---

## ⚡ Live Code Execution

Code execution uses the **Piston API** (https://emkc.org/api/v2/piston):
- ✅ Completely **free**
- ✅ **No API key** required
- ✅ Supports Python 3.10
- ✅ Sandboxed execution

---

## ➕ Adding New Content

Add lessons by editing `backend/tutorials/management/commands/seed_data.py`:

```python
{
    "title": "My New Lesson",
    "slug": "my-new-lesson",
    "difficulty": "beginner",   # beginner | intermediate | advanced
    "order": 5,
    "content": """
# My Lesson Title

Your **markdown** content here...

## Code Example
```python
print("Hello!")
```
""",
    "code_example": """
# Code that appears in the live editor
print("Try editing me!")
"""
}
```

Then re-run: `python manage.py seed_data`

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Backend | Python 3.12 | Batteries-included, ORM |
| API | Django REST Framework | Serializers, viewsets |
| Database | SQLite (dev) / PostgreSQL (prod) | Free on Render |
| Frontend | React 18 + Vite | Fast, modern |
| Styling | Tailwind CSS | Utility-first, responsive |
| Editor | Monaco Editor | VS Code in browser |
| Code Runner | Piston API | Free, sandboxed |
| Markdown | react-markdown + remark-gfm | Tables, code blocks |
| Deploy (BE) | Render.com | Free tier |
| Deploy (FE) | Vercel | Free tier |

---

## 📝 License
MIT — free to use and modify.
