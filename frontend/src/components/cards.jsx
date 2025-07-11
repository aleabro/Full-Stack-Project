
import { Link } from "react-router-dom";
import { ReadMoreButton, LikeButton } from "./Buttons";
import { Calendar, User, MapPin, Clock, Users, Circle } from 'lucide-react';

export function EventCardGeneric2({
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
    <div className={`card h-100 mb-3 ${className}`}>
      {event.image && (
        <Link to={`/events/${event.id}`}>
          <img
            src={event.image}
            alt={event.title}
            className="card-img-top"
            style={{
              height: imageHeight,
              objectFit: "cover",
              width: fullWidthImage ? "100%" : undefined,
            }}
          />
        </Link>
      )}
      <div className="card-body text-center">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-subtitle text-muted">
          {dateFormatted} | {event.organizer?.username}
        </p>
        {/* <p className="card-text">{event.description}</p> */}
        <p className="card-text">
          {event.description.length > 120
            ? event.description.slice(0, 120) + "..."
            : event.description}
        </p>
        <div className="d-flex justify-content-around">{children}</div>
      </div>
    </div>
  );
}

export function EventDetailView2({
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
        <h3 className="fs-4 fw-semibold subtitle text-center mb-2 p-2">categoria</h3>
        <hr className="border-t border-gray-300 opacity-100 shadow" />
      </div>

      <div className="container-fluid  mt-5 px-5">
        <div className="row align-items-stretch">
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            {event.image && (
              <Link to={`/events/${event.id}`} className="d-block h-100">
                <img
                  src={event.image}
                  alt={event.title}
                  className="img-fluid w-100 h-100 object-fit-cover"
                  style={{ height: imageHeight }}
                />
              </Link>
            )}
          </div>
          <div className="col-12 col-md-8 d-flex flex-column">
            <div className="row" >
              <div className="col-md-8">
                <div className="p-2 mt-5">
                  <h1 className="fs-4 fw-bold text-truncate mb-2" >{event.title}</h1>
                </div>
                <div className="d-flex align-items-center ps-2 mb-3">
                  <Users size={20} className="text-primary me-2" />
                  <a
                    href={`/organizzazioni/${event.organizer?.id}`}
                    className="text-decoration-none text-body"
                  >
                    {event.organizer?.username}
                  </a>
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
                  <strong>Luogo:</strong> PROVINCIA  | {event.location}
                </div>
                <div className="col-12 mb-2">
                  {/* TODO: aggiungere il prezzo */}
                  <strong>Prezzo:</strong> {event.price}
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



export function EventDetailView21({
  event,
  children,
  className = "",
  imageHeight = "300px",
  fullWidthImage = false,
}) {
  const eventDate = new Date(event.date);
  const dateFormatted = eventDate.toLocaleDateString("it-IT", {
    dateStyle: "medium",
  });
  const timeFormatted = eventDate.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className={`card flex flex-row border rounded-xl overflow-hidden shadow-md ${className}`}>
      {event.image && (
        <Link to={`/events/${event.id}`} className="w-2/5 min-w-[200px] max-w-[300px]">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover"
            style={{
              height: imageHeight,
              objectFit: "cover",
              width: fullWidthImage ? "100%" : undefined,
            }}
          />
        </Link>
      )}

      <div
        className="w-3/5 p-4 flex flex-col justify-between"
        style={{ height: imageHeight }}
      >
        <div>
          <h2 className="text-2xl font-semibold truncate mb-1">{event.title}</h2>
          <p className="cards-subtitle flex items-center gap-2 mt-0">
            <Users size={20} className="text-blue-500" />
            <a
              href={`/organizzazioni/${event.organizer?.id}`}
              className="truncate text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
            >
              {event.organizer?.username}
            </a>
          </p>

          {/* Info evento */}
          <div className="my-4">
            <hr className="border-t border-gray-300 opacity-100 my-4 w-3/4 mx-auto" />
            <div className="flex justify-between items-center text-gray-700 text-sm py-2">
              <div className="flex items-center gap-4 whitespace-nowrap">
                <Calendar size={16} className="text-green-500" />
                <span>{dateFormatted}</span>
                <Clock size={16} className="text-yellow-500 ml-4" />
                <span>{timeFormatted}</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <MapPin size={16} className="text-rose-500" />
                <span className="truncate max-w-[200px] text-right">
                  {event.location}
                </span>
              </div>
            </div>
            <hr className="border-t border-gray-300 opacity-100 my-4 w-3/4 mx-auto" />
          </div>
        </div>

        {/* Descrizione scrollabile */}
        <div className="flex-1 overflow-auto">
          <div className="overflow-auto pr-2 max-h-full relative">
            <p className="card-text">{event.description}</p>
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent"></div>
          </div>
        </div>


        <div className="d-flex justify-content-around">{children}</div>
      </div>

    </div>
  );


}



export function EventCardGeneric({
  event,
  children,
  className = "",
  imageHeight = "200px",
  fullWidthImage = false,
}) {
  const dateFormatted = new Date(event.date).toLocaleString("it-IT", {
    dateStyle: "medium",
    //timeStyle: "short",
  });
  const timeFormatted = new Date(event.date).toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`card h-100 mb-3 ${className}`}>
      {event.image && (
        <Link to={`/events/${event.id}`}>
          <img
            src={event.image}
            alt={event.title}
            className="card-img-top"
            style={{
              height: imageHeight,
              objectFit: "cover",
              width: fullWidthImage ? "100%" : undefined,
            }}
          />
        </Link>
      )}
      <div className="card-body text-center">
        <h5 className="card-title text-2xl font-semibold mb-3" style={{ height: "40px" }}>{event.title}</h5>

        <hr className="border-t border-gray-300 opacity-100  w-3/4 mx-1" />

        <div className="space-y-2 text-lg text-gray-700">
          <p className="flex justify-center items-center gap-2"><Users size={20} className="text-blue-500" /> {event.organizer?.username}       <Circle size={20} /> categoria</p>
          <p className="flex justify-center items-center gap-2"><MapPin size={20} className="text-rose-500" /> provincia     {event.location}</p>
          <p className="flex justify-center items-center gap-2"><Calendar size={20} /> {dateFormatted}</p>
          <p className="flex justify-center items-center gap-2"><Clock size={20} /> {timeFormatted}</p>
          {/* <p className="card-text">{event.description}</p> */}
        </div>
        <div className="d-flex justify-content-around">{children}</div>
      </div>
    </div>
  );
}

export function EventCardSpec({
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
    <div className={`card h-100 mb-3 ${className}`}>
      {event.image && (
        <Link to={`/events/${event.id}`}>
          <img
            src={event.image}
            alt={event.title}
            className="card-img-top"
            style={{
              height: imageHeight,
              objectFit: "cover",
              width: fullWidthImage ? "100%" : undefined,
            }}
          />
        </Link>
      )}
      <div className="card-body text-center">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-subtitle text-muted">
          {dateFormatted} | {event.organizer?.username}
        </p>
        <p className="card-text">{event.description}</p>
        <div className="d-flex justify-content-around">{children}</div>
      </div>
    </div>
  );
}

export default function Cards({ events }) {
  return (
    <section className="p-5">
      <div className="container">
        <div className="row text-center g-4">
          {events.map((event) => (

            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch" key={event.id}>
              <EventCardGeneric event={event}>
                <ReadMoreButton eventId={event.id} />
                <LikeButton eventId={event.id} initialIsFavorited={event.is_favorited} />
              </EventCardGeneric>
            </div>

          ))}
        </div>
      </div>
    </section>
  );
}
export function CardsSpec({ events }) {
  return (
    <section className="p-5">
      <div className="container">
        <div className="row text-center g-4">
          {events.map((event) => (
            <div className="col-md" key={event.id}>
              <EventCardGeneric event={event}>
                <ReadMoreButton eventId={event.id} />
                <LikeButton eventId={event.id} initialIsFavorited={event.is_favorited} />
              </EventCardGeneric>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}