const { NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-header main-layout">
            <section>
                <div className="logo">
                    <img src="../assets/img/girl_reading_img.png" alt="girl-reading" />
                    <h1>Miss Books</h1>
                </div>
                <nav className="app-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/book">Books</NavLink>
                </nav>
            </section>
        </header>
    )
}