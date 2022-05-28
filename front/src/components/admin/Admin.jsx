import React, { useState } from "react";
import AddNewMovie from "./AddNewMovie";

export default function Admin() {
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);
  return (
    <div className="container ">
      <div className="row text-center">
        {!showAddMovieForm && (
          <div className="col-6 offset-3">
            <button onClick={() => setShowAddMovieForm(true)} className="btn btn-success">
              + Pridėti nauą filmą
            </button>
          </div>
        )}
        {showAddMovieForm && (
          <div className="col-6 offset-3">
            <AddNewMovie setShowAddMovieForm={setShowAddMovieForm} />
          </div>
        )}
      </div>
    </div>
  );
}
