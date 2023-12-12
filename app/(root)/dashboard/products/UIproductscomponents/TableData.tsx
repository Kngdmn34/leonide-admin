'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image'
import { HiOutlineTrash } from "react-icons/hi2";


type Products = {
    id: string
    name: string
    price: number
    imageId: string
    category: string
    isFeatured: boolean
}

const TableData = ({ formOpen }: { formOpen: boolean }) => {

    const [products, setProducts] = useState<Products[]>()
    const [query, setQuery] = useState<string>('')

    const handleChange = (event: any) => {
        setQuery(event.target.value)


    }


    useEffect(() => {

        const fetchData = async () => {
            try {
                const products = await axios.get('/api/products')
                if (products.data) {
                    setProducts(products.data.allproducts)
                    fetchData()

                }
                else {
                    console.log('no product found')
                }

            } catch (e) {
                console.log(e)
            }
        }
        fetchData()

    }, [])

    const ActionDelete = async (id: string) => {
        try {
            const res = await axios.delete(`/api/products/${id}`)
            toast.success('Product Deleted')
            setProducts((prevPro) => prevPro?.filter((product) => product.id !== id))

        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <div className={` transition-all overflow-hidden duration-700 ${formOpen ? `opacity-0 translate-x-32 ` : `relative -translate-x-0`}`}>

            {products?.length !== 0 ?

                <>
                    <span className='flex mb-3 p-1 justify-center flex-row space-x-4 items-center'>
                        <input placeholder='Search'
                            className='border-2 border-yellow-700/60 p-1'
                            onChange={handleChange}
                        />
                        <h1 className='border-2 p-1 border-yellow-700/60'>Products: {products?.length}</h1>


                    </span>

                    <div className={`${formOpen ? `hidden` : `relative`} cursor-default w-[80%] mx-auto overflow-hidden`}>
                        <table className="w-full text-sm text-left rtl:text-right border-2 border-yellow-700/60 text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-yellow-700/60 uppercase bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Cover
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Featured
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.filter((item) => item.name.toLowerCase().includes(query)).map((product) => (
                                    <tr key={product.id} className="bg-white border-b text-neutral-800 ">
                                        <td className="px-6 py-4">
                                            {product.imageId && <img height={50} width={50} src={product.imageId} alt='' />}
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium ">
                                            {product.name}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium ">
                                            {product.isFeatured ? 'yes' : 'no'}
                                        </th>
                                        <td className="px-6 py-4">
                                            {product.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.category}
                                        </td>

                                        <td className="px-6 py-4">
                                            <button className='flex flex-row space-x-2 items-center ' onClick={() => ActionDelete(product.id as string)}>
                                                <HiOutlineTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </>
                : <p className='w-full justify-center flex italic text-neutral-400 h-52 items-center '>No products found , Please add a new product</p>}

        </div>
    )
}

export default TableData