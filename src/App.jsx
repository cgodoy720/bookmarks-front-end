import { useState } from 'react'
import './App.css'
import Nav from "./Components/Nav"
import Index from "./Pages/Index"

import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/bookmarks" element={<Index />}/>
        </Routes>
      </main>
    </>
  )
}

export default App
