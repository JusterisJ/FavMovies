const Movies = require("../models/movieModel");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movies.find();
    res.status(200).json({
      status: "success",
      data: movies,
    });
  } catch (err) {
    res.staus(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.createNewMovie = async (req, res) => {
  try {
    const result = await Movies.create(req.body);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
