import React from "react";

export default function Movie({ movie }) {
  return (
    <div className="col-4">
      <div className="card">
        <img src={movie.poster} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            {movie.title} <button>Favorite</button>
          </h5>
          <p className="card-text">{movie.description}</p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
}
