import React from "react";

function Navbar({ handleShow }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <a className="navbar-brand" href="/">
          <img
            src="a.png"
            width="30"
            height="30"
            className="d-inline-block align-top m-1"
            alt=""
          />
          Kamus Rejang Kito
        </a>
        <button
          className="navbar-toggler border-0 m-1"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav p-2">
            <a className="nav-item nav-link" href="/database">
              Kamus bacaan dan Tambahkan Kata!
            </a>
            <a className="nav-item nav-link" href="/kaganga">
              Kaganga!
            </a>
          </div>
        </div>
      </nav>{" "}
    </>
  );
}

export default Navbar;
