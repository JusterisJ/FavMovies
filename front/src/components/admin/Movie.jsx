import React, { useState } from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import swal from "sweetalert";
import { deleteMovie } from "../../api/library/MoviesAPI";
import { useGlobalMoviesContext } from "../context/MoviesContext";
import EditForm from "./EditForm";

export default function Movie({ movie }) {
  const [editForm, setEditForm] = useState(false);
  const { getMovies } = useGlobalMoviesContext();

  //TODO make better, .replace in cycle?
  function translateGenres(arr) {
    let translated = [];
    for (var i = 0; i < arr.length; i++) {
      translated[i] = arr[i].replace("action", "Veiksmo").replace("horror", "Siaubo").replace("comedy", "Komedija").replace("drama", "Drama").replace("thriller", "Trileris");
    }
    return translated;
  }

  return (
    <div className="col-12">
      <div className="row">
        <div className="col-7"> {movie.title}</div>
        <div className="col-3">
          {" "}
          <button className="movie-button" onClick={() => setEditForm(!editForm)}>
            <BsPencil color="#3a3845" fontSize="1.5em" />
          </button>
          <button
            className="movie-button"
            onClick={() => {
              swal({
                title: "Ar tikrai norite ištrinti?",
                icon: "warning",
                buttons: ["Atšaukti", "Gerai"],
              }).then((isConfirm) => {
                if (isConfirm) {
                  deleteMovie(movie._id).then(() => {
                    getMovies();
                    swal({
                      text: "Ištrinta",
                      icon: "success",
                      button: "Gerai",
                      timer: 2000,
                    });
                  });
                }
              });
            }}
          >
            <BsTrash color="#bc6e7f" fontSize="1.5em" />
          </button>
        </div>
      </div>
      {editForm && <EditForm movie={movie} />}
    </div>
  );
}
