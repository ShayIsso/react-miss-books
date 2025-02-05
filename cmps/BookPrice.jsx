export function BookPrice({ price }) {
    const { amount, currencyCode } = price
    const priceClr = amount > 150 ? 'red' : amount < 20 ? 'green' : '';
    return (
        <h5 className='book-price'>Book Price:
            <span className={priceClr}> {amount} {currencyCode}</span>
        </h5>
    )
}