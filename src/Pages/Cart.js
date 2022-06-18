import React from 'react'
import CartItemList from '../Components/CartItemList'

const Cart = () => {
    return (
        <div className='flex flex-col justify-center items-center h-full w-full'>
            <div className='h-20 p-5'>
                <p className="text-2xl font-semibold">POS Cashier</p>
            </div>
            <CartItemList />
        </div>
    )
}

export default Cart