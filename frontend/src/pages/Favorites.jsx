import { useEffect, useState } from "react";
import api from "../api";
import { EventCardGeneric } from "../components/cards";
import { ReadMoreButton, LikeButton } from "../components/Buttons";

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
