import React, { useEffect, useState } from "react";
import AddNewMovie from "./AddNewMovie";
import "./favMovies.css";
import { useGlobalUserContext } from "../context/UserContext";
import FavMoviesList from "./FavMoviesList";

export default function FavMovies() {
  const { userData, updateUserData } = useGlobalUserContext();
  const [user, setUser] = useState({});
  useEffect(() => setUser(userData), [userData]);
  return (
    <div className="favMovies-container">
      <AddNewMovie id={user._id} updateUserData={updateUserData} />
      <h2>Mano mėgstamiausi filmai</h2>
      <FavMoviesList user={user} updateUserData={updateUserData} />
    </div>
  );
}
