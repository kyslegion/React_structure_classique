import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Auteurs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5173/auteurs')
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
    <div className='Catalogue'>
      {data.map((item) => (
        <div key={item.ID} className='container'>
          <Link to={`/auteur/${item.ID}`}>
            <img className='livre' src={`../../assets/images/Auteurs/${item.Photo}`} alt="Description de l'image" />
            <span>{item.PrenomNom}</span>
          </Link>
        </div>
      ))}
    </div>
  );
  
}
