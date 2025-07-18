import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, events, searchText, setSearchText, toggleTheme, darkMode }) {
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
    <nav className="navbar navbar-expand-md sticky-top py-3" >
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
              style={{ left: "12px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Cerca eventi"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                borderRadius: "50px",
                border: "1px solid rgba(255,255,255,0.3)"
              }}
            />
          </form>

          <ul className="navbar-nav ms-md-auto align-items-center gap-2">
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

            {/* Dark Mode Toggle */}
            <li className="nav-item">
              <a onClick={toggleTheme} className="nav-link" title="Toggle dark mode">
                <i className={`bi ${darkMode ? "bi-sun" : "bi-moon"} h4`}></i>
              </a>
            </li>

            <li className="nav-item"><Link to="/#FAQ" className="nav-link"><i className="bi bi-question-lg h4"></i></Link></li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); toggleAccessibility(); }}>
                <i className="bi bi-universal-access h4"></i>
              </a>
            </li>

            {/* User menu */}
            <li className="nav-item dropdown d-flex align-items-center">
              <a className="nav-link dropdown-toggle d-flex align-items-center gap-1" href="#" role="button" data-bs-toggle="dropdown">
                <i className="bi bi-person h4 mb-0"></i>
                {user && (
                  <span style={{ whiteSpace: "nowrap" }}>
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
                    <li><Link to="/register-choice" className="dropdown-item">Registrati</Link></li>
                  </>
                )}
                {user?.user_type === "regular" && (
                  <>
                    <li><Link className="dropdown-item" to="/profile">Il tuo profilo</Link></li>
                    <li><Link className="dropdown-item" to="/favorites">I tuoi preferiti</Link></li>
                  </>
                )}
                {user?.user_type === "organization" && (
                  <>
                    <li><Link className="dropdown-item" to="/organization/profile">Il tuo profilo</Link></li>
                    <li><Link className="dropdown-item" to="/dashboard">I tuoi eventi</Link></li>
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
