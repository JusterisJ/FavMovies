const mongoose = require("mongoose");

const actorsSchema = mongoose.Schema({
  name: { type: String },
  surname: { type: String },
  age: { type: Number },
});

const moviesSchema = new mongoose.Schema({
  title: { type: String, default: "Pildoma..." },
  description: { type: String, default: "Pildoma..." },
  poster: { type: String, default: "https://cdn.posteritati.com/posters/000/000/008/704/the-last-unicorn-md-web.jpg" },
  length: { type: Number },
  genre: { type: Array },
  releaseDate: { type: Date },
  director: { type: String },
  //   writers: { type: Array },
  actors: [actorsSchema],
});

const Movies = new mongoose.model("Movies", moviesSchema);

module.exports = Movies;
