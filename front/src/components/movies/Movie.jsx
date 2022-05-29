import React, { useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { likeMovie, unlikeMovie } from "../../api/library/UsersAPI";
import { useGlobalUserContext } from "../context/UserContext";

export default function Movie({ movie }) {
  const { userData, updateUserData } = useGlobalUserContext();

  useEffect(() => {}, [userData]);

  //TODO make better, .replace in cycle?
  function translateGenres(arr) {
    let translated = [];
    for (var i = 0; i < arr.length; i++) {
      translated[i] = arr[i].replace("action", "Veiksmo").replace("horror", "Siaubo").replace("comedy", "Komedija").replace("drama", "Drama").replace("thriller", "Trileris");
    }
    return translated;
  }
  function likeOrUnlikeMovie() {
    userData.likedMovies.filter((object) => object.id == movie._id)
      ? unlikeMovie(userData._id, movie._id)
      : likeMovie(userData._id, movie._id).then((res) => {
          updateUserData(userData._id);
        });
  }

  console.log(userData.likedMovies.filter((object) => object.id == movie._id));

  return (
    <div className="col-4">
      <div className="card">
        <img src={movie.poster} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            {movie.title}{" "}
            <button onClick={() => likeOrUnlikeMovie()} className="button-favorite">
              {userData.likedMovies.filter((object) => object.id == movie._id) ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
            <p>{translateGenres(movie.genre).join("/")}</p>
          </h5>
          <p className="card-text">{movie.description}</p>
          <p className="card-text">Trukmė: {movie.length} min.</p>
          <p className="card-text">Režisierius: {movie.director}</p>
          <p className="card-text">Išleista: {movie.releaseDate} </p>
        </div>
      </div>
    </div>
  );
}
