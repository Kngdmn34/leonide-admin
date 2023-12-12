'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import { useEdgeStore } from '../../../../lib/edgestore';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

//icons
import { CiSquarePlus } from "react-icons/ci";
import { GrPrevious } from "react-icons/gr";
import TableData from './TableData';
import { RiLoader5Fill } from "react-icons/ri";

type ProductsData = {
    name: string
    price: number;
    description: string
    category: string
    imageId?: string

    isFeatured?: boolean
}

type UploadResponse = {
    url: string;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, never>;
    path: Record<string, never>;
    pathOrder: string[];
};

const schema = yup.object({
    name: yup.string().strict().min(5).matches(/^[a-z\s]+$/, 'Only Text Required'),
    price: yup.number().positive(),
    description: yup.string(),
    category: yup.string(),
    imageId: yup.string(),
    isFeatured: yup.boolean()

}).required()

type FormData = yup.InferType<typeof schema>;

const ForumProduct = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    const [file, setFile] = React.useState<File>();
    const { edgestore } = useEdgeStore();
    const [formOpen, isFormOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter();



    const ToggleForm = () => {
        isFormOpen(!formOpen)
    }



    const categories = [
        {
            label: 'Men',
            value: 'men'
        },
        {
            label: 'Women',
            value: 'women'
        }
    ]

    const OnSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            setLoading(true)
            if (file) {
                const response = await edgestore.publicFiles.upload({ file });
                const uploadData: UploadResponse = response;
                data.imageId = uploadData.url;

            }

            await axios.post('/api/products', data)
                .then(() => { toast.success('Product Added'); router.refresh() })

                .catch(() => toast.error('Error'))



        }
        catch (e) {
            toast.error('POST PRODUCT FAILED')
            console.log(e)

        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className='w-1/2 mx-auto h[80%]'>

                <button onClick={ToggleForm} className='mt-3 drop-shadow-md'>{formOpen ? <GrPrevious size='30' /> : <CiSquarePlus size='30' />}</button>
                {loading && <div className='absolute z-20 drop-shadow-md  justify-center'><RiLoader5Fill size='40' className='animate-spin text-yellow-600' /></div>}
                <div className={`${loading && `opacity-70 blur-sm `} ${formOpen ? `relative  visible translate-x-0 transition-all duration-300` : `  opacity-0 -z-0 -translate-x-20  `}   bg-neutral-50/60 shadow-lg w-1/2 p-2 border border-yellow-600/60 mx-auto`}>



                    <form className={`${formOpen ? `relative ` : `hidden`} `} onSubmit={handleSubmit(OnSubmit)}>
                        Add Product
                        <span className='flex text-sm mt-5 flex-col space-y-3'>
                            <label >Product Name</label>
                            <input className='border-2 border-yellow-600/60' required {...register('name')} placeholder='product' />
                            {errors.name?.message}
                            <label>Product Description</label>
                            <input type='text' className='border-2 border-yellow-600/60' required {...register('description')} placeholder='Description' />
                            {errors.description?.message}
                            <label>Category</label>
                            <select className='border-2 border-yellow-600/60'  {...register('category')}>
                                {categories.map((category, id) => (
                                    <option value={category.value} key={id}>{category.label}</option>
                                ))}
                            </select>
                            {errors.category?.message}
                            <span className='flex flex-row  space-x-20 items-center'>
                                <input className='border-2 border-yellow-600/60 w-20' type='number' required {...register('price', { valueAsNumber: true })} placeholder='price ' />
                                {errors.price?.message}
                                <input type='checkbox' {...register('isFeatured', { required: false })} placeholder='is Feeatured' /> isFeautred
                                {errors.isFeatured?.message}
                            </span>
                            <label>Product Image</label>
                            <input className='border-2 border-yellow-600/60' type='file' {...register(`imageId`)} onChange={(e) => setFile(e.target.files?.[0])} />
                            <button disabled={loading} className='border-2 disabled:bg-gray-100 disabled:hover:scale-100 hover:scale-110 hover:bg-white transition-transform  border-yellow-600/60' type='submit'>Add </button>
                        </span>
                    </form>
                </div>
            </div>
            <TableData formOpen={formOpen} />
        </>
    )
}

export default ForumProduct