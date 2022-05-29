import React from "react";
import { useForm } from "react-hook-form";
import "./register.css";
import { createUser, getEmail } from "../../api/library/UsersAPI";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let password = watch("password");
  let navigate = useNavigate();

  function registerUser(data) {
    createUser(data)
      .then(() => {
        swal({
          text: "Registracija sėkminga, dabar galite prisijungti",
          icon: "success",
          button: "Gerai",
          timer: 2000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch(() => {
        swal({
          text: "Registacija nepavyko, bandykite dar kartą",
          icon: "success",
          button: "Gerai",
          timer: 2000,
        });
      });
  }
  return (
    <div className="form-register">
      <form onSubmit={handleSubmit(registerUser)}>
        <div className="registation-title">Registracija</div>

        <div className="reg-input-div">
          <input
            className="reg-input reg-input-top"
            type="text"
            id="name"
            placeholder="Vardas"
            {...register("name", {
              required: "Vardas būtinas",
              maxLength: 20,
              minLength: 2,
              pattern: /^[[^A-Za-ząčęėįšųūžĄČĘĖĮŠŲŪŽ0-9]*$/i,
            })}
          />
          <div>
            <span className="text-danger fw-light">
              {errors.name?.type === "pattern" && "Negali būti specialų simbolių"}
              {errors.name?.type === "required" && "Vardas būtinas"}
              {errors.name?.type === "minLength" && "Turi būti bent 2 simboliai"}
              {errors.name?.type === "maxLength" && "Ne daugiau kaip 12 simbolių"}
            </span>
          </div>
        </div>
        <div className="form-input">
          <input
            className="reg-input"
            type="email"
            id="email-register"
            placeholder="El. paštas"
            {...register("email", {
              required: true,
              maxLength: 50,
              validate: {
                checkEmail: async (value) => {
                  let pass = await getEmail({ email: value });

                  return !pass;
                },
              },
            })}
          />
          <div>
            <span className="text-danger fw-light">
              {errors.email?.type === "required" && "El.paštas būtinas"}
              {errors.email?.type === "maxLength" && "Ne daugiau kaip 50 simbolių"}
              {errors.email?.type === "checkEmail" && "El. paštas jau naudojamas."}
            </span>
          </div>
        </div>
        <div className="form-input">
          <input
            className="reg-input"
            type="password"
            id="password"
            name="password"
            placeholder="Slaptažodis"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 20,
              pattern: /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9?!@#$%^&*]/,
            })}
          />
          <div>
            <span className="text-danger fw-light">
              {errors?.password?.type === "required" && "Slaptažodis būtinas"}
              {errors?.password?.type === "minLength" && "Turi būti bent 8 simboliai"}
              {errors?.password?.type === "maxLength" && "Ne daugiau kaip 20 simbolių"}
              {errors?.password?.type === "pattern" && "Turi būti bent 1 didžioji raidė ir bent 1 simbolis"}
            </span>
          </div>
        </div>
        <div className="form-input">
          <input
            className="reg-input"
            type="password"
            id="passwordRepeat"
            placeholder="Pakartokite slaptažodį"
            {...register("passwordRepeat", {
              required: true,
              minLength: 8,
              maxLength: 20,
              validate: { passwordMatch: (value) => value == password },
            })}
          />
          <div>
            <span className="text-danger fw-light">
              {errors.passwordRepeat?.type === "required" && "Slaptažodis būtinas"}
              {errors.passwordRepeat?.type === "minLength" && "Turi būti bent 8 simboliai"}
              {errors.passwordRepeat?.type === "maxLength" && "Ne daugiau kaip 20 simbolių"}
              {errors.passwordRepeat?.type === "passwordMatch" && "Slaptažodžiai turi sutapti"}
            </span>
          </div>
          <p className="mt-2">
            Turite paskyrą? <Link to="/login">Prisijungti</Link>
          </p>
        </div>
        <div className="registration-button-div">
          <button className="registration-button" type="submit">
            Registruotis
          </button>

          <button className="registration-button" type="reset">
            Atšaukti
          </button>
        </div>
      </form>
    </div>
  );
}
