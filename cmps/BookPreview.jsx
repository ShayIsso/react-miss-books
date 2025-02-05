
export function BookPreview({ book }) {
    const { amount, currencyCode } = book.listPrice
    const bookNumber =  book.thumbnail.split('/').pop().split('.')[0] 
    
    return (
        <section className="book-preview">
            <h4>{book.title}</h4>
            <img src={`../assets/img/BooksImages/${bookNumber}.jpg`} alt={book.title}/>
            <h4>{amount} {currencyCode}</h4>
        </section>
    )
}