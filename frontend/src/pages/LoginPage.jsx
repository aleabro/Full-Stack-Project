import Form from "../components/Form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import {jwtDecode} from "jwt-decode";

export default function LoginPage() {
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

  return (
    <div className="container mt-5 login-form-container">
    <Form route="/api/token/" method="login" />
    </div>
  );
}
