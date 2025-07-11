import { Link } from "react-router-dom";
import api from "../api";
import { useState } from "react";
import { useEffect } from "react";

export function ReadMoreButton({ eventId }) {
  return (
    <Link to={`/events/${eventId}`} className="btn btn-primary">
      Leggi di più
    </Link>
  );
}

export function LikeButton({ eventId, initialIsFavorited }) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    async function fetchFavoriteStatus() {
      try {
        const res = await api.get(`api/events/${eventId}/is_favorited/`);
        setIsFavorited(res.data.is_favorited);
      } catch (err) {
        setIsFavorited(initialIsFavorited); // fallback
      }
    }
    fetchFavoriteStatus();
    // eslint-disable-next-line
  }, [eventId]);


  const toggleFavorite = async () => {
    if (loading) return; // Prevent multiple clicks while loading
    setLoading(true);
    try {
      const res = await api.post(`api/events/${eventId}/favorite/`);
      if (res.data.status === "favorited") {
        setIsFavorited(true);
      } else {
        setIsFavorited(false);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`btn ${isFavorited ? 'btn-danger' : 'btn-outline-danger'}`}
      onClick={toggleFavorite}
      disabled={loading}
      title={isFavorited ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
    >
      <i className={`bi ${isFavorited ? 'bi-heart-fill' : 'bi-heart'}`} />
      {loading && <span className="spinner-border spinner-border-sm ms-2" />}
    </button>
  );
}




export function EditButton({ onEdit }) {
  return (
    <button onClick={onEdit} className="btn btn-warning btn-sm">
      Modifica
    </button>
  );
}

export function DeleteButton({ onDelete }) {
  return (
    <button onClick={onDelete} className="btn btn-danger btn-sm">
      Elimina
    </button>
  );
}

export function SaveButton({ onSave }) {
  return (
    <button onClick={onSave} className="btn btn-success btn-sm">
      Salva
    </button>
  );
}


export function CancelButton({ onCancel }) {
  return (
    <button onClick={onCancel} className="btn btn-secondary btn-sm me-2">
      Annulla
    </button>
  );
}
