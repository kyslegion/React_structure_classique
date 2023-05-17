import('./schema.js')
  .then(module => {
    const Livre = module.default;

    const livreData = {
        Nom: 'Pierre, le chasseur et le loup',
        NomSansEspaces: 'Pierre_le_chasseur_et_le_loup',
        Presentation: "L’hiver arrive à Kovatchevitsa, petit village Bulgare isolé dans la montagne. Tout le monde se prépare à des temps difficiles. Boris en est certain : une meute de loups dirigée par le légendaire Grand Loup Gris rôde, prête à attaquer. Avec quelques chasseurs, le vieil homme décide de devancer la menace en affrontant les cols enneigés des Rhodopes. Son périple l’entraînera sur les traces de la voyante Baba Vanga et d’une énigmatique petite fille aux cheveux blancs. À Kovatchevitsa, Pierre, son petit-fils, est déterminé à protéger son village. Le jeune garçon ne manque pas d’astuce pour sauver ses amis des autres dangers qui les guettent… Inspiré par le célèbre conte Pierre et le loup de Sergueï Prokofiev, Pierre Brulhet nous emmène sur les territoires enneigés des Balkans pour un voyage glaçant, poétique et dépaysant qui saura vous faire voir les loups autrement. Un livre familial, à partir de 9 ans.",
        Description: '',
        Couverture: 'Pierre et le loup face.jpg',
        Prix: 12,
        Genre: 'Roman',
        Accroche: 'Trop cool waow !',
        Lien: 'Pierre_le_chasseur_et_le_loup',
        Auteur: 'Collectif',
        Edition: 'Luciféerines',
        Quantite: 'En stock',
        Annee: 2021,
        NbPages: 201,
        Ventes: 50,
        Arriere: 'Pierre et le loup arrière.jpg',
        Dos: 'Pierre et le loup dos.jpg'
    };

    Livre.findOne({ where: { NomSansEspaces: livreData.NomSansEspaces } })
      .then(existingLivre => {
        if (existingLivre) {
          console.log('Le livre existe déjà dans la base de données.');
        } else {
          Livre.create(livreData)
            .then(livre => {
              console.log('Livre inséré avec succès:', livre);
            })
            .catch(err => {
              console.error('Erreur lors de l\'insertion du livre:', err);
            });
        }
      })
      .catch(err => {
        console.error('Erreur lors de la recherche du livre:', err);
      });
  })
  .catch(error => {
    console.error('Erreur lors de l\'importation du module:', error);
  });
