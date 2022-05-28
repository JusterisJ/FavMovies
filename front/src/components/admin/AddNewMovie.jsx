import React, { useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { createMovie } from "../../api/library/MoviesAPI";

export default function AddNewMovie({ setShowAddMovieForm }) {
  const [genreArray, setGenreArray] = useState([]);
  const {
    register,
    reset,
    handleSubmit,
    watch,
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
  function addMovie(data) {
    if (genreArray.length == 0) {
      swal({
        text: "Pasirinkite bent 1 žanrą",
        icon: "error",
        button: "Gerai",
      });
      return;
    }

    data.genre = genreArray;
    console.log(data, genreArray);
    createMovie(data)
      .then(() =>
        swal({
          text: "Filmas pridėtas",
          icon: "success",
          button: "Gerai",
          timer: 2000,
        })
      )
      .catch(() => {
        swal({
          text: "Nepavyko pridėti, bandykite dar kartą",
          icon: "error",
          button: "Gerai",
          timer: 2000,
        });
      });
  }
  return (
    <div className="row text-center">
      <form onSubmit={handleSubmit(addMovie)}>
        <div className="row">
          <div className="col-8 text-start">
            <h3>Naujo filmo pridėjimas</h3>
          </div>
          <div className="col-2 text-end">
            <button className="btn btn-success" type="submit">
              Pridėti
            </button>
          </div>
          <div className="col-2 text-end">
            <button
              onClick={() => {
                reset();
                setShowAddMovieForm(false);
              }}
              className="btn btn-danger"
            >
              Atšaukti
            </button>
          </div>
        </div>
        <div className="col-12 mt-3">
          <input className="form-control" type="text" placeholder="Pavadinimas" {...register("title", { required: true, minLength: 2, maxLength: 100, pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9]*$/i })} />
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
          <input className="form-control" type="text" placeholder="Trukmė" />
        </div>

        <div className="col-12 mt-3">
          <input className="form-control" type="text" placeholder="Režisierius" {...register("director")} />
        </div>
        <div className="col-12 mt-3">
          <input className="form-control" type="text" placeholder="Filmo paveikslėlis (nuoroda)" {...register("poster", {})} />
        </div>
        <div className="col-12 mt-3 text-start">
          <label>
            Išleidimo data <br />
            <input className="form-control" type="date" {...register("releaseDate", {})} />
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
      </form>
    </div>
  );
}
