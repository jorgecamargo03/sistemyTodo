'use client'
import React, { useState } from 'react'
import BGinicio from '../../img/bg/bg-2.jpg'
import Link from 'next/link'
import Image from 'next/image'
import imgLogin from '../../img/bg/cadastroIMG.jpg'
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import logoGoogle from '../../img/icons/icons8-google-logo.svg'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import axios from 'axios'
import { useRouter } from 'next/navigation'


const Cadastro = () => {

  const [form, setForm] = useState(
    {
      name: '',
      email: '',
      password: ''
    }
  )
  const [showpass, setShowpass] = useState(false)
  const [msg, setMsg] = useState('')
  const router = useRouter()



  async function cadastrarUser() {
    try {
      const res = await axios.post('https://crudbasic.onrender.com/crudBas/register',form)
      setMsg(res.data.msg)
      if(res.status===201){
         router.push('/')
      }
      


    } catch (error) {
      setMsg('erro no servidor')
      console.log(error);

    }
    setTimeout(() => {
      setMsg('')
    }, 5000);
  }
  return (
    <div style={{ backgroundImage: `url(${BGinicio.src})` }} className='h-screen w-screen bg-cover text-gray-50 flex  justify-center bg-center items-center'>
      <div className={`absolute top-4 mx-4 p-4 w-[90%] text-zinc-100 max-w-[1200px] rounded-xl text-xl text-center font-bold
  ${msg === '' ? 'hidden' : 'block'}
  ${msg === "Usuário registrado com sucesso" ? 'bg-green-700' : 'bg-red-800'}`}>
        {msg}
      </div>

      <div className='w-[90%] max-w-[1200px] justify-center flex  items-center  '>

        <div className='w-full max-w-[453px] hidden rounded-lg xl:block'>
          <Image src={imgLogin} alt='img ilustrativa login' className='w-full rounded-l-lg' />
        </div>

        <div className='bg-white text-zinc-800 h-[453px] w-150 flex justify-center items-center rounded-r-lg rounded-l-lg xl:rounded-l-[0px]'>

          <form onSubmit={(e) => { e.preventDefault(); cadastrarUser() }} className='flex flex-col  w-[90%] p-5'>
            <h1 className='text-zinc-800 text-center text-4xl font-semibold mb-3'>Cadastrar-se</h1>

            <label htmlFor='name' className='text-zinc-700'>Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text" id='email' placeholder='name'
              className='outline-none bg-gray-200 p-2 rounded-sm' />

            <label htmlFor='email' className='text-zinc-700'>Username</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="text" id='email' placeholder='@mail.com'
              className='outline-none bg-gray-200 p-2 rounded-sm' />

            <label htmlFor='email' className='text-zinc-700' >Password</label>
            <div className='relative w-full'>
              <input
                value={form.password}
                type={showpass ? 'text' : 'password'}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                id='password' placeholder='password'
                className='outline-none bg-gray-200 w-full p-2 rounded-sm' />

              <button
                className='absolute top-3 right-3 text-xl'
                onClick={() => setShowpass(!showpass)}
                type='button'>
                {showpass ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <div className='w-full flex justify-between mt-3'>

              <div>
                <input type="checkbox" id='check' />
                <label htmlFor="check" className='text-zinc-500 '>Remember me</label>
              </div>

            </div>
            <button
              type='submit'
              className='
            bg-[#00a5f0] text-white font-semibold rounded-sm py-1 px-3 mt-2 mb-1 cursor-pointer transition duration-300 hover:bg-[#0277ae]'>Cadastrar</button>

            <div className=''>
              tem uma conta?
              <Link href='/' className='text-blue-500 border-b border-b-blue-500 cursor-pointer transition duration-300 hover:text-[#0277ae]'>Login</Link>
            </div>
            <p className='text-center text-lg font-semibold text-zinc-700'>Logar com </p>
            <ul className='flex  justify-around text-2xl mt-2'>
              <li className='text-blue-500 cursor-pointer'><FaFacebook /></li>
              <li className='w-7 cursor-pointer'><Image src={logoGoogle} alt=''></Image></li>
              <li className='cursor-pointer'><FaApple /></li>
            </ul>



          </form>

        </div>

      </div>

    </div>
  )
}


export default Cadastro