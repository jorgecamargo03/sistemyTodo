'use client'
import React, { useEffect, useRef, useState } from 'react'
import bgInicio from '../../img/bg/bg-3.jpg'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import FilterSearch from '../../components/FIlterSearch/page'
import ListTask from '../../components/listTask/page'
import CreateTask from '../../components/form/page'
type Task = {
  _id: string,
  title: string,
  category: string,
  done: boolean
}

const page = () => {

  const router = useRouter()
  const [tasks, setTask] = useState<Task[]>([])
  const msgSucesso = [
    'Deletado com sucesso',
    'Tarefa atualizada com sucesso',
    'Tarefa criada com sucesso'


  ]
  const [form, setForm] = useState({ title: '', category: '' })
  const [msg, setMsg] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true) // 🔥 controla o estado
  const topRef = useRef<HTMLLIElement>(null)
  const [search, setSearch] = useState('')
  const [filterCategory, setFiltercategory] = useState('')
  const [filterDone, setFilterdone] = useState('')
  const categorias = [
    "Pessoal",
    "Estudo",
    "Trabalho",
    "Saúde",
    "Outros"
  ];

  useEffect(() => {

    const savedToken = localStorage.getItem('token')
  
    if (!savedToken) {
      router.push('/')
      return
    }

    axios.get('https://crudbasic.onrender.com/tasks/me', {
      headers: { Authorization: `Bearer ${savedToken}` }
    })
      .then((res) => {
        setTask(res.data)
        setToken(savedToken)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        localStorage.removeItem('token')
        router.replace('/')
      })
  }, [router])

useEffect(() => {
  if (msg !== "") {
  topRef.current?.scrollIntoView({ behavior: "smooth" });
  }
   console.log(msg)

}, [msg]);


  function clearmsg() {
    setTimeout(() => setMsg(''), 5000)
  }
  async function deleteTask(id: string | null, usertoken: string | null) {
    try {
      await axios.delete(`https://crudbasic.onrender.com/tasks/delete/${id}`, {
        headers: { Authorization: `Bearer ${usertoken}` }
      })
      setTask(prev => prev.filter(task => task._id !== id))
      setMsg('Deletado com sucesso')
      clearmsg()
    } catch (error) {
      console.log(error);
      setMsg('Erro ao deletar')
      clearmsg()

    }


  }
  async function checkTask(id: string | null, usertoken: string | null) {
    if (!usertoken) return
    try {
      await axios.patch(`https://crudbasic.onrender.com/tasks/check/${id}`, {},
        {
          headers: { Authorization: `Bearer ${usertoken}` }
        })
      setTask(prev => prev.map((task) => task._id === id ? { ...task, done: !task.done } : task))


      setMsg('Tarefa atualizada com sucesso')
      clearmsg()

    } catch (error) {
      console.log(error);
      setMsg('Erro ao atualizar tarefa')
    }

  }
  async function getTask(userToken: string) {
    try {
      const res = await axios.get('https://crudbasic.onrender.com/tasks/me', {
        headers: { Authorization: `Bearer ${userToken}` }
      })
      setTask(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function criarTarefa(userToken: string | null) {
    if (!userToken) return
    if (form.category === '' || form.title === '') {
      setMsg('Preencha todos os dados')
      clearmsg()

      return
    }
    try {
      await axios.post('https://crudbasic.onrender.com/tasks/criar', form, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      setMsg('Tarefa criada com sucesso')

      clearmsg()
      setForm({ category: '', title: '' })
      getTask(userToken)
    } catch (error) {
      console.log(error)
      setMsg('Erro no servidor')
    }
  }
  function LogOut(){
    localStorage.removeItem('token')
    router.push('/')
  }
  //
  if (loading) return null

  return (
    <div
      style={{ backgroundImage: `url(${bgInicio.src})` }}
      className='h-screen w-screen bg-cover bg-center bg-fixed p-2 py-5 
      overflow-x-hidden
      relative'>

      <li ref={topRef}></li>

      <div
        className={` text-white 
        ${msg === '' ? 'hidden' : 'block'}
        font-semibold text-center px-2 py-1 
        text-xl
  ${msgSucesso.includes(msg)
            ? 'bg-green-500'
            : 'bg-red-700'}


        
        mb-3 max-w-[1200px] w-[90%]
        rounded-xl
           m-[0_auto]`}>
        {msg && <p>{msg}</p>
        }
      </div>

      <div className=' m-[0_auto] max-w-[1200px] 
      w-full bg-white rounded-2xl 
      p-5'>

        <div className='flex justify-end items-center'>
             <button
              onClick={LogOut}
              className='hover:bg-red-800
              transition duration-300
             bg-red-600 px-3 py-1 font-bold text-white rounded-lg '>Sair</button>
        </div>
        <h2 className='text-center text-3xl font-bold mb-5'>Lista de tarefas</h2>
      

        <FilterSearch
          categorias={categorias}
          filterCategory={filterCategory}
          filterDone={filterDone} search={search}
          setFiltercategory={setFiltercategory}
          setFilterdone={setFilterdone}
          setSearch={setSearch} />

        <ListTask
          token={token}
          tasks={tasks}
          search={search}
          checkTask={checkTask}
          deleteTask={deleteTask}
          filterCategory={filterCategory}
          filterDone={filterDone}
        />

        <CreateTask
          categorias={categorias}
          criarTarefa={criarTarefa}
          form={form}
          token={token}
          setForm={setForm}
        />


      </div>


    </div>
  )
}

export default page
