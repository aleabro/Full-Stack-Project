import { useState } from "react";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";

export default function Navbar({ user, events, searchText, setSearchText }) {
  const [accessibility, setAccessibility] = useState(false);

  const toggleAccessibility = () => {
    setAccessibility((a) => !a);
    document.body.classList.toggle("accessibility-mode");
  };

  const now = new Date();
  const futureEvents = events.filter(
    (event) => event.date && new Date(event.date) >= now
  );
  const uniqueProvinces = [...new Set(futureEvents.map(e => e.provincia).filter(Boolean))];
  const uniqueCategories = [...new Set(futureEvents.map(e => e.category).filter(Boolean))];

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top py-3" >
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src="/logo.png" alt="Logo" style={{ width: 30 }} />
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
          <form className="d-flex my-2 my-md-0 flex-grow-1 position-relative me-md-3">
            <i
              className="bi bi-search position-absolute text-muted"
              style={{ left: "10px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              className="form-control ps-4"
              placeholder="Cerca eventi"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </form>

          <ul className="navbar-nav ms-md-auto align-items-md-center">
            {/* Categorie */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Categorie
              </a>
              <ul className="dropdown-menu">
                {uniqueCategories.length === 0
                  ? <li><span className="dropdown-item text-muted">Nessuna</span></li>
                  : uniqueCategories.sort().map(cat => (
                      <li key={cat}><Link className="dropdown-item" to={`/categorie/${cat}`}>{cat}</Link></li>
                    ))}
              </ul>
            </li>

            {/* Località */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Città
              </a>
              <ul className="dropdown-menu">
                {uniqueProvinces.length === 0
                  ? <li><span className="dropdown-item text-muted">Nessuna</span></li>
                  : uniqueProvinces.sort().map(prov => (
                      <li key={prov}><Link className="dropdown-item" to={`/province/${prov}`}>{prov}</Link></li>
                    ))}
              </ul>
            </li>

            {/* Favorites (solo regular) */}
            {user?.user_type === "regular" && (
              <li className="nav-item">
                <Link to="/favorites" className="nav-link">
                  <i className="bi bi-heart h4"></i>
                </Link>
              </li>
            )}

            
            

            <li className="nav-item"><a className="nav-link" href=""><DarkMode /></a></li>


            <li className="nav-item"><Link to="/#FAQ" className="nav-link"><i className="bi bi-question-lg h4"></i></Link></li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); toggleAccessibility(); }}>
                <i className="bi bi-universal-access h4"></i>
              </a>
            </li>

            {/* User menu */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i className="bi bi-person h4"></i>
                {user && (
                  <span className="ms-1">
                    {user.user_type === "organization"
                      ? user.organization_profile?.organization_name || user.username
                      : user.username}
                  </span>
                )}
              </a>
              <ul className="dropdown-menu">
                {!user && (
                  <>
                    <li><Link to="/login" className="dropdown-item">Login</Link></li>
                    <li><Link to="/register-choice" className="dropdown-item">Signup</Link></li>
                  </>
                )}
                {user?.user_type === "regular" && (
                  <>
                    <li><Link className="dropdown-item" to="/profile">Your Profile</Link></li>
                    <li><Link className="dropdown-item" to="/favorites">Your Favorites</Link></li>
                  </>
                )}
                {user?.user_type === "organization" && (
                  <>
                    <li><Link className="dropdown-item" to="/organization/profile">Your Profile</Link></li>
                    <li><Link className="dropdown-item" to="/dashboard">Your Events</Link></li>
                  </>
                )}
                {user && (
                  <li><Link className="dropdown-item" to="/logout">Logout</Link></li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
