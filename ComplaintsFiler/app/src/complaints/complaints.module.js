"use strict";

var name = module.exports = "complaintsfiler.complaints";

angular
    .module(name, [])
    .config(configuration)
    .controller("complaintsController", require("./complaints.controller.js"))
    .factory("complaintsFactory", require("./complaints.factory.js"))
    .run(function ($rootScope) {
        $rootScope.$on('mapInitialized', function (evt, map) {
            $rootScope.map = map;
            $rootScope.$apply();
        });
    })
    ;

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
        .state("shell.listcomplaintdetails", {
            url: "listcomplaintdetails/:id",
            title: "List Complaint Details",
            views: {
                'content@shell': {
                    template: require("./listcomplaintsdetails.html"),
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