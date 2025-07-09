export function getCategories(events) {
  return Array.from(new Set(events.map(e => e.category).filter(Boolean)));
}

export function getProvinces(events) {
  return Array.from(new Set(events.map(e => e.province).filter(Boolean)));
}

export function getOrganizations(events) {
  return Array.from(
    new Set(
      events
        .map(e => e.organizer?.organization_name || e.organizer?.username)
        .filter(Boolean)
    )
  );
}

export function getSortedEvents(events, sortBy) {
  let sorted = [...events];
  if (sortBy === "date_asc") sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
  if (sortBy === "date_desc") sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  if (sortBy === "price_asc") sorted.sort((a, b) => a.price - b.price);
  if (sortBy === "price_desc") sorted.sort((a, b) => b.price - a.price);
  if (sortBy === "organization_asc") sorted.sort((a, b) => (a.organizer?.username || "").localeCompare(b.organizer?.username || ""));
  if (sortBy === "organization_desc") sorted.sort((a, b) => (b.organizer?.username || "").localeCompare(a.organizer?.username || ""));
  if (sortBy === "recent") sorted.sort((a, b) => b.created_at - a.created_at);
if (sortBy === "province_asc") {
  sorted.sort((a, b) =>
    (a.province || a.provincia || "").localeCompare(b.province || b.provincia || "")
  );
}
if (sortBy === "category_asc") {
  sorted.sort((a, b) =>
    (a.category || "").localeCompare(b.category || "")
  );
} return sorted;
}