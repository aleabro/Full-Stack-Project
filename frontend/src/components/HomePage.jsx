import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import Cards from "./cards";
import Accordion from "./accordion";
import Newsletter from "./newsletter";
import Carousel from "./carousel";

export default function HomePage({ events, searchText, setSearchText }) {
  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Navbar searchText={searchText} setSearchText={setSearchText} />
      <Newsletter />
      <Carousel events={events} />
      <Cards events={filteredEvents} />
      <Accordion />
      <Footer />
    </>
  );
}