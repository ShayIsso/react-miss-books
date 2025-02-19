export function BookPreview({ book }) {
    const { amount, currencyCode } = book.listPrice
    
    return (
        <section className="book-preview">
            <h4>{book.title}</h4>
            <img src={book.thumbnail} alt={book.title} />
            <h4>{amount} {currencyCode}</h4>
        </section>
    )
}