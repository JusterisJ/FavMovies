import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { editMovie } from "../../api/library/MoviesAPI";
import { useGlobalMoviesContext } from "../context/MoviesContext";
import swal from "sweetalert";

export default function EditForm({ movie }) {
  const [genreArray, setGenreArray] = useState([]);
  const { getMovies } = useGlobalMoviesContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function addRemoveGenres(e) {
    if (e.target.checked) {
      genreArray.push(e.target.value);
    } else {
      genreArray.splice(genreArray.indexOf(e.target.value), 1);
      genreArray.indexOf(e.target.value);
    }
  }
  function onSubmit(data) {
    editMovie(movie._id, data).then((res) => {
      getMovies();
      swal({
        text: "Filmas redaguotas",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 mt-3">
          <input className="form-control" type="text" defaultValue={movie.title} {...register("title", { required: true, minLength: 1, maxLength: 100, pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9 ]*$/i })} />
          <div>
            <span className="text-danger fw-light">
              {errors.title?.type === "pattern" && "Negali būti specialų simbolių"}
              {errors.title?.type === "required" && "Pavadinimas būtinas"}
              {errors.title?.type === "minLength" && "Turi būti bent 1 simbolis"}
              {errors.title?.type === "maxLength" && "Ne daugiau kaip 100 simbolių"}
            </span>
          </div>
        </div>
        <div className="col-12 mt-3">
          <input className="form-control" type="number" defaultValue={movie.length} {...register("length", {})} />
        </div>

        <div className="col-12 mt-3">
          <input className="form-control" type="text" defaultValue={movie.director} {...register("director")} />
        </div>
        <div className="col-12 mt-3">
          <input className="form-control" type="text" defaultValue={movie.poster} {...register("poster", {})} />
        </div>
        <div className="col-12 mt-3">
          <textarea className="form-control description" type="text" defaultValue={movie.description} {...register("description")} />
        </div>
        <div className="col-12 mt-3 text-start">
          <label>
            Išleidimo data <br />
            <input className="form-control" type="date" defaultValue={new Date().toISOString().substr(0, 10)} {...register("releaseDate", {})} />
          </label>
        </div>
        <div className="col-12 mt-3 text-start">
          <h5>Žanrai:</h5>
          <p></p>
          <label>
            <input
              onClick={(e) => {
                addRemoveGenres(e);
              }}
              type="checkbox"
              value="horror"
            />{" "}
            Siaubo
          </label>
          <br />
          <label>
            <input
              onClick={(e) => {
                addRemoveGenres(e);
              }}
              type="checkbox"
              value="action"
            />{" "}
            Veiksmo
          </label>
          <br />
          <label>
            <input
              onClick={(e) => {
                addRemoveGenres(e);
              }}
              type="checkbox"
              value="comedy"
            />{" "}
            Komedija
          </label>
          <br />
          <label>
            <input
              onClick={(e) => {
                addRemoveGenres(e);
              }}
              type="checkbox"
              value="thriller"
            />{" "}
            Trilers
          </label>
          <br />
          <label>
            <input
              onClick={(e) => {
                addRemoveGenres(e);
              }}
              type="checkbox"
              value="drama"
            />{" "}
            Drama
          </label>
        </div>
        <button type="submit" className="btn btn-success">
          Redaguoti
        </button>
      </form>
    </div>
  );
}
