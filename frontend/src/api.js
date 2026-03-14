import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

export const getTopics  = () => api.get('/topics/')
export const getTopic   = (slug) => api.get(`/topics/${slug}/`)
export const getLesson  = (topicSlug, lessonSlug) => api.get(`/topics/${topicSlug}/lessons/${lessonSlug}/`)
export const getQuiz    = (topicSlug, lessonSlug) => api.get(`/topics/${topicSlug}/lessons/${lessonSlug}/quiz/`)

export const runCode = async (code) => {
  try {
    const res = await fetch(`${API_BASE}/run/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
    if (!res.ok) throw new Error(`Server error: ${res.status}`)
    return await res.json()
  } catch (err) {
    return { stdout: '', stderr: `Error: ${err.message}`, code: 1 }
  }
}

export default api