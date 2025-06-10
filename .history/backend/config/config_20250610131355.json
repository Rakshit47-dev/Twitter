require('dotenv').config(); // If you're using .env for credentials

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'your_password',
    database: process.env.DB_NAME || 'twitter_clone',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: 'postgres',
    password: 'your_password',
    database: 'twitter_clone_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: 'postgres',
    password: 'your_password',
    database: 'twitter_clone_prod',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  }
};
