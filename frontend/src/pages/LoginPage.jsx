import Form from "../components/Form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";

export default function LoginPage({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      const decoded = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp > now) {
        navigate("/"); 
      }
    }
  }, [navigate]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <div className="container mt-5">
      <Form route="/api/token/" method="login" onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}
