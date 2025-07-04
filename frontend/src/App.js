
import './App.css';
import React, { useEffect, useState, Component } from 'react';

// Sample data for events - remove this when integrating with backend
const eventItems = [
  {
    title: 'Event 1',
    description: 'Description for Event 1',
    image: 'https://via.placeholder.com/150',
    date: '2023-10-01',
    location: 'Location 1',
    is_upcoming: true,
  },
  {
    title: 'Event 2',
    description: 'Description for Event 2',
    image: 'https://via.placeholder.com/150',
    date: '2023-10-02',
    location: 'Location 2',
    is_upcoming: false,
  },
];

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       viewCompleted: false,
//       events: eventItems, // Initialize with sample data
//     };
//   }
//   displayCompleted = (status) => {
//     if (status) {
//       return this.setState({viewCompleted: true});
//     }
//     return this.setState({viewCompleted: false});
//   }
//   renderTabList = () => {
//     return (
//       <div className="nav nav-tabs">
//       <span className={}
//       </div>
//     )
//   }
// }



function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/events/") // cambia questo URL con quello del tuo backend
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella risposta del server");
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
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
