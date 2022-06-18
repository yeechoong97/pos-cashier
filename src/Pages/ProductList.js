import React, { useEffect, useState } from 'react'
import ProductItem from '../Components/ProductItem'
import { productData } from '../data'
import { Link } from 'react-router-dom'
import { getCartItems } from '../redux/reducers/cartSlice'
import { useSelector } from 'react-redux'
import { Snackbar } from '@mui/material'
import { computeCartTotal } from '../calculation'

const ProductList = () => {

    const { cartItems } = useSelector(getCartItems);
    const [currentCart, setCurrentCart] = useState(cartItems);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);

    // Display the snackbar notification when cart is updated
    useEffect(() => {
        if (cartItems != currentCart) {
            setSnackBarOpen(true);
            setCurrentCart(cartItems);
            setTimeout(() => {
                setSnackBarOpen(false);
            }, 2000);
        }
        // Update the cart quantity in label
        const { itemQuantity } = computeCartTotal(cartItems);
        setCartQuantity(itemQuantity);
    }, [cartItems]);

    return (
        <div className='flex flex-col justify-center items-center h-full w-full relative'>
            <div className='h-20 p-5'>
                <p className="text-2xl font-semibold">Products</p>
            </div>
            <div className="flex justify-evenly p-5 w-full flex-wrap">
                {
                    productData.map((item, index) => (
                        <ProductItem product={item} key={index} />
                    ))
                }
            </div>
            <Link
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md mt-4 absolute top-4 right-32"
                to="cart"
            >
                <i className="fa-solid fa-basket-shopping mr-2"></i>
                <span>{`View Cart ${cartQuantity > 0 ? "(" + cartQuantity + ")" : ""}`}</span>
            </Link>
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={2000}
                message="Item added successfully."
            />
        </div>
    )
}

export default ProductList