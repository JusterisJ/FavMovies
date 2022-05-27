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
      <h1>Mano mėgstamiausi filmai</h1>
      <AddNewMovie id={user._id} updateUserData={updateUserData} />
      <FavMoviesList user={user} updateUserData={updateUserData} />
    </div>
  );
}
