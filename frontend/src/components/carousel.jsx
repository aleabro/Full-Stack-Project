export default function Carousel({ events }) {
  const validEvents = events.filter(e => e && e.id && e.image);

  return (
    <div
      id="carouselExample"
      className="carousel carousel-fade mb-4 shadow-sm rounded"
      data-bs-ride={validEvents.length > 1 ? "carousel" : undefined}
      data-bs-interval={validEvents.length > 1 ? 8000 : undefined}
      style={{
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="carousel-inner">
        {validEvents.length > 0 ? (
          validEvents.map((event, index) => (
            <div
              key={event.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              style={{
                maxHeight: 300,
                overflow: "hidden",
              }}
            >
              <a href={`/events/${event.id}`}>
                <img
                  src={event.image}
                  className="d-block w-100 mx-auto"
                  alt={event.title}
                  style={{
                    height: 300,
                    objectFit: "cover",
                  }}
                />
              </a>
            </div>
          ))
        ) : (
          <div
            className="carousel-item active"
            style={{
              maxHeight: 300,
              overflow: "hidden",
            }}
          >
            <img
              src="default.jpg"
              className="d-block w-100 mx-auto"
              alt="Default"
              style={{
                height: 300,
                objectFit: "cover",
              }}
            />
            <div class="carousel-caption d-none d-md-block">
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
              style={{ filter: "invert(1)" }}
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
              style={{ filter: "invert(1)" }}
            />
            <span className="visually-hidden">Next</span>
          </button>
        </>
      )}
    </div>
  );
}
