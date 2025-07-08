
import { Link } from "react-router-dom";
import { ReadMoreButton, LikeButton } from "./Buttons";
import { Calendar, User, MapPin, Clock, Users } from 'lucide-react';

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
  const dateFormatted = eventDate.toLocaleDateString("it-IT", {
    dateStyle: "medium",
  });
  const timeFormatted = eventDate.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex flex-row bg-white rounded-2xl shadow-md overflow-hidden max-w-4xl mx-auto ${className}`}>
      {/* Immagine a sinistra */}
      <div className="w-1/3 min-w-[200px] max-w-[300px] h-auto flex-shrink-0">
        {event.image && (
          <Link to={`/events/${event.id}`}>
            <img
              src={event.image}
              alt={event.title}
              className="object-cover w-full"
              style={{
                height: imageHeight,
                objectFit: "cover",
                width: fullWidthImage ? "100%" : undefined,
              }}
            />
          </Link>
        )}
      </div>
      {/* Info a destra */}
      <div className="w-2/3 max-w-[500px] p-6 flex flex-col justify-center overflow-hidden">
        <h2 className="text-2xl font-semibold mb-2 truncate">{event.title}</h2>
        <hr className="border-t border-gray-300 opacity-40 my-4 w-3/4 mx-auto md:mx-0" />
        <div className="space-y-3 text-lg text-gray-700">
          <p className="flex items-center gap-2 justify-center md:justify-start">
            <Users size={20} className="text-blue-500" />
            <span className="truncate">{event.organizer?.username}</span>
          </p>
          <p className="flex items-center gap-2 justify-center md:justify-start">
            <MapPin size={20} className="text-rose-500" />
            <span className="truncate">{event.location}</span>
          </p>
          <p className="flex items-center gap-2 justify-center md:justify-start">
            <Calendar size={20} className="text-green-500" />
            {dateFormatted}
          </p>
          <p className="flex items-center gap-2 justify-center md:justify-start">
            <Clock size={20} className="text-yellow-500" />
            {timeFormatted}
          </p>
          {/* Descrizione troncata se troppo lunga */}
          <p className="mt-2 text-base text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
            {event.description && event.description.length > 150
              ? event.description.slice(0, 150) + "..."
              : event.description}
          </p>
        </div>
        {/* Pulsanti o children */}
        <div className="mt-6 flex justify-center md:justify-start gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export function EventDetailView({
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
    <div className={`flex flex-row bg-white rounded-2xl shadow-md overflow-hidden max-w-4xl mx-auto ${className}`}>
      <div className="w-1/3 min-w-[200px] max-w-[300px] h-auto">
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
      </div>
      {/* Dati evento */}
      <div className="w-2/3 p-6 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>

        <hr className="border-t border-gray-300 opacity-40 my-4 w-3/4 mx-auto md:mx-0" />

        <div className="space-y-3 text-lg text-gray-700">
          <p className="flex items-center gap-2 justify-center md:justify-start">
            <Users size={20} className="text-blue-500" />
            {event.organizer?.username}
          </p>

          <p className="flex items-center gap-2 justify-center md:justify-start">
            <MapPin size={20} className="text-rose-500" />
            {event.location}
          </p>

          <p className="flex items-center gap-2 justify-center md:justify-start">
            <Calendar size={20} className="text-green-500" />
            {dateFormatted}
          </p>

          <p className="flex items-center gap-2 justify-center md:justify-start">
            <Clock size={20} className="text-yellow-500" />
            {timeFormatted}
          </p>
        </div>

        {/* Pulsanti o children */}
        <div className="mt-6 flex justify-center md:justify-start gap-4">
          {children}
        </div>

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
        <h5 className="card-title text-2xl font-semibold mb-2">{event.title}</h5>

        <hr className="border-t border-gray-300 opacity-100 my-4 w-3/4 mx-auto" />

        <div className="space-y-2 text-lg text-gray-700">
          <p className="flex justify-center items-center gap-2"><Users size={20} className="text-blue-500" /> {event.organizer?.username}</p>
          <p className="flex justify-center items-center gap-2"><MapPin size={20} className="text-rose-500" /> {event.location}</p>
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
        {<p className="card-text">{event.description}</p>}
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

            <div className="col-md-4 d-flex align-items-stretch" key={event.id}>
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