import React, { useState } from 'react'
import { Modal, Snackbar, Alert, CircularProgress } from '@mui/material'
import { computeCartTotal } from '../calculation';
import { OrderLabelDetails, OrderPayAmount, OrderPaymentMethod } from './PaymentComponent';
import { useDispatch, useSelector } from 'react-redux'
import { resetCart, getCartItems } from '../redux/reducers/cartSlice';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp, getDoc, updateDoc } from '@firebase/firestore'
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const ModalPayment = ({ open, items, setOpen }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector(getCartItems);
    const { total, tax, serviceCharge, } = computeCartTotal(items);
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

    const handleSubmit = async () => {
        setProcessLoading(true);

        const orderRef = await addDoc(collection(db, "orders"), {
            reference_no: uuidv4(),
            tax: tax,
            service_charge: serviceCharge,
            total_amount_cents: total,
            status: "Pending",
            timestamp: Timestamp.now(),
        });


        cartItems.forEach(async (item) => {
            await addDoc(collection(orderRef, "order_items"), {
                cost_per_item: item.price,
                product_name: item.description,
                quantity: item.quantity,
            });
        })

        const transactionRef = await addDoc(collection(orderRef, "transactions"), {
            paymentMethod: paymentMethod,
            status: change < 0 ? "Pending" : "Paid",
            paidAmount: paidAmount,
        });

        const transactionSnap = await getDoc(transactionRef);
        if (transactionSnap.exists()) {
            const { status } = transactionSnap.data();
            if (status === "Paid") {
                await updateDoc(orderRef, {
                    status: "Paid",
                })
            }
        }


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