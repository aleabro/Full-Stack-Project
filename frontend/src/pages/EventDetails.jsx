import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LikeButton } from "../components/Buttons";
import { EventCardGeneric2 } from "../components/cards";
import { EventDetailView2 } from "../components/cards";
import LoadingIndicator from "../components/LoadingIndicator";
import MissingEvent from "../components/MissingEvent";

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

  if (loading) return <div><LoadingIndicator /></div>;
  if (!event) return <div><MissingEvent /></div>;


  /*return (
    <div
      className="d-flex justify-content-center align-items-center my-5 px-4"
      style={{
        minHeight: "80vh",
      }}
    >
      <div style={{ maxWidth: "900px", width: "100%" }}>
        <EventDetailView2
          event={event}
          className="w-100"
          imageHeight="400px"
          fullWidthImage={false}
        >
          <LikeButton eventId={event.id} initialIsFavorited={event.is_favorited} />
        </EventDetailView2>
      </div>
    </div>
  );*/
  return (
    <div>
      <div>
        <EventDetailView2
          event={event}
          className="w-100"
          imageHeight="400px"
          fullWidthImage={false}
        >
          <LikeButton eventId={event.id} initialIsFavorited={event.is_favorited} />
        </EventDetailView2>
      </div>
    </div>
  )
}



