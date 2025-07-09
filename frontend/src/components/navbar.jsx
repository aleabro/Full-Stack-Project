import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

export default function Navbar({user, events, searchText, setSearchText}) {
    
const [accessibility, setAccessibility] = useState(false);

function toggleAccessibility() {
  setAccessibility(a => !a);
  document.body.classList.toggle("accessibility-mode");
}

    const handleLogoClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

      // Filtra solo eventi futuri
    const now = new Date();
    const futureEvents = events.filter(
      event => event.date && new Date(event.date) >= now
    );

        // Province e categorie solo con eventi futuri
       const uniqueProvinces = Array.from(
      new Set(futureEvents.map(event => event.provincia).filter(Boolean))
    );
    const uniqueCategories = Array.from(
      new Set(futureEvents.map(event => event.category).filter(Boolean))
    );

    return(
        <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top py-3">
        <div className="container">
            <Link to="/" className="navbar-brand" onClick={handleLogoClick}>
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



            {/* Dropdown Categorie */}
<li className="nav-item dropdown me-2">
  <a
    className="nav-link dropdown-toggle d-inline-flex align-items-center"
    href="#"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i className="bi bi-tags h3" />
    <span className="ms-2 user-name-navbar">Categorie</span>
  </a>
  <ul className="dropdown-menu">
    {uniqueCategories.length === 0 && (
      <li>
        <span className="dropdown-item text-muted">Nessuna categoria</span>
      </li>
    )}
    {uniqueCategories.sort().map((categoria) => (
      <li key={categoria}>
        <Link className="dropdown-item" to={`/categorie/${categoria}`}>
          {categoria}
        </Link>
      </li>
    ))}
  </ul>
</li>

                {/* Dropdown Località */}
           <li className="nav-item dropdown me-2">
  <a
    className="nav-link dropdown-toggle d-inline-flex align-items-center"
    href="#"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <i className="bi bi-geo-alt h3" />
    <span className="ms-2 user-name-navbar">Località</span>
  </a>
  <ul className="dropdown-menu">
    {uniqueProvinces.length === 0 && (
      <li>
        <span className="dropdown-item text-muted">Nessuna provincia</span>
      </li>
    )}
    {uniqueProvinces.sort().map((provincia) => (
      <li key={provincia}>
        <Link className="dropdown-item" to={`/province/${provincia}`}>
          {provincia}
        </Link>
      </li>
    ))}
  </ul>
</li>

                 {(!user || user.user_type === "regular") && (
                    <li className="nav-item">
                <Link to="/favorites" className="nav-link">
                    <i className="bi bi-heart h3 " />
                </Link>
                </li>
                    
                )}

                
                {/* TODO: add multilanguage support */}
                <li className="nav-item">
                {/* TODO: add icon moon fill when in dark mode add darkmode*/}
                <a  className="nav-link">
                    
                    <i className="bi bi-moon h3" />
                </a>
                </li>
                <li className="nav-item">
                <Link to="/#FAQ" className="nav-link">
  <i className="bi bi-question-lg h3" />
</Link>
                </li>

<li className="nav-item">
  <a
    href="#"
    className="nav-link"
    onClick={e => {
      e.preventDefault();
      toggleAccessibility();
    }}
    title="Accessibilità"
  >
    <i className="bi bi-universal-access h3" />
  </a>
</li>

                <li className="nav-item dropdown">
<a
  className="nav-link dropdown-toggle d-inline-flex align-items-center"
  href="#"
  role="button"
  data-bs-toggle="dropdown"
  aria-expanded="false"
>
  <i className="bi bi-person h3" />
{user && (
  <span className="ms-2 user-name-navbar">
    {user.user_type === "organization"
      ? user.organization_profile?.organization_name || user.username
      : user.username}
  </span>
)}
</a>
  <ul className="dropdown-menu">
 

                {!user && (
                    <li className="nav-item">
      <Link to="/login" className="dropdown-item">
        Login
      </Link>
    </li>
  )}

                   
                {user && user.user_type === "regular" && (
                <li>
                    <Link className="dropdown-item" to="/profile">
                        Your profile
                    </Link>
                </li>
                )}
                {user && user.user_type === "organization" && (
                    <li>
                        <Link className="dropdown-item" to="/organization/profile">
                            Your profile
                        </Link>
                    </li>
                    
                )}

                {user && user.user_type === "organization" && (
                    <li>
                        <Link className="dropdown-item" to="/dashboard">
                        Your Events
                        </Link>
                    </li>
                    
                )}

                {user && user.user_type === "regular" && (
                    <li>
                    <Link
                        className="dropdown-item"
                        to="/favorites"
                    >
                        Your Favorites
                    </Link>
                    </li>
                )}

                {user && (
                     <li>
                    <Link className="dropdown-item" to="/logout">
                        Logout
                    </Link>
                    </li>
                )}
                </ul>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
}