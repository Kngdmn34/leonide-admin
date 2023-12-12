'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image'
import { HiOutlineTrash } from "react-icons/hi2";
import { Decimal } from '@prisma/client/runtime/library';

type Billboards = {
    id: string
    name: string
    price: number;
    discount: number
    description: string
    coverId: string


}

const BillboardTableData = ({ formOpen }: { formOpen: boolean }) => {

    const [billboards, setBillboards] = useState<Billboards[]>()


    useEffect(() => {

        const fetchData = async () => {
            try {
                const billboards = await axios.get('/api/billboard')
                if (billboards.data) {
                    setBillboards(billboards.data.allbillboards)
                    console.log(billboards.data.allbillboards)
                    fetchData()
                }
                else {
                    console.log('no billboard found')
                }

            } catch (e) {
                console.log(e)
            }
        }
        fetchData()

    }, [])

    const ActionDelete = async (id: string) => {
        try {
            await axios.delete(`/api/billboard/${id}`)
            toast.success('Billboard Deleted')

            setBillboards((prevBil) => prevBil?.filter((billboard) => billboard.id !== id))

        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <div className={` transition-all duration-700 ${formOpen ? `opacity-0 translate-x-32 ` : `relative -translate-x-0`}`}>
            {billboards?.length !== 0 ?
                <div className={`${formOpen ? `hidden` : `relative`} cursor-default w-[80%] mx-auto overflow-hidden`}>
                    <table className="w-full text-sm text-left rtl:text-right border-2 border-yellow-700/60 text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-yellow-700/60 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Cover
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Billoard name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Discount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {billboards?.map((billboard) => (
                                <tr key={billboard.id} className="bg-white border-b text-neutral-800 ">
                                    <td className="px-6 py-4">
                                        {billboard.coverId && <img height={50} width={50} src={billboard.coverId} alt='' />}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium ">
                                        {billboard.name}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium ">
                                        {billboard.description.slice(0, 50)}...
                                    </th>
                                    <td className="px-6 py-4">
                                        {billboard.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {billboard.discount}
                                    </td>

                                    <td className="px-6 py-4">
                                        <button className='flex flex-row space-x-2 items-center ' onClick={() => ActionDelete(billboard.id as string)}>
                                            <HiOutlineTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                : <p className='w-full justify-center flex italic text-neutral-400 h-52 items-center '>No billboards found , Please add a new billboard</p>}

        </div>
    )
}

export default BillboardTableData