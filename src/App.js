import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.js";
import Database from "./pages/Database.js";
import KagangaPage from "./pages/Kaganga.js"; // Ganti dengan path yang sesuai

function Home({
  searchTerm,
  setSearchTerm,
  searchResults,
  handleSearch,
  handleModeChange,
  modeText,
}) {
  return (
    <div className="container mt-4">
      <h3 className="center-heading text-white">Kamus Rejang Kito!</h3>
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSearch}>
          <i className="fa fa-search"></i>
        </button>
      </div>

      {searchResults.map((element) => (
        <article key={element.id} className="card mt-3">
          <div className="card-body centered-card">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleModeChange}
              type="submit">
              {modeText}
            </button>
            <h3 className="card-text text-break">{element.tj}</h3>
            <h3
              className="card-text text-break"
              style={{ fontFamily: "rlabel" }}>
              {element.jt}
            </h3>
          </div>
        </article>
      ))}

      <div className="mt-4 text-center">
        <h1 style={{ color: "white" }}>Temukan lebih banyak fitur!</h1>
        <a
          href="https://play.google.com/store/apps/details?id=org.kamusbahasarejang.kamusbahasarejang"
          className="btn btn-primary m-1"
          style={{ backgroundColor: "black" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/732/732208.png"
            alt="Play Store Icon"
            className="playstore-icon"
          />{" "}
          Get it on Play Store
        </a>
      </div>
    </div>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([
    {
      id: 0,
      tj: "Arti Muncul Disini",
      jt: "kgf",
      mode: 0,
      textBahasa: "Indonesia Ke Rejang",
    },
  ]);
  const [modeText, setModeText] = useState("Indonesia Ke Rejang");

  useEffect(() => {
    const fetchMode = async () => {
      try {
        const response = await fetch(
          "https://bouncy-earthy-radish.glitch.me/api/"
        );
        const data = await response.json();
        setModeText(data.data[0].textBahasa);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil mode:", error);
        setModeText("Terjadi kesalahan saat mengambil mode");
      }
    };

    fetchMode();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://bouncy-earthy-radish.glitch.me/api/search?value=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error("Terjadi kesalahan saat mencari:", error);
      setSearchResults([]);
    }
  };

  const handleModeChange = async () => {
    try {
      const response = await fetch(
        "https://bouncy-earthy-radish.glitch.me/api/ganti",
        {
          method: "POST",
        }
      );
      const data = await response.json();
      setModeText(data.data[0].textBahasa);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengganti mode:", error);
      setModeText("Terjadi kesalahan saat mengganti mode");
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/database" element={<Database />} />
        <Route
          path="/"
          element={
            <Home
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchResults={searchResults}
              handleSearch={handleSearch}
              handleModeChange={handleModeChange}
              modeText={modeText}
            />
          }
        />
        <Route path="/kaganga" element={<KagangaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
