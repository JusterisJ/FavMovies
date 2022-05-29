import axiosUser from "../apiMovies";

export async function createMovie(movie) {
  const res = await axiosUser.post("/", JSON.stringify(movie));
  return res;
}
export async function getAllMovies() {
  const res = await axiosUser.get("/");
  return res;
}

export async function deleteMovie(id) {
  const res = await axiosUser.get(`/delete/${id}`);
  return res;
}

export async function editMovie(id, data) {
  const res = await axiosUser.patch(`/edit/${id}`, JSON.stringify(data));
  return res;
}
