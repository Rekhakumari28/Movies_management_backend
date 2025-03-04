const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieTitle: String,
  director: String,
  genre: String,
});

const MyMovies = mongoose.model("MyMovies", movieSchema);

module.exports = { MyMovies };
