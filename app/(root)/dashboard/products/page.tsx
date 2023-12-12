

import React, { useState } from 'react'
import Sider from '../UIcompnents/Sider'
import ForumProduct from './UIproductscomponents/FormProduct'
import TableData from './UIproductscomponents/TableData'

const ProductPage = () => {

    return (
        <main>

            <div className={`overflow-hidden h-[80%] `}>
                <div className={`relative w-full  transition-all duration-700    `}>
                    <h1 className='text-4xl tracking-wide font-light drop-shadow-md m-6'>Products</h1>
                    <hr className='w-1/2 mx-auto' />

                    <ForumProduct />
                    <br />

                </div>

            </div>
        </main>
    )
}

export default ProductPage