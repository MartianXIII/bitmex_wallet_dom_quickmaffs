// (function() {

    function main(){
      getLosses()
      getDeposits()
      getWithdrawls()
      getProfits()
    }


    function getLosses() {
        Losses = 0
        lowscore = 0
        the_day = ""
        for (xx of wallet) {
            if (xx.transactType.startsWith("RealisedPNL") == true && xx.amount.toString().startsWith("-") == true) {
                // console.log(xx.amount)
                // console.log(xx.timestamp)
                Losses += xx.amount
                if (lowscore > xx.amount) {
                    lowscore = xx.amount
                    the_day = xx.timestamp
                }
            }

        }
        console.log("Lowscore " + the_day)
        _score(lowscore)
        var here = _normalizeBTC(Losses)
        _btc(here)
        console.log("Losses: " + here)
    }


    function getProfits() {
        Profits = 0
        highscore = 0
        the_day = ""

        for (xx of wallet) {
            if (xx.transactType.startsWith("RealisedPNL") == true && xx.amount.toString().startsWith("-") == false) {
                Profits += xx.amount
                if (highscore < xx.amount) {
                    highscore = xx.amount
                    the_day = xx.timestamp
                }
            }
        }
        console.log("Highscore " + the_day)
        _score(highscore)
        var here = _normalizeBTC(Profits)
        _btc(here)
        console.log("Profits: " + here)
    }


    function getDeposits() {
        Deposits = 0

        for (xx of wallet) {
            if (xx.transactType.startsWith("Dep")) {
                // console.log(xx.amount)
                // console.log(xx.timestamp)
                Deposits += xx.amount
            }
        }
        var here = _normalizeBTC(Deposits)
        _btc(here)
        console.log("Deposits: " + here)
    }


    function getWithdrawls() {
        withd = 0

        for (xx of wallet) {
            if (xx.transactType.startsWith("W")) {
                // console.log(xx.amount)
                // console.log(xx.timestamp)
                withd += xx.amount
            }
        }
        var here = _normalizeBTC(withd)
        _btc(here)
        console.log("Withdrawls: " + here)
    }


    function _score(x) {
        y = _normalizeBTC(x)
        z = _btc(y)
        console.log("Highest PNL: " + z)
    }


    function _normalizeBTC(anyint) {
        newInt = anyint.toString()
        index = -8
        x = newInt.InsertAt(".", index)
        anyint = x.valueOf()
        return anyint
    }


    String.prototype.InsertAt = function(CharToInsert, Position) {
        return this.slice(0, Position) + CharToInsert + this.slice(Position)
    }


    function _btc(anyint) {
        btc_price = 11000//Todo: fetch price with timestamp for dynamic accuracy 
        current_value = anyint * btc_price
        current_value = current_value.toFixed(2)
        console.log("Current USD Value: $" + current_value)
        return current_value
    }

// })();
