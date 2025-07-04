
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/events/")
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Errore nel fetch degli eventi:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Caricamento eventi...</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Event List</h1>
      {events.length === 0 && <p>Nessun evento trovato.</p>}

      {events.map((event, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <img
            src={event.image}
            alt={event.title}
            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "4px" }}
          />
          <div>
            <h2 style={{ margin: "0 0 8px 0" }}>{event.title}</h2>
            <p style={{ margin: "0 0 8px 0" }}>{event.description}</p>
            <p style={{ margin: "0 0 4px 0" }}>
              <strong>Date:</strong> {event.date}
            </p>
            <p style={{ margin: "0 0 4px 0" }}>
              <strong>Location:</strong> {event.location}
            </p>
            {event.is_upcoming && (
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 8px",
                  backgroundColor: "#4caf50",
                  color: "white",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                Upcoming
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
