import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import requester from '../axios'
import MemberForm from './memberForm'

export default function Members() {
  const navigate = useNavigate()
  const [members, setMembers] = useState([])

  useEffect(() => {
    const getMembers = async () => {
      try {
        const response = await requester.get("/members")
        setMembers(response.data)

      } catch (error) {
        console.log("Error", error)
      }
    }

    getMembers()
  }, [])

  const deleteMember = async ({id}) => {
    try {
      await requester.delete(`/members/${id}`)
      setMembers(members.filter((member) => member.id !== id))
    } catch (error) {
      console.log("Erro: ", error)
      
    }
  }
  const updateMembers = (data) => setMembers([...members, data])

  return (
    <div className="flex flex-col gap-4 p-5 text-blue-500">
      <h1>Membros</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id} className="cursor-pointer flex gap-4 items-center">
            {member.name}
            <button onClick={() => navigate(member.id)}>Editar</button>
            <button onClick={() => deleteMember(member)}>Excluir</button>
          </li>
        ))}
      </ul>
      <MemberForm updateMembers={updateMembers} />
    </div>
  )
}
