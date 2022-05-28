import React from "react";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { updateFavMovie } from "../../api/library/UsersAPI";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

export default function EditForm({ movie, userId, updateUserData, setEditForm }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  function editFavMovie(data) {
    console.log(data);
    updateFavMovie(userId, movie._id, data).then((res) => {
      console.log(res);
      swal({
        text: "Filmas redaguotas",
        icon: "success",
        button: "Puiku",
        timer: 5000,
      });
      updateUserData(userId);
    });
  }
  return (
    <div className="container ">
      <div className="row ">
        <div className="col-4 offset-3 ">
          <input
            type="text"
            className="form-control edit-movie-input"
            defaultValue={movie.title}
            {...register("title", {
              required: true,
              maxLength: 100,
              minLength: 1,
              pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9]*$/i,
            })}
          />
          <span>
            {errors.name?.type === "maxLength" && "Ne daugiau kaip 100 simbolių"}
            {errors.name?.type === "minLength" && "Bent 1 simbolis"}
            {errors.name?.type === "required" && "Pavadinimas privalomas"}
            {errors.name?.type === "pattern" && "Negali būti specialų simbolių"}
          </span>
        </div>
        <div className="col-2">
          <button className="btn" onClick={handleSubmit(editFavMovie)}>
            <FaCheck color="#7fbc6e" fontSize="1.5em" />
          </button>
          <button className="btn" onClick={() => setEditForm(false)}>
            <ImCross color="#bc6e7f" fontSize="1.4em" />
          </button>
        </div>
      </div>
    </div>
  );
}
