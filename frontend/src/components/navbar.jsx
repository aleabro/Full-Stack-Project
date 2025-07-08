import { Link } from 'react-router-dom';
import UtenteAuth from './UtenteAuth';
import { Moon, CircleQuestionMark, UserRound } from 'lucide-react';
import DarkMode from './DarkMode';



export default function Navbar({ searchText, setSearchText, username }) {
    console.log("Navbar montato");
    return (
        <nav className="navbar navbar-expand-md sticky-top py-3 ">
            <div className="container-fluid">
                <div className="navbar-left">
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
                </div>
                <div className="collapse navbar-collapse" id="navmenu">

                    <div className="navbar-right">
                        {/* ms is for margin start auto and in this example pushes the li elements to the right*/}
                        {/* TODO: remove ms-auto if you want to change columns */}
                        <ul className="navbar-nav ">
                            {/* Search bar */}
                            <input
                                className="search-input form-control me-2 rounded-pill"
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
                                    className="nav-link dropdown-toggle nav-localita"
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
                            <li className="nav-item nav-localita">
                                <Link to="/favorites" className="nav-link nav-localita">
                                    <i>Salvati</i>
                                </Link>
                            </li>
                            {/* TODO: add multilanguage support */}
                            <li className="nav-item">
                                {/* TODO: add icon moon fill when in dark mode add darkmode*/}
                                <a href="#" className="nav-link icon-button">
                                    <DarkMode icon={<Moon />} />
                                    {/* <i className="bi bi-moon h3 icon-button" /> */}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#FAQ" className="nav-link">
                                    <CircleQuestionMark />
                                    {/*<i className="bi bi-question-lg h3" />*/}
                                </a>
                            </li>
                            <li className='nome-utente' ><UtenteAuth /></li>
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

                                {username && (
                                    <li className="nav-item ms-3 text-white">
                                        <span className="navbar-text">Benvenuto, {username}</span>
                                    </li>
                                )}

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}