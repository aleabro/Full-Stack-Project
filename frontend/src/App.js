
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomePage from './components/HomePage';



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
      <HomePage 
        events={events} 
        searchText={searchText} 
        setSearchText={setSearchText} 
      />
    </>
  );
}

export default App;
