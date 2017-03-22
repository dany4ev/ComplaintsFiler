'use strict';
var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function (req, res) {
    res.send('index', { title: 'Express' });
});

/* GET complaints. */
router.get('/complaints', function (req, res) {
    res.send('index', {title: 'complaints', data: req});
});

/* POST complaints. */
router.post('/complaints', function (req, res) {
    res.send('index', {title: 'complaints', data: req});
});

module.exports = router;