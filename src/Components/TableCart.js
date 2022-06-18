import React from 'react'
import QuantityAdjust from './QuantityAdjust';

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

const TableCart = ({ cartItems }) => {
    return (
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
    )
}

export default TableCart