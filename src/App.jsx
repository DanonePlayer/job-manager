import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import JobListPage from './pages/JobListPage'
import JobFormPage from './pages/JobFormPage'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/jobs" element={<JobListPage />} />
          <Route path="/jobs/new" element={<JobFormPage />} />      
        </Routes>
      </Router>
    </>
  )
}

export default App
