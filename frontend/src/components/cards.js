

export default function Cards({ events }) {
  return (
    <section className="p-5">
      <div className="container">
        <div className="row text-center g-4">
          {events.map((event) => {
            const date = new Date(event.date);
            const formattedDate = date.toLocaleString('it-IT', {
              dateStyle: 'medium',
              timeStyle: 'short'
            });
            return (
              <div className="col-md" key={event.id}>
                <div className="card bg-dark text-light">
                  <div className="card-body text-center">
                    <div className="h1 mb-3">
                      <img
                        src={event.image}
                        className="d-block w-100"
                        alt={event.title}
                        style={{ height: 200, objectFit: "cover" }}
                      />
                    </div>
                    <div className="card-title mb-3">
                      <h3>{event.title}</h3>
                    </div>
                    <div className="card-subtitle mb-2">
                      <p>
                        {formattedDate} | {event.organizer}
                      </p>
                    </div>
                    <p className="card-text">{event.description}</p>
                    <a
                      href={`/events/${event.id}`}
                      className="btn btn-primary"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

