const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  nick: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

userSchema.statics.findByCredentials = async (nick, password) => {
  const user = await User.findOne({ nick });
  if (!user) {
    throw new Error('Unable to login');
  }
  if (user.password !== password) {
    throw new Error('Unable to login');
  }
  return user;
};

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'TOKEN_SECRET');
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
