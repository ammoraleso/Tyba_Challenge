const mongodb = require('mongodb');
require('colors');

const { MongoClient } = mongodb;

let database;
let client;

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const DATABASE_URL = 'mongodb://127.0.0.1:.27017/ApiTest';

exports.initializeMongo = async () => {
  try {
    client = await MongoClient.connect(DATABASE_URL, mongoConfig);
    database = client.db();
    console.log('Info'.green, 'Connection Established');
  } catch (error) {
    throw new Error(`Error initializing mongo ${error}`);
  }
};

exports.getDb = () => {
  if (!database) {
    throw new Error('No database found');
  }
  return database;
};

exports.close = async () => {
  try {
    await client.close();
    logger.info('Connection Close', 'color: green');
  } catch (error) {
    throw new Error('The connection could not be close');
  }
};
