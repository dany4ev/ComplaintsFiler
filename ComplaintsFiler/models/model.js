var Sequelize = require('sequelize');
var c = require('../models/index.js');
var Complaint;

console.log('Connection has been established successfully.');

//define a new table complaints
Complaint = c.config.db.define('complaints', {
    id: { type: Sequelize.STRING, field: 'id', primaryKey: true, allowNull: false },
    name: { type: Sequelize.STRING, field: 'resident_name', allowNull: true },
    emailAddress: { type: Sequelize.STRING, field: 'resident_email', allowNull: true },
    residentAddress: { type: Sequelize.STRING, field: 'resident_address', allowNull: true },
    complaint: { type: Sequelize.TEXT, field: 'resident_complaint', allowNull: true },
    picture: { type: Sequelize.BLOB, field: 'resident_complaint_picture', allowNull: true },
    locationLatitude: { type: Sequelize.STRING, field: 'resident_complaint_location_latitude', allowNull: true },
    locationLongitude: { type: Sequelize.STRING, field: 'resident_complaint_location_longitude', allowNull: true }
}, { timestamps: true });

// using 'force' it drops the table if it already exists, and creates a new one
Complaint.sync({ force: false }).then(function (data) { });

module.exports.models = {
    complaint: Complaint
};