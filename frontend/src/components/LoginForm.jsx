import React, { useState } from 'react';

export default function LoginForm({ onLoginSuccess, apiLoginUrl, signUpUrl, passwordRecoveryUrl }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Login data:', formData);
      const user = { username: formData.username, user_type: "regular" };
      onLoginSuccess(user);
      alert('Login effettuato con successo! (simulato)');
    } catch (err) {
      setError('Credenziali non valide. Riprova.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="my-4">Accedi</h3>
            </div>
            <div className="card-body p-4">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Username o Email"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="username"
                    required
                  />
                  <label htmlFor="username">Username o Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="d-grid mt-4">
                  <button className="btn btn-primary btn-lg" type="submit">Login</button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <div className="small">
                <a href={signUpUrl}>Non hai un account? Registrati!</a>
              </div>
              <div className="small mt-2">
                <a href={passwordRecoveryUrl}>Password dimenticata?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}