import React, { useEffect, useState } from "react";
import api from "../api";
import {EventCardGeneric} from "../components/cards";
import { EditButton, DeleteButton } from "../components/Buttons";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // mostra/nascondi form
  const [editEvent, setEditEvent] = useState(null); // evento in modifica

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/api/events/my_events/");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo evento?")) return;
    try {
      await api.delete(`/api/events/${eventId}/`);
      setEvents(events.filter((e) => e.id !== eventId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (event) => {
    setEditEvent(event);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditEvent(null);
    fetchEvents(); // aggiorna lista
  };

  if (loading) return <p>Caricamento eventi...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>I tuoi eventi</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditEvent(null);
            setShowForm(true);
          }}
        >
          Crea evento
        </button>
      </div>

      <div className="row">
        {events.map((event) => (
          <div className="col-md-4" key={event.id}>
            <EventCardGeneric event={event}>
              <EditButton onEdit={() => handleEdit(event)} />
              <DeleteButton onDelete={() => handleDelete(event.id)} />
            </EventCardGeneric>
          </div>
        ))}
      </div>

      {showForm && (
        <EventForm event={editEvent} onClose={handleFormClose} />
      )}
    </div>
  );
}

function EventCard({ event, onEdit, onDelete }) {
  return (
    <div className="card mb-3">
      <img
        src={event.image || "https://via.placeholder.com/300x200"}
        className="card-img-top"
        alt={event.title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">
          <strong>Data:</strong> {new Date(event.date).toLocaleString()}
        </p>
        <div className="d-flex justify-content-between">
          <button onClick={onEdit} className="btn btn-warning btn-sm">
            Modifica
          </button>
          <button onClick={onDelete} className="btn btn-danger btn-sm">
            Elimina
          </button>
        </div>
      </div>
    </div>
  );
}

function EventForm({ event, onClose }) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date || "",
    location: event?.location || "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      if (event) {
        await api.put(`/api/events/${event.id}/`, data);
      } else {
        await api.post("/api/events/", data);
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert("Errore durante il salvataggio");
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h4>{event ? "Modifica Evento" : "Crea Evento"}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Titolo</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descrizione</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Data</label>
            <input
              type="datetime-local"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Luogo</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Immagine</label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              {event ? "Salva Modifiche" : "Crea"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Annulla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}