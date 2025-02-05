export function IsOnSale({ isOnSale }) {
    return (
        isOnSale && <p style={{ color: 'red' }}>On Sale!</p>
    )
}