import { useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

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
                      <Link
                      to={`/events/${event.id}`}
                      >
                      <img
                        src={event.image}
                        className="d-block w-100"
                        alt={event.title}
                        style={{ height: 200, objectFit: "cover" }}
                      />
                      </Link>
                      
                    </div>
                    <div className="card-title mb-3">
                      <h3>{event.title}</h3>
                    </div>
                    <div className="card-subtitle mb-2">
                      <p>
                        {formattedDate} | {event.organizer.username}
                      </p>
                    </div>
                    <p className="card-text">{event.description}</p>
                    <Link
                      to={`/events/${event.id}`}
                      className="btn btn-primary"
                    >
                      Read More
                    </Link>
                        <LikeButton eventId={event.id} initialIsFavorited={event.is_favorited} />

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
//TODO: implement LikeButton component correctly
export function LikeButton({ eventId, initialIsFavorited }) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async () => {
    if (loading) return; // evita doppio click
    setLoading(true);
    try {
      const res = await api.post(`api/events/${eventId}/favorite/`);
      if (res.data.status === "favorited") {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`btn ${isFavorited ? 'btn-danger' : 'btn-outline-danger'}`}
      onClick={toggleFavorite}
      disabled={loading}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <i className={`bi ${isFavorited ? 'bi-heart-fill' : 'bi-heart'}`} />
      {loading && <span className="spinner-border spinner-border-sm ms-2" />}
    </button>
  );
}
