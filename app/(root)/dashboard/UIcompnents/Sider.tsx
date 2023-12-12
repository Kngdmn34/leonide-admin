'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

//icons

import { FaBoxes, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaCartFlatbed } from "react-icons/fa6";
import { MdOutlineImagesearchRoller } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import Link from 'next/link';

interface SiderProps {
    open: boolean
    isOpen: (value: boolean) => void

}

const Sider = () => {


    const [open, isOpen] = useState(false)


    const Toggle = () => {

        isOpen(!open);
    };




    return (
        <aside className={`absolute top-0 backdrop-blur-2xl ${open ? `translate-x-0 duration-300 ` : ` -translate-x-20 duration-300 `} transition-all  z-10 left-0  min-h-full  w-24 border-r-2 border-yellow-600/60 shadow-lg`}>
            <button onClick={Toggle} className={`${open ? `right-0 p-2` : `-right-4 p-2`} absolute top-3 `}>{open ? <FaEyeSlash size='20' /> : <FaEye size='20' className='drop-shadow-lg bg-white ' />}</button>
            <ul className='flex flex-col space-y-5 mt-32 justify-start items-center h-full'>
                <Link href={'/dashboard/products'} className={`border-b hover:bg-yellow-500/30  items-center py-1 flex justify-center w-[70%] mx-auto`}>
                    <FaCartFlatbed size='30' />
                </Link>
                <Link href={'/dashboard/orders'} className='border-b hover:bg-yellow-500/30 items-center py-1 flex justify-center w-[70%] mx-auto'>
                    <FaBoxes size='30' />
                </Link>
                <Link href={'/dashboard/billboard'} className='border-b hover:bg-yellow-500/30 items-center py-1 flex justify-center w-[70%] mx-auto'>
                    <MdOutlineImagesearchRoller size='30' />
                </Link>
                <Link href={'/dashboard/settings'} className='border-b hover:bg-yellow-500/30 items-center py-1 flex justify-center w-[70%] mx-auto'>
                    <CiSettings size='30' />
                </Link>
            </ul>
        </aside>
    )
}

export default Sider