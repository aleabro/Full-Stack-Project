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

  // per ordinare gli eventi nelle varie pagine, se sono anche troppi
  const [currentPage, setCurrentPage] = useState(1);
  const eventsforPages = 12;

  const pastEvents = filteredEvents.filter(e => new Date(e.date) < today);

  // Calcola gli eventi da mostrare per pagina
  const indexOfLastEvent = currentPage * eventsforPages; //ultimo evento della pagina corrente
  const indexOfFirstEvent = indexOfLastEvent - eventsforPages; //primo evento della pagina corrente
  const currentEvents = upcomingEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Calcola il numero totale di pagine che servono in base a quanti eventi ci sono
  const totalPages = Math.ceil(upcomingEvents.length / eventsforPages);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Newsletter />
      <Carousel events={events} />
      <SortEvents sortOrder={sortOrder} setSortOrder={setSortOrder} />

      <div className="container-fluid w-100 " style={{ width: "100%" }}>
        <hr className="border-t border-gray-300 opacity-100" />
        <h1 className="fs-1 text-center p-2 text-2xl font-bolder" style={{ fontSize: "48px" }}>Ultime Novità</h1>
        <hr className="border-t border-gray-300 opacity-100 shadow" />
      </div>

      <Cards events={currentEvents} />

      {/* Paginazione per gli eventi futuri */}
      <div className="d-flex justify-content-center align-items-center my-4  rounded-pill">
        <nav>
          <ul className="pagination rounded-pill overflow-hidden shadow mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link rounded-0" onClick={goToPrevPage}>
                &laquo; Precedente
              </button>
            </li>
            <li className="page-item disabled">
              <span className="page-link bg-light text-dark border-1 rounded-0">
                {currentPage} / {totalPages}
              </span>
            </li>
            <li className={` rounded-pill page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link rounded-0" onClick={goToNextPage}>
                Successiva &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* menu a tendina  per mostrare gli eventi che ormai sono passati, senza il likebutton perché ormai sono scaduti */}
      <div className="toggle-wrapper">
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