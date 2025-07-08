import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {LikeButton} from "../components/Buttons"; 
import { EventCardGeneric } from "../components/cards";

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

    if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-50">
        <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
        <span className="ms-3">Caricamento eventi...</span>
      </div>
    );
  }

  if (!event)  return (
    <div className="alert alert-info text-center mt-4">
      <h4>Nessun evento trovato</h4>
    </div>
    );

  return (
    <EventCardGeneric
  event={event}
  className="w-100"
  imageHeight="400px"
  fullWidthImage
>
  <LikeButton eventId={event.id} initialIsFavorited={event.is_favorited} />
</EventCardGeneric>

  );
}
