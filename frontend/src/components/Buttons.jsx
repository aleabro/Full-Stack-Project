import { Link } from "react-router-dom";
import api from "../api";
import { useState } from "react";

export function ReadMoreButton({ eventId }) {
  return (
    <Link to={`/events/${eventId}`} className="btn btn-primary">
      Read More
    </Link>
 );
}

//TODO: Fix the button fill style when the event is favorited and the page is refreshed
export function LikeButton({ eventId, initialIsFavorited }) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [loading, setLoading] = useState(false);

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
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
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
