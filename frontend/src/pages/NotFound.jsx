export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h1 className="display-1 text-danger mb-4">404</h1>
      <h2 className="mb-3">Pagina non trovata</h2>
      <p className="lead text-muted mb-4">La pagina che cerchi non esiste.</p>
      <a href="/" className="btn btn-primary">
        Torna alla Home
      </a>
    </div>
  );
}


