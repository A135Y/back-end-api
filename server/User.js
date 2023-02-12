const { Sequelize, sequelize } = require('./db');

const User = sequelize.define('user', {
    username: Sequelize.STRING,
    firstname: Sequelize.STRING,
    surname: Sequelize.STRING,
    dateOfBirth: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING
});


module.exports = { User };
