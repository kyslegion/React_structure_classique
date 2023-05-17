const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const { Create, ReadAllArticles, ReadRecentArticles, FetchArticle } = require('./src/controllers/article.controller')

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuration du module de chargement de fichiers
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/page2', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/formulaire.html'));
});

app.get('/all-articles', (req, res) => {
  ReadAllArticles()
    .then((articles) => {
      res.json(articles);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des articles :', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des articles.' });
    });
});
app.post('/upload', upload.single('image'), function(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier n\'a été téléchargé.' });
  }
  res.json({ url: '/uploads/' + req.file.filename });
});
// Route pour récupérer les 3 derniers articles
app.get('/recent-articles', (req, res) => {
  ReadRecentArticles()
    .then((articles) => {
      res.json(articles);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des articles :', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des articles.' });
    });
});
app.get('/article/:id', (req, res) => {
  const id = req.params.id;
  FetchArticle(id)
    .then((article) => {
      res.json(article);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération de l\'article :', error);
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'article.' });
    });
});
app.post('/formulaire', (req, res) => {
  console.log("La poste a récupéré le courrier ");
  let newArticle=req.body;
  Create(newArticle);
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
