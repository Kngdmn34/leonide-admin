'use client'

import React, { useState } from 'react'
import Sider from '../UIcompnents/Sider'
import FormBillboard from './UIbillboardcomponents/FormBillboard'




const ProductPage = () => {


    return (
        <main>

            <div className={`overflow-hidden `}>
                <div className={`relative w-full transition-all duration-700 `}>
                    <h1 className='text-4xl tracking-wide font-light drop-shadow-md m-6'>Billboards</h1>
                    <hr className='w-1/2 mx-auto' />

                    <FormBillboard />
                    <br />

                </div>

            </div>
        </main>
    )
}

export default ProductPage