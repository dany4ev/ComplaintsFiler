"use strict";

module.exports = factory;

/* @ngInject */

function factory(Restangular, restangularWithTokenFactory, $http, $q) {

  return {

    getComplaintsList: function () {
      return restangularWithTokenFactory.all("complaints").get([]);
    },

    createComplaint: function (entity) {
      return restangularWithTokenFactory.all("complaints").post(entity);
    },
  };
}
