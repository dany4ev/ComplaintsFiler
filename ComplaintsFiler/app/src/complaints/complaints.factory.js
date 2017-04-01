"use strict";

module.exports = factory;

/* @ngInject */
function factory(commonFactory, dataService) {

    var promise = commonFactory.deferredPromise();

    return {

        getComplaintsList: function () {
            return dataService.getComplaintsList() || commonFactory.rejectPromise(promise);
        },

        getComplaint: function (id) {
            return dataService.getComplaint(id) || commonFactory.rejectPromise(promise);
        },

        createComplaint: function (addComplaintForm, complaint) {
            if (commonFactory.validate(addComplaintForm)) {
                promise = dataService.createComplaint(complaint);
            } else {
                promise = commonFactory.rejectPromise(promise);
            }
            return promise;
        },
    };
}