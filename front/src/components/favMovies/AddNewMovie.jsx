import React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { addFavMovie } from "../../api/library/UsersAPI";

import "./favMovies.css";

export default function FavMovies({ id, updateUserData }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  function onSubmit(data) {
    console.log(data);
    addFavMovie(id, data).then(() => updateUserData(id));
  }
  return (
    <div className="newMovie-div">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Pridėti naują filmą</h2>
        <div className="addMovie-form">
          <input
            className="addMovie-input form-control"
            type="text"
            placeholder="Pavadinimas"
            {...register("title", {
              required: true,
              maxLength: 100,
              minLength: 2,
              pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9]*$/i,
            })}
          />
          <div>
            <span>
              {errors.name?.type === "maxLength" && "Ne daugiau kaip 100 simbolių"}
              {errors.name?.type === "minLength" && "Bent 1 simbolis"}
              {errors.name?.type === "required" && "Pavadinimas privalomas"}
              {errors.name?.type === "pattern" && "Negali būti specialų simbolių"}
            </span>
          </div>
          <div>
            <button className="addMovie-button btn btn-success" type="submit">
              Pridėti
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
