const Sequelize = require("sequelize");



const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,    
    pool: {
      max:5,
      min: 0,
      acquire: process.env.DB_POOL_ACQUIRE,
      idle: process.env.DB_POOL_IDLE
    }
  }
);

sequelize
.authenticate()
.then(() => console.log('Connection to database has been established successfully.'))
.catch(err => console.error('Unable to connect to the database:', err));
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.note = require("../models/note.model.js")(sequelize, Sequelize);



module.exports = db;