const server = require('./src/app.js');
const { conn } = require('./src/db.js');


conn.sync({ force: true }).then(() => {
  server.listen(6604, () => {
    console.log('%s listening at server deploy');
  });
});