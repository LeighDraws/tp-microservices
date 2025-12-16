const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const moviesProxy = createProxyMiddleware({
  target: 'http://api-movies:3001',
  changeOrigin: true,
  pathRewrite: {
    '^/movies': '/movies',
  },
});

const musicProxy = createProxyMiddleware({
  target: 'http://api-music:2500',
  changeOrigin: true,
  pathRewrite: {
    '^/musics': '/musics',
  },
});


app.use('/movies', moviesProxy);
app.use('/musics', musicProxy);

const port = 8080;
app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});
