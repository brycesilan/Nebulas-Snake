'use strict';

var Highscore = function (text) {
    if(text)
    {
        var o = JSON.parse(text);
        this.highscore = new BigNumber(o.highscore);
    }
    else
    {
        this.highscore = new BigNumber(0);
    }
    
};

Highscore.prototype = {
    toString: function()
    {
     return this.highscore.toString();   
    }
};

var Scoreboard = function()
{
    LocalContractStorage.defineMapProperty(this, "HighScore", {
        parse:function(score)
        {
            return new Highscore(score);
        },
        stringify: function (o) {
         return o.toString();
        }
    });
};

Scoreboard.prototype = {
    init:function()
    {
        
    },
    save: function(score)
    {
        var from = Blockchain.transaction.from;
        this.Highscore.put(from, score);ß
    },
    getScore: function()
    {
        var from = Blockchain.transaction.from;
        scores = this.Highscore.get(from);
        return scores;
    }
}

module.exports = Highscore;