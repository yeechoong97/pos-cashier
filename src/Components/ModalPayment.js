import React, { useState } from 'react'
import { Modal, Snackbar, Alert, CircularProgress } from '@mui/material'
import { computeCartTotal } from '../calculation';
import { OrderLabelDetails, OrderPayAmount, OrderPaymentMethod } from './PaymentComponent';
import { useDispatch } from 'react-redux'
import { resetCart } from '../redux/reducers/cartSlice';
import { useNavigate } from 'react-router-dom'

const ModalPayment = ({ open, items, setOpen }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { total } = computeCartTotal(items);
    const [paymentMethod, setPaymentMethod] = useState("Online Banking");
    const [paidAmount, setPaidAmount] = useState(0);
    const [processPayment, setProcessPayment] = useState(false);
    const [processLoading, setProcessLoading] = useState(false);
    const [change, setChange] = useState(paidAmount - total);


    const updatePaymentDetail = (event) => {
        const result = event.target.value.replace(/[^0-9]/g, '');
        setPaidAmount(result);
        setChange(result - total);
    }

    const handleSubmit = () => {
        setProcessLoading(true);

        setTimeout(() => {
            setProcessPayment(true);
        }, 2000)


        setTimeout(() => {
            setOpen(false);
            setProcessPayment(false);
            setProcessLoading(false);
            dispatch(resetCart());
            navigate('/');
        }, 4000);
    }

    return (
        <Modal open={open} >
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
                            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-md mx-2"
                            disabled={processLoading}
                            onClick={() => setOpen(false)}>Close
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md mx-2 align-middle"
                            disabled={processLoading}
                            onClick={() => handleSubmit()}>{processLoading ? <CircularProgress size={16} color="inherit" /> : "Submit"}
                        </button>
                    </div>
                </div>

                <Snackbar open={processPayment} autoHideDuration={3000} >
                    {
                        change < 0
                            ? <Alert severity="warning" sx={{ width: '100%' }} variant="filled">Payment Unsuccessful due to Insuffienct Total Paid Amount </Alert>
                            : <Alert severity="success" sx={{ width: '100%' }} color="success" variant="filled"> Payment Successfully. </Alert>
                    }
                </Snackbar>
            </div>

        </Modal >
    )
}

export default ModalPayment