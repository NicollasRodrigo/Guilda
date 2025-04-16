import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import requester from '../axios'

export default function MemberForm(props) {
  const { memberId } = useParams()

  const [member, setMember] = useState()
  const [guilds, setGuilds] = useState([])

  useEffect(() => {
    const getGuilds = async () => {
      try {
        const response = await requester.get('/guilds')
        console.log(response.data)
        setGuilds(response.data)
      } catch (error) {
        console.log("Erro: ", error)
      }
    }

    getGuilds()
  }, [])


  const addMember = async ({ name, guildId }) => {
    const created = { name, guildId }
    try {
      const response = await requester.post("/members", created)
      setMember(response?.data)
      props.updateMembers?.(response?.data)
    } catch (error) {
      console.log("Erro ao adicionar um membro (não é só copiar e colar kkkkk)", error)
    }

  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleSubmit(member)
  }

  useEffect(() => {
    const getMember = async () => {
      try {
        const response = await requester.get(`/members/${memberId}`)
        setMember(response.data)
      } catch (error) {
        console.log("Erro: ", error)
      }
    }
    if(memberId) getMember()
  }, [memberId])


  const editMember = async ({ id, name, guildId }) => {
    const updated = {
      name,
      guildId,
    };

    try {
      const response = await requester.patch(`/members/${id}`, updated);
      setMember(response?.data);
    } catch (error) {
      console.error("Erro ao editar o membro:", error);
    }
  };
  const handleSubmit = memberId ? editMember : addMember


  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4 p-5 text-blue-500'>
      <h1>Membros</h1>
      <div className='flex flex-col gap-1'>
        <label>Membro:</label>
        <input
          name='name'
          type='text'
          className=' border-2 border-blue-900'
          defaultValue={member?.name}
          onChange={(e) => setMember((prev) => ({ ...prev, name: e.target.value }))}
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label>Guilda:</label>
        <select
          role='select'
          value={member?.guildId ?? 0}
          name='Guild'
          placeholder="Guilda"
          className=' border-2 border-blue-900'

          onChange={(e) => setMember((prev) => ({ ...prev, guildId: e.target.value }))}
        >
            {guilds.map((guild) =>
              <option key={guild.id} value={guild.id}>
                {guild.name}
              </option>
            )}
        </select>
      </div>
      <button  type='submit' className='w-fit border-2 border-blue-900 bg-blue-500 p-3 rounded  text-white'>Confirmar</button>

    </form>
  )
}
