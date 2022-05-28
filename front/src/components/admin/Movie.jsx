import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

export default function Movie({ movie }) {
  console.log(movie.genre);
  //TODO make better, .replace in cycle?
  function translateGenres(arr) {
    let translated = [];
    for (var i = 0; i < arr.length; i++) {
      translated[i] = arr[i].replace("action", "Veiksmo").replace("horror", "Siaubo").replace("comedy", "Komedija").replace("drama", "Drama").replace("thriller", "Trileris");
    }
    return translated;
  }

  return (
    <div className="col-4">
      <div className="card">
        <img src={movie.poster} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            {movie.title}{" "}
            <button className="button-favorite">
              <AiOutlineHeart />
            </button>
            <p>{translateGenres(movie.genre).join("/")}</p>
          </h5>
          <p className="card-text">{movie.description}</p>
          <p className="card-text">Trukmė: {movie.length} min.</p>
          <p className="card-text">Režisierius: {movie.director}</p>
          <p className="card-text">Išleista: {movie.releaseDate} </p>
        </div>
      </div>
    </div>
  );
}
