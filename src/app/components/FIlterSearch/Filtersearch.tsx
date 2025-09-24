'use client'
import React from 'react'
import { FaSearch } from "react-icons/fa";

type props={
    filterCategory:string,
    categorias:string[],
    filterDone:string,
    setFilterdone:React.Dispatch<React.SetStateAction<string>>
    search:string
    setSearch:React.Dispatch<React.SetStateAction<string>>
    setFiltercategory:React.Dispatch<React.SetStateAction<string>>

    
}





const FilterSearch = ({filterCategory,categorias,filterDone,setFilterdone,search,setSearch,setFiltercategory}:props) => {
  return (
     <div className='flex items-center'>
   
             <div className='mb-5 border-r-zinc-800 pr-1 border-r w-1/2 flex flex-col gap-2'>
   
               <h3 className='font-bold text-lg'>Filtros</h3>
   
               <p className='semibold text-[14px] text-center'>Categoria:</p>
               <select
                 value={filterCategory}
                 className='bg-gray-200 font-bold rounded-lg' onChange={(e) => setFiltercategory(e.target.value)}>
                 <option value=''>Tudo</option>
                 {categorias.map((category) => (
   
                   <option value={category}>{category}</option>
                 ))}
               </select>
               <p className='semibold text-[14px] text-center'>Feito:</p>
               <select className='bg-gray-200 font-bold rounded-lg'
                 value={filterDone}
                 onChange={(e) => setFilterdone(e.target.value)}>
                 <option value="">Tudo</option>
                 <option value="nao feito">Não feitos</option>
                 <option value="feito">Feito</option>
               </select>
             </div>
             <div className='relative mb-3 w-1/2 ml-3'>
               <input
                 className='w-full bg-gray-300 rounded-xl px-2 py-1 outline-blue-800'
                 placeholder='Pesquisar tarefas...'
                 type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
               <FaSearch className='absolute top-[10px] right-2 ' />
             </div>
   
           </div>
  )
}

export default FilterSearch;
