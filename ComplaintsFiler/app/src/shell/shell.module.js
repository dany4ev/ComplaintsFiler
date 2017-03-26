"use strict";

require("angular-spinners");
require("../../../node_modules/webcam/app/scripts/webcam.js");

var name = module.exports = "complaintsfiler.shell";

angular
    .module(name, ["angularSpinners", "webcam"])
    .config(configuration)
    .controller("shellController", require("./shell.controller.js"))
    .factory("shellFactory", require("./shell.factory.js"))
    .constant("spinner", require("../../public/images/ajax-loader.gif"))
    .value("PageSize", 10)
    .value("CurrentPage", 0)
    ;

function configuration($stateProvider) {

    $stateProvider
        .state("shell", {
            url: "/",
            views: {
                '@': {
                    template: require("./shell.html"),
                    controller: "shellController as vm"
                },
                'header@shell': {
                    template: require("./header.html")
                },
                'footer@shell': {
                    template: require("./footer.html")
                }
            }
        })
    ;
}
