const express = require("express");

const { getAllUsers, createUser, getEmail, getUserById, loginUser, addFavMovie, deleteFavMovie, updateFavMovie, likeMovie, getLikedMovies, unlikeMovie, protect } = require("../controllers/usersController");

const router = express.Router();
router.route("/movies/getLiked").post(getLikedMovies);
router.route("/movies/like/:id/:movieId").get(protect, likeMovie);
router.route("/movies/unlike/:id/:movieId").get(protect, unlikeMovie);

router.route("/movies/update/:id/:movieId").patch(protect, updateFavMovie);
router.route("/movies/add/:id/").patch(protect, addFavMovie);
router.route("/movies/delete/:id/:movieId").patch(protect, deleteFavMovie);
router.route("/login").post(loginUser);
router.route("/register").post(createUser);
router.route("/checkEmail").post(getEmail);
router.route("/:id").get(protect, getUserById);

module.exports = router;
