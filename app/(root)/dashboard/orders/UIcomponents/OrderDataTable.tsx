



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns'
import Image from 'next/image'
import { HiOutlineTrash } from "react-icons/hi2";
import prisma from '@/app/lib/prismadb';
import { formatter } from '@/app/lib/utils/formatter';

type Product = {
    id: string
    name: string
    price: number
    imageId: string
    category: string
    isFeatured: boolean
}

const OrderDataTable = async () => {


    const orders = await prisma.order.findMany({
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })






    return (
        <div className={` transition-all overflow-hidden duration-700 relative`}>

            {orders.length !== 0 ?

                <>
                    <span className='flex mb-3 p-1 justify-center flex-row space-x-4 items-center'>

                        <h1 className='border-2 p-1 border-yellow-700/60'>Products: {orders.length}</h1>


                    </span>

                    <div className={`relative cursor-default w-[80%] mx-auto overflow-hidden`}>
                        <table className="w-full text-sm text-left rtl:text-right border-2 border-yellow-700/60 text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-yellow-700/60 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Client
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Address
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Paid
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created At
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((product) => (
                                    <tr key={product.id} className="bg-white border-b text-neutral-800 ">
                                        <td className="px-6 py-4">
                                            {product.orderItems.map((orderItem) => orderItem.product.name).join(', ')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.customerName}
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium ">
                                            {product.phone}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium ">
                                            {product.address}
                                        </th>
                                        <td className="px-6 py-4">
                                            {formatter.format(product.orderItems.reduce((total, item) => {
                                                return total + Number(item.product.price)
                                            }, 0))

                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.isPaid ? `yes` : `no`}
                                        </td>

                                        <td className="px-6 py-4">
                                            {format(product.createdAt, 'MMMM do, yyyy')}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </>
                : <p className='w-full justify-center flex italic text-neutral-400 h-52 items-center '>No orders found </p>}

        </div>
    )
}

export default OrderDataTable