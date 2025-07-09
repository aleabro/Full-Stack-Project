import React, { useEffect, useState } from "react";
import api from "../api";
import {EventCardGeneric} from "../components/cards";
import { EditButton, DeleteButton } from "../components/Buttons";

export default function Dashboard({ searchText, events, setEvents}) {
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); 
  const [editEvent, setEditEvent] = useState(null); // evento in modifica
  const [provinceChoices, setProvinceChoices] = useState([]);
  const [categoryChoices, setCategoryChoices] = useState([]);

  useEffect(() => {
    fetchEvents();
    api.get("/api/choices/").then(res => {
      console.log("Province and categories fetched:", res.data);
      setProvinceChoices(res.data.province || []);
      setCategoryChoices(res.data.categorie || []);
    });
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

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-50">
        <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
        <span className="ms-3">Caricamento eventi...</span>
      </div>
    );
  }


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

      {showForm && (
        <EventForm event={editEvent} onClose={handleFormClose} provinceChoices={provinceChoices} categoryChoices={categoryChoices}/>
      )}
      
      <div className="row">
        {filteredEvents.map(event => (
          <div className="col-md-4" key={event.id}>
            <EventCardGeneric event={event}>
              <EditButton onEdit={() => handleEdit(event)} />
              <DeleteButton onDelete={() => handleDelete(event.id)} />
            </EventCardGeneric>
          </div>
        ))}
      </div>
    </div>
  );
}


function EventForm({ event, onClose, provinceChoices, categoryChoices }) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date ? event.date.slice(0, 16) : "",
    location: event?.location || "",
    provincia: event?.provincia || "",
    category: event?.category || "",
    price: event?.price || "",
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

  function getNowLocalISO() {
  const now = new Date();
  now.setSeconds(0, 0); // azzera i secondi e millisecondi
  const tzOffset = -now.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => String(Math.floor(Math.abs(n))).padStart(2, '0');
  return now.getFullYear() +
    '-' + pad(now.getMonth() + 1) +
    '-' + pad(now.getDate()) +
    'T' + pad(now.getHours()) +
    ':' + pad(now.getMinutes());
}

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
              min={getNowLocalISO()}
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
         <div className="mb-3">
            <label className="form-label">Provincia</label>
            <select
              name="provincia"
              className="form-control"
              value={formData.provincia}
              onChange={handleChange}
              required
            >
              <option value="">Seleziona provincia</option>
              {provinceChoices.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Categoria</label>
            <select
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Seleziona categoria</option>
              {categoryChoices.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
  </select>
</div>
   <div className="mb-3">
    <label className="form-label">Prezzo</label>
    <input
      type="number"
      name="price"
      className="form-control"
      value={formData.price}
      onChange={handleChange}
      min="0"
      step="0.01"
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