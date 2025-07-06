import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

export default function RegisterUserForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/user/register/", {
        ...formData,
        user_type: "regular",
      });
      navigate("/login");
    } catch (error) {
      alert("Registration failed!");
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
              <h2 className="text-center mb-4">Register as User</h2>

              <form onSubmit={handleSubmit}>
                {["username", "email", "first_name", "last_name"].map((field) => (
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
