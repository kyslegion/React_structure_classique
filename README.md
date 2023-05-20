# La structuration de base d'un projet Vite 
```
my-vite-project/
  ├── public/
  │   ├── index.html
  │   └── ...
  ├── src/
  │   ├── main.js
  │   ├── App.vue
  │   └── ...
  ├── assets/
  │   ├── images/
  │   ├── styles/
  │   └── ...
  ├── tests/
  ├── package.json
  ├── README.md
  └── ...
Note: index.html n'est lu que dans le dossier général et pas dans public

```
# Installation
```
npm install -g create-vite
create-vite mon-projet
cd mon-projet
npm install
npm run dev

```





# Gérer les erreurs de routes 

dans src/error-page.jsx
```
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
```

dans src/main.jsx
```
/* previous imports */
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

```




# Faire un Routeur
Il est recommandé de créer un fichier main.jsx pour importer les routes créées dans un dossier routes. Par exemple :
```
import Catalogue from "./routes/Home.jsx";
```
Utilisez createBrowserRouter pour définir les chemins d'accès aux routes :
```
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auteurs",
        element: <Auteurs />,
      },
      {
        path: "/catalogue",
        element: <Catalogue />,
      },
      {
        path: "/contact2",
        element: <Contact2 />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/presentation",
        element: <Presentation />,
      },
    ],
  },
]);

```
Ensuite, créez le point d'entrée (root) qui sera utilisé dans le fichier HTML, et ajoutez le router précédemment créé 
```
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

```
Dans un fichier appelé root.jsx ou home.jsx, par exemple, vous pouvez créer votre barre de navigation et utiliser Link pour indiquer quelle route doit être activée lorsqu'on clique sur un lien :
```
<li><Link to={`/catalogue`}>Catalogue</Link></li>

```
Dans le même fichier, ajoutez un composant Outlet qui déterminera où afficher le contenu de chaque route :
```
<Outlet />

```
Ensuite, vous pouvez créer des fichiers .jsx pour chaque page ou composant, par exemple catalogue.jsx, et utiliser Outlet pour décider où afficher ce code/DOM dans la page.



### PROXY et CORS
vite.config.js:
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':'http://localhost:4000'
    }
  }

})
server.js:
app.get('/livres/api/catalogue', (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

Si le serveur est par exemple sur le 4000 (client side) et que l'autre sur la 3000(base de données)
il faut faire en sorte d'utiliser un proxy pour ne pas avoir de problème de cors si le contenu est localhost:3000/bdd, ça doit être localhost:4000/bdd




### Envoyer contenu base de données dans le html 

import React, { useEffect, useState } from 'react';

export default function Catalogue() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5173/livre')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur de réseau : ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log('Réponse du serveur :', data);
        setData(data);
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
      });
  }, []);

  return (
    <div>
      <h1>Catalogue</h1>
      {data.map((item, index) => (
        <div key={index}>
          {item.Nom}
        </div>
      ))}
    </div>
  );
}
    useState([]) : La ligne const [data, setData] = useState([]) crée un état data initialisé avec un tableau vide. Cet état sera utilisé pour stocker les données récupérées du serveur.

    useEffect(() => {...}, []) : L'utilisation de useEffect permet d'exécuter du code au chargement du composant et à chaque fois que les dépendances changent. Dans ce cas, nous passons un tableau vide [] comme dépendance, ce qui signifie que le code à l'intérieur du useEffect ne sera exécuté qu'une seule fois au chargement du composant.

    fetch('http://localhost:5173/livre') : Cette ligne effectue une requête HTTP GET vers l'URL http://localhost:5173/livre pour récupérer les données du serveur.

    .then(response => response.json()) : Cette partie de la chaîne de promesses récupère la réponse HTTP et utilise la méthode .json() pour extraire les données JSON de la réponse. La méthode .json() renvoie également une promesse, donc nous pouvons enchaîner un autre .then() pour accéder aux données.

    .then(data => setData(data)) : Une fois que les données JSON sont disponibles, cette partie de la chaîne de promesses utilise la fonction setData pour mettre à jour l'état data avec les données récupérées. Cela déclenche également un rendu du composant pour afficher les données dans le JSX.

    .catch(error => console.error(error)) : Si une erreur se produit lors de la requête, cette partie de la chaîne de promesses gère l'erreur en l'affichant dans la console.

    {data.map(item => ...} : Dans le JSX, nous utilisons data.map pour parcourir chaque objet de data et générer un élément <div> pour chaque objet. La méthode .map crée un nouveau tableau avec les éléments générés. En utilisant {} dans le JSX, nous pouvons inclure des expressions JavaScript pour générer du contenu dynamique. Dans ce cas, nous affichons la valeur de la propriété Nom de chaque objet dans un élément <div>.

En résumé, le code utilise fetch pour récupérer les données du serveur, les stocke dans un état data, puis utilise data.map pour générer des éléments JSX pour chaque objet dans le tableau data, affichant ainsi les données dans le HTML.


### Créer une route dynamique par rapport a un element de base de données
app.get('/livre/:nom', (req, res) => {
  const nom = req.params.nom;
  // Utilisez le nom capturé pour effectuer une recherche dans votre base de données
  // et renvoyez les données correspondantes au format JSON
  // par exemple : const livre = db.collection('livres').findOne({ nom: nom });
  // res.json(livre);
});