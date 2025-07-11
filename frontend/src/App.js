
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter} from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import AppRoutes from './AppRoutes';
import { ACCESS_TOKEN } from './constants';  
import "./styles/Accessibility.css"; 


function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [organizations, setOrganizations] = useState([]);

  
  // State for search text
  // This will be used to filter events based on user input in the search bar
  const [searchText, setSearchText] = useState("");

  // Fetch events from the API when the component mounts
  
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

  useEffect(() => {
  axios.get("/api/users/?user_type=organization")
    .then((response) => setOrganizations(response.data))
    .catch((error) => console.error("Errore nel fetch delle organization:", error));
}, []);



useEffect(() => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  console.log("DEBUG TOKEN:", token); 
  if (!token) return;
  axios.get("/api/profile/", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => setUser(response.data))
    .catch(() => setUser(null));
}, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchText.toLowerCase()) 
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-50">
        <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
        <span className="ms-3">Caricamento eventi...</span>
      </div>
    );
  }

return (
    <>
      <BrowserRouter>
        <Navbar user={user} events={events} searchText={searchText} setSearchText={setSearchText} />
        <AppRoutes events={events} setEvents={setEvents} filteredEvents={filteredEvents} searchText={searchText} setSearchText={setSearchText} user={user} setUser={setUser} organizations={organizations} />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
