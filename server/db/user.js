const { Model, STRING, BOOLEAN } = require('sequelize');
const bcrypt = require('bcryptjs');
const connection = require('./connection');
const { AuthError } = require('../../utils/backend');

class User extends Model {}
User.init(
  {
    firstName: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imageURL: {
      type: STRING,
      defaultValue:
        'https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png',
      validate: {
        isUrl: true,
      },
    },
    isAdmin: {
      type: BOOLEAN,
      defaultValue: false,
    },
    googleId: {
      type: STRING,
      unique: true,
    },
  },
  { sequelize: connection, modelName: 'user' }
);

User.beforeCreate(async instance => {
  if (instance.googleId) {
    return;
  }
  const hash = await User.hash(instance.password);
  instance.password = hash;
  return instance;
});

User.beforeUpdate(async instance => {
  if (instance.changed('password')) {
    const hash = await User.hash(instance.password);
    instance.password = hash;
  }
  return instance;
});

User.prototype.toJSON = function() {
  const values = this.get();
  delete values.password;
  delete values.googleId;
  return values;
};

User.hash = str => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(str, 12, (err, hash) => {
      if (err) {
        reject(err);
      } else if (hash) {
        resolve(hash);
      }
    });
  });
};

User.signup = async function({
  firstName,
  lastName,
  email,
  password,
  imageURL,
}) {
  try {
    if (!password) {
      throw new AuthError('Password is a required field.', 'password');
    }

    const defaults = { firstName, lastName, password };
    if (imageURL) {
      defaults.imageURL = imageURL;
    }
    const [user, created] = await this.findOrCreate({
      where: { email },
      defaults,
    });

    if (created) {
      return user;
    }

    throw new AuthError('A user is already registered to this email.', 'email');
  } catch (error) {
    throw error;
  }
};

User.comparePasswords = (inputStr, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(inputStr, password, (err, success) => {
      if (err) {
        reject(err);
      } else if (success) {
        resolve(true);
      } else {
        const error = new AuthError('Invalid password.', 'password');
        reject(error);
      }
    });
  });
};

User.login = async function(email, password) {
  try {
    const user = await this.findOne({ where: { email } });
    if (!user) {
      throw new AuthError('No user registered with that email.', 'email');
    }
    await this.comparePasswords(password, user.password);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = User;
