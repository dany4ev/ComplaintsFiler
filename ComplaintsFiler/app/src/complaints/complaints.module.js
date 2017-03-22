"use strict";

var name = module.exports = "complaintsfiler.complaints";

angular
    .module(name, [])
    .config(configuration)
    .controller("complaintsController", require("./complaints.controller.js"))
    .factory("complaintsFactory", require("./complaints.factory.js"));

function configuration($stateProvider) {
    $stateProvider
        .state("shell.listcomplaints", {
            url: "listcomplaints",
            title: "List Complaints",
            views: {
                'content@shell': {
                    template: require("./listcomplaints.html"),
                    controller: "complaintsController as vm"
                }
            }
        })
        .state("shell.addcomplaints", {
            url: "addcomplaints",
            title: "Add Complaints",
            views: {
                'content@shell': {
                    template: require("./addcomplaints.html"),
                    controller: "complaintsController as vm"
                }
            }
        });
}