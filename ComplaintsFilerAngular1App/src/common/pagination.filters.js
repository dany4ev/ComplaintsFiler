"use strict";

module.exports = filter;

/* @ngInject */
function filter() {
    return function (input, start) {
        var res = "";
        if (input !== undefined) {
            start = +start;
            res = input.slice(start);
        }
        return res;
    };
}
