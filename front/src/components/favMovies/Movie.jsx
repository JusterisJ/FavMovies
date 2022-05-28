import React, { useState } from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { ImArrowLeft2 } from "react-icons/im";
import { deleteFavMovie } from "../../api/library/UsersAPI";
import swal from "sweetalert";
import EditForm from "./EditForm";

export default function Movie({ movie, userId, updateUserData }) {
  const [editForm, setEditForm] = useState(false);
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
          <div className="col-5 text-start offset-2"> {movie.title}</div>
          <div className="col-3 text-end">
            <button className="movie-button" onClick={() => setEditForm(!editForm)}>
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
      {editForm && (
        <div className="col-12">
          <EditForm movie={movie} userId={userId} updateUserData={updateUserData} setEditForm={setEditForm} />
        </div>
      )}
    </div>
  );
}
