import React from "react";

export default function SortEvents({ sortOrder, setSortOrder }) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <label>
        Ordina per data:&nbsp;
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="desc">Dal più recente</option>
          <option value="asc">Dal meno recente</option>
        </select>
        Ordina per prezzo:&nbsp;
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="desc">Dal più costoso</option>
          <option value="asc">Dal meno costoso</option>
        </select>  
      </label>
    </div>
  );
}