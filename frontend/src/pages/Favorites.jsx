import { useEffect, useState } from "react";
import api from "../api";
import { EventCardGeneric } from "../components/cards";
import { ReadMoreButton, LikeButton } from "../components/Buttons";

export default function Favorites({ searchText }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("api/events/my_favorites/")
      .then(res => {
        setFavorites(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching favorites:", err);
        setLoading(false);
      });
  }, []);

  const filteredFavorites = favorites.filter(e =>
    e.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (filteredFavorites.length === 0) {
    return (
    <div className="alert alert-info text-center mt-4">
      <h4>Nessun evento trovato</h4>
      <p>Non ci sono eventi tra i preferiti o corrispondenti ai criteri di ricerca.</p>
    </div>
    );
  }

  return (
    <div className="container">
      <h2>I tuoi eventi preferiti</h2>
      <div className="row">
        {filteredFavorites.map(event => (
          <div className="col-md-4" key={event.id}>
            <EventCardGeneric event={event}>
              <ReadMoreButton eventId={event.id} />
              <LikeButton eventId={event.id} initialIsFavorited={true} />
            </EventCardGeneric>
          </div>
        ))}
      </div>
    </div>
  );
}
