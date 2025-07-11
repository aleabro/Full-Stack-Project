import { Link } from "react-router-dom";
import "../styles/PartnerLogos.css";

export default function PartnerLogos({ organizations }) {
  if (!organizations || organizations.length === 0) {
    console.log("PartnerLogos: No organizations provided");
    return null;
  }
  
  console.log("PartnerLogos organizations:", organizations);

  // Controllo dettagliato delle organizzazioni
  organizations.forEach((org, index) => {
    console.log(`Organization ${index}:`, {
      id: org.id,
      username: org.username,
      organization_profile: org.organization_profile,
      logo: org.organization_profile?.logo
    });
  });

  // Calcolare quante volte duplicare per avere sempre abbastanza loghi
  const minLogos = 20; // Numero minimo di loghi per riempire lo schermo
  const duplications = Math.max(2, Math.ceil(minLogos / organizations.length));
  
  // Creare array con sufficienti duplicazioni per l'animazione continua
  const duplicatedOrganizations = [];
  for (let i = 0; i < duplications; i++) {
    duplicatedOrganizations.push(...organizations);
  }

  return (
    <section className="partner-logos-section">
      <div className="container partner-logos-container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-4">I nostri partner</h2>
            <p className="partner-logos-subtitle">
              Collaboriamo con le migliori organizzazioni per offrirti eventi straordinari
            </p>
          </div>
        </div>
        
        <div className="partner-logos-scroll-container">
          <div className="partner-logos-track">
            {duplicatedOrganizations.map((org, idx) => {
              const logoPath = org.organization_profile?.logo;
              console.log(`Organization ${org.id} logo path:`, logoPath);
              
              const logoUrl = logoPath
                ? (logoPath.startsWith("http")
                    ? logoPath
                    : `http://localhost:8000${logoPath}`)
                : `https://via.placeholder.com/120x60/28a745/ffffff?text=${encodeURIComponent(orgName.substring(0, 10))}`;
              
              console.log(`Organization ${org.id} final logo URL:`, logoUrl);
              const orgName = org.organization_profile?.organization_name || org.username;
            
              
              return (
                <Link
                  key={`${org.id}-${idx}`}
                  to={`/organization/${org.id}`}
                  className="partner-logo-link"
                  title={`Scopri di più su ${orgName}`}
                  onClick={() => console.log(`Clicked organization: ID=${org.id}, Name=${orgName}`)}
                >
                  <img
                    src={logoUrl}
                    alt={`Logo di ${orgName}`}
                    className="partner-logo"
                    loading="lazy"
                    onError={(e) => {
                      console.error(`Failed to load logo for organization ${org.id}:`, logoUrl);
                      e.target.src = "https://via.placeholder.com/120x60/dc3545/ffffff?text=ERROR";
                    }}
                    onLoad={() => console.log(`Successfully loaded logo for organization ${org.id}`)}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}