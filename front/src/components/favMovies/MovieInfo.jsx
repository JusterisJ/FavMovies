import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";
import EditForm from "./EditForm";

export default function MovieInfo({ movie, userId, updateUserData }) {
  const [editForm, setEditForm] = useState(false);

  function translateGenres(arr) {
    let translated = [];
    for (var i = 0; i < arr.length; i++) {
      translated[i] = arr[i].replace("action", "Veiksmo").replace("horror", "Siaubo").replace("comedy", "Komedija").replace("drama", "Drama").replace("thriller", "Trileris");
    }
    return translated;
  }
  return (
    <div>
      {movie.poster ? (
        <div className="col-8 offset-2 text-start ">
          <div className="card ">
            <div className="row">
              <div className="col-4">
                <img src={movie.poster} className="card-img-top" alt="..." />
              </div>
              <div className="col-6">
                <div className="card-body">
                  <h3 className="card-title">{movie.title}</h3>
                  <h6>{translateGenres(movie.genre).join("/")}</h6>
                  <p className="card-text">{movie.description}</p>
                  <p className="card-text">Trukmė: {movie.length} min.</p>
                  <p className="card-text">Režisierius: {movie.director}</p>
                  <p className="card-text">Išleista: {movie.releaseDate.slice(0, 10)} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row ">
          <div className="col-3 offset-2">
            <h4>Pavadinimas: {movie.title} </h4>
          </div>
          <div className="col-1 text-start">
            <button onClick={() => setEditForm(!editForm)} className="movie-button">
              <BsPencil color="#3a3845" fontSize="1.5em" />
            </button>
          </div>

          <div className="col-12">Pridėjus filmą iš "Visi filmai", čia matytumete visą filmo informaciją.</div>
          {editForm && <EditForm movie={movie} userId={userId} updateUserData={updateUserData} />}
        </div>
      )}
    </div>
  );
}
