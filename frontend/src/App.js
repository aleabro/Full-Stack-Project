
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter} from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import AppRoutes from './AppRoutes';


function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
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
        <Navbar searchText={searchText} setSearchText={setSearchText} />
        <AppRoutes events={events} filteredEvents={filteredEvents} searchText={searchText} setSearchText={setSearchText} />
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
