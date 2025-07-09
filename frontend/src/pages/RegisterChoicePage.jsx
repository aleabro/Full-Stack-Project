import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import {jwtDecode} from "jwt-decode";

export default function RegisterChoicePage() {
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
    <div className="container mt-5 mb-5 text-center">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: 400 }}>
        <h2 className="mb-4">Choose your account type</h2>
        <Link to="/register-user" className="btn btn-primary mb-3 w-100">
          Register as Regular User
        </Link>
        <Link to="/register-organization" className="btn btn-secondary w-100">
          Register as Organization
        </Link>
      </div>
    </div>
  );
}
