import React, { useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { addFavMovie } from "../../api/library/UsersAPI";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import "./favMovies.css";
import ReactTooltip from "react-tooltip";

export default function FavMovies({ id, updateUserData }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [tooltip, showTooltip] = useState(true);
  function onSubmit(data) {
    addFavMovie(id, data).then(() => {
      updateUserData(id);
      swal({
        text: "Filmas pridėtas",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
      reset();
    });
  }
  return (
    <div className="newMovie-div">
      <form onSubmit={handleSubmit(onSubmit)}>
        {tooltip && <ReactTooltip type={"info"} />}
        <h2>
          Pridėti naują filmą
          {/* tooltip doesnt autohide in react18 production mode, this a workaround */}
          <AiOutlineQuestionCircle
            onMouseEnter={() => showTooltip(true)}
            onMouseLeave={() => {
              showTooltip(false);
              setTimeout(() => showTooltip(true), 50);
            }}
            data-tip="Filmus taip pat galite pridėti iš 'Visi filmai' skilties. Įtrauke filmus tuo būdu, paspaudus ant filmo saraše iš karto matysite visą filmo informaciją."
          />
        </h2>

        <div className="addMovie-form">
          <input
            className="addMovie-input form-control"
            type="text"
            placeholder="Pavadinimas"
            {...register("title", {
              required: true,
              maxLength: 100,
              minLength: 1,
              pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9]*$/i,
            })}
          />
          <div>
            <span>
              {errors.title?.type === "maxLength" && "Ne daugiau kaip 100 simbolių"}
              {errors.title?.type === "minLength" && "Bent 1 simbolis"}
              {errors.title?.type === "required" && "Pavadinimas privalomas"}
              {errors.title?.type === "pattern" && "Negali būti specialų simbolių"}
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
