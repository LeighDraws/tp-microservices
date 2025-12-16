const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let movies = [
  { id: 1, title: 'The Shawshank Redemption', year: 1994 },
  { id: 2, title: 'The Godfather', year: 1972 },
  { id: 3, title: 'The Dark Knight', year: 2008 },
];

// Get all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Get a movie by id
app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  res.json(movie);
});

// Create a new movie
app.post('/movies', (req, res) => {
  const newMovie = {
    id: movies.length + 1,
    title: req.body.title,
    year: req.body.year
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// Update a movie
app.put('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  movie.title = req.body.title;
  movie.year = req.body.year;

  res.json(movie);
});

// Delete a movie
app.delete('/movies/:id', (req, res) => {
  const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
  if (movieIndex === -1) return res.status(404).send('The movie with the given ID was not found.');

  const deletedMovie = movies.splice(movieIndex, 1);
  res.json(deletedMovie);
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
