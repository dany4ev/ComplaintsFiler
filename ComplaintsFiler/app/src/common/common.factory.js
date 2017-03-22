"use strict";

var pluralize = require("pluralize");

module.exports = factory;

/* @ngInject */

function factory($q, $log, $timeout, $location, storageFactory, constantsFactory) {

    var common = {

        replaceSpacesToUnderscore: function (value) {
            return value.replace(/ /gi, "_");
        },

        arrayToDictionary: function (arr, key) {
            var dict = [];
            arr[key].forEach(function (val, i) {
                dict.push(val);
            });
            return dict;
        },

        dictionaryToArray: function (dict) {
            var arr = [];
            var keys = Object.keys(dict);
            keys.forEach(function (key) {
                arr[key] = [];
                dict[key].forEach(function (val) {
                    arr.push(val);
                });
            });
            return arr;
        },

        isIdExists: function (obj, id) {
            return obj.id === id;
        },

        isKeyExists: function (selectedArray, key) {
            return key in selectedArray;
        },

        getSelectedIndexName: function (type, index) {
            return (!angular.isDefined(type) ? type.value : index);
        },

        getMetaDataDictionary: function (id, providerId, metaData) {
            var metadataDictionary = _.pickBy(metaData, function (value, key) {
                return (!key.startsWith(id) && !key.startsWith(providerId)) || !
                    key.startsWith("");
            });
            return metadataDictionary;
        },

        setModalConfiguration: function (enableAnimation, ariaLabel, ariaDesc,
            template, controller, controllerAs, size, appendtoParent, backDrop,
            keyBoardStatus, resolveObj, windowClass) {
            return {
                animation: enableAnimation,
                ariaLabelledBy: ariaLabel,
                ariaDescribedBy: ariaDesc,
                template: template,
                controller: controller,
                controllerAs: controllerAs,
                size: size,
                appendTo: appendtoParent,
                backdrop: backDrop,
                keyboard: keyBoardStatus,
                resolve: resolveObj,
                windowClass: windowClass
            };
        },

        // referred link: https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/
        // getTemplate: function (key, contentType) {
        //     var templates = {
        //         "complaints": function () {
        //             return require("../complaints/complaints.html");
        //         }
        //     };
        //     if (contentType.toLowerCase() == "complaints") {
        //         return (templates[contentType])();
        //     }
        //     return (templates[key])();
        // },

        //get indexed dictionary of dictionary containing list
        getManifestWithContents: function (contentList, contentKeys) {
            var manifest = {};
            manifest.contents = getContentDictionary(contentList, contentKeys);
            return manifest;
        },

        deferredPromise: function () {
            return $q.defer();
        },

        rejectPromise: function (promise) {
            return $q.reject(promise);
        },

        logMessage: function (message) {
            $log.info(message);
        },

        validate: function (form) {
            return form.$valid;
        },

        getDate: function (page) {
            var momentDate = moment();
            var currentYear = momentDate.year();
            var currentMonth = momentDate.month();
            if (page === "prev") {
                if (currentMonth === 0) {
                    currentYear--;
                    currentMonth = 11;
                }
                currentMonth += 1;
            } else if (page === "next") {
                if (currentMonth === 11) {
                    currentYear++;
                    currentMonth = 0;
                }
                currentMonth += 2;
            }

            var res = (currentYear + "_" + (currentMonth).toString().replace(/\b(\d{1})\b/g, "0$1"));
            return res;
        },

        getManifestExecutionDate: function (page, year_month) {
            var momentDate = moment();
            var year = momentDate.year();
            var month = momentDate.month();
            var _month = constantsFactory.dateHash[month];
            var year_month_date = "";

            if (year_month !== "" && year_month !== undefined) {
                
                var yearMonth = year_month.split('_')[1];
                if (parseInt(yearMonth) < 10) {
                    yearMonth = yearMonth.replace(/0/gi, "");
                }            

                if (page === "prev") {
                    if (yearMonth !== "" && yearMonth !== "1") {
                        _month = parseInt(yearMonth) - 1;
                    }
                }
                else if (page === "next") {
                    if (yearMonth !== "" && yearMonth !== "12") {
                        _month = parseInt(yearMonth) + 1;
                    }
                }
                
                year_month_date = year + "_" + _month.toString().replace(/\b(\d{1})\b/g, "0$1");
            }
            else if (year_month === "") {
                
                if (_month === 12) {
                    year++;
                    _month = 1;
                }
                
                year_month_date = year + "_" + _month.toString().replace(/\b(\d{1})\b/g, "0$1");
            }

            return year_month_date;
        },

        redirect: function (url, time) {
            $timeout(function () {
                $location.path(url);
            }, time);
        }
    };

    //get indexed dictionary of dictionary containing list
    var getContentDictionary = function (contentList, contentKeys) {
        var contents = {};

        contentKeys.forEach(function (index) {
            if (index.toLowerCase() !== "indexname") {
                contents[index] = {};
                var keys = Object.keys(contentList[index]);

                keys.forEach(function (value) {
                    contents[index][value] = contentList[index][value];
                });
            }
        });

        return contents;
    };

    return common;
}
