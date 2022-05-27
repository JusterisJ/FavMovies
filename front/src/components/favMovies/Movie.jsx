import React from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { ImArrowLeft2 } from "react-icons/im";
import { deleteFavMovie } from "../../api/library/UsersAPI";
import swal from "sweetalert";

export default function Movie({ movie, userId, updateUserData }) {
  function deleteMovie() {
    swal({
      title: "Ar tikrai norite ištrinti?",
      icon: "warning",
      buttons: ["Atšaukti", "Gerai"],
    }).then((isConfirm) => {
      if (isConfirm) {
        deleteFavMovie(userId, movie._id).then(() => {
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
          <div className="col-5"> {movie.title}</div>
          <div className="col-5 text-end">
            <button className="movie-button">
              <BsPencil color="#3a3845" fontSize="1.5em" />
            </button>
            <button
              className="movie-button"
              onClick={() => {
                deleteMovie();
              }}
            >
              <BsTrash color="#bc6e7f" fontSize="1.5em" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
