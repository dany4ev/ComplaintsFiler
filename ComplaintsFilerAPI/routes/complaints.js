'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
//var upload = require('../uploadImage.js');
var m = require('../models/model.js');

// Generate a v4 UUID (random)
const uuidV4 = require('uuid/v4');


router.get('/', function(req, res) {
    m.models.complaint.findAll({
        order: 'createdAt DESC'
    }).then(function(result) {
        res.send(result);
    }, function(err) {
        console.log(err);
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    m.models.complaint.findOne({
        where: {
            id: id
        }
    }).then(function(result) {
        res.send(result);
    }, function(err) {
        console.log(err);
    });
});

router.post('/', function(req, res) {

    var id = uuidV4(),
        name = req.body.name,
        emailAddress = req.body.emailAddress,
        Address = req.body.Address,
        complaint = req.body.complaint,
        picture = req.body.picture,
        latitude = req.body.latitude,
        longitude = req.body.longitude;

    m.models.complaint.sync()
        .then(function() {
            return m.models.complaint.create({
                id: id,
                name: name,
                emailAddress: emailAddress,
                residentAddress: Address,
                complaint: complaint,
                picture: picture,
                latitude: latitude,
                longitude: longitude
            });
        })
        .then(function(data) {
            res.send({
                status: 'OK',
                data: data
            });
        });

});

router.post('/upload', function(req, res) {
    //upload(req, res, function (err) {
    //    if (err) {
    //        res.json({ error_code: 1, err_desc: err });
    //        return;
    //    }
    //    res.json({ error_code: 0, err_desc: null });
    //});
});

module.exports = router;