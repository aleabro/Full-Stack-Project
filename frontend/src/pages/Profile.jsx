import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { EditButton, DeleteButton, SaveButton, CancelButton } from "../components/Buttons";
import ChangePasswordForm from "../components/ChangePasswordForm";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [originalUser, setOriginalUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = () => {
    setLoading(true);
    api.get("api/profile/")
      .then(res => {
        setUser(res.data);
        setOriginalUser(res.data);
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

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const payload = {
      username: user.username,
      email: user.email,
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      newsletter: user.newsletter || false,
    };

    api.put("api/profile/", payload)
      .then(() => {
        setEditing(false);
        setOriginalUser(user);
        alert("Profile updated!");
        fetchProfile();  // Refresh profile data
      })
      .catch(err => {
        console.error(err);
        alert("Error updating profile.");
      });
  };

  const handleCancel = () => {
    setUser(originalUser);
    setEditing(false);
  };
  
  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    api.delete("api/profile/")
      .then(() => {
        localStorage.clear();
        navigate("/register-choice");
        window.location.reload(); // hard reload after delete
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
  if (!user) return <div>Error loading profile.</div>;

  return (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-lg border-0">
          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-4">
              <i className="bi bi-person-circle fs-1 text-primary me-3"></i>
              <h2 className="mb-0 fw-bold">Il mio profilo</h2>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-person-fill me-2"></i>Username
              </label>
              <input
                className="form-control"
                name="username"
                value={user.username}
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
                value={user.email}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-person-vcard me-2"></i>Nome
              </label>
              <input
                className="form-control"
                name="first_name"
                value={user.first_name || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="bi bi-person-vcard me-2"></i>Cognome
              </label>
              <input
                className="form-control"
                name="last_name"
                value={user.last_name || ""}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="newsletter"
                checked={user.newsletter || false}
                onChange={(e) =>
                  setUser({ ...user, newsletter: e.target.checked })
                }
                disabled={!editing}
                id="newsletterCheck"
              />
              <label className="form-check-label" htmlFor="newsletterCheck">
                <i className="bi bi-envelope-paper-heart-fill me-2 text-warning"></i>
                Iscritto alla newsletter
                {user.newsletter && (
                  <span className="badge bg-success ms-2">Attivo</span>
                )}
              </label>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                <i className="bi bi-award-fill me-2"></i>Tipo utente
              </label>
              <input
                className="form-control"
                value={user.user_type}
                disabled
              />
            </div>

            <div className="d-flex gap-2">
              {!editing ? (
                <>
                  <EditButton onEdit={() => setEditing(true)} />
                </>
              ) : (
                <>
                  <SaveButton onSave={handleSave} />
                  <CancelButton onCancel={handleCancel} />
                </>
              )}
              <DeleteButton onDelete={handleDelete} />
            </div>
            {!editing && (
                <div className="border rounded p-3 mt-3 bg-light">
                  <ChangePasswordForm />
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}