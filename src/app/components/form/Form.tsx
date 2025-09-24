import React, { SetStateAction } from 'react'
type Task ={
  title:string
  category:string
}
type props={
  form:Task
  criarTarefa:(usertoken: string | null) => Promise<void>
  categorias:string[],
  setForm:React.Dispatch<SetStateAction<Task>>
  token:string | null
}

const Form = ({form,criarTarefa,categorias,setForm,token}:props) => {
  return (
     <div className='p-1 mt-1 flex flex-col gap-3'>
          <h2

            className='font-bold text-3xl '>Criar  tarefa </h2>

          <form className='flex flex-col gap-3' method='post'
            onSubmit={(e) => { e.preventDefault(); criarTarefa(token) }}
          >

            <label htmlFor="title" className='text-xl font-semibold'>Titulo:</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              type="text" id='title' className='bg-gray-200 w-full rounded-lg p-2 outline-none'
              placeholder='Digite o titulo da sua tarefa' />
            <label
              htmlFor="categoria"
              className='text-xl font-semibold'>Categoria:</label>

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              name="categoria" id="categoria"
              className='bg-gray-200 text-lg font-semibold rounded-lg p-2 '>
              <option value=''>Selecione a categoria</option>
              {categorias.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>

            <button className='
            bg-blue-700 p-2 w-full rounded-xl 
            hover:bg-blue-800 transition duration-300
            text-xl text-white font-semibold'>
              Criar tarefa
            </button>



          </form>
        </div>
  )
}

export default Form
