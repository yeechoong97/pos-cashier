import React, { useState } from 'react';
import { getCartItems } from '../redux/reducers/cartSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import ModalPayment from './ModalPayment';
import TableCart from './TableCart';
import CalculationSection from './CalculationSection';



const CartItemList = () => {
    const { cartItems } = useSelector(getCartItems);
    const [modal, setModal] = useState(false);

    return (
        <div className='border-2 border-gray-400 w-1/2 h-full rounded-lg border-collapse p-3 my-5'>
            <TableCart cartItems={cartItems} />
            <CalculationSection items={cartItems} />
            <div className='flex flex-row justify-evenly items-center'>
                <Link className="bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-md mt-4" to="/">Cancel</Link>
                <button className={`${cartItems.length > 0 ? "bg-green-500 hover:bg-green-700" : "bg-gray-500"} text-white font-semibold py-3 px-8 rounded-md mt-4`} disabled={cartItems.length < 1} onClick={() => setModal(true)}>Check out</button>
            </div>
            <ModalPayment open={modal} items={cartItems} setOpen={setModal} />
        </div>
    )
}

export default CartItemList