import { Link } from 'react-router-dom';
import UtenteAuth from './UtenteAuth';
import { Moon, CircleQuestionMark, UserRound, House } from 'lucide-react';
import DarkMode from './DarkMode';



export default function Navbar({ searchText, setSearchText, username }) {
    return (
        <nav className="navbar shadow-sm navbar-expand-md navbar-light sticky-top py-3 ">
            <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        {/* TODO: change logo */}
                        <House />
                    </Link>
                    <button
                        className="navbar-toggler ms-auto"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navmenu"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                <div className="collapse navbar-collapse" id="navmenu">                    
                        {/* ms is for margin start auto and in this example pushes the li elements to the right*/}
                        {/* TODO: remove ms-auto if you want to change columns */}
                        <ul className="navbar-nav d-flex">
                            {/* Search bar */}
                            <input
                                className="form-control mx-2 rounded-pill d-flex order-4 order-md-0 px-3"
                                type="search"
                                placeholder="Cerca eventi..."
                                aria-label="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <li className="nav-item dropdown order-1 order-md-0">
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
                                </ul>
                            </li>
                            <li className="nav-item order-1 order-md-0">
                                <Link to="/favorites" className="nav-link">
                                    <i>Salvati</i>
                                </Link>
                            </li>
                            {/* TODO: add multilanguage support */}
                            <li className="nav-item">
                                {/* TODO: add icon moon fill when in dark mode add darkmode*/}
                                <a href="#" className="nav-link">
                                    <DarkMode icon={<Moon />} />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#FAQ" className="nav-link">
                                    <CircleQuestionMark />
                                </a>
                            </li>
                            <li className='nav-item text-center pt-1' ><UtenteAuth /></li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <UserRound />
                                    {/*<i className="bi bi-person h3" />*/}
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

