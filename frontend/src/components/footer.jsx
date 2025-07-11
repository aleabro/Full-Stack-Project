import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer p-5 position-relative  ">
      <div className="container">
        <div className="row justify-content-center text-center">
          {/* Social & Logo */}
          <div className="col-md-4 mb-4">
            <div className="mb-3">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <i className="bi bi-facebook fs-4" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <i className="bi bi-instagram fs-4" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <i className="bi bi-twitter fs-4" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <i className="bi bi-linkedin fs-4" />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="bi bi-youtube fs-4" />
              </a>
            </div>
            <h4 className="fw-bold mb-1">WeLoveEvents Website</h4>
            <p className="small ">Scopri, partecipa e vivi i migliori eventi della tua città!</p>
          </div>
          {/* Link utili */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">Supporto</h6>
            <ul className="list-unstyled">
              <li><a href="/#FAQ" className="text-white-50 text-decoration-none">FAQ</a></li>
              <li><a href="mailto:info@weloveevents.com" className="text-white-50 text-decoration-none">Contattaci</a></li>
              <li><Link to="/privacy-policy" className="text-white-50 text-decoration-none">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <div className="mt-3">
              <h6 className="fw-bold mb-1">Contatti</h6>
              <p className="mb-0 small">
                <i className="bi bi-envelope me-2"></i>info@weloveevents.com<br />
                <i className="bi bi-geo-alt me-2"></i>Via Branze, 42 - Brescia
              </p>
            </div>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="d-flex flex-column align-items-center">
          <p className="mb-2 small text-center">&copy; 2025 WeLoveEvents Website. Tutti i diritti riservati.</p>
          <a
            href="#"
            className="text-white"
            onClick={e => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <i className="bi bi-arrow-up-circle-fill fs-3" title="Torna su" />
          </a>
        </div>
      </div>
    </footer>
  );
}