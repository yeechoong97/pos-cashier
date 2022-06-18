import { updateCart } from '../redux/reducers/cartSlice';
import { useDispatch } from 'react-redux';

// Adjust the quantity of an item in the cart
const QuantityAdjust = ({ item }) => {

    const dispatch = useDispatch();

    // Update the item quantity
    const handleUpdateItemQuantity = (quantity) => {
        dispatch(updateCart({ ...item, update: quantity }));
    }

    return (
        <div className='flex flex-row justify-evenly items-center'>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-7 h-7'
                onClick={() => handleUpdateItemQuantity(-1)}
            >
                <i className="fa-solid fa-minus"></i>
            </button>
            <span>{item.quantity}</span>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-7 h-7 '
                onClick={() => handleUpdateItemQuantity(1)}
            >
                <i className="fa-solid fa-plus"></i>
            </button>
        </div >
    )
}

export default QuantityAdjust