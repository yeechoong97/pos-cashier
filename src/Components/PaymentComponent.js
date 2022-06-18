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
        <p>Total Paid Amount</p>
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

export { OrderLabelDetails, OrderPayAmount, OrderPaymentMethod }