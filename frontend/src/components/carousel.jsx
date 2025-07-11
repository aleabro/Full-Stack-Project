import "../styles/Carousel.css";

export default function Carousel({ events }) {
  const validEvents = events.filter(e => e && e.id && e.image);

  return (
    <div
      id="carouselExample"
      className="carousel carousel-fade mb-4 shadow-sm rounded custom-carousel contain-mode"
      data-bs-ride={validEvents.length > 1 ? "carousel" : undefined}
      data-bs-interval={validEvents.length > 1 ? 8000 : undefined}
    >
      <div className="carousel-inner">
        {validEvents.length > 0 ? (
          validEvents.map((event, index) => (
            <div
              key={event.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <a href={`/events/${event.id}`}>
                <img
                  src={event.image}
                  alt={event.title}
                />
              </a>
            </div>
          ))
        ) : (
          <div className="carousel-item active">
            <img
              src="default.jpg"
              alt="Default"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Nessun evento</h5>
              <p>Nuovi eventi in arrivo torna presto!</p>
            </div>
          </div>
        )}
      </div>

      
      {validEvents.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            />
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
}
