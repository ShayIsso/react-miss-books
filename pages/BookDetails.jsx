import { BookPrice } from "../cmps/BookPrice.jsx"
import { IsOnSale } from "../cmps/IsOnSale.jsx"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { PageCount } from "../cmps/PageCount.jsx"
import { PublishedDate } from "../cmps/PublishedDate.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useParams, Link } = ReactRouterDOM

export function BookDetails() {

    const { bookId } = useParams()
    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book:', err)
            })
    }

    if (!book) return <div>Loading...</div>

    const { title, subtitle, categories, authors, publishedDate, description, thumbnail, pageCount, listPrice } = book
    const bookNumber = thumbnail.split('/').pop().split('.')[0]

    return (
        <section className="book-details">
            <nav className='book-details-nav'>
                <Link to={`/book/${book.prevBookId}`}>
                    <button>{'<-'}</button>
                </Link>
                <Link to={`/book/${book.nextBookId}`}>
                    <button>{'->'}</button>
                </Link>
            </nav>
            <h1>{title}</h1>
            <img src={`../assets/img/BooksImages/${bookNumber}.jpg`} alt={title} />
            <h2>{subtitle}</h2>
            <h3>Categories: {categories}</h3>
            <h4>Authors: {authors}</h4>
            <BookPrice price={listPrice} />
            <IsOnSale isOnSale={listPrice.isOnSale} />
            <PageCount pageCount={pageCount} />
            <PublishedDate publishedDate={publishedDate} />
            <LongTxt txt={description} length={100} />
            <button><Link to="/book">Back</Link></button>
        </section>
    )
}