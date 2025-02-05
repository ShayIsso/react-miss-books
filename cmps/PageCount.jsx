export function PageCount({ pageCount }) {
    return (
        <div>
            {pageCount > 500 && <h3 style={{ color: 'red' }}>Serious Reading</h3>}
            {pageCount > 200 && pageCount <= 500 && <h3 style={{ color: 'blue' }}>Descent Reading</h3>}
            {pageCount < 100 && <h3 style={{ color: 'green' }}>Light Reading</h3>}
        </div>
    )
}