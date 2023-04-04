require('dotenv').config();
const { Sequelize } = require ("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;
const path = require ("path");
const fs = require ("fs");

// const sequelize = new Sequelize(
//     `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/games`,
//     {
//         logging: false,
//         native: false,  
//     }
// )
const sequelize = new Sequelize(
DB_DEPLOY,    {
        logging: false,
        native: false,  
    }
)

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
   .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

modelDefiners.forEach((model) => model(sequelize));
   
    let entries = Object.entries(sequelize.models);
    let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Videogame, Platform, Genre } = sequelize.models;


User.belongsToMany(Videogame, { through: 'user_videogame'}); 
Videogame.belongsToMany(User, { through: 'videogame_user'});

Videogame.belongsToMany(Platform, {through: 'videogame_platform'});
Platform.belongsToMany(Videogame, {through: 'platform_videogame'});

Videogame.belongsToMany(Genre, {through: 'videogame_genre'});
Genre.belongsToMany(Videogame, {through: 'genre_videogame'});

Genre.belongsToMany(Platform, {through: 'genre_platform'});
Platform.belongsToMany(Genre, {through: 'platform_genre'});



module.exports = {...sequelize.models, conn:sequelize};