import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomePage from './components/HomePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Register from './pages/Register';
import Navbar from './components/navbar';
import Footer from './components/footer';
import LoginPage from "./pages/LoginPage";
import RegisterChoicePage from "./pages/RegisterChoicePage";
import RegisterUserPage from "./pages/RegisterUserPage";
import RegisterOrganizationPage from "./pages/RegisterOrganizationPage";


function LogOut() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}


function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios.get("/api/events/")
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Errore nel fetch degli eventi:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Caricamento eventi...</div>;
  }
  
  return (
    < >
    
    <BrowserRouter>
    <Navbar searchText={searchText} setSearchText={setSearchText} />
      <Routes>
        <Route path='/' element={<ProtectedRoute allowedRoles={['organization', 'regular', 'Regular User', 'Organization']}> <Home /> </ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/register-choice" element={<RegisterChoicePage />} />
        <Route path="/register-user" element={<RegisterUserPage />} />
        <Route path="/register-organization" element={<RegisterOrganizationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* <HomePage 
        events={events} 
        searchText={searchText} 
        setSearchText={setSearchText} 
      /> */}
    </BrowserRouter>
    <Footer />
    </>
  );
}

export default App;
