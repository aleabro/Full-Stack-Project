import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

export default function RegisterOrganizationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization_name: "",
    partita_iva: "",
    address: "",
    logo: null,
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
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
    const data = new FormData();

    data.append("email", formData.email);
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("user_type", "organization");
    data.append(
      "organization_profile.organization_name",
      formData.organization_name
    );
    data.append("organization_profile.partita_iva", formData.partita_iva);
    data.append("organization_profile.address", formData.address);
    if (formData.logo) {
      data.append("organization_profile.logo", formData.logo);
    }

    try {
      await api.post("api/organization/register/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const res = await api.post("api/token/", {
        username: formData.username,
        password: formData.password,
      });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        const details = error.response.data;
        if (details.organization_profile?.partita_iva) {
          setErrorMsg(
            `Partita IVA già registrata: ${details.organization_profile.partita_iva}`
          );
        } else {
          const firstKey = Object.keys(details)[0];
          setErrorMsg(`${firstKey}: ${details[firstKey]}`);
        }
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
              <h2 className="text-center mb-4">Registrati come organizzazione</h2>

              {errorMsg && (
                <div className="alert alert-danger text-center">{errorMsg}</div>
              )}

              <form onSubmit={handleSubmit}>
                {[
                  { name: "username", placeholder: "Username" },
                  { name: "email", placeholder: "your@email.com" },
                  { name: "organization_name", placeholder: "Nome o sigla organizzazione" },
                  { name: "partita_iva", placeholder: "FR 89 128370925" },
                  { name: "address", placeholder: "Via Roma 1, Milano" },
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
                  <label className="form-label">Logo</label>
                  <input
                    type="file"
                    className="form-control"
                    name="logo"
                    onChange={handleChange}
                    accept="image/*"
                  />
                </div>

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

                {loading && <LoadingIndicator />}

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Registrati
                  </button>
                </div>

                <div className="mt-3 text-center">
                  Hai già un account? <Link to="/login">Log in</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
