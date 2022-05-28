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
exports.createMovie = async (req, res) => {
  // movieModel only applies default value if it is undefined
  // getting empty string from form so making it undefined
  if (req.body.poster.length == 0) {
    req.body.poster = undefined;
  }
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
