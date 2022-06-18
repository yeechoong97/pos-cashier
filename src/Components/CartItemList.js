import React, { useState } from 'react';
import { getCartItems } from '../redux/reducers/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart } from '../redux/reducers/cartSlice';
import { Link } from 'react-router-dom'
import ModalPayment from './ModalPayment';
import { computeCartTotal } from '../calculation';

// Adjust the quantity of an item in the cart
const QuantityAdjust = ({ item }) => {

    const dispatch = useDispatch();

    // Update the item quantity
    const handleUpdateItemQuantity = (quantity) => {
        dispatch(updateCart({ ...item, update: quantity }));
    }

    return (
        <div className='flex flex-row justify-evenly items-center'>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-7 h-7'
                onClick={() => handleUpdateItemQuantity(-1)}
            >
                <i className="fa-solid fa-minus"></i>
            </button>
            <span>{item.quantity}</span>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-7 h-7 '
                onClick={() => handleUpdateItemQuantity(1)}
            >
                <i className="fa-solid fa-plus"></i>
            </button>
        </div >
    )
}

// The table item component for each row
const TableItem = ({ item }) => (
    <tr>
        <td className='py-3'>{item.description}</td>
        <td className='py-3'>{item.price}</td>
        <td className='py-3'>
            <QuantityAdjust item={item} />
        </td>
        <td className='py-3'>{(item.price * item.quantity).toFixed(2)}</td>
    </tr>
)

// The calculation item component for each row
const CalculationItemSection = ({ title, amount, divider, total }) => (
    <div className={`flex flex-row justify-between px-16 my-2 font-semibold w-full ${divider ? "border-b-2 border-gray-400" : ""}`}>
        <div className={`${divider ? "pb-2" : ""} ${total ? "font-bold text-lg" : ""}`}>{title}</div>
        <div className={`${divider ? "pb-2" : ""}  ${total ? "font-bold text-lg" : ""}`}>{total ? `RM ${amount}` : amount}</div>
    </div>
)

// The bottom section component that displays the calculation of whole cart
const CalculationSection = ({ items }) => {

    const { subtotal, itemQuantity, tax, serviceCharge, total } = computeCartTotal(items);

    return (
        <div className='flex flex-col justify-center items-center my-5'>
            <CalculationItemSection title="Subtotal" amount={subtotal} />
            <CalculationItemSection title="No. of items" amount={itemQuantity} />
            <CalculationItemSection title="Tax" amount={tax} />
            <CalculationItemSection title="Service Charge" amount={serviceCharge} divider />
            <CalculationItemSection title="Total" amount={total} total />
        </div>
    )
}


const CartItemList = () => {
    const { cartItems } = useSelector(getCartItems);
    const [modal, setModal] = useState(false);

    return (
        <div className='border-2 border-gray-400 w-1/2 h-full rounded-lg border-collapse p-3 my-5'>
            <table className='table-fixed border-collapse h-full w-full text-center'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price (RM)</th>
                        <th>Quantity</th>
                        <th>Cost (RM)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartItems.length > 0 ?
                            // Display the items list if there are items in the cart
                            cartItems.map((item, index) => (<TableItem item={item} key={index} />)) :
                            // Hide the table if there are no items in the cart
                            <tr>
                                <td className='text-center py-10' colSpan={4}>Cart is empty</td>
                            </tr>
                    }
                </tbody>
            </table>
            {

                cartItems ?
                    // Display the calculation section if there are items in the cart
                    <CalculationSection items={cartItems} /> :
                    // Hide the calculation section if cart is empty
                    <></>
            }
            <div className='flex flex-row justify-evenly items-center'>
                <Link className="bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-md mt-4" to="/">Cancel</Link>
                <button className={`${cartItems.length > 0 ? "bg-green-500 hover:bg-green-700" : "bg-gray-500"} text-white font-semibold py-3 px-8 rounded-md mt-4`} disabled={cartItems.length < 1} onClick={() => setModal(true)}>Check out</button>
            </div>
            <ModalPayment open={modal} items={cartItems} setOpen={setModal} />
        </div>



    )
}

export default CartItemList