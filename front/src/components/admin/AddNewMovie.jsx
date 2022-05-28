import React, { useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

export default function AddNewMovie() {
  const [genreArray, setGenreArray] = useState([]);
  const {
    register,
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
    data.genres = genreArray;
    console.log(data, genreArray);
  }
  return (
    <div className="row text-center">
      <form onSubmit={handleSubmit(addMovie)}>
        <div className="col-12">
          <input className="form-control" type="text" placeholder="Pavadinimas" {...register("title", { required: true })} />
        </div>
        <div className="col-12">
          <input className="form-control" type="text" placeholder="Trukmė" />
        </div>

        <div className="col-12">
          <input className="form-control" type="text" placeholder="Režisierius" {...register("director")} />
        </div>
        <div className="col-12">
          <input className="form-control" type="text" placeholder="Filmo paveikslėlis (nuoroda)" {...register("poster", {})} />
        </div>
        <div className="col-12 text-start">
          <label>
            Išleidimo data <br />
            <input className="form-control" type="date" {...register("releaseDate", {})} />
          </label>
        </div>
        <div className="col-12 text-start">
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
        </div>

        <button className="btn btn-success" type="submit">
          Pridėti
        </button>
      </form>
    </div>
  );
}
