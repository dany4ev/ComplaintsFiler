"use strict";

module.exports = factory;

/* @ngInject */

function factory(Restangular, restangularWithTokenFactory, $http, $q) {

    return {

        getComplaintsList: function () {
            return Restangular.all("complaints").get([]);
        },

        getComplaint: function (id) {
            return Restangular.one("complaints/" + id).get([]);
        },

        createComplaint: function (entity) {
            return Restangular.all("complaints").post(entity);
        },
    };
}
