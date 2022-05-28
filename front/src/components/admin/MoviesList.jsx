import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../api/library/MoviesAPI";
import Movie from "./Movie";
import { v4 as uuidv4 } from "uuid";

export default function MoviesList() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies().then((res) => {
      console.log(res.data.data);
      setMovies(res.data.data);
    });
  }, []);

  const displayMovies = movies.map((movie) => {
    return <Movie movie={movie} key={uuidv4()} />;
  });

  return (
    <div className="container">
      <h3> Rasta filmų: {displayMovies.length}</h3>
      <div className="row">{displayMovies}</div>
    </div>
  );
}
