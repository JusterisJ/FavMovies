import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useGlobalUserContext, UserContext } from "../context/UserContext";
import "./login.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { doLogin } = useGlobalUserContext(UserContext);

  let navigate = useNavigate();
  function onSubmit(data) {
    console.log(data);
    doLogin(data)
      .then((res) => {
        swal({
          text: "Pavyko prisijungti!",
          icon: "success",
          button: "Puiku",
          timer: 5000,
        });
        if (res.status == 200) {
          setTimeout(() => {
            navigate("/allMovies");
          }, 1000);
        }
      })
      .catch(() => {
        swal({
          text: "Duomenys blogai suvesti, galimai rašybos klaida!",
          icon: "error",
          button: "Gerai",
          timer: 2000,
        });
      });
  }

  return (
    <div className="form-register">
      <form className="Login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="registation-title">Prisijungimas</div>

        <div className="reg-input-div">
          <input
            className="reg-input reg-input-top"
            type="email"
            id="email-login"
            placeholder="El. paštas"
            {...register("email", {
              required: "El.paštas būtinas",
              maxLength: {
                value: 50,
                message: "Nedaugiau kaip 50 simbolių",
              },
            })}
          />
          <span className="error text-danger fw-light">{errors.email?.message}</span>
        </div>

        <div className="form-input">
          <input
            className="reg-input"
            type="password"
            name="password"
            placeholder="Slaptažodis"
            {...register("password", {
              required: "Slaptažodis būtinas",
              minLength: {
                value: 8,
                message: "Turi būti bent 8 simboliai",
              },
              maxLength: {
                value: 20,
                message: "Nedaugiau kaip 20 simbolių",
              },
            })}
          />
          <span className="error text-danger fw-light">{errors.password?.message}</span>
        </div>
        <div className="registration-button-div">
          <button className="registration-button" type="submit">
            Prisijungti
          </button>

          <button className="registration-button" type="reset">
            Atšaukti
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;