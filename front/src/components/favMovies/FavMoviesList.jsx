import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import "./favMovies.css";

export default function FavMoviesList({ user, updateUserData }) {
  const [favMovies, setFavMovies] = useState([]);
  useEffect(() => setFavMovies(user.favMovies), [user]);

  let displayMovies;
  if (favMovies !== undefined) {
    displayMovies = favMovies.map((movie) => {
      return <Movie movie={movie} userId={user._id} updateUserData={updateUserData} />;
    });
  }

  return <div className="moviesList-container container mt-5">{displayMovies}</div>;
}
