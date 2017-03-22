
"use strict";

module.exports = factory;

/* @ngInject */

function factory() {
    return {

        dateHash:
        {
            0: 1,
            1: 2,
            2: 3,
            3: 4,
            4: 5,
            6: 7,
            7: 8,
            8: 9,
            9: 10,
            10: 11,
            11: 12
        },
        
        sortTypeDdl: [{
            value: "",
            text: "Sort by"
        },{
            value: "asc",
            text: "Ascending"
        }, {
            value: "desc",
            text: "Descending"
        }],
    };
}
