"use strict";

module.exports = factory;

/* @ngInject */

function factory(Restangular, restangularWithTokenFactory, $http, $q) {

    return {

        getComplaintsList: function () {
            return restangularWithTokenFactory.all("complaints").get([]);
        },

        getComplaint: function (id) {
            return restangularWithTokenFactory.all("complaints/" + id).get([]);
        },

        createComplaint: function (entity) {
            return restangularWithTokenFactory.all("complaints").post(entity);
        },
    };
}
