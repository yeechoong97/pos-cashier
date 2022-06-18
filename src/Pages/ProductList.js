import React from 'react'
import ProductItem from '../Components/ProductItem'

const ProductList = () => {
    return (
        <div className='flex flex-col justify-center items-center h-full w-full'>
            <div className='h-20 p-5'>
                <p className="text-2xl font-semibold">Products</p>
            </div>
            <div className="flex justify-evenly p-5 w-full flex-wrap">
                <ProductItem />
            </div>
        </div>
    )
}

export default ProductList