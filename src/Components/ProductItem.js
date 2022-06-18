import React from 'react'
import { addToCart } from '../redux/reducers/cartSlice';
import { useDispatch } from 'react-redux';

const ProductItem = ({ product }) => {
    const { description, price } = product;
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        const cartItem = { ...product, quantity: 1 };
        dispatch(addToCart(cartItem));
    }

    return (
        <div className="border-2 rounded-md p-5 flex-col flex items-center w-1/6 bg-slate-50 shadow-lg my-5 mx-16">
            <img src={`/images/${description}.png`} className='h-48 w-48 rounded-lg' alt="Product" />
            <div className='pt-4 font-bold font-sans text-lg leading-5 self-start'>
                {description}
            </div>
            <div className='pt-1 font-medium font-sans text-xl self-start text-red-400'>
                {`RM ${price}`}
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mt-4"
                onClick={() => handleAddToCart(product)}
            >Add to Cart</button>
        </div>
    )
}

export default ProductItem