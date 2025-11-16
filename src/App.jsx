import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Mayday from './pages/Mayday'
import Geomap from './pages/Geomap'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mayday" element={<Mayday />} />
      <Route path="/geomap" element={<Geomap />} />
    </Routes>
  )
}

export default App;