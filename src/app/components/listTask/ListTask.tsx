'use client'
import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaRegCheckSquare } from "react-icons/fa";
import { FaSquareCheck } from "react-icons/fa6";

type Task={
    _id: string | null
    title:string,
    category:string,
    done:boolean
}

type props ={
    tasks:Task[]
    filterCategory:string
    filterDone:string
    search:string,
    token:string | null
    deleteTask: (id: string | null, usertoken: string | null) => Promise<void>
    checkTask: (id: string | null, usertoken: string | null) => Promise<void>
    
}

const ListTask = ({tasks,deleteTask,checkTask,filterCategory,filterDone,search,token}:props) => {
  return (
      <div className=' p-1 max-h-[550px] bg-zinc-400
             scrollbar-hide
             overflow-y-auto rounded-sm'>
   
             {
   
               tasks.length === 0 ? <div className='font-bold text-center'>Não há tarefas</div> :
                 tasks
                   .filter(task => filterCategory === "" || task.category === filterCategory)
                   .filter(task =>
                     filterDone === "" || (filterDone === "feito" ? task.done : !task.done)
                   )
                   .filter(task => task.title.toLowerCase().includes(search.toLocaleLowerCase()))
   
                   .map((task) => (
                     <li
                       key={task._id}
                       className='
                       justify-between
                       flex items-center
                       bg-gray-200 w-full mb-4 px-2 py-1 rounded-lg'>
   
                       <div className={`${task.done ? 'line-through italic decoration-green-500 decoration-[3px]' : ''}`}>
                         <p className='text-zinc-800 font-bold capitalize'>{task.title}</p>
                         <span className='text-gray-700 italic'>({task.category})</span>
                       </div>
   
                       <div className='flex gap-4 text-2xl '>
   
                         <button
                           className="transition-transform duration-300 ease-in-out hover:scale-110"
                           onClick={() => checkTask(task._id, token)}
                         >
                           {task.done ? (
                             <FaSquareCheck className="text-green-500 transition-opacity duration-300" />
                           ) : (
                             <FaRegCheckSquare className="text-gray-500 transition-opacity duration-300" />
                           )}
                         </button>
   
                         <button
                           onClick={() => deleteTask(task._id, token)}
                           className='
                         hover:scale-110 
                         text-red-700 
                         hover:text-red-800
                         duration-300
                         transition'>
                           <MdDelete />
                         </button>
   
                       </div>
                     </li>
                   ))}
   
           </div>
  )
}

export default ListTask
