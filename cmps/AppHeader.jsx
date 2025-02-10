export function AppHeader({ onSetPage }) {
    return (
        <header className="app-header main-layout">
            <section>
                <div className="logo">
                    <img src="../assets/img/girl_reading_img.png" alt="girl-reading" />
                    <h1>Miss Books</h1>
                </div>
                <nav className="app-nav">
                    <a onClick={() => onSetPage('home')} href="#">Home</a>
                    <a onClick={() => onSetPage('about')} href="#">About</a>
                    <a onClick={() => onSetPage('book')} href="#">Books</a>
                </nav>
            </section>
        </header>
    )
}