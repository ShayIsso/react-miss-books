import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"


const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => {
                setBooks(books)
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

    function onSetSelectedBookId(bookId) {
        setSelectedBookId(bookId)
    }

    if (!books) return 'Loading..'
    return (
        <section className="book-index">
            <h1>Book Index!</h1>

            {selectedBookId
                ? <BookDetails onSetSelectedBookId={onSetSelectedBookId} selectedBookId={selectedBookId} />
                : <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <BookList books={books} onRemoveBook={onRemoveBook} onSetSelectedBookId={onSetSelectedBookId} />
                </React.Fragment>
            }
        </section>
    )
}