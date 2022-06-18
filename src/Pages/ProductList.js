import React from 'react'
import ProductItem from '../Components/ProductItem'
import { productData } from '../data'
import { Link } from 'react-router-dom'

const ProductList = () => {
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
            <div class="bg-indigo-900 text-center py-4 lg:px-4">
                <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                    <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
                </div>
            </div>
            <Link
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md mt-4 absolute top-4 right-32"
                to="cart"
            >
                <i className="fa-solid fa-basket-shopping mr-2"></i>
                <span>View Cart</span>
            </Link>
        </div>
    )
}

export default ProductList