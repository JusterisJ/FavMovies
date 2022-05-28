import React, { createContext, useState, useContext, useEffect } from "react";
import { getAllMovies } from "../../api/library/MoviesAPI";

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);
  function getMovies() {
    getAllMovies().then((res) => {
      setMovies(res.data.data);
    });
  }

  return (
    <MoviesContext.Provider
      value={{
        movies,
        getMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useGlobalMoviesContext = () => {
  return useContext(MoviesContext);
};

export { MoviesContext, MoviesProvider };
