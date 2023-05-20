import express from 'express';
import { Livres, Auteurs } from './schema.js';

const app = express();
const port = 4000;



app.get('/livre', (req, res) => {
  Livres.findAll()
    .then(livres => {
      const livresObjets = livres.map(livre => livre.toJSON());
      console.log(livresObjets);
      res.json(livresObjets); // Envoie les données au format JSON en réponse à la requête
    })
    .catch(err => {
      console.error('Erreur lors de la récupération des éléments :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des éléments.' });
    });
});
app.get('/auteur/:ID', (req, res) => {
  const id = req.params.ID; // Utilisez "ID" au lieu de "id"

  Auteurs.findByPk(id)
    .then(auteur => {
      if (auteur) {
        const auteurObjet = auteur.toJSON();
        console.log(auteurObjet);
        res.json(auteurObjet); // Envoie les données de l'auteur au format JSON en réponse à la requête
      } else {
        res.status(404).json({ message: 'Auteur non trouvé.' });
      }
    })
    .catch(err => {
      console.error('Erreur lors de la récupération de l\'auteur :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'auteur.' });
    });
});




app.get('/auteurs', (req, res) => {
  Auteurs.findAll()
    .then(auteurs => {
      const auteursObjets = auteurs.map(auteur => auteur.toJSON());
      console.log(auteursObjets);
      res.json(auteursObjets); // Envoie les données au format JSON en réponse à la requête
    })
    .catch(err => {
      console.error('Erreur lors de la récupération des auteurs :', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des auteurs.' });
    });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
