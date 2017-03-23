'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');

/* GET complaints. */
router.get('/', function (req, res) {
    //res.json({ data: {name:'danish'}});
});

/* POST complaints. */
router.post('/', function (req, res) {
    var savedComplaints = [];
    savedComplaints.push({
        name: req.body.name,
        emailAddress: req.body.emailAddress,
        complaint: req.body.complaint
    });
    res.json(savedComplaints);
});


module.exports = router;