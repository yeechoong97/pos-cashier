const computeCartTotal = (items) => {
    const subtotal = items.reduce((previousItem, currentItem) => previousItem + currentItem.price * currentItem.quantity, 0);
    const itemQuantity = items.reduce((previousItem, currentItem) => previousItem + currentItem.quantity, 0);
    const tax = subtotal * 0.06;
    const serviceCharge = subtotal * 0.1;
    const total = subtotal + tax + serviceCharge;

    return {
        subtotal: subtotal.toFixed(2),
        itemQuantity: itemQuantity,
        tax: tax.toFixed(2),
        serviceCharge: serviceCharge.toFixed(2),
        total: total.toFixed(2)
    }
}

export { computeCartTotal }