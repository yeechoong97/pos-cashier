import React from 'react';
import { getCartItems } from '../redux/reducers/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart } from '../redux/reducers/cartSlice';
import { Link } from 'react-router-dom'

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
        <td className='py-3'>{item.price * item.quantity}</td>
    </tr>
)

// The calculation item component for each row
const CalculationItemSection = ({ title, amount, divider }) => (
    <div className={`flex flex-row justify-between px-16 my-2 font-semibold w-full ${divider ? "border-b-2 border-gray-400" : ""}`}>
        <div className={`${divider ? "pb-2" : ""} `}>{title}</div>
        <div className={`${divider ? "pb-2" : ""} `}>{amount}</div>
    </div>
)

// The bottom section component that displays the calculation of whole cart
const CalculationSection = ({ items }) => {

    const subtotal = items.reduce((previousItem, currentItem) => previousItem + currentItem.price * currentItem.quantity, 0);
    const itemQuantity = items.length;
    const tax = subtotal * 0.06;
    const serviceCharge = subtotal * 0.1;
    const total = subtotal + tax + serviceCharge;

    return (
        <div className='flex flex-col justify-center items-center my-5'>
            <CalculationItemSection title="Subtotal" amount={subtotal.toFixed(2)} />
            <CalculationItemSection title="No. of items" amount={itemQuantity} />
            <CalculationItemSection title="Tax" amount={tax.toFixed(2)} />
            <CalculationItemSection title="Service Charge" amount={serviceCharge.toFixed(2)} divider />
            <CalculationItemSection title="Total" amount={total.toFixed(2)} />
        </div>
    )
}


const CartItemList = () => {

    const { cartItems } = useSelector(getCartItems);
    console.log(cartItems.length)

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
                <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md mt-4">Check out</button>
            </div>
        </div>

    )
}

export default CartItemList