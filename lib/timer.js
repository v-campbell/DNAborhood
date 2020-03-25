class Timer {
    constructor() {
        this.seconds = 120;
    }

    time() {
        let minutes = Math.floor(this.seconds / 60);
        let seconds = this.seconds % 60;
        return (`${this.addZeroMaybe(minutes)}:${this.addZeroMaybe(seconds)}`);
    }

    addZeroMaybe(num) {
        if (num >= 10) {
            return `${num}`;
        } else {
            return `0${num}`;
        }
    }

    tick() {
        this.seconds -= 1;
    }

    reset() {
        this.seconds = 90;
    }

    stop() {
        clearInterval(this.interval);
    }

    startTimer() {
        this.reset();

        if (this.interval) {
            this.stop();
        }

        this.interval = setInterval(this.tick.bind(this), 1000);
    }
}

module.exports = Timer;
