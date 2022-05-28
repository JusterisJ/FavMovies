import axiosUser from "../apiMovies";

export async function createMovie(movie) {
  const res = await axiosUser.post("/", JSON.stringify(movie));
  return res;
}