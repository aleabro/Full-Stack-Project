import { useState } from "react";
import api from "../api";

function isStrongPassword(password) {
  // Almeno 8 caratteri, una maiuscola, una minuscola, un numero, un carattere speciale
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}


export default function ChangePasswordForm({ onSuccess }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Le nuove password non coincidono.");
      return;
    }
     if (!isStrongPassword(newPassword)) {
      setError(
        "La password deve essere lunga almeno 8 caratteri, contenere una lettera maiuscola, una minuscola, un numero e un carattere speciale."
      );
      return;
    }
    setLoading(true);
    try {
      await api.post("/api/change-password/", {
        old_password: oldPassword,
        new_password: newPassword,
      });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      if (onSuccess) onSuccess();
      alert("Password cambiata con successo!");
    } catch (err) {
      setError("Errore: password attuale errata o nuova password non valida.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h5>Cambia password</h5>
      <div className="mb-3">
        <label className="form-label">Password attuale</label>
        <input
          type="password"
          className="form-control"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Nuova password</label>
        <input
          type="password"
          className="form-control"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Conferma nuova password</label>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Salvataggio..." : "Cambia password"}
      </button>
    </form>
  );
}