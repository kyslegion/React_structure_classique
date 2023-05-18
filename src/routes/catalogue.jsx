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
    <div className='Catalogue'>
      {data.map((item, index) => (
        <div key={index} className='container'>
          <img className='livre' src={`../../assets/images/Livres/Face/${item.Couverture}`} alt="Description de l'image" />
          <span>{item.Nom}</span>
        </div>
      ))}
    </div>
  );
}
