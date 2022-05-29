import React, { useState, useEffect } from "react";
import AddNewMovie from "./AddNewMovie";
import MoviesList from "./MoviesList";

export default function Admin() {
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);
  useEffect(() => {}, [showAddMovieForm]);
  return (
    <div className="container ">
      <div className="row text-center">
        {!showAddMovieForm && (
          <div className="col-12  text-start">
            <button onClick={() => setShowAddMovieForm(true)} className="btn btn-success btn-lg ">
              + Pridėti naują filmą
            </button>
          </div>
        )}
        {showAddMovieForm && (
          <div className="col-6 offset-3">
            <AddNewMovie setShowAddMovieForm={setShowAddMovieForm} />
          </div>
        )}
      </div>
      <MoviesList />
    </div>
  );
}
