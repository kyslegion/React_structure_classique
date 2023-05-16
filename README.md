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

dans src/main.jsx

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