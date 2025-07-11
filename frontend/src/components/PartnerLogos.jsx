import { Link } from "react-router-dom";
import "../styles/PartnerLogos.css";

export default function PartnerLogos({ organizations }) {
  if (!organizations || organizations.length === 0) return null;
console.log("organizations:", organizations);

  return (
    <section className="bg-light py-4 overflow-hidden">
      <div className="container">
        <h5 className="text-center mb-4 text-dark">I nostri partner</h5>
        <div className="d-flex overflow-hidden">
          <div className="d-flex align-items-center animate-scroll gap-5">
            {organizations.map((org, idx) => {
              const logoPath = org.organization_profile?.logo;
              const logoUrl = logoPath
                ? (logoPath.startsWith("http")
                    ? logoPath
                    : `http://localhost:8000${logoPath}`)
                : "https://via.placeholder.com/100x48?text=Logo";
              const orgName = org.organization_profile?.organization_name || org.username;
              return (
                <Link
                  key={org.id + "-" + idx}
                  to={`/organization/${org.id}`}
                  title={orgName}
                  style={{ display: "inline-block" }}
                >
                  <img
                    src={logoUrl}
                    alt={orgName}
                    className="partner-logo"
                    style={{
                      height: 48,
                      width: 100,
                      objectFit: "contain",
                      background: "#fff",
                      borderRadius: 8,
                      padding: 6,
                      boxShadow: "0 1px 4px #0001",
                      verticalAlign: "middle"
                    }}
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