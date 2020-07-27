const express = require('express');
const apiRouter = require('./router/apiRouter');
const userRouter = require('./router/userRouter');
const database = require('./database/databaseMongoose');
require('colors');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(apiRouter);
app.use(userRouter);

app.listen(port, async () => {
  try {
    await database.initializeMongo();
  } catch (e) {
    console.log(e.message.red);
  }
  console.log(`Server is up on ${port}`);
});
