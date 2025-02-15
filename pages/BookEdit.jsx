import { bookService } from "../services/book.service.js"


const { useState, useEffect } = React

const { useParams, useNavigate } = ReactRouterDOM


export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getBook())

    const { bookId } = useParams()
    const navigate = useNavigate()

    console.log('bookId:', bookId)

    useEffect(() => {
        if (!bookId) return

        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, [field]: value }))
        console.log('book to edit', bookToEdit);

    }

    function handleChangeListPrice({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setBookToEdit(prevBookToEdit => ({
            ...prevBookToEdit,
            listPrice: {
                ...prevBookToEdit.listPrice,
                [field]: value
            }
        }))
        console.log('book to edit', bookToEdit);
    }


    function onSaveBook(ev) {
        ev.preventDefault()
        console.log('book to edit save', bookToEdit);

        bookService.save(bookToEdit)
            .then(savedBook => {
                console.log('savedbook:', savedBook)

                navigate('/book')
                // navigate(-1)
            })
            .catch(err => console.log('err:', err))
    }

    const { title, listPrice } = bookToEdit

    return (
        <section className="book-edit">

            <h1>{bookId ? 'Book Edit' : 'Book Add'}</h1>

            <form onSubmit={onSaveBook}>

                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={title} onChange={handleChange} name="title" />

                <label htmlFor="price">Price:</label>
                <input type="number" id="price" value={listPrice.amount || ''} onChange={handleChangeListPrice} name="amount" />

                <button>Save</button>
            </form>
        </section>
    )
}