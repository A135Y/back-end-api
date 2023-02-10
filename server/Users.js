const { Sequelize, sequelize } = require('./db');

const Users = sequelize.define('user', {
    username: Sequelize.STRING,
    firstname: Sequelize.STRING,
    surname: Sequelize.STRING,
    dateOfBirth: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING
});


module.exports = { Users };
