import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { EditButton, DeleteButton, SaveButton, CancelButton } from "../components/Buttons";

//TODO: fix the logo upload 
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
        fetchProfile(); // reload data
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
  if (!org) return <div>Error loading profile.</div>;

  return (
    <div className="container mt-4">
      <h2>Organization Profile</h2>

      <div className="mb-3">
        <label>Username</label>
        <input className="form-control" name="username" value={org.username} onChange={handleChange} disabled={!editing} />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input className="form-control" name="email" value={org.email} onChange={handleChange} disabled={!editing} />
      </div>

      <div className="mb-3">
        <label>Organization Name</label>
        <input className="form-control" name="organization_profile.organization_name" value={org.organization_profile.organization_name || ""} onChange={handleChange} disabled={!editing} />
      </div>

      <div className="mb-3">
        <label>Partita IVA</label>
        <input className="form-control" name="organization_profile.partita_iva" value={org.organization_profile.partita_iva || ""} onChange={handleChange} disabled={!editing} />
      </div>

      <div className="mb-3">
        <label>Address</label>
        <input className="form-control" name="organization_profile.address" value={org.organization_profile.address || ""} onChange={handleChange} disabled={!editing} />
      </div>

    <div className="mb-3">
      <label>Logo</label>
      {org.organization_profile.logo && (
        <div>
          <img src={org.organization_profile.logo} alt="Current logo" style={{ maxWidth: "200px" }} />
        </div>
      )}
      {editing && (
        <>
          <input type="file" name="logo" className="form-control mt-2" onChange={handleLogoChange} />
          <small className="text-muted">Leave empty to keep the current logo</small>
        </>
      )}
    </div>

      <div className="mb-3">
        <label>User Type</label>
        <input
          className="form-control"
          value={org.user_type}
          disabled
        />
      </div>

      <div>
        {!editing ? (
          <EditButton onEdit={() => setEditing(true)} />
        ) : (
          <>
            <SaveButton onSave={handleSave} />
            <CancelButton onCancel={() => {
              setEditing(false);
              fetchProfile(); // reload original data if canceled
            }} />
          </>
        )}
        <DeleteButton onDelete={handleDelete} />
      </div>
    </div>
  );
}
