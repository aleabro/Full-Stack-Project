import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white shadow-lg rounded-4 p-5 text-center" style={{ maxWidth: 420 }}>
        <div className="mb-4">
          <i className="bi bi-emoji-frown text-danger" style={{ fontSize: 70 }}></i>
        </div>
        <h1 className="display-2 fw-bold text-danger mb-2">404</h1>
        <h2 className="mb-3 text-dark">Pagina non trovata</h2>
        <p className="lead text-muted mb-4">
          Oops! La pagina che cerchi non esiste o è stata rimossa.<br />
          Torna alla home per continuare la navigazione.
        </p>
        <Link to="/" className="btn btn-primary btn-lg shadow-sm px-4">
          <i className="bi bi-house-door-fill me-2"></i>
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}