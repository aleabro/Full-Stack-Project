import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LikeButton } from "../components/Buttons";
import { EventCardGeneric2 } from "../components/cards";
import { EventDetailView2 } from "../components/cards";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/events/${id}/`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        console.error("Errore nel fetch dell'evento:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Caricamento evento...</div>;
  if (!event) return <div>Evento non trovato</div>;

  return (
    <EventDetailView2
      event={event}
      className="w-100"
      imageHeight="400px"
      fullWidthImage
    >
      <LikeButton eventId={event.id} initialIsFavorited={event.is_favorited} />
      <p>{event.description}</p>
    </EventDetailView2>

  );
}
