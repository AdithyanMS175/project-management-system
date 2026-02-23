import { Route, Routes } from 'react-router'
import './App.css'
import Register from './pages/Register'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ProjectDetails from './pages/ProjectDetails'

function App() {
  return (
    <>
    <Routes>
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Login/>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
      <Route path="/project/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>}/>
    </Routes>
      
    </>
  )
}

export default App
