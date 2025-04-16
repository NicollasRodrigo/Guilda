import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import requester from '../axios'

export default function GuildForm(props) {
  const {guildId} = useParams()
  const [guild, setGuild] = useState()

  const addGuild = async (guild) => {
    const {name} = guild
    const created = { name }
    try {
      const response = await requester.post("/guilds", created)
      props.updateGuilds?.(response.data)
    } catch (error) {
      console.log("Erro: ", error)
    }
  }
  const editGuild = async (guild) => {
    const {name, id} = guild
    const updated = { name }
    try {
      const response = await requester.patch(`/guilds/${id}`, updated)
      setGuild(response.data)
    } catch (error) {
      console.log("Erro: ", error)
    }
  }

  const handleSubmit = guildId ? editGuild : addGuild

  useEffect(() => {
    const getGuild = async () => {
      try {
        const response = await requester.get(`/guilds/${guildId}`)
        setGuild(response.data)
      } catch (error) {
        console.log("Erro: ", error)
      }
    }
    if(guildId) getGuild()
  }, [guildId])



  const onSubmit = (e) => {
    e.preventDefault()
    handleSubmit(guild)
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4 p-5  text-blue-500'>
        <h1>Guilda</h1>
        <input
          name='name'
          type='text'
          className=' border-2 border-blue-900'
          defaultValue={guild?.name}
          onChange={(e) => setGuild((prev) => ({...prev, name: e.target.value}))}
        />
      <button  type='submit' className='w-fit border-2 border-blue-900 bg-blue-500 p-3 rounded  text-white'>Confirmar</button>
    </form>
  )
}