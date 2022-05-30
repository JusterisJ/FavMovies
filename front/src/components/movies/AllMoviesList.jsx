import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { useGlobalMoviesContext } from "../context/MoviesContext";
import Movie from "./Movie";

export default function AllMoviesList() {
  const { movies } = useGlobalMoviesContext();
  const [genreFilter, setGenreFilter] = useState(false);
  const [titleFilter, setTitleFilter] = useState(false);
  const [searchOptions, setSearchOptions] = useState(false);

  let displayMovies;
  if (movies !== undefined) {
    displayMovies = movies
      .filter((movie) => {
        if (genreFilter != false && titleFilter != false) {
          return movie.genre.includes(genreFilter) && movie.title.includes(titleFilter);
        } else if (genreFilter != false) {
          return movie.genre.includes(genreFilter);
        } else if (titleFilter != false) {
          return movie.title.includes(titleFilter);
        } else {
          return movie;
        }
      })
      .map((movie) => {
        return <Movie movie={movie} key={uuidv4()} />;
      });
  }

  return (
    <div className="container ">
      <button className="btn btn-secondary mt-4 mb-4" onClick={() => setSearchOptions(!searchOptions)}>
        Ieškoti filmų {searchOptions ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
      </button>{" "}
      {searchOptions && (
        <div className="search-options container ">
          <form>
            <div className="row ">
              <div className="col-7 ps-0">
                <select className="form-control mt-2" style={{ width: "70%" }} onChange={(e) => setGenreFilter(e.target.options[e.target.options.selectedIndex].value)}>
                  <option value="false">--Pasirinkite žanrą--</option>
                  <option value="action">Veiksmo</option>
                  <option value="comedy">Komedija</option>
                  <option value="horror">Siaubo</option>
                  <option value="drama">Drama</option>
                  <option value="thriller">Trileris</option>
                </select>
              </div>
              <div className="col-7 ps-0 ">
                {" "}
                <input
                  className="form-control mt-3"
                  type="text"
                  placeholder="Filmo pavadinimas"
                  style={{ width: "70%" }}
                  onChange={(e) => {
                    setTitleFilter(e.target.value);
                  }}
                />
              </div>
              <div className="col-6 ps-0  mt-3 mb-4">
                <button
                  type="reset"
                  onClick={() => {
                    {
                      setGenreFilter(false);
                      setTitleFilter(false);
                    }
                  }}
                  className="btn btn-danger"
                >
                  Anuliuoti paiešką
                </button>
              </div>

              <hr />
            </div>
          </form>
        </div>
      )}
      <h3> Rasta filmų: {displayMovies.length}</h3>
      <div className="row">{displayMovies}</div>
    </div>
  );
}
