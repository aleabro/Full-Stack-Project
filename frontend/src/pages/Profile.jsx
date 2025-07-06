import { useEffect, useState } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/user/profile/");
      setUserData(res.data);
      setUsername(res.data.username);
    } catch (err) {
      console.error(err);
      alert("Error fetching profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.patch("/api/user/profile/", { username });
      alert("Username updated!");
      fetchProfile();
    } catch (err) {
      console.error(err);
      alert("Failed to update username");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action is irreversible.")) return;
    try {
      await api.delete("/api/user/profile/");
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      navigate("/register");
    } catch (err) {
      console.error(err);
      alert("Failed to delete account");
    }
  };

  if (loading) return <div>Loading...</div>;

    if (!loading && userData?.user_type === "organization") {
    return <OrganizationProfileView userData={userData} />;
    }

    if (!loading && userData?.user_type === "regular") {
    return <RegularUserProfileView userData={userData} />;
    }
}
function RegularUserProfileView({ userData }) {
  return (
    <div className="container mt-5">
      <h2>Your Profile (Regular User)</h2>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>First Name: {userData.first_name}</p>
      <p>Last Name: {userData.last_name}</p>
    </div>
  );
}

function OrganizationProfileView({ userData }) {
  return (
    <div className="container mt-5">
      <h2>Your Profile (Organization)</h2>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Organization Name: {userData.organization_profile?.organization_name}</p>
      <p>Address: {userData.organization_profile?.address}</p>
      <p>Partita IVA: {userData.organization_profile?.partita_iva}</p>
    </div>
  );
}