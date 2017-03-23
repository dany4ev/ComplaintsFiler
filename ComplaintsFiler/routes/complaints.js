'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');

/* GET complaints. */
router.get('/', function (req, res) {
    res.json({title: 'complaints', data: {name:'danish'}});
});

/* POST complaints. */
router.post('/', function (req, res) {
    res.json({title: 'complaints', data: req});
});

module.exports = router;