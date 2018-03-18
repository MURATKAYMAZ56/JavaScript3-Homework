


'use strict';
// setTimeout(() => {
//     console.log("it is time");
// }, 2000);

function timerStoped() {
    console.log("timer stopped");
}

function startTimer(duration, cb) {


    console.log("timer started");
    setTimeout(cb, duration);
}
startTimer(2000, timerStoped);
