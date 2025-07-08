import { Link } from "react-router-dom";
import api from "../api";
import { useState } from "react";
import { useEffect } from "react";

export function ReadMoreButton({ eventId }) {
  return (
    <Link to={`/events/${eventId}`} className="btn btn-primary">
      Read More
    </Link>
  );
}

function isUserLoggedIn() {
  return !!localStorage.getItem('access');
}

export function LikeButton({ eventId, initialIsFavorited }) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);


   // Aggiorna lo stato del cuore al mount
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
    if (!isUserLoggedIn()) {
      setShowToast(true);
      //setTimeout(() => setShowToast(false), 3000); // Nascondi toast dopo 3s
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const res = await api.post(`api/events/${eventId}/favorite/`);
      setIsFavorited(res.data.status === "favorited");
    } catch (err) {
      console.error("Error toggling favorite:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className={`btn ${isFavorited ? 'btn-danger' : 'btn-outline-danger'}`}
        onClick={toggleFavorite}
        disabled={loading}
        title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <i className={`bi ${isFavorited ? 'bi-heart-fill' : 'bi-heart'}`} />
        {loading && <span className="spinner-border spinner-border-sm ms-2" />}
      </button>
      {showToast && (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#888888",
          color: "white",
          padding: 24,
          borderRadius: 8,
          zIndex: 9999,
          minWidth: 300,
          textAlign: "center",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)"
        }}
        >
          Ehi, per salvare gli eventi devi accedere al tuo account
          se non ne hai uno clicca il pulsante registrati
        <br />
        <button
          onClick={() => setShowToast(false)}
          style={{
            marginTop: 16,
            background: "white",
            color: "red",
            border: "none",
            borderRadius: 4,
            padding: "4px 12px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          X
        </button>
      </div>
      )}
    </>
  );
}

export function LikeButton3({ eventId, initialIsFavorited }) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFavoriteStatus() {
      try {
        const res = await api.get(`api/events/${eventId}/is_favorited/`);
        setIsFavorited(res.data.is_favorited);
      } catch (err) {
        setIsFavorited(initialIsFavorited);
      }
    }
    fetchFavoriteStatus();
    // eslint-disable-next-line
  }, [eventId]);

  const toggleFavorite = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await api.post(`api/events/${eventId}/favorite/`);
      setIsFavorited(res.data.status === "favorited");
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


//TODO: Fix the button fill style when the event is favorited and the page is refreshed
export function LikeButton1({ eventId, initialIsFavorited }) {
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
