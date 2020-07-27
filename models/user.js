const database = require('../database/database');
require('colors');

const collectionName = 'users';

class User {
  constructor(body) {
    this.nick = body.nick;
    this.name = body.name;
    this.password = body.password;
  }

  async save() {
    try {
      const db = database.getDb();
      const userCollection = db.collection(collectionName);
      await userCollection.updateOne(
        { nick: this.nick },
        { $set: this },
        { upsert: true }
      );
    } catch (e) {
      throw Error(`Error saving Users collection ${e}`);
    }
  }
}

module.exports = User;
