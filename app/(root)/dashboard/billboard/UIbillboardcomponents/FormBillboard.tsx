'use client'

import React, { useState } from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import { useEdgeStore } from '../../../../lib/edgestore';

import BillboardTableData from './BillboardTableData';
//icons
import { CiSquarePlus } from "react-icons/ci";
import { GrPrevious } from "react-icons/gr";

import { RiLoader5Fill } from "react-icons/ri";


type BillboardsData = {
    name: string
    price: number;
    discount: number
    description: string
    coverId: string


}

type UploadResponse = {
    url: string;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, never>;
    path: Record<string, never>;
    pathOrder: string[];
};

const FormBillboard = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<BillboardsData>()
    const [file, setFile] = React.useState<File>();
    const { edgestore } = useEdgeStore();
    const [formOpen, isFormOpen] = useState(false)
    const [loading, setLoading] = useState(false)


    const ToggleForm = () => {
        isFormOpen(!formOpen)
    }



    const OnSubmit: SubmitHandler<BillboardsData> = async (data) => {
        try {
            if (file) {
                const response = await edgestore.publicFiles.upload({ file });
                const uploadData: UploadResponse = response;
                data.coverId = uploadData.url;

            }

            await axios.post('/api/billboard', data)
                .then(() => toast.success('Billboard Added'))

                .catch(() => toast.error('Error'))



        }
        catch (e) {
            toast.error('POST BILLBOARD FAILED')
            console.log(e)

        }
    }

    return (
        <>
            <div className='w-1/2 mx-auto'>
                <button onClick={ToggleForm} className='mt-3 drop-shadow-md'>{formOpen ? <GrPrevious size='30' /> : <CiSquarePlus size='30' />}</button>
                {loading && <div className='absolute z-20 drop-shadow-md  justify-center'><RiLoader5Fill size='40' className='animate-spin text-yellow-600' /></div>}
                <div className={`${loading && `opacity-70 blur-sm `} ${formOpen ? `relative visible translate-x-0 transition-all duration-300` : `  opacity-0 -z-0 -translate-x-20  `}   bg-neutral-50/60 shadow-lg w-1/2 p-2 border border-yellow-600/60 mx-auto`}>



                    <form className={`${formOpen ? `relative` : `hidden`}`} onSubmit={handleSubmit(OnSubmit)}>
                        Add Billboard
                        <span className='flex text-sm mt-5 flex-col space-y-3'>
                            <label >Billboard Name</label>
                            <input className='border-2 border-yellow-600/60' required {...register('name')} placeholder='Billboard' />
                            <label>Billboard Description</label>
                            <input type='text' className='border-2 border-yellow-600/60' required {...register('description')} placeholder='Description' />
                            <label>Discount Price</label>
                            <span className='w-full flex justify-between items-center'>
                                <input className='border-2 border-yellow-600/60 w-32' placeholder='discount price'  {...register('discount', { valueAsNumber: true })} />
                                <input className='border-2 border-yellow-600/60 w-32' type='number' required {...register('price', { valueAsNumber: true })} placeholder='price ' />
                            </span>
                            <label>Billboard Cover Image</label>
                            <input className='border-2 border-yellow-600/60' type='file' {...register(`coverId`)} onChange={(e) => setFile(e.target.files?.[0])} />
                            <button disabled={loading} className='border-2 hover:scale-110 hover:bg-white transition-transform  border-yellow-600/60' type='submit'>Add </button>
                        </span>
                    </form>
                </div>
            </div>
            <BillboardTableData formOpen={formOpen} />
        </>
    )
}

export default FormBillboard