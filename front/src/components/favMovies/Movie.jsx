import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { deleteFavMovie, unlikeMovie } from "../../api/library/UsersAPI";
import swal from "sweetalert";
import MovieInfo from "./MovieInfo";

export default function Movie({ movie, userId, updateUserData }) {
  const [showMovieInfo, setShowMovieInfo] = useState(false);

  function deleteMovie() {
    swal({
      title: "Ar tikrai norite ištrinti?",
      icon: "warning",
      buttons: ["Atšaukti", "Gerai"],
    }).then((isConfirm) => {
      if (isConfirm) {
        movie.poster
          ? unlikeMovie(userId, movie._id).then(() => {
              updateUserData(userId);
              swal({
                text: "Ištrinta",
                icon: "success",
                button: "Gerai",
                timer: 2000,
              });
            })
          : deleteFavMovie(userId, movie._id).then(() => {
              updateUserData(userId);
              swal({
                text: "Ištrinta",
                icon: "success",
                button: "Gerai",
                timer: 2000,
              });
            });
      }
    });
  }
  return (
    <div className="row text-center mt-3 ">
      <div className="movie col-12  ">
        <div className="row">
          <div className="col-5 text-start offset-2">
            {" "}
            <button onClick={() => setShowMovieInfo(!showMovieInfo)} className="btn">
              {movie.title}
            </button>
          </div>
          <div className="col-3 text-end">
            <button
              className="movie-button"
              onClick={() => {
                deleteMovie();
              }}
            >
              <BsTrash color="#bc6e7f" fontSize="1.5em" />
            </button>
          </div>
          {showMovieInfo && <MovieInfo movie={movie} userId={userId} updateUserData={updateUserData} />}
        </div>
      </div>
    </div>
  );
}
