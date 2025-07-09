import "../styles/LoadingIndicator.css"

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white shadow-lg rounded-4 p-5 text-center" style={{ maxWidth: 420 }}>
        <div className="loading-container" style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
            <div className="loader"></div>

            <p className="loading-text mt-3">Caricamento in corso...</p>
        </div>
      </div>
    </div>
  );
}
