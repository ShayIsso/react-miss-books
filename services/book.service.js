import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
}


function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(bookId) {
    if (bookId) {
        return storageService.put(BOOK_KEY, bookId)
    } else {
        return storageService.post(BOOK_KEY, bookId)
    }
}

function getEmptyBook(title = '', listPrice = {}) {
    return { title, listPrice }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('metus hendrerit', {amount: 109, currencyCode: 'EUR', isOnSale: false}),
            _createBook('don quixote', {amount: 122, currencyCode: 'EUR', isOnSale: false}),
            _createBook('war and peace', {amount: 48, currencyCode: 'EUR', isOnSale: true})
        ]
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, listPrice) {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    return book
}
