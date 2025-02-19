import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"


const { useState, useEffect } = React
const { Link } = ReactRouterDOM
const { useSearchParams } = ReactRouterDOM


export function BookIndex() {

    const [searchParams, setSearchParams] = useSearchParams()

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <Link to="/Book/edit">Add Book</Link>
            <BookList books={books} onRemoveBook={onRemoveBook} />
        </section>
    )
}