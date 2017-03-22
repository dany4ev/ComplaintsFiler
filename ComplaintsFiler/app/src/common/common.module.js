"use strict";

require("lodash");

var name = module.exports = "complaintsfiler.common";

angular.module(name, [])
    .factory("dataService", require("./dataService.factory.js"))
    .factory("storageFactory", require("./storage.factory.js"))
    .factory("commonFactory", require("./common.factory.js"))
    .factory("constantsFactory", require("./constants.factory.js"))
    // .filter("trustedAs", require("./trustedAs.filters.js"))
    // .filter("pagination", require("./pagination.filters.js"))
    // .filter("ceil", require("./ceil.filters.js"))
    // .directive("paginate",  require("./paginate.directive.js"))
    ;
