"use strict";

module.exports = controller;

/* @ngInject */

function controller($rootScope, $stateParams, $timeout, $location, complaintsFactory,
   commonFactory, dataService, spinner, spinnerService, CurrentPage, PageSize) {

    var vm = this;
    vm.spinner = spinner;
    vm.curPage = CurrentPage;
    vm.pageSize = PageSize;

    vm.onPaginationUpdated = function (arg) {
        vm.totalItems = arg;
    };

     vm.initComplaints = function () {

         spinnerService.show("spinner");

         complaintsFactory.getComplaintsList()
             .then(function (response) {
                 spinnerService.hide("spinner");
                 vm._complaintsList = response.plain();
                 commonFactory.logMessage("success");
             }, function (response) {
                 spinnerService.hide("spinner");
                 commonFactory.logMessage("error");
             });
     };

     vm.addComplaint = function (addComplaintsForm, complaints) {
         complaintsFactory.createComplaint(addComplaintsForm, complaints)
             .then(function (response) {
                 commonFactory.logMessage("success");
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