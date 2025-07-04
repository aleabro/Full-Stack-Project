
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Cards from './components/cards';
import Accordion from './components/accordion';
import Newsletter from './components/newsletter';
import Carousel from './components/carousel';



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
    const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(searchText.toLowerCase())
  );


  return (
    < >
      <Navbar searchText={searchText} setSearchText={setSearchText}/>
      <Newsletter />
      <Carousel events={events} />
      <Cards events={filteredEvents}/>
      <Accordion />
      <Footer />
    </>
  );
}

export default App;
