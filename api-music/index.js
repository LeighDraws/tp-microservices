const express = require('express');
const app = express();
const port = 2500;

// Middleware pour parser le JSON
app.use(express.json());

// Base de données "en mémoire"
let musics = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen' },
  { id: 2, title: 'Stairway to Heaven', artist: 'Led Zeppelin' },
  { id: 3, title: 'Hotel California', artist: 'Eagles' }
];
let nextId = 4;

// Routes CRUD

// GET /musics - Récupérer toutes les musiques
app.get('/musics', (req, res) => {
  res.json(musics);
});

// GET /musics/:id - Récupérer une musique par son ID
app.get('/musics/:id', (req, res) => {
  const music = musics.find(m => m.id === parseInt(req.params.id));
  if (!music) {
    return res.status(404).send('Music not found');
  }
  res.json(music);
});

// POST /musics - Créer une nouvelle musique
app.post('/musics', (req, res) => {
  const { title, artist } = req.body;
  if (!title || !artist) {
    return res.status(400).send('Title and artist are required');
  }
  const newMusic = {
    id: nextId++,
    title,
    artist
  };
  musics.push(newMusic);
  res.status(201).json(newMusic);
});

// PUT /musics/:id - Mettre à jour une musique
app.put('/musics/:id', (req, res) => {
  const music = musics.find(m => m.id === parseInt(req.params.id));
  if (!music) {
    return res.status(404).send('Music not found BLablabla');
  }

  const { title, artist } = req.body;
  if (title) {
    music.title = title;
  }
  if (artist) {
    music.artist = artist;
  }

  res.json(music);
});

// DELETE /musics/:id - Supprimer une musique
app.delete('/musics/:id', (req, res) => {
  const musicIndex = musics.findIndex(m => m.id === parseInt(req.params.id));
  if (musicIndex === -1) {
    return res.status(404).send('Music not found');
  }

  musics.splice(musicIndex, 1);
  res.status(204).send();
});


app.listen(port, () => {
  console.log(`Api-music listening at http://localhost:${port}`);
});
