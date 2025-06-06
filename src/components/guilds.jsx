import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GuildForm from './guildForm'
import requester from '../axios'



export default function Guild() {
  const navigate = useNavigate()

  const [guilds, setGuilds] = useState([])


  useEffect(() => {
    const getGuilds = async () => {
      try {
        const response = await requester.get("/guilds")
        setGuilds(response.data)
      } catch (error) {
        console.log("Erro: ", error)
      }
    }
    getGuilds()
  }, [])


  const updateGuilds = (data) => setGuilds([...guilds, data])

  const deleteGuild = async ({id}) => {
    try {
      await requester.delete(`/guilds/${id}`)
      setGuilds(guilds.filter((guild) => guild.id !== id))
    } catch (error) {
        console.log("Erro", error)
    }
  }


  return (
    <div className='flex flex-col gap-4 p-5  text-blue-500'>
      <h1>Guildas</h1>
      <ul>
        {guilds.map((guild) => (
          <li key={guild.id} className='cursor-pointer flex gap-4 items-center'>
            {guild.name}
            <button onClick={() => navigate(guild.id)}>Editar</button>
            <button onClick={() => deleteGuild(guild.id)}>Excluir</button>    
          </li>
        ))}
      </ul>
      <GuildForm updateGuilds={updateGuilds} />
    </div>
  )
}
