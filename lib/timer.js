class Timer {
    constructor($el) {
        this.$el = $el;
        this._setTime(90);
    }

    start() {
        this.reset();

        if (this.interval) {
            this.stop();
        }

        this.interval = setInterval(this._countDown.bind(this), 1000)
    }

    stop() {
        clearInterval(this.interval)

    }

    reset() {
        this._setTime(90);
        $("#timer".removeClass("red"));
    }

    _countDown() {
        this._setTime(this.seconds - 1);
        if (this.seconds <= 10) {
            $("#timer").addClass("red");
        } else if (this.seconds === 0) {
            clearInterval(this.interval);
            this.timesUp();
        }

    }

    _setTime(secs) {
        this.secs = secs;
        this.$el.html(seconds);
    }

    timesUp() {
        
    }

    
}

module.exports = Timer;