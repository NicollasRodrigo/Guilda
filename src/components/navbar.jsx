import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='flex w-full gap-5 h-[65px] items-center bg-blue-500 p-5 '>
      <h1 className='text-lg lg:text-x1 text-blue-500 '>RPG Guild</h1>
      <ul className='flex gap-5'>
        <li className='text-sm lg:text-md'>
          <Link to="/" className='text-black'>Home</Link>
        </li>
        <li className='text-sm lg:text-md'>
          <Link to="/guilds" className='text-black'>Guildas</Link>
        </li>
        <li className='text-sm lg:text-md'>
          <Link to="/members" className='text-black'>Membros</Link>
        </li>
      </ul>
    </nav>
  )
}
