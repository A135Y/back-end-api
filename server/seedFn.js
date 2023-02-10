const { sequelize } = require('./db');
const { User } = require('./');

const seed = async () => {
    try {
        await sequelize.sync({ force: true }); // recreate db
    } catch (error) {
        console.error(error);
    }
};


module.exports = seed;
