import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Demo from './pages/Demo'
import Charts from './pages/Charts'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import { api } from './utils/api'

function App() {
  const [isBackendConnected, setIsBackendConnected] = useState(false)

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await api.health()
        setIsBackendConnected(response.data.status === 'ok' && response.data.model_loaded)
      } catch (error) {
        setIsBackendConnected(false)
      }
    }

    checkBackend()
    const interval = setInterval(checkBackend, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Router>
      <div style={{ minHeight: '100vh', position: 'relative' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
