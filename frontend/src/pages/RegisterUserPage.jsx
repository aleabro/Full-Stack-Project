import RegisterUserForm from "../components/RegisterUserForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import {jwtDecode} from "jwt-decode";

export default function RegisterUserPage() {
        const navigate = useNavigate();
        // Check if the user is already logged in
        // If they are, redirect them to the home page
        // If they are not, show the registration form
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
    <div className="container mt-5">
      <RegisterUserForm />
    </div>
  );
}
