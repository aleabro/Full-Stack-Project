export default function Carousel({ events }) {
  const validEvents = events.filter(e => e && e.id && e.image);
  console.log("Valid Events:", validEvents); // DEBUG: puoi rimuovere se vuoi

  return (
    <div
      id="carouselExample"
      className="carousel slide mb-4"
      data-bs-ride={validEvents.length > 1 ? "carousel" : undefined}
      data-bs-interval={validEvents.length > 1 ? 4000 : undefined}
    >
      <div className="carousel-inner">
        {validEvents.length > 0 ? (
          validEvents.map((event, index) => (
            <div
              key={event.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              style={{
                height: 500,
                maxHeight: 500,
                overflow: "hidden",
                backgroundColor: "#000", // Previene vuoti durante animazioni
              }}
            >
              <a href={`/events/${event.id}`}>
                <img
                  src={event.image}
                  className="d-block w-100 mx-auto"
                  alt={event.title}
                  style={{
                    height: 500,
                    objectFit: "cover",
                    transition: "opacity 0.5s ease-in-out",
                  }}
                />
              </a>
            </div>
          ))
        ) : (
          <div
            className="carousel-item active"
            style={{
              height: 500,
              overflow: "hidden",
              backgroundColor: "#000",
            }}
          >
            <img
              src="/static/homepage/images/default.jpg"
              className="d-block w-100 mx-auto"
              alt="Default"
              style={{ height: 500, objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
              <h5>Nessun evento disponibile</h5>
              <p>Rimani aggiornato, nuovi eventi in arrivo!</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls e Indicators solo se più di 1 evento */}
      {validEvents.length > 1 && (
        <>
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
            {validEvents.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
