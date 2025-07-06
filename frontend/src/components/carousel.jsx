export default function Carousel({ events }) {
    //TODO: fix animation add default image
  return (
    <div
      id="carouselExample" className="carousel slide mb-4" data-bs-ride="carousel" data-bs-interval={4000}
    >
      <div className="carousel-inner">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div
              key={event.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              style={{ maxHeight: 500, overflow: "hidden" }}
            >
              <a href={`/events/${event.id}`}>
                <img
                  src={event.image}
                  className="d-block w-100 mx-auto"
                  alt={event.title}
                  style={{ height: 500, objectFit: "cover" }}
                />
              </a>
            </div>
          ))
        ) : (
          <div
            className="carousel-item active"
            style={{ maxHeight: 500, overflow: "hidden" }}
          >
            <img
              src="/static/homepage/images/default.jpg"
              className="d-block w-100 mx-auto"
              alt="Default"
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
              <h5>Nessun evento disponibile</h5>
              <p>Rimani aggiornato, nuovi eventi in arrivo!</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>

      {/* Indicators */}
      <div className="carousel-indicators">
        {events.length > 0
          ? events.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Slide ${index + 1}`}
              />
            ))
          : null}
      </div>
    </div>
  );
}
