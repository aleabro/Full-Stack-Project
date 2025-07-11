import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { EditButton, DeleteButton, SaveButton, CancelButton } from "../components/Buttons";

export default function ProfileOrganization() {
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = () => {
    setLoading(true);
    api.get("/api/organization/profile/")
      .then(res => {
        setOrg(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = e => {
    const [key, subkey] = e.target.name.split(".");
    if (subkey) {
      setOrg({
        ...org,
        organization_profile: {
          ...org.organization_profile,
          [subkey]: e.target.value
        }
      });
    } else {
      setOrg({ ...org, [key]: e.target.value });
    }
  };

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSave = () => {
    const formData = new FormData();

    formData.append("username", org.username);
    formData.append("email", org.email);

    Object.entries(org.organization_profile).forEach(([key, value]) => {
      formData.append(`organization_profile.${key}`, value);
    });

    if (logoFile) {
      formData.set("organization_profile.logo", logoFile);
    }

    api.put("/api/organization/profile/", org, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        setEditing(false);
        alert("Profile updated!");
        fetchProfile();
      })
      .catch(err => {
        console.error(err);
        alert("Error updating profile.");
      });
  };

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    api.delete("/api/organization/profile/")
      .then(() => {
        localStorage.clear();
        navigate("/register-choice");
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
        alert("Error deleting account.");
      });
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  if (!org) return <div>Error loading profile.</div>;

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-4">
                <i className="bi bi-building fs-1 text-primary me-3"></i>
                <h2 className="mb-0 fw-bold">Profilo organizzazione</h2>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-person-fill me-2"></i>Username
                </label>
                <input
                  className="form-control"
                  name="username"
                  value={org.username}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-envelope-fill me-2"></i>Email
                </label>
                <input
                  className="form-control"
                  name="email"
                  value={org.email}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-building me-2"></i>Nome organizzazione
                </label>
                <input
                  className="form-control"
                  name="organization_profile.organization_name"
                  value={org.organization_profile.organization_name || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-123 me-2"></i>Partita IVA
                </label>
                <input
                  className="form-control"
                  name="organization_profile.partita_iva"
                  value={org.organization_profile.partita_iva || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-geo-alt-fill me-2"></i>Indirizzo
                </label>
                <input
                  className="form-control"
                  name="organization_profile.address"
                  value={org.organization_profile.address || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  <i className="bi bi-image me-2"></i>Logo
                </label>
                {org.organization_profile.logo && (
                  <div className="mb-2">
                    <img src={org.organization_profile.logo} alt="Current logo" style={{ maxWidth: "200px", borderRadius: "8px" }} />
                  </div>
                )}
                {/* {editing && (
                  <>
                    <input type="file" name="logo" className="form-control mt-2" onChange={handleLogoChange} />
                    <small className="text-muted">Lascia vuoto per mantenere il logo attuale</small>
                  </>
                )} */}
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="bi bi-award-fill me-2"></i>Tipo utente
                </label>
                <input
                  className="form-control"
                  value={org.user_type}
                  disabled
                />
              </div>

              <div className="d-flex gap-2">
                {!editing ? (
                  <EditButton onEdit={() => setEditing(true)} />
                ) : (
                  <>
                    <SaveButton onSave={handleSave} />
                    <CancelButton onCancel={() => {
                      setEditing(false);
                      fetchProfile();
                    }} />
                  </>
                )}
                <DeleteButton onDelete={handleDelete} />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}