import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: './database.db'
});

const Livre = sequelize.define('Livre', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nom: {
    type: DataTypes.STRING
  },
  NomSansEspaces: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Presentation: {
    type: DataTypes.STRING(10000),
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING
  },
  Couverture: {
    type: DataTypes.STRING
  },
  Prix: {
    type: DataTypes.FLOAT
  },
  Genre: {
    type: DataTypes.STRING
  },
  Accroche: {
    type: DataTypes.STRING
  },
  Lien: {
    type: DataTypes.STRING
  },
  Auteur: {
    type: DataTypes.STRING
  },
  Edition: {
    type: DataTypes.STRING
  },
  Quantite: {
    type: DataTypes.INTEGER
  },
  Annee: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  NbPages: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Ventes: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  Arriere: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Dos: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Livres',
  timestamps: false
});

export default Livre;
