const express = require("express");

const { getAllMovies, createNewMovie } = require("../controllers/moviesController");

const router = express.Router();
router.route("/").get(getAllMovies).post(createNewMovie);

module.exports = router;
