import { BookPrice } from "../cmps/BookPrice.jsx"
import { IsOnSale } from "../cmps/IsOnSale.jsx"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { PageCount } from "../cmps/PageCount.jsx"
import { PublishedDate } from "../cmps/PublishedDate.jsx"
import { bookService } from "../services/book.service.js"
import { AddReview } from "../cmps/AddReview.jsx";
import { ReviewList } from "../cmps/ReviewList.jsx";
import { reviewService } from "../services/review.service.js";

const { useState, useEffect } = React
const { useParams, Link } = ReactRouterDOM

export function BookDetails() {

    const { bookId } = useParams()
    const [book, setBook] = useState(null)
    const [isLoadingReview, setIsLoadingReview] = useState(false)
    const [isShowReviewModal, setIsShowReviewModal] = useState(false)

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

        function onToggleReviewModal() {
        setIsShowReviewModal((prevIsReviewModal) => !prevIsReviewModal)
    }

    function  onSaveReview(reviewToAdd) {
        setIsLoadingReview(true)
        console.log(book.id)
        reviewService.saveReview(book.id, reviewToAdd)
            .then((review => {
                setBook(prevBook => {
                    const reviews = [review, ...prevBook.reviews]
                    return { ...prevBook, reviews }
                })
            }))
            .catch(() => showErrorMsg(`Review to ${book.title} Failed!`))
            .finally(() => setIsLoadingReview(false))
    }

    function onRemoveReview(reviewId) {
        setIsLoadingReview(true)
        reviewService.removeReview(book.id, reviewId)
            .then(() => {
                setBook(prevBook => {
                    const filteredReviews = prevBook.reviews.filter(review => review.id !== reviewId)
                    return { ...prevBook, reviews: filteredReviews }
                })
            })
            .finally(() => setIsLoadingReview(false))
    }

    if (!book) return <div>Loading...</div>

    const { title, subtitle, categories, authors, publishedDate, description, thumbnail, pageCount, listPrice } = book

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
            <img src={book.thumbnail} alt={title} />
            <h2>{subtitle}</h2>
            <h3>Categories: {categories}</h3>
            <h4>Authors: {authors}</h4>
            <BookPrice price={listPrice} />
            <IsOnSale isOnSale={listPrice.isOnSale} />
            <PageCount pageCount={pageCount} />
            <PublishedDate publishedDate={publishedDate} />
            <LongTxt txt={description} length={100} />
            
            <hr className='brake-line' />

            <button onClick={onToggleReviewModal}>Add Review</button>
            {isShowReviewModal && (
                <AddReview
                    toggleReview={onToggleReviewModal}
                    onSaveReview={onSaveReview}
                />
            )}

            <div className='review-container'>
                {!isLoadingReview
                    ? <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />
                    : <div className="loader"></div>
                }
            </div>

            <button><Link to="/book">Back</Link></button>
        </section>
    )
}