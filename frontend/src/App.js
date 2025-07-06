
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

  if (loading) {
    return <div>Caricamento eventi...</div>;
  }
  
return (
    <>
      <BrowserRouter>
        <Navbar searchText={searchText} setSearchText={setSearchText} />
        <AppRoutes events={events} searchText={searchText} setSearchText={setSearchText} />
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
