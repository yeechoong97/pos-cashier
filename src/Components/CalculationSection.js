import { computeCartTotal } from '../calculation';

// The calculation item component for each row
const CalculationItemSection = ({ title, amount, divider, total }) => (
    <div className={`flex flex-row justify-between px-16 my-2 font-semibold w-full ${divider ? "border-b-2 border-gray-400" : ""}`}>
        <div className={`${divider ? "pb-2" : ""} ${total ? "font-bold text-lg" : ""}`}>{title}</div>
        <div className={`${divider ? "pb-2" : ""}  ${total ? "font-bold text-lg" : ""}`}>{total ? `RM ${amount}` : amount}</div>
    </div>
)

// The bottom section component that displays the calculation of whole cart
const CalculationSection = ({ items }) => {

    const { subtotal, itemQuantity, tax, serviceCharge, total } = computeCartTotal(items);

    return (
        <div className='flex flex-col justify-center items-center my-5'>
            <CalculationItemSection title="Subtotal" amount={subtotal} />
            <CalculationItemSection title="No. of items" amount={itemQuantity} />
            <CalculationItemSection title="Tax" amount={tax} />
            <CalculationItemSection title="Service Charge" amount={serviceCharge} divider />
            <CalculationItemSection title="Total" amount={total} total />
        </div>
    )
}

export default CalculationSection;