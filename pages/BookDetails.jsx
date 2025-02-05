import { PageCount } from "../cmps/PageCount.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ onSetSelectedBookId, selectedBookId }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(selectedBookId)
            .then(book => setBook(book))
    }

    if (!book) return 'Loading...'

    const { title, subtitle, categories, authors, publishedDate, description, thumbnail, pageCount, listPrice } = book
    const { amount, currencyCode, isOnSale } = listPrice
    const bookNumber = thumbnail.split('/').pop().split('.')[0]


    return (
        <section className="car-details">
            <h1>Book Title: {title}</h1>
            <img src={`../assets/img/BooksImages/${bookNumber}.jpg`} alt={title} />
            <h2>{subtitle}</h2>
            <h3>Categories: {categories}</h3>
            <h4>Authors: {authors}</h4>
            <h5>Book Price: {amount} {currencyCode}</h5>
            {isOnSale && <p style={{ color: 'red' }}>On Sale!</p>}
            <PageCount pageCount={pageCount} />
            <h6>Published At: {publishedDate}</h6>
            <p>{description}</p>
            <button onClick={() => onSetSelectedBookId(null)}>Back</button>
        </section>
    )
}