import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AuteurDetail() {
    const { ID } = useParams(); // Utilisez "ID" au lieu de "id"
    const [auteur, setAuteur] = useState(null);
  
    useEffect(() => {
      fetch(`http://localhost:5173/auteur/${ID}`) // Utilisez "ID" au lieu de "id"
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur de réseau : ' + response.status);
          }
          return response.json();
        })
        .then(data => {
          console.log('Réponse du serveur :', data);
          setAuteur(data);
        })
        .catch(error => {
          console.error('Erreur lors de la requête :', error);
        });
    }, [ID]); // Utilisez "ID" au lieu de "id"
  
    if (!auteur) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className='AuteurDetail'>
        <img className='livre' src={`../../assets/images/Auteurs/${auteur.Photo}`} alt="Description de l'image" />
        <h2>{auteur.PrenomNom}</h2>
        <p>{auteur.Presentation}</p>
        {/* Afficher d'autres informations sur l'auteur ici */}
      </div>
    );
  }
  

export default AuteurDetail;
