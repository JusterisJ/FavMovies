const mongoose = require("mongoose");

const actorsSchema = mongoose.Schema({
  name: { type: String },
  surname: { type: String },
  age: { type: Number },
});

const moviesSchema = new mongoose.Schema({
  title: { type: String, default: "Pildoma..." },
  poster: { type: String },
  length: { type: String },
  genre: { type: Array },
  releaseDate: { type: Date },
  director: { type: String },
  //   writers: { type: Array },
  actors: [actorsSchema],
});

const Movies = new mongoose.model("Movies", moviesSchema);

module.exports = Movies;
