import React, { useState, useEffect } from "react";

function Database() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    editEntryId: "",
    editIndonesia: "",
    editRejang: "",
  });

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`edit${name}${index}`]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bouncy-earthy-radish.glitch.me/api/database",
          {}
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const closeModal = (index) => {
    // Simply clear the form data on modal close
    setFormData({
      editEntryId: "",
      editIndonesia: "",
      editRejang: "",
    });
  };

  return (
    <div className="container mt-4">
      <form
        className="card p-3 text-center"
        action="https://bouncy-earthy-radish.glitch.me/api/post-database"
        method="post"
        id="popup">
        <h2>Tambahkan Kata yang Tidak Ada!</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control m-1"
            name="Indonesia"
            id="Indonesia"
            placeholder="Indonesia"
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control m-1"
            name="Rejang"
            id="Rejang"
            placeholder="Rejang"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Tambahkan!
        </button>
      </form>

      <div className="card mt-4">
        <h3 className="card-header">Kamus Bacaan</h3>
        {/* Assuming `data` is an array of objects with properties like `Indonesia`, `Rejang`, etc. */}
        {data.map((element, index) => (
          <article key={element.id} className="card-body">
            <h3 key={element.id}>Indonesia: {element.Indonesia}</h3>
            <h3 key={element.id}>Rejang: {element.Rejang}</h3>
            <button
              type="button"
              className="btn btn-warning btn-rounded rounded-pill"
              data-bs-toggle="modal"
              data-bs-target={`#editModal${index}`}
              data-entry-id={element._id}>
              Edit
            </button>

            <div
              className="modal fade"
              id={`editModal${index}`}
              tabIndex="-1"
              role="dialog"
              aria-labelledby={`editModalLabel${index}`}
              aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id={`editModalLabel${index}`}>
                      Edit Kata
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => closeModal(index)}></button>
                  </div>
                  <div className="modal-body">
                    {/* Edit form goes here */}
                    <form
                      action={`https://bouncy-earthy-radish.glitch.me/api/edit/${element.id}`}
                      method="post"
                      id={`editForm${index}`}
                      style={{ color: "black" }}>
                      <input
                        type="hidden"
                        name="entryId"
                        id={`editEntryId${index}`}
                      />
                      <div className="form-group">
                        <label htmlFor={`editIndonesia${index}`}>
                          Indonesia
                        </label>
                        <input
                          type="text"
                          className="form-control m-1"
                          name={`editIndonesia${index}`}
                          id={`editIndonesia${index}`}
                          value={formData[`editIndonesia${index}`]}
                          onChange={(e) => handleInputChange(index, e)}
                          autoComplete="off"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`editRejang${index}`}>Rejang</label>
                        <input
                          type="text"
                          className="form-control m-1"
                          name="Rejang"
                          id={`editRejang${index}`}
                          value={formData[`editRejang${index}`]}
                          onChange={(e) => handleInputChange(index, e)}
                          autoComplete="off"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary m-1">
                        Save Changes
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Database;
