import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

export default function Form({ route, method, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const isLogin = method === "login";
  const title = isLogin ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await api.post(route, { username, password });
      if (isLogin) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

        const profileRes = await api.get("/api/profile/", {
          headers: {
            Authorization: `Bearer ${res.data.access}`
          }
        });
        onLoginSuccess(profileRes.data);

        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401 || error.response?.status === 400) {
        setErrorMsg("Username o password errati.");
      } else {
        setErrorMsg("Si è verificato un errore. Riprova.");
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
              <h2 className="text-center mb-4">{title}</h2>

              {errorMsg && (
                <div className="alert alert-danger text-center">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Inserisci username"
                    autoComplete="username"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Inserisci la password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                  />
                </div>

                {loading && <LoadingIndicator />}

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    {title}
                  </button>
                </div>
              </form>

              <div className="mt-3 text-center">
                {isLogin ? (
                  <>
                    Non hai un account?{" "}
                    <Link to="/register-choice">Registrati</Link>
                  </>
                ) : (
                  <>
                    Hai già un account?{" "}
                    <Link to="/login">Login</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
