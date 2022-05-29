const Users = require("../models/userModel");
const Movies = require("../models/movieModel");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();
    res.status(200).json({
      status: "success",
      length: allUsers.length,
      data: allUsers,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// exports.createUser = async (req, res) => {
//   try {
//     const result = await Users.create(req.body);

//     res.status(200).json({
//       status: "success",
//       data: result,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };
exports.createUser = async (req, res) => {
  console.log(`a`);
  try {
    const token = jwt.sign({ name: req.body.name }, "labas", {
      expiresIn: "90d",
    });
    console.log(token);
    const newUser = await Users.create({
      token: token,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    console.log("Signup tokenas");
    console.log(token);

    res.status(200).json({
      status: "success",
      token: token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      status: "fail",
      message: "Neįvestas prisijungimo vardas arba slaptažodis.",
    });
  }

  const user = await Users.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(404).json({
      status: "fail",
      message: "Neteisingas prisijungimo vardas arba slaptažodis",
    });
  }

  const token = jwt.sign({ id: user._id }, "labas", {
    expiresIn: "90d",
  });

  res.status(200).json({
    status: "success",
    token: token,
    user: user,
  });
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access.",
    });
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, "labas");

  // 3) Check if user still exists
  const currentUser = await Users.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      status: "fail",
      message: "The user belonging to this token does no longer exist.",
    });
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};

exports.getEmail = async (req, res) => {
  try {
    const result = await Users.exists(req.body);

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

exports.getUserById = async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await Users.findById(req.params.id);

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

exports.addFavMovie = async (req, res) => {
  try {
    const result = await Users.findOneAndUpdate({ _id: req.params.id }, { $push: { favMovies: req.body } });
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

exports.deleteFavMovie = async (req, res) => {
  try {
    const result = await Users.findOneAndUpdate({ _id: req.params.id }, { $pull: { favMovies: { _id: req.params.movieId } } });
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

exports.updateFavMovie = async (req, res) => {
  try {
    const result = await Users.findOneAndUpdate(
      { _id: req.params.id, "favMovies._id": req.params.movieId },
      {
        $set: {
          "favMovies.$.title": req.body.title,
        },
      }
    );
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
exports.likeMovie = async (req, res) => {
  console.log(`liking movie`);
  try {
    const result = await Users.findOneAndUpdate({ _id: req.params.id }, { $push: { likedMovies: { id: req.params.movieId } } });
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
exports.unlikeMovie = async (req, res) => {
  console.log(`UNLIKING`);
  try {
    const result = await Users.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $pull: { likedMovies: { id: req.params.movieId } } }
    );
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

exports.getLikedMovies = async (req, res) => {
  let ids = req.body;

  try {
    const result = await Movies.find({ _id: { $in: ids } });

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (err) {}
};
