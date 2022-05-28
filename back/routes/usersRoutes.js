const express = require("express");

const { getAllUsers, createUser, getEmail, getUserById, loginUser, addFavMovie, deleteFavMovie, updateFavMovie, likeMovie } = require("../controllers/usersController");

const router = express.Router();
router.route("/movies/like/:id/:movieId").get(likeMovie);
router.route("/movies/update/:id/:movieId").patch(updateFavMovie);
router.route("/movies/add/:id/").patch(addFavMovie);
router.route("/movies/delete/:id/:movieId").patch(deleteFavMovie);
router.route("/login").post(loginUser);
router.route("/register").post(createUser);
router.route("/checkEmail").post(getEmail);
router.route("/:id").get(getUserById);

module.exports = router;
