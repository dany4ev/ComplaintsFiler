"use strict";

module.exports = factory;

/* @ngInject */
function factory(commonFactory, dataService) {

    var promise = commonFactory.deferredPromise();

    return {

        getComplaintsList: function () {
            return dataService.getComplaintsList();
        },

        getComplaint: function (id) {
            return dataService.getComplaint(id);
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