import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/cards";

export default function OrganizationPage() {
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [pastEvents, setPastEvents] = useState([]);
  const [showPastEvents, setShowPastEvents] = useState(false);

  const now = new Date();
  const futureEvents = events.filter(ev => new Date(ev.date) > now);
  const pastEventsList = events.filter(ev => new Date(ev.date) < now);

  const loadPastEvents = () => {
    setPastEvents(pastEventsList);
    setShowPastEvents(true);
  };


useEffect(() => {
  axios.get(`/api/users/${id}/`)
    .then(res => setOrganization(res.data))
    .catch(err => {
      setError("Organizzazione non trovata o errore di rete");
      console.error(err);
    });
  axios.get(`/api/events/?organization=${id}`)
    .then(res => setEvents(res.data))
    .catch(err => console.error(err));
}, [id]);

  if (error) return <div className="text-center my-5 text-danger">{error}</div>;
  if (!organization) return <div className="text-center my-5">Caricamento...</div>;

  const orgProfile = organization.organization_profile || {};
  const logoPath = orgProfile.logo;
  console.log("Organization profile:", orgProfile);
  console.log("Logo path:", logoPath);
  
  const logoUrl = logoPath
    ? (logoPath.startsWith("http")
        ? logoPath
        : `http://localhost:8000${logoPath}`)
    : `https://via.placeholder.com/100x100/28a745/ffffff?text=${encodeURIComponent((orgProfile.organization_name || organization.username).substring(0, 5))}`;
  
  console.log("Final logo URL:", logoUrl);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center mb-4 gap-4">
        <img
          src={logoUrl}
          alt={orgProfile.organization_name || organization.username}
          style={{
            height: 100,
            width: 100,
            objectFit: "contain",
            background: "#fff",
            borderRadius: 12,
            padding: 8,
            boxShadow: "0 1px 4px #0001"
          }}
          onError={(e) => {
            console.error(`Failed to load organization logo:`, logoUrl);
            e.target.src = "https://via.placeholder.com/100x100/dc3545/ffffff?text=ERROR";
          }}
          onLoad={() => console.log(`Successfully loaded organization logo`)}
        />
        <div>
          <h2>{orgProfile.organization_name || organization.username}</h2>
          <div>Email: {organization.email}</div>
          {orgProfile.address && <div>Indirizzo: {orgProfile.address}</div>}
          {orgProfile.partita_iva && <div>Partita IVA: {orgProfile.partita_iva}</div>}
        </div>
      </div>
      <h4 className="mb-3">Eventi organizzati</h4>
      {futureEvents.length > 0 ? (
        <Cards events={futureEvents} user={organization} />
      ) : (
        <div className="text-center py-5">
          <div className="alert alert-info">
            <h5>Nessun evento disponibile</h5>
            <p className="mb-0">Questa organizzazione non ha eventi futuri programmati.</p>
          </div>
        </div>
      )}
      
      {pastEventsList.length > 0 && (
        <div className="text-center mt-5">
          {!showPastEvents ? (
            <button 
              className="btn btn-outline-primary btn-lg"
              onClick={loadPastEvents}
            >
              Visualizza Eventi Passati di questa Organizzazione
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
      )}

      {showPastEvents && pastEvents.length > 0 && (
        <div className="mt-4">
          <hr className="my-4" />
          <h4 className="text-center text-muted mb-4">Eventi Passati</h4>
          <div style={{ opacity: 0.75 }}>
            <Cards events={pastEvents} user={organization} />
          </div>
        </div>
      )}
    </div>
  );
}