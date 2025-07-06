import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import {LikeButton} from "../components/cards"; 

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`api/events/${id}/`);
        setEvent(res.data);
      } catch (err) {
        console.error("Errore nel fetch dell'evento:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <div>Caricamento evento...</div>;
  if (!event) return <div>Evento non trovato</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="card-img-top"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h3 className="card-title">{event.title}</h3>
          <p className="card-text">{event.description}</p>
          <p>
            📍 <strong>Location:</strong> {event.location}
          </p>
          <p>
            📅 <strong>Data:</strong>{" "}
            {new Date(event.date).toLocaleString("it-IT")}
          </p>
          <p>
            👤 <strong>Organizzatore:</strong> {event.organizer?.username}
          </p>

          <LikeButton
            eventId={event.id}
            initialIsFavorited={event.is_favorited}
          />
        </div>
      </div>
    </div>
  );
}
