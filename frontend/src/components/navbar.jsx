import { Link } from 'react-router-dom';

export default function Navbar({searchText, setSearchText}) {
    
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
                <li className="nav-item">
                <Link to="/" className="nav-link">
                    Home
                </Link>
                </li>
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
                    <li>
                    <a className="dropdown-item" href="#">
                        Città 1
                    </a>
                    </li>
                    <li>
                    <a className="dropdown-item" href="#">
                        Città 2
                    </a>
                    </li>
                    <li>
                    <hr className="dropdown-divider" />
                    </li>
                    <li>
                    <a className="dropdown-item" href="#">
                        Città n
                    </a>
                    </li>
                </ul>
                </li>
                <li className="nav-item">
                <a href="{% url 'events:favorite_list' %}" className="nav-link">
                    <i className="bi bi-heart h3 " />
                </a>
                </li>
                <li className="nav-item">
                <a href="#" className="nav-link">
                    {/* TODO: add language support */}
                    <img
                    src="https://img.icons8.com/?size=100&id=WmOfu4e7Rvp7&format=png&color=000000"
                    alt="Language"
                    style={{ height: 30 }}
                    />
                </a>
                </li>
                <li className="nav-item">
                {/* TODO: add icon moon fill when in dark mode add darkmode*/}
                <a href="#" className="nav-link">
                    {" "}
                    <i className="bi bi-moon h3" />{" "}
                </a>
                </li>
                <li className="nav-item">
                <a href="#FAQ" className="nav-link">
                    {" "}
                    <i className="bi bi-question-lg h3" />{" "}
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
                    <a className="dropdown-item" href="{% url 'accounts:profile' %}">
                        Your profile
                    </a>
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