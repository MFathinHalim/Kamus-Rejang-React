import React, { useState } from "react";

function KagangaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([
    {
      tj: "Arti Muncul Disini",
      jt: "kgf",
    },
  ]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://bouncy-earthy-radish.glitch.me/api/searchKaganga?value=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mencari:", error);
      setSearchResults([]);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleCardClick = () => {
    // Logika jika card diklik (misalnya, navigasi ke halaman detail)
    // Contoh: navigate('/detail');
  };

  return (
    <div className="container mt-4">
      <h3 className="center-heading text-white">Cari Kaganga</h3>
      <br />
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Taruh Kata Disini"
          name="value"
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSearchSubmit}>
          <i className="fa fa-search"></i>
        </button>
      </div>

      {searchResults.map((element) => (
        <article
          key={element.id}
          className="card mt-3"
          onClick={handleCardClick}>
          <div className="card-body centered-card">
            <h3 className="card-text text-break">{element.tj}</h3>
            <h3
              className="card-text text-break"
              style={{ fontFamily: "rlabel" }}>
              {element.jt}
            </h3>
          </div>
        </article>
      ))}
    </div>
  );
}

export default KagangaPage;
