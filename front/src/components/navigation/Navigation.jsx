import React from "react";
import { Link } from "react-router-dom";
import "./navigation.css";
import { useGlobalUserContext } from "../context/UserContext";
import swal from "sweetalert";

export default function Navigation() {
  const { userData, signOut } = useGlobalUserContext();
  function hideButton() {
    if (Object.keys(userData).length == 0) {
      return "d-none";
    }
  }
  function hideLogin() {
    if (Object.keys(userData).length > 0) {
      return "d-none";
    }
  }

  return (
    <div>
      <ul>
        <li className={`${hideButton()}`}>
          <Link to="/allMovies">
            <button className={`navigation-button `}>
              <p>Visi filmai</p>
            </button>
          </Link>
        </li>
        <li className={`${hideLogin("reverse")}`}>
          <Link to="/register">
            <button className={`navigation-button `}>
              <p>Registracija</p>
            </button>
          </Link>
        </li>
        <li className={`${hideLogin("reverse")}`}>
          <Link to="/login">
            <button className={`navigation-button `}>
              <p>Prisijungimas</p>
            </button>
          </Link>
        </li>
        <li className={`${hideButton()} `}>
          <Link to="/favMovies">
            <button className={`navigation-button `}>
              <p>Mano filmai</p>
            </button>
          </Link>
        </li>
        <li className={`${userData.role == "admin" ? true : "d-none"} `}>
          <Link to="/admin">
            <button className={`navigation-button `}>
              <p>Admin</p>
            </button>
          </Link>
        </li>
        <li className={`${hideButton()} `}>
          <Link to="/favMovies">
            <button
              className={`navigation-button `}
              onClick={() => {
                swal({
                  title: "Ar tikrai atsijungti?",
                  icon: "warning",
                  buttons: ["Atšaukti", "Gerai"],
                }).then((isConfirm) => {
                  if (isConfirm) {
                    signOut();
                  }
                });
              }}
            >
              <p>Atsijungti</p>
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
