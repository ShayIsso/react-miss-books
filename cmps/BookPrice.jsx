export function BookPrice({ price }) {
    const { amount, currencyCode } = price
    const priceClr = amount > 150 ? ' red' : amount < 20 ? ' green' : '';
    return (
        <h5 className={`book-price${priceClr}`}>
            Book Price: {amount} {currencyCode}
        </h5>
    )
}