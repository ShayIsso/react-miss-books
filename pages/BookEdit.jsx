import { AddGoogleBook } from "../cmps/AddGoogleBook.jsx"
import { bookService } from "../services/book.service.js"


const { useState, useEffect } = React

const { useParams, useNavigate } = ReactRouterDOM


export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

    const { bookId } = useParams()
    const navigate = useNavigate()


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
    }


    function onSaveBook(ev) {
        ev.preventDefault()
        
        bookService.save(bookToEdit)
            .then(navigate('/book'))
            .catch(err => console.log('err:', err))
    }

    const { title, authors, listPrice, description, pageCount } = bookToEdit

    return (
        <section className="book-edit">

            <h1>{bookId ? 'Book Edit' : 'Book Add'}</h1>

            {!bookId && <AddGoogleBook />}

            <form onSubmit={onSaveBook}>

            <label className='bold-txt' htmlFor="title">Title: </label>
            <input onChange={handleChange} value={title} id='title' type="text" name='title' />

            <label className='bold-txt' htmlFor="authors">Authors: </label>
            <input onChange={handleChange} value={authors} id='authors' type="text" name='authors' />

            <label className='bold-txt' htmlFor="description">Description: </label>
            <input onChange={handleChange} value={description} id='description' type="text" name='description' />

            <label className='bold-txt' htmlFor="pages">Number of pages: </label>
            <input onChange={handleChange} value={pageCount || ''} id='pages' type="number" name='pageCount' />

            <label className='bold-txt' htmlFor="price">Price: </label>
            <input onChange={handleChangeListPrice} value={listPrice.amount} id='price' type="number" name='amount' />

            <label className='bold-txt' htmlFor="isOnSale">On Sale: </label>
            <input onChange={handleChangeListPrice} checked={listPrice.isOnSale} id='isOnSale' type="checkbox" name='isOnSale' />

                <button>Save</button>
            </form>
        </section>
    )
}