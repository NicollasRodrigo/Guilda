import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from './components/navbar'
import Members from './components/members'
import Home from './components/home'
import Guild from './components/guilds'
import GuildForm from './components/guildForm'
import MemberForm from './components/memberForm'

function App() {
  const [count, setCount] = useState(0)
  return (
    <Router >
      <div className='bg-blue-200 w-screen h-screen'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guilds" element={<Guild />} />
          <Route path="/members" element={<Members />} />
          <Route path='/guilds/:guildId' element={<GuildForm />} />
          <Route path='/members/:memberId' element={<MemberForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
