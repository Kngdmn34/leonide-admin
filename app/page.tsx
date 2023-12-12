'use client'
import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { signIn } from 'next-auth/react';
import { SubmitHandler, useForm, FieldErrors, FieldValues } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Tangerine } from 'next/font/google';

const tangerine = Tangerine({ subsets: ['latin'], weight: ["400", "700"] })

const SigninPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      password: ''
    },

  })

  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.password === 'anas123') {
      router.push('/dashboard')
    }
    else {
      alert('Incorrect password')
    }
  }

  return (
    <>
      <div className='flex flex-col bg-gradient-to-b from-50% from-yellow-800/40  w-full  min-h-screen'>
        <h1 className={`${tangerine.className} text-center cursor-default pt-16 drop-shadow-md text-neutral-50 text-7xl tracking-wide`}>Leonide</h1>



        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='w-[50%] shadow-md border-2 border-yellow-700/40 pb-6 backdrop-blur-sm bg-white/60 mt-20 mx-auto justify-center items-center space-y-10 flex flex-col '>
            <input type='password'
              {...register('password', { required: "Password is required" })}
              className='border shadow-md focus:ring-yellow-800 ring ring-white  w-1/2 px-2 mt-11 ' placeholder='Enter admin password' />

            <button type='submit' className='border shadow-md p-1 bg-white/80 px-6 hover:scale-105 transition-all ' ><FaArrowRightLong className='text-neutral-700 drop-shadow-md' /></button>
          </div>
        </form>





      </div>
      <footer className='absolute  text-sm  text-gray-500 py-2  flex justify-center mx-auto items-center bottom-0 border-t-2 border-yellow-700/40 w-full '>
        &copy; 2023. leonide all rights resirved
      </footer>
    </>
  )
}

export default SigninPage