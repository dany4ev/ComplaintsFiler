var Sequelize = require('sequelize'),
    sequelize = new Sequelize('complaints_db', null, null, {
        host: 'localhost',
        dialect: 'sqlite',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        storage: './data.sqlite'
    });

module.exports.config = {
    db: sequelize,
    connection: sequelize
};