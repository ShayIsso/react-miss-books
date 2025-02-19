
import { utilService } from "../services/util.service.js"
const { useState, useEffect, useRef } = React

export function BookFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounced = useRef(utilService.debounce(onSetFilterBy,500))

    useEffect(() => {
        onSetFilterDebounced.current(filterByToEdit)
    }, [filterByToEdit])

    function onHandleChange(ev) {
        let { value, type, name: field } = ev.target
        // console.log('field:', field)

        if (type === 'number') value = +value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <div className="search-container">
                <div className="search-field">
                    <label htmlFor="txt">Title</label>
                    <input className="search-input" name="title" value={filterByToEdit.title || ''} onChange={onHandleChange} type="text" id="txt" placeholder="Enter book title..." />
                </div>
                <div className="search-field">
                    <label htmlFor="minPrice">Min Price</label>
                    <input className="search-input" name="minPrice" value={filterByToEdit.minPrice || ''} onChange={onHandleChange} type="number" id="minPrice" placeholder="Enter minimum price..." />
                </div>
            </div>
        </section>
    )
}