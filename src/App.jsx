import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import CreateQuiz from './pages/CreateQuiz.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import BrowseQuizzes from './pages/BrowseQuizzes.jsx'
import PlayQuiz from './pages/PlayQuiz.jsx'
import EditQuiz from './pages/EditQuiz.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/createquiz" element={<CreateQuiz />} />
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/quizzes" element={<BrowseQuizzes />} />
      <Route path="/quiz/:id" element={<PlayQuiz />} />
      <Route path="/edit-quiz/:id" element={<EditQuiz />} />
    </Routes>
  )
}