"use strict";

module.exports = controller;

/* @ngInject */

function controller($rootScope, $stateParams, $timeout, $location, complaintsFactory,
    storageFactory, commonFactory, dataService, spinner, spinnerService, CurrentPage, PageSize) {

    var vm = this;
    vm.spinner = spinner;
    vm.curPage = CurrentPage;
    vm.pageSize = PageSize;

    vm.onPaginationUpdated = function (arg) {
        vm.totalItems = arg;
    };

    vm.initComplaints = function () {

        //spinnerService.show("spinner");
        var savedComplaints = storageFactory.get("savedComplaints");
        if (savedComplaints !== null) {
            vm._complaintsList = savedComplaints;
            //spinnerService.hide("spinner");
        }
        //else {
        //    complaintsFactory.getComplaintsList()
        //        .then(function (response) {
        //            spinnerService.hide("spinner");
        //            vm._complaintsList = response.plain();
        //            commonFactory.logMessage("success");
        //        }, function (response) {
        //            spinnerService.hide("spinner");
        //            commonFactory.logMessage("error");
        //        });
        //}
    };

    vm.initComplaint = function () {
        //spinnerService.show("spinner");
        var savedComplaints = storageFactory.get("savedComplaints");
        if (savedComplaints !== null) {
            vm._complaint = savedComplaints[0];
            //spinnerService.hide("spinner");
        }
        //else {
        //    complaintsFactory.getComplaint($stateParams.id)
        //        .then(function (response) {
        //            spinnerService.hide("spinner");
        //            vm._complaint = response.plain();
        //            commonFactory.logMessage("success");
        //        }, function (response) {
        //            spinnerService.hide("spinner");
        //            commonFactory.logMessage("error");
        //        });
        //}
    };

    vm.addComplaint = function (addComplaintsForm, complaints) {
        complaintsFactory.createComplaint(addComplaintsForm, complaints)
            .then(function (response) {
                commonFactory.logMessage("success");
                storageFactory.save("savedComplaints", response.plain());
                commonFactory.redirect("listcomplaints", 1000);
            })
            .catch(function (response) {
                commonFactory.logMessage("error: promise rejected");
            });
    };

    vm.reset = function () {
        vm._complaint = {};
    };
}