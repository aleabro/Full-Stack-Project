import React from "react";

export default function Filter({
  sortBy,
  setSortBy,
  categories = [],
  provinces = [],
  organizations = [],
}) {
  return (
    <div className="container mb-3">
      <div className="row g-2 align-items-end">
        <div className="col-md-4">
          <label className="form-label">Ordina per:</label>
          <select
            className="form-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="">Seleziona...</option>
            <option value="date_asc">Data evento (dal più recente)</option>
            <option value="price_asc">Prezzo (crescente)</option>
            <option value="price_desc">Prezzo (decrescente)</option>
            <option value="organization_asc">Organizzazione (A-Z)</option>
            <option value="recent">Più recente inserito</option>
            <option value="category_asc">Categoria (A-Z)</option>
            <option value="province_asc">Provincia (A-Z)</option>
          </select>
        </div>
      </div>
      
    <hr className="border-t border-gray-300 opacity-100 my-4 w-3/4 mx-auto" />

    </div>
    
  );
}