import { useParams } from 'react-router-dom';
import Cards from '../components/cards';
import Sorted from '../components/Sorted';
import { getCategories, getProvinces, getOrganizations, getSortedEvents } from "../pages/EventFilter";
import React, { useState } from 'react';

export default function ProvinciaPage({ events = [], searchText = '', setSearchText }) {
  const { provincia } = useParams();
  const [sortByFuture, setSortByFuture] = useState("");

  if (!provincia) {
    return <div>Provincia non selezionata</div>;
  }

  // 1. Filtro per provincia
  const filteredEvents = events.filter(event =>
    typeof event.provincia === 'string' &&
    event.provincia.toLowerCase() === provincia.toLowerCase()
  );

  // 2. Filtro per testo di ricerca
  const filteredBySearch = filteredEvents.filter(event =>
    typeof event.title === 'string' &&
    event.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // 3. Filtro per eventi futuri
  const now = new Date();
  const futureEvents = filteredBySearch.filter(event =>
    event.date && new Date(event.date) >= now
  );

  // 4. Ordina secondo il filtro scelto
  const sortedFutureEvents = getSortedEvents(futureEvents, sortByFuture);

  // 5. Ricava le liste per i filtri
  const categories = getCategories(futureEvents);
  const provinces = getProvinces(futureEvents);
  const organizationsList = getOrganizations(futureEvents);

  return (
    <div>
      <Sorted
        sortBy={sortByFuture}
        setSortBy={setSortByFuture}
        categories={categories}
        provinces={provinces}
        organizations={organizationsList}
      />
      <h2 className="text-center my-4">
        Eventi nella provincia: {provincia}
      </h2>
      <Cards events={sortedFutureEvents} />
    </div>
  );
}