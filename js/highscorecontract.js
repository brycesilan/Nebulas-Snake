'use strict';

var Highscore = function () {
};

Highscore.prototype = {
       init: function () {
    },
    set: function (name, value) {
        // Storing a string
        LocalContractStorage.set("value", value);
    },
    get: function () {
        var value = LocalContractStorage.get("value");
        console.log("highscore:" + value)
    },
};
module.exports = Highscore;
