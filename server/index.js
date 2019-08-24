const { connection } = require('./db/index');
const app = require('./app/index');

const PORT = process.env.PORT || 3000;

const promisedListen = port =>
  new Promise((resolve, reject) => {
    try {
      app.listen(port);
      resolve();
    } catch (error) {
      reject(error);
    }
  });

connection
  .sync({ force: false })
  .then(() => promisedListen(PORT))
  .then(() => console.log(`Listening at port: ${PORT}`))
  .catch(console.error);
