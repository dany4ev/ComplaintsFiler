"use strict";

require("angular");
require("../public/stylesheets/main.css");

angular.module('complaintsFilerApp', [
    require('./core/core.module.js'),
    require('./common/common.module.js'),
    require('./shell/shell.module.js'),
    require('./complaints/complaints.module.js')
]);