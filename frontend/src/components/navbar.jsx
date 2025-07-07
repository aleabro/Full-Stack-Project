import { Link } from 'react-router-dom';

export default function Navbar({events, searchText, setSearchText}) {

    console.log("Events:", events);
    console.log("Province estratte:", events?.map(event => event.provincia));

        const uniqueProvinces = Array.from(
        new Set(events.map(event => event.provincia).filter(Boolean))
    );
    
    return(
        <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top py-3">
        <div className="container">
            <Link to="/" className="navbar-brand">
            {/* TODO: change logo */}
            <img
                src="./logo.png"
                alt="Logo"
                style={{ width: 30 }}
            />
            </Link>
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
            >
            <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navmenu">
            {/* ms is for margin start auto and in this example pushes the li elements to the right*/}
            {/* TODO: remove ms-auto if you want to change columns */}
            <ul className="navbar-nav ms-auto">
            {/* Search bar */}
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search events"
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

                <li className="nav-item dropdown">
                   
                </li>
                <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >
                        Località
                    </a>
                    <ul className="dropdown-menu">
                        {uniqueProvinces.length === 0 && (
                        <li>
                            <span className="dropdown-item text-muted">Nessuna provincia</span>
                        </li>
                        )}
                        {uniqueProvinces.map((provincia) => (
                            console.log("Provincia:", provincia),
                        <li key={provincia}>
                            <Link className="dropdown-item" to={`/province/${provincia}`}>
                                {provincia}
                            </Link>
                        </li>
                        ))}
                    </ul>
                </li>
                <li className="nav-item">
                <Link to="/favorites" className="nav-link">
                    <i className="bi bi-heart h3 " />
                </Link>
                </li>
                {/* TODO: add multilanguage support */}
                <li className="nav-item">
                {/* TODO: add icon moon fill when in dark mode add darkmode*/}
                <a href="#" className="nav-link">
                    
                    <i className="bi bi-moon h3" />
                </a>
                </li>
                <li className="nav-item">
                <a href="#FAQ" className="nav-link">                   
                    <i className="bi bi-question-lg h3" />
                </a>
                </li>
                <li className="nav-item dropdown">
                <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <i className="bi bi-person h3" />
                </a>
                <ul className="dropdown-menu">
                    <li>
                    <Link className="dropdown-item" to="/login">
                        Login
                    </Link>
                    </li>
                    <li>
                    <Link className="dropdown-item" to="/register-choice">
                        Sign Up
                    </Link>
                    </li>
                    <li>
                    <Link className="dropdown-item" to="/profile">
                        Your profile
                    </Link>
                    </li>
                    {/* Check if the user is an organization */}
                    <li>
                    <Link
                        className="dropdown-item"
                        to="/dashboard"
                    >
                        Your Events
                    </Link>
                    </li>
                    <li>
                    <Link
                        className="dropdown-item"
                        to="/favorites"
                    >
                        Your Favorites
                    </Link>
                    </li>
                    <li>
                    <hr className="dropdown-divider" />
                    </li>
                    <li>
                    <Link className="dropdown-item" to="/logout">
                        Logout
                    </Link>
                    </li>
                </ul>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
}