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

    // vm.initCarriers = function () {

    //     spinnerService.show("spinner");

    //     carrierFactory.getCarriersList()
    //         .then(function (response) {
    //             spinnerService.hide("spinner");
    //             vm._carriersList = response.plain();
    //             commonFactory.logMessage("success");
    //         }, function () {
    //             spinnerService.hide("spinner");
    //             commonFactory.logMessage("error");
    //         });
    // };

    // vm.addCarrier = function (addCarrierForm, carrier) {
    //     carrierFactory.createCarrier(addCarrierForm, carrier)
    //         .then(function () {
    //             commonFactory.logMessage("success");
    //             commonFactory.redirect("listcarriers", 1000);
    //         })
    //         .catch(function () {
    //             commonFactory.logMessage("error: promise rejected");
    //         });
    // };

    // vm.reset = function () {
    //     vm._carrier = {};
    // };
}