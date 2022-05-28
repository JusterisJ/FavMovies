const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const actorsSchema = mongoose.Schema({
  name: { type: String },
  surname: { type: String },
  age: { type: Number },
});

const favMovies = mongoose.Schema({
  title: { type: String, default: "Pildoma..." },
  poster: { type: String },
  length: { type: String },
  genre: { type: Array },
  releaseDate: { type: Date },
  director: { type: String },
  writers: { type: Array },
  actors: [actorsSchema],
});

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 100,
  },
  role: { type: String, default: "user" },
  favMovies: [favMovies],
});

usersSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 8
  this.password = await bcrypt.hash(this.password, 8);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

usersSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Users = new mongoose.model("Users", usersSchema);

module.exports = Users;
