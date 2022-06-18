import React from 'react'

const QuantityAdjust = () => (
    <div className='flex flex-row justify-evenly items-center'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-7 h-7'>
            <i className="fa-solid fa-minus"></i>
        </button>
        <span>2</span>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-7 h-7 '>
            <i className="fa-solid fa-plus"></i>
        </button>
    </div >
)

const TableItem = () => (
    <tr>
        <td className='py-3'>The Sliding Mr. Bones (Next Stop, Pottersville)asdasdas asdas d</td>
        <td className='py-3'>Malcolm Lockyer</td>
        <td className='py-3'>
            <QuantityAdjust />
        </td>
        <td className='py-3'>1961</td>
    </tr>
)

const CalculationItemSection = ({ title, amount, divider }) => (
    <div className={`flex flex-row justify-between px-16 my-2 font-semibold w-full ${divider ? "border-b-2 border-gray-400" : ""}`}>
        <div>{title}</div>
        <div className={`${divider ? "py-2" : ""} `}>{amount}</div>
    </div>
)

const CalculationSection = () => (
    <div className='flex flex-col justify-center items-center my-5'>
        <CalculationItemSection title="Subtotal" amount="RM6.00" />
        <CalculationItemSection title="No. of items" amount="3" />
        <CalculationItemSection title="Tax" amount="6%" />
        <CalculationItemSection title="Service Charge" amount="-" divider />
        <CalculationItemSection title="Total" amount="RM 6.36" />
    </div>
)


const CartItemList = () => {
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
                    <TableItem />
                    <TableItem />
                    <TableItem />
                    <TableItem />
                    <TableItem />
                    <TableItem />
                    <TableItem />
                    <TableItem />
                </tbody>
            </table>
            <CalculationSection />
            <div className='flex flex-row justify-evenly items-center'>
                <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-md mt-4">Cancel</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md mt-4">Check out</button>
            </div>
        </div>

    )
}

export default CartItemList