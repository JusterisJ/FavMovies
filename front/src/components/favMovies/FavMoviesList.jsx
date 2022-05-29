import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import "./favMovies.css";
import { v4 as uuidv4 } from "uuid";
import { getLikedMovies } from "../../api/library/UsersAPI";

export default function FavMoviesList({ user, updateUserData }) {
  let [likedMovies, setLikedMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);
  const [genreFilter, setGenreFilter] = useState(false);
  const [titleFilter, setTitleFilter] = useState(false);
  const [searchOptions, setSearchOptions] = useState(false);

  useEffect(() => {
    if (user.hasOwnProperty("email")) {
      setFavMovies(user.favMovies);
      let moviesToGet = [];

      user.likedMovies.forEach((movie) => {
        moviesToGet.push(movie.id);
      });
      getLikedMovies(moviesToGet).then((res) => {
        // while using setLikedMovies was getting infinte loop
        setLikedMovies(res.data.data);
        console.log(res.data.data);
      });
      //favLikedMovies = [...favMovies, ...likedMovies];
    }
  }, [user]);
  if (likedMovies != undefined) {
    var favLikedMovies = favMovies.concat(likedMovies);
  }

  let displayMovies;

  if (favMovies !== undefined) {
    displayMovies = favLikedMovies
      .filter((movie) => {
        if (genreFilter != false && titleFilter != false) {
          return movie.genre.includes(genreFilter) && movie.title.includes(titleFilter);
        } else if (genreFilter != false) {
          return movie.genre == genreFilter;
        } else if (titleFilter != false) {
          return movie.title.includes(titleFilter);
        } else {
          return movie;
        }
      })
      .map((movie) => {
        return <Movie movie={movie} userId={user._id} updateUserData={updateUserData} key={uuidv4()} />;
      });
  }

  return (
    <>
      <button className="btn btn-secondary" onClick={() => setSearchOptions(!searchOptions)}>
        Ieškoti filmų
      </button>{" "}
      {searchOptions && (
        <div className="search-options container ">
          <div className="row text-start">
            <div className="col-6 offset-3">
              <select className="form-control" onChange={(e) => setGenreFilter(e.target.options[e.target.options.selectedIndex].value)}>
                <option value="false">--Pasirinkite žanrą--</option>
                <option value="action">Veiksmo</option>
                <option value="comedy">Komedija</option>
                <option value="horror">Siaubo</option>
                <option value="drama">Drama</option>
                <option value="thriller">Trileris</option>
              </select>
            </div>
            <div className="col-6 offset-3">
              {" "}
              <input
                className="form-control"
                type="text"
                placeholder="Filmo pavadinimas"
                onChange={(e) => {
                  setTitleFilter(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="col-6 offset-3 mt-2 mb-2 fs-4">Rasta filmų: {displayMovies.length}</div>
            <hr />
          </div>
        </div>
      )}
      <div className="moviesList-container container mt-5">{displayMovies}</div>
    </>
  );
}
