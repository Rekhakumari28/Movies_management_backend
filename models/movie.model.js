const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieTitle: String,
  director: String,
  genre: String,
  releaseYear: Number,
  actors:String,
  rating: Number
});

const MyMovies = mongoose.model("MyMovies", movieSchema);

module.exports = { MyMovies };
