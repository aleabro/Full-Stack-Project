import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/cards";

export default function OrganizationPage() {
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

//TODO: fix the logo
  const now = new Date();
  const futureEvents = events.filter(ev => new Date(ev.date) > now);


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
  const logoUrl = logoPath
    ? (logoPath.startsWith("http")
        ? logoPath
        : `http://localhost:8000${logoPath}`)
    : "https://via.placeholder.com/100x100?text=Logo";

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
        />
        <div>
          <h2>{orgProfile.organization_name || organization.username}</h2>
          <div>Email: {organization.email}</div>
          {orgProfile.address && <div>Indirizzo: {orgProfile.address}</div>}
          {orgProfile.partita_iva && <div>Partita IVA: {orgProfile.partita_iva}</div>}
        </div>
      </div>
      <h4 className="mb-3">Eventi organizzati</h4>
      <Cards events={futureEvents} user={organization} />
    </div>
  );
}