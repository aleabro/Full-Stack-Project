import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { EditButton, DeleteButton, SaveButton, CancelButton } from "../components/Buttons";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [originalUser, setOriginalUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("api/profile/")
      .then(res => {
        setUser(res.data);
        setOriginalUser(res.data);  // Salva stato iniziale
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
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
    };

    api.put("api/profile/", payload)
      .then(() => {
        setEditing(false);
        setOriginalUser(user);
        alert("Profile updated!");
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
      })
      .catch(err => {
        console.error(err);
        alert("Error deleting account.");
      });
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Error loading profile.</div>;

  return (
    <div className="container mt-4">
      <h2>My Profile</h2>

      <div className="mb-3">
        <label>Username</label>
        <input
          className="form-control"
          name="username"
          value={user.username}
          onChange={handleChange}
          disabled={!editing}
        />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          className="form-control"
          name="email"
          value={user.email}
          onChange={handleChange}
          disabled={!editing}
        />
      </div>

      <div className="mb-3">
        <label>First Name</label>
        <input
          className="form-control"
          name="first_name"
          value={user.first_name || ""}
          onChange={handleChange}
          disabled={!editing}
        />
      </div>

      <div className="mb-3">
        <label>Last Name</label>
        <input
          className="form-control"
          name="last_name"
          value={user.last_name || ""}
          onChange={handleChange}
          disabled={!editing}
        />
      </div>

      <div className="mb-3">
        <label>User Type</label>
        <input
          className="form-control"
          value={user.user_type}
          disabled
        />
      </div>

      <div>
        {!editing ? (
          <EditButton onEdit={() => setEditing(true)} />
        ) : (
          <>
            <SaveButton onSave={handleSave} />
            <CancelButton onCancel={handleCancel} />
          </>
        )}
        <DeleteButton onDelete={handleDelete} />
      </div>
    </div>
  );
}