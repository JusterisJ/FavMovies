import axiosUser from "../apiUsers";

export async function createUser(user) {
  const res = await axiosUser.post("/register", JSON.stringify(user));
  return res;
}
export async function getEmail(email) {
  const res = await axiosUser.post("/checkEmail", JSON.stringify(email));
  return res.data.data;
}
export async function getUserById(id) {
  const res = await axiosUser.get(`/${id}`);
  return res;
}
export async function loginUser(data) {
  const res = await axiosUser.post("/login", JSON.stringify(data));
  return res;
}
export async function addFavMovie(id, movie) {
  const res = await axiosUser.patch(`movies/add/${id}`, JSON.stringify(movie));
  return res;
}
export async function deleteFavMovie(id, movieId) {
  console.log(id, movieId);
  const res = await axiosUser.patch(`movies/delete/${id}/${movieId}`);
  return res;
}
