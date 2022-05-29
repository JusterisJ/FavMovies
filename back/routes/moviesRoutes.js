const express = require("express");

const { getAllMovies, createMovie, deleteMovie, editMovie } = require("../controllers/moviesController");

const router = express.Router();
router.route("/").get(getAllMovies).post(createMovie);
router.route("/delete/:id").get(deleteMovie);
router.route("/edit/:id").patch(editMovie);

module.exports = router;
