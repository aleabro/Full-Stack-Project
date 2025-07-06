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
    organization_name: "",
    partita_iva: "",
    address: "",
    logo: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    data.append("email", formData.email);
    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("user_type", "organization");
    data.append("organization_profile.organization_name", formData.organization_name);
    data.append("organization_profile.partita_iva", formData.partita_iva);
    data.append("organization_profile.address", formData.address);
    if (formData.logo) {
      data.append("organization_profile.logo", formData.logo);
    }

    try {
      await api.post("/api/organization/register/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const res = await api.post("/api/token/", {
        username: formData.username,
        password: formData.password
    });
    localStorage.setItem(ACCESS_TOKEN, res.data.access);
    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
    navigate("/");
    } catch (error) {
      alert("Organization registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Register as Organization</h2>

              <form onSubmit={handleSubmit}>
                {["email","username", "organization_name", "partita_iva", "address"].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label text-capitalize">{field.replace("_", " ")}</label>
                    <input
                      type="text"
                      className="form-control"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
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

                {loading && <LoadingIndicator />}

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>

                <div className="mt-3 text-center">
                  Already have an account? <Link to="/login">Log in</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
