import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'


const App = () => {
  return (
    <div>
      <Navbar />
      <main>
      <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
      </main>
  
    </div>
  )
}

export default App
