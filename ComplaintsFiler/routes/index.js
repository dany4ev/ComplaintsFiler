'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

/* GET complaints. */
router.get('/complaints', function (req, res) {
    res.json('index', {title: 'complaints', data: {name:'danish'}});
});

/* POST complaints. */
router.post('/complaints', function (req, res) {
    res.json('index', {title: 'complaints', data: req});
});

module.exports = router;