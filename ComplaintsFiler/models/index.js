var Sequelize = require('sequelize'),
    path = require('path'),
    Complaint;

// setup a new database
var sequelizeConnection = new Sequelize('database', 'root', 'test', {
    host: 'localhost',    
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    // Security note: the database is saved to the file `database.sqlite` on the local filesystem. It's deliberately placed in the `.data` directory
    // which doesn't get copied if someone remixes the project.
    storage: './database.sqlite', //path.resolve(__dirname, './data/database.sqlite'),
    dialect: 'sqlite',
    logging: false
});

// authenticate with the database
connection.authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');

        //define a new table complaints
        Complaints = sequelizeConnection.define('complaints', {
            name: Sequelize.STRING,
            emailAddress: Sequelize.STRING,
            complaint: Sequelize.TEXT
        });

        sequelizeConnection.sync();

        // populate table with default data (seed e.g.)
        Complaint.sync({ force: true }) // using 'force' it drops the table if it already exists, and creates a new one
            .then(function (data) { });
    })
    .catch(function (err) {
        console.log('Unable to connect to the database: ', err);
    });

module.exports = Complaint;