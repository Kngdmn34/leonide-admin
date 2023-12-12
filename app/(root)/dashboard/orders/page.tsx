

import React, { useState } from 'react';

import OrderDataTable from './UIcomponents/OrderDataTable';

const OrdersPage = () => {





  return (
    <main>

      <div className={`overflow-hidden h-[80%] `}>
        <div className={`relative w-full  transition-all duration-700 `}>
          <h1 className='text-4xl tracking-wide font-light drop-shadow-md m-6'>Orders</h1>
          <hr className='w-1/2 mx-auto' />


        </div>
        <OrderDataTable />
      </div>
    </main>
  )
}

export default OrdersPage