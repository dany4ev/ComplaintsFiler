'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../db.js');

/* GET complaints. */
router.get('/', function (req, res) {
    //res.json({ data: {name:'danish'}});
});

/* POST complaints. */
router.post('/', function (req, res) {
    var savedComplaints = [],
        complaint = {
            name: req.body.name,
            emailAddress: req.body.emailAddress,
            complaint: req.body.complaint
        };
    savedComplaints.push(complaint);
    var stmt = db.prepare("INSERT INTO complaint VALUES (?)");
    stmt.run("Thing #" + complaint);
    db.each("SELECT rowid AS id, thing FROM complaint", function (err, row) {
        console.log(row.id + ": " + row.thing);
    });
    db.close();
    res.json(savedComplaints);
});


module.exports = router;