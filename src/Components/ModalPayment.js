import React, { useState } from 'react'
import { Modal } from '@mui/material'
import { computeCartTotal } from '../calculation';

// For Label Purpose
const OrderLabelDetails = ({ title, amount }) => (
    <div className='w-full flex justify-between font-semibold'>
        <p>{title}</p>
        <p>RM {amount}</p>
    </div>
)

// Input Payment Amount
const OrderPayAmount = ({ paidAmount, setPaidAmount }) => (
    <div className='w-full flex justify-between font-semibold'>
        <p>Total</p>
        <div>
            <span>RM</span>
            <input type='text' className='shadow appearance-none border rounded text-right py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2' value={`${paidAmount > 0 ? paidAmount : ""}`} onChange={setPaidAmount} placeholder="Enter Amount" />
        </div>
    </div>
)

// Select Payment Method
const OrderPaymentMethod = ({ paymentMethod, setPaymentMethod }) => (
    <div className='w-full flex justify-between font-semibold'>
        <p>Payment Method</p>
        <select className='shadow border rounded text-right py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2' value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
            <option>Online Banking</option>
            <option>Credit Card / Debit Card</option>
            <option>E-Wallet</option>
        </select>
    </div>
)

const ModalPayment = ({ open, items, setOpen }) => {

    const { total } = computeCartTotal(items);
    const [paymentMethod, setPaymentMethod] = useState("Online Banking");
    const [paidAmount, setPaidAmount] = useState(0);
    const [change, setChange] = useState(paidAmount - total);

    const updatePaymentDetail = (event) => {
        const result = event.target.value.replace(/[^0-9]/g, '');
        setPaidAmount(result);
        setChange(result - total);
    }

    return (
        <Modal
            open={open}
        >
            <div className='h-full w-full flex justify-center items-center'>
                <div className='w-1/2 h-1/2 bg-white rounded-md flex flex-col items-center py-8 px-10 justify-around relative'>
                    <div className='w-full p-3 top-0 bg-slate-300 rounded-sm text-center font-semibold'>
                        Order Details
                    </div>
                    <OrderPayAmount paidAmount={paidAmount} setPaidAmount={updatePaymentDetail} />
                    <OrderLabelDetails title="Total" amount={total} />
                    <OrderPaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                    <OrderLabelDetails title="Change" amount={change.toFixed(2)} />

                    <div className='w-full flex flew-row justify-end items-center'>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-md mx-2" onClick={() => setOpen(false)}>Close
                        </button>
                        <button
                            className={`${change < 0 ? "bg-gray-500" : "bg-green-500 hover:bg-green-700"} text-white font-semibold py-3 px-4 rounded-md mx-2`} disabled={change < 0}>Submit
                        </button>
                    </div>
                </div>
            </div>
        </Modal >
    )
}

export default ModalPayment