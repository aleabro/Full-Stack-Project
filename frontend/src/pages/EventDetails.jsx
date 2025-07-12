import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LikeButton } from "../components/Buttons";
import {Link} from "react-router-dom";

export default function EventDetails({ user }) {
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
    <div>
      <div>
        <EventDetailView
          event={event}
          className="w-100"
          imageHeight="400px"
          fullWidthImage={false}
        >
          {user && user.user_type === "regular" && (
            <LikeButton eventId={event.id} initialIsFavorited={event.is_favorited} />
          )}
        </EventDetailView>
      </div>
    </div>
  )
}

function EventDetailView({
  event,
  children,
  className = "",
  imageHeight = "300px",
  fullWidthImage = false,
}) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("it-IT", {
    dateStyle: "medium",
  });
  const timeFormatted = eventDate.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="container-fluid px-0 mb-5 px-5">
      <div className="container-fluid w-100 " style={{ width: "100%" }}>
        <hr className="border-t border-gray-300 opacity-100" />
        <h1 className="fs-1 text-center p-2 text-2xl font-bolder" style={{ fontSize: "48px" }}>{event.title}</h1>
        <h3 className="fs-4 fw-semibold subtitle text-center mb-2 p-2">{event.category}</h3>
        <hr className="border-t border-gray-300 opacity-100 shadow" />
      </div>

      <div className="container-fluid  mt-5 px-5">
        <div className="row align-items-stretch">
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            {event.image && (
              <div className="h-100">
                <img
                  src={event.image}
                  alt={event.title}
                  className="img-fluid w-100 h-100"
                  style={{ height : imageHeight }}
                />
              </div>
            )}
          </div>
          <div className="col-12 col-md-8 d-flex flex-column">
            <div className="row" >
              <div className="col-md-8">
                <div className="p-2 mt-5">
                  <h1 className="fs-4 fw-bold text-truncate mb-2" >{event.title}</h1>
                </div>
                <div className="d-flex align-items-center ps-2 mb-3">
                  
                  <Link
                    to={`/organization/${event.organizer?.id}`}
                    className="text-decoration-none"
                    style={{ 
                      color: 'inherit', 
                      transition: 'opacity 0.2s ease' 
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                    title={`Scopri di più su ${event.organizer?.organization_profile?.organization_name || event.organizer?.username}`}
                  >
                    {event.organizer?.organization_profile?.organization_name || event.organizer?.username}
                  </Link>
                </div>
              </div>
              <div className="col-md-4 align-self-center  " >
                <div className="d-flex justify-content-around">{children}</div>
              </div>
            </div>
            <hr className="border border-dark opacity-75 my-2 mx-2" />
            <div className="px-2 mb-3" style={{ fontSize: "24px" }} >
              <h2 className="fw-semibold">Informazioni Utili:</h2>
              <div className="row mt-2">
                <div className="col-12 mb-2">
                  <strong>Giorno:</strong> {formattedDate}
                </div>
                <div className="col-12 mb-2">
                  <strong>Ora:</strong> {timeFormatted}
                </div>
                <div className="col-12 mb-2">
                  <strong>Luogo:</strong> {event.location}
                </div>
                <div className="col-12 mb-2">
                  <strong>Prezzo:</strong>{" "}
                  {event.price != null && event.price > 0 ? `${event.price} €` : "Gratis"}
                </div>
              </div>
            </div>
            <hr className="border border-dark opacity-75 my-2 mx-2" />
            <div className="flex-fill p-2">
              <p className="card-text" style={{ fontSize: "24px" }} >{event.description}</p>
            </div>
          </div>
        </div>
      </div>



    </div>
  );

}

