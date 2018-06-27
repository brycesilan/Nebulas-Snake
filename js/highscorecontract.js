'use strict';

var Highscore = function (getHighscore) {
};

Highscore.prototype = {
       init: function () {
    },
    set: function (name, value) {
        // Storing a string
        LocalContractStorage.set("highscore", value);
    },
};
module.exports = Highscore;