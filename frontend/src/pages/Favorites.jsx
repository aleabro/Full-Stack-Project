import { useEffect, useState } from "react";
import api from "../api";

export default function Favorites() {
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

  if (loading) return <div>Loading...</div>;

  if (favorites.length === 0) {
    return <div>No favorite events yet.</div>;
  }

  return (
    <div className="container">
      <h2>Your Favorite Events</h2>
      <div className="row">
        {favorites.map(event => (
          <div className="col-md-4" key={event.id}>
            <div className="card">
              <img src={event.image} alt={event.title} />
              <div className="card-body">
                <h5>{event.title}</h5>
                <p>{event.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
