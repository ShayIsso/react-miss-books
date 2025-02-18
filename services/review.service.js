import { bookService } from './book.service.js'
import { utilService } from './util.service.js'

export const reviewService = {
    saveReview,
    removeReview,
    getEmptyReview
}

window.bs = bookService

function saveReview(bookId, reviewToSave) {
    return bookService.get(bookId)
        .then(book => {
            const review = _createReview(reviewToSave)
            book.reviews.unshift(review)
            return bookService.save(book).then(() => review)
        })
}

function removeReview(bookId, reviewId) {
    return bookService.get(bookId)
        .then(book => {
            const newReviews = book.reviews.filter((review) => review.id !== reviewId)
            book.reviews = newReviews
            return bookService.save(book)
        })
}

function getEmptyReview() {
    return {
        fullName: 'new name',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
        selected: 0,
    }
}

// ~~~~~~~~~~~~~~~~LOCAL FUNCTIONS~~~~~~~~~~~~~~~~~~~

function _createReview(reviewToSave) {
    return {
        id: utilService.makeId(),
        ...reviewToSave,
    }
}
