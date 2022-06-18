import React from 'react'

const ProductItem = () => {
    return (
        <div className="border-2 rounded-md p-5 flex-col flex items-center w-1/6 bg-slate-50 shadow-lg my-5 mx-16">
            <img src="https://www.biggerbolderbaking.com/wp-content/uploads/2017/02/Digestive-Biscuits-copy-1-500x500.jpg" className='h-48 w-48 rounded-lg' alt="Product" />
            <div className='pt-4 font-bold font-sans text-lg leading-5 self-start'>
                Biscuit Sedap Sedap Biscuit Se Biscuit Sedap Sedap
            </div>
            <div className='pt-1 font-medium font-sans text-xl self-start text-orange-500'>
                RM10
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md">Add to Cart</button>
        </div>
    )
}

export default ProductItem