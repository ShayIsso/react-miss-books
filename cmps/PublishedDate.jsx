export function PublishedDate({ publishedDate }) {
    const currYear = new Date().getFullYear()
    const diffYears = currYear - publishedDate
    return (
        <h3>
            Published At: {publishedDate} {diffYears > 10 && 'Vintage'} {diffYears === 0 && 'New'}
        </h3>
    )
}