import { Link } from "react-router-dom";
import { ReadMoreButton, LikeButton } from "./Buttons";
import style from "../styles/Cards.module.css";

export function EventCardGeneric({
  event,
  children,
  className = "",
  imageHeight = "200px",
  fullWidthImage = false,
}) {
  const dateFormatted = new Date(event.date).toLocaleString("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div
      className={`card mb-3 h-100 d-flex flex-column ${style.myCard} ${className}`}
      style={{ minHeight: "400px", width: "320px", maxWidth: "350px" }}
    >
      {event.image && (
        <Link to={`/events/${event.id}`}>
          <img
            src={event.image}
            alt={event.title}
            className="card-img-top"
            style={{
              height: imageHeight,
              objectFit: "contain",
              borderRadius: "0.375rem 0.375rem 0 0",
              backgroundColor: "#f8f9fa"
            }}
          />
        </Link>
      )}
      <div className="card-body d-flex flex-column justify-content-between text-center">
        <div>
          <h5 className="card-title">{event.title}</h5>
          <p className="card-subtitle text-muted mb-2">
            {dateFormatted} | <Link 
              to={`/organization/${event.organizer?.id}`} 
              className="text-decoration-none text-muted"
              style={{ transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.target.style.color = '#6c757d'}
              onMouseLeave={(e) => e.target.style.color = ''}
              title={`Scopri di più su ${event.organizer?.organization_profile?.organization_name || event.organizer?.username}`}
            >
              {event.organizer?.organization_profile?.organization_name || event.organizer?.username}
            </Link>
          </p>
          <p className="mb-1">
            <strong>Luogo:</strong> {event.location || "N/D"}
          </p>
          <p className="mb-3">
            <strong>Prezzo:</strong>{" "}
            {event.price != null && event.price > 0 ? `${event.price} €` : "Gratis"}
          </p>
        </div>

        <div className="d-flex justify-content-around mt-auto">{children}</div>
      </div>
    </div>
  );
}


export default function Cards({ events, user }) {
  return (
    <div className={style.Cards}>
      <section className="p-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {events.map((event) => (
              <div className="col-auto d-flex justify-content-center" key={event.id}>
                <EventCardGeneric event={event}>
                  <ReadMoreButton eventId={event.id} />
                  {user && user.user_type === "regular" && (
                    <LikeButton
                      eventId={event.id}
                      initialIsFavorited={event.is_favorited}
                    />
                  )}
                </EventCardGeneric>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}