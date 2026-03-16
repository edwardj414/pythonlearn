import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import TopicPage from './pages/TopicPage'
import LessonPage from './pages/LessonPage'
import QuizPage from './pages/QuizPage'
import Compiler from './pages/Compiler'

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-[#050505]">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/"                                          element={<Home />} />
            <Route path="/topic/:topicSlug"                         element={<TopicPage />} />
            <Route path="/topic/:topicSlug/:lessonSlug"             element={<LessonPage />} />
            <Route path="/topic/:topicSlug/:lessonSlug/quiz"        element={<QuizPage />} />
            <Route path="/compiler"                                  element={<Compiler />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}