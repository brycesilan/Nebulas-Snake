<<<<<<< HEAD
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
=======
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
>>>>>>> 921555d6a77e6aee0ee65dfdf91482a5e5b30ebb
