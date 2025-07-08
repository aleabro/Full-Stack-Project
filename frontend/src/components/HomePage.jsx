import React, { useState } from "react";
import Cards from "./cards";
import CardsOld from "./cardsold";
import Accordion from "./accordion";
import Newsletter from "./newsletter";
import Carousel from "./carousel";
import SortEvents from "./SortEvents";


export default function HomePage({ events, searchText, setSearchText }) {
  const [sortOrder, setSortOrder] = useState("desc");


  const [showPastEvents, setShowPastEvents] = useState(false);

  const today = new Date();


  const filteredEvents1 = events.filter(e =>
    e.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredEvents = events
    .filter(e =>
      e.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      // Assicurati che ogni evento abbia una proprietà "date" in formato ISO (es: "2024-07-08")
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "desc"
        ? dateB - dateA
        : dateA - dateB;
    });


  const upcomingEvents = filteredEvents.filter(e => new Date(e.date) >= today);
  const pastEvents = filteredEvents.filter(e => new Date(e.date) < today);



  return (
    <>
      <Newsletter />
      <Carousel events={events} />
      <SortEvents sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <Cards events={upcomingEvents} />



      <div className = "toggle-wrapper">
        <hr className="border-t border-gray-300 opacity-100 my-4 w-3/4 mx-auto" />
        <button
          className="toggle-button"
          onClick={() => setShowPastEvents(!showPastEvents)}
        >
          {showPastEvents ? "mostra di più" : "mostra di meno"}
        </button>
        <div
          className={`past-events-container ${showPastEvents ? "" : "hidden"
            }`}
        >
          <CardsOld events={pastEvents} />
        </div>
      </div>



      <Accordion />

    </>
  );
}