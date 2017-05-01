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

        createComplaint: function (addComplaintForm, complaint, snapshotData, latlng) {
            if (commonFactory.validate(addComplaintForm)) {
                complaint.picture = snapshotData;
                complaint.latitude = latlng.latitude;
                complaint.longitude = latlng.longitude;
                promise = dataService.createComplaint(complaint);
            } else {
                promise = commonFactory.rejectPromise(promise);
            }
            return promise;
        },
    };
}