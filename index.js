const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("./db/db.connection");
const { MyMovies } = require("./models/movie.model");

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/movies", async (req, res) => {
  try {
    const movies = await MyMovies.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/movies", async (req, res) => {
  const { movieTitle, director, genre } = req.body;

  try {
    const movies = new MyMovies({ movieTitle, director, genre });
    await movies.save();
    console.log(movies)
    res.status(201).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", error });
  }
});

app.delete("/movies/:id", async (req, res) => {
  const movieId = req.params.id;

  try {
    const deletedMovies = await MyMovies.findByIdAndDelete(movieId);

    if (!deletedMovies) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
      movie: deletedMovies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
