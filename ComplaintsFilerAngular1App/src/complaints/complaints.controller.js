"use strict";

module.exports = controller;

/* @ngInject */

function controller($scope, $rootScope, $state, $stateParams, $timeout, $location, complaintsFactory,
    storageFactory, commonFactory, dataService, spinner, spinnerService, CurrentPage, PageSize, NgMap) {

    var vm = this;
    vm.spinner = spinner;
    vm.curPage = CurrentPage;
    vm.pageSize = PageSize;

    var _video = null,
        patData = null;
    vm.patOpts = { x: 0, y: 0, w: 25, h: 25 };

    // Setup a channel to receive a video property
    // with a reference to the video element
    vm.channel = {
        // the fields below are all optional
        videoHeight: 800,
        videoWidth: 600,
        video: null // Will reference the video element on success
    };

    vm.onError = function (err) {
        $scope.$apply(function () {
            vm.webcamError = err;
        });
    };

    vm.onStream = function (stream) {
        // You could do something manually with the stream.
    };

    vm.onSuccess = function () {
        // The video element contains the captured camera data
        _video = vm.channel.video;
        $scope.$apply(function () {
            vm.patOpts.w = _video.width;
            vm.patOpts.h = _video.height;
        });
    };

    /**
     * Make a snapshot of the camera data and show it in another canvas.
     */
    vm.makeSnapshot = function () {
        if (_video) {
            var patCanvas = document.querySelector('#snapshot');
            if (!patCanvas) return;

            patCanvas.width = _video.width;
            patCanvas.height = _video.height;
            var ctxPat = patCanvas.getContext('2d');

            var idata = getVideoData(vm.patOpts.x, vm.patOpts.y, vm.patOpts.w, vm.patOpts.h);
            ctxPat.putImageData(idata, 0, 0);

            sendSnapshotToServer(patCanvas.toDataURL());

            patData = idata;
        }
    };

    /**
     * Redirect the browser to the URL given.
     * Used to download the image by passing a dataURL string
     */
    vm.downloadSnapshot = function downloadSnapshot(dataURL) {
        window.location.href = dataURL;
    };

    var getVideoData = function getVideoData(x, y, w, h) {
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = _video.width;
        hiddenCanvas.height = _video.height;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(_video, 0, 0, _video.width, _video.height);
        return ctx.getImageData(x, y, w, h);
    };

    /**
     * This function could be used to send the image data
     * to a backend server that expects base64 encoded images.
     *
     * In this example, we simply store it in the scope for display.
     */
    var sendSnapshotToServer = function (imgBase64) {
        vm.snapshotData = imgBase64;
    };

    (function () {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;
    })();

    vm.onPaginationUpdated = function (arg) {
        vm.totalItems = arg;
    };

    vm.latlng = [24.8666667, 67.05];
    vm.getpos = function (event) {
        commonFactory.logMessage(event.latLng);
        vm.latlng = [{ latitude: event.latLng.lat(), longitude: event.latLng.lng() }];
    };

    vm.initComplaints = function () {
        spinnerService.show("spinner");

        NgMap.getMap().then(function (map) {
            commonFactory.logMessage(map.getCenter());
            commonFactory.logMessage('markers', map.markers);
            commonFactory.logMessage('shapes', map.shapes);
        });

        complaintsFactory.getComplaintsList()
            .then(function (response) {
                spinnerService.hide("spinner");
                vm._complaintsList = response.plain();
                commonFactory.logMessage("success");
            }, function (response) {
                spinnerService.hide("spinner");
                commonFactory.logMessage("error");
            });
    };

    vm.initComplaint = function () {
        spinnerService.show("spinner");
        complaintsFactory.getComplaint($stateParams.id)
            .then(function (response) {
                spinnerService.hide("spinner");
                vm._complaint = response.plain();
                commonFactory.logMessage("success");
            }, function (response) {
                spinnerService.hide("spinner");
                commonFactory.logMessage("error");
            });
    };

    vm.addComplaint = function (addComplaintsForm, complaint) {
        complaintsFactory.createComplaint(addComplaintsForm,
            complaint, vm.snapshotData, vm.latlng)
            .then(function (response) {
                commonFactory.logMessage("success");
                storageFactory.save("savedComplaints", response.plain());
                $state.go("shell.listcomplaints");
            })
            .catch(function (response) {
                commonFactory.logMessage("error: promise rejected");
            });
    };

    vm.reset = function () {
        vm._complaint = {};
    };
}