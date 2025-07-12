import { useState } from "react";
import axios from "axios";
import Cards from "./cards";

export default function CardsWithPastEvents({ events, user }) {
  const [pastEvents, setPastEvents] = useState([]);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadPastEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/events/');
      const allEvents = response.data;
      const now = new Date();
      const pastEventsList = allEvents.filter(event => new Date(event.date) < now);
      setPastEvents(pastEventsList);
      setShowPastEvents(true);
    } catch (error) {
      console.error('Errore nel caricamento degli eventi passati:', error);
    } finally {
      setLoading(false);
    }
  };

  const now = new Date();
  const futureEvents = events.filter(event => new Date(event.date) >= now);

  return (
    <section className="p-5">
      <div className="container">
        {/* Eventi futuri */}
        <h2 className="text-center mb-4">Eventi Futuri</h2>
        <Cards events={futureEvents} user={user} />

        {/* Bottone per eventi passati */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            {!showPastEvents ? (
              <button
                className="btn btn-outline-primary btn-lg"
                onClick={loadPastEvents}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Caricamento...
                  </>
                ) : (
                  "Visualizza Eventi Passati"
                )}
              </button>
            ) : (
              <button
                className="btn btn-outline-secondary btn-lg"
                onClick={() => setShowPastEvents(false)}
              >
                Nascondi Eventi Passati
              </button>
            )}
          </div>
        </div>

        {/* Eventi passati */}
        {showPastEvents && (
          <>
            <div className="row mt-4">
              <div className="col-12">
                <hr className="my-4" />
                <h3 className="text-center text-muted mb-4">Eventi Passati</h3>
              </div>
            </div>
            {pastEvents.length > 0 ? (
              <Cards events={pastEvents} user={user} />
            ) : (
              <div className="row">
                <div className="col-12 text-center">
                  <p className="text-muted">Nessun evento passato trovato</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
