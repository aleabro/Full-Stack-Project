import { Link } from "react-router-dom";
import { ReadMoreButton, LikeButton } from "./Buttons";
import { Calendar, User, MapPin, Clock, Users } from 'lucide-react';


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

        <div
            className={`card h-100 d-flex flex-column ${className}`}
            style={{ minHeight: "100%", width: "100%" }}
        >


            {event.image && (
                <Link to={`/events/${event.id}`}>
                    <img
                        src={event.image}
                        alt={event.title}
                        className="card-img-top"
                        style={{

                            height: "200px",
                            objectFit: "cover",
                            width: "100%",

                        }}
                    />
                </Link>
            )}
            <div className="card-body text-center d-flex flex-column justify-content-between">
                <h5 className="card-title text-2xl font-semibold mb-2">{event.title}</h5>

                <hr className="border-t border-gray-300 opacity-200 my-4 w-3/4 mx-auto" />

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

export default function CardsOld({ events }) {
    return (
        <section className="p-5">
            <div className="container">
                <div className="row g-4">
                    {events.map((event) => (

                        <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch" key={event.id}>
                            <EventCardGeneric event={event}>
                                <ReadMoreButton eventId={event.id} />

                            </EventCardGeneric>
                        </div>

                    ))}
                </div>
            </div>
        </section>
    );
}