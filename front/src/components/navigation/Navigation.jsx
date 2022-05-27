import React from "react";
import { Link } from "react-router-dom";
import "./navigation.css";

export default function Navigation() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/allMovies">
            <button className={`navigation-button `}>
              <p>Pradžia</p>
            </button>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <button className={`navigation-button `}>
              <p>registracija</p>
            </button>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <button className={`navigation-button `}>
              <p>Mano filmai</p>
            </button>
          </Link>
        </li>
        <li>
          <Link to="/favMovies">
            <button className={`navigation-button `}>
              <p>Mano filmai</p>
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
