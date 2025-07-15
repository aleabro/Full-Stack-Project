import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import axios from "axios";

export default function RegisterUserForm({onLoginSuccess}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    newsletter_subscription: false,
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Le password non corrispondono.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrorMsg(
        "La password deve avere almeno 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale."
      );
      return;
    }

    setLoading(true);
    try {
      await axios.post("api/user/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        newsletter_subscription: formData.newsletter_subscription,
        user_type: "regular",
      });

      const res = await api.post("api/token/", {
        username: formData.username,
        password: formData.password,
      });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      const profileRes = await api.get("/api/profile/", {
        headers: { Authorization: `Bearer ${res.data.access}` },
      });

      onLoginSuccess?.(profileRes.data);

      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        const details = error.response.data;
        const firstKey = Object.keys(details)[0];
        setErrorMsg(`${firstKey}: ${details[firstKey]}`);
      } else {
        setErrorMsg("Errore nella registrazione. Riprova.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Registrati come utente</h2>

              <form onSubmit={handleSubmit}>
                {[
                  { name: "username", placeholder: "Username" },
                  { name: "email", placeholder: "your@email.com" },
                  { name: "first_name", placeholder: "Nome" },
                  { name: "last_name", placeholder: "Cognome" },
                ].map((field) => (
                  <div className="mb-3" key={field.name}>
                    <label className="form-label text-capitalize">
                      {field.name.replace("_", " ")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                    />
                  </div>
                ))}

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Conferma Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="newsletter_subscription"
                    checked={formData.newsletter_subscription || false}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        newsletter_subscription: e.target.checked,
                      }))
                    }
                  />
                  <label className="form-check-label">
                    Iscriviti alla newsletter
                  </label>
                </div>

                {loading && <LoadingIndicator />}

                {errorMsg && (
                <div className="alert alert-danger text-center">{errorMsg}</div>
              )}


                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Registrati
                  </button>
                </div>

                <div className="mt-3 text-center">
                  Hai già un account? <Link to="/login">Accedi</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
