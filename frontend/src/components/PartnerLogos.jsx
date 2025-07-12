import { Link } from "react-router-dom";
import "../styles/PartnerLogos.css";

export default function PartnerLogos({ organizations }) {
  if (!organizations || organizations.length === 0) {
    console.log("PartnerLogos: No organizations provided");
    return null;
  }

  console.log("PartnerLogos organizations:", organizations);

  const minLogos = 20;

  let logosToRender;
  // If the logos are less than or equal to 3, render them directly
  // Otherwise, repeat the logos to fill the minimum number
  // This ensures that the scrolling effect works smoothly
  if (organizations.length <= 3) {
    logosToRender = organizations;
  } else {
    logosToRender = Array.from({ length: minLogos }, (_, i) =>
      organizations[i % organizations.length]
    );
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

        {organizations.length <= 3 ? (
          <div className="d-flex justify-content-center gap-4 flex-wrap mt-4">
            {logosToRender.map((org, idx) => {
              const orgName =
                org.organization_profile?.organization_name || org.username;
              const logoPath = org.organization_profile?.logo;
              const logoUrl = logoPath
                ? logoPath.startsWith("http")
                  ? logoPath
                  : `http://localhost:8000${logoPath}`
                : `https://via.placeholder.com/120x60/28a745/ffffff?text=${encodeURIComponent(
                    orgName.substring(0, 10)
                  )}`;

              return (
                <Link
                  key={org.id}
                  to={`/organization/${org.id}`}
                  className="partner-logo-link"
                  title={`Scopri di più su ${orgName}`}
                >
                  <img
                    src={logoUrl}
                    alt={`Logo di ${orgName}`}
                    className="partner-logo"
                    loading="lazy"
                    style={{
                      height: 60,
                      width: 120,
                      objectFit: "contain",
                      background: "#fff",
                      borderRadius: 8,
                      padding: 6,
                      boxShadow: "0 1px 4px #0001",
                    }}
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="partner-logos-scroll-container">
            <div className="partner-logos-track">
              {logosToRender.map((org, idx) => {
                const orgName =
                  org.organization_profile?.organization_name || org.username;
                const logoPath = org.organization_profile?.logo;
                const logoUrl = logoPath
                  ? logoPath.startsWith("http")
                    ? logoPath
                    : `http://localhost:8000${logoPath}`
                  : `https://via.placeholder.com/120x60/28a745/ffffff?text=${encodeURIComponent(
                      orgName.substring(0, 10)
                    )}`;

                return (
                  <Link
                    key={`${org.id}-${idx}`}
                    to={`/organization/${org.id}`}
                    className="partner-logo-link"
                    title={`Scopri di più su ${orgName}`}
                  >
                    <img
                      src={logoUrl}
                      alt={`Logo di ${orgName}`}
                      className="partner-logo"
                      loading="lazy"
                      style={{
                        height: 60,
                        width: 120,
                        objectFit: "contain",
                        background: "#fff",
                        borderRadius: 8,
                        padding: 6,
                        boxShadow: "0 1px 4px #0001",
                      }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
