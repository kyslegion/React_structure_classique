#Comment doit être la structuration du dossier:

my-react-app/
  ├── public/
  │   ├── index.html
  │   └── ...
  ├── src/
  │   ├── components/
  │   │   ├── Component1.js
  │   │   ├── Component2.js
  │   │   └── ...
  │   ├── pages/
  │   │   ├── Home.js
  │   │   ├── About.js
  │   │   └── ...
  │   ├── App.js
  │   ├── index.js
  │   └── ...
  ├── assets/
  │   ├── images/
  │   ├── styles/
  │   └── ...
  ├── tests/
  ├── package.json
  ├── README.md
  └── ...


#Comment installer le routeur:
npm install react-router-dom
yarn add react-router-dom

#Dans votre fichier App.js:
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}

export default App;

#Créer des composants de page dans le dossier pages/ 
import React from 'react';

function Home() {
  return <h1>Accueil</h1>;
}

export default Home;

#Faire des liens de navigation entre les pages (Routeur) avec Link dans components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/about">À propos</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
