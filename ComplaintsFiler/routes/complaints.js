'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');
//var upload = require('../uploadImage.js');
var sequelize = require('../models/index.js');


/* GET complaints. */
router.get('/', function (req, res) {
    var dbComplaints = [];
    Complaint.findAll().then(function (complaints) { // find all entries in the complaint tables
        complaints.forEach(function (complaint) {
            dbComplaints.push({
                name: complaint.name,
                emailAddress: complaint.emailAddress,
                complaint: complaint.complaint
            }); // adds their info to the dbUsers value
        });
        response.send(dbComplaints); // sends dbComplaints back to the page
    });
});

/* POST complaints. */
router.post('/', function (req, res) {

    Complaint.create({
        name: req.body.name,
        emailAddress: req.body.emailAddress,
        complaint: req.body.complaint 
    });

    res.sendStatus(200);
});

/** API path that will upload the files */
router.post('/upload', function (req, res) {
    //upload(req, res, function (err) {
    //    if (err) {
    //        res.json({ error_code: 1, err_desc: err });
    //        return;
    //    }
    //    res.json({ error_code: 0, err_desc: null });
    //});
});

module.exports = router;