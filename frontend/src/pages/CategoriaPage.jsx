import { useParams } from 'react-router-dom';
import Cards from '../components/cards';
import { getCategories, getProvinces, getOrganizations, getSortedEvents } from "../pages/EventFilter";
import Sorted from '../components/Sorted';
import React, { useState } from 'react';

export default function CategoriaPage({ events = [], searchText = '', setSearchText }) {
  const { categoria } = useParams();
  const [sortByFuture, setSortByFuture] = useState("");

  if (!categoria) {
    return <div>Categoria non selezionata</div>;
  }

  // 1. Filtro per categoria
  const filteredEvents = events.filter(event =>
    typeof event.category === 'string' &&
    event.category.toLowerCase() === categoria.toLowerCase()
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
        Eventi nella categoria: {categoria}
      </h2>
      <Cards events={sortedFutureEvents} />
    </div>
  );
}