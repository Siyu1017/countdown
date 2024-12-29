'use strict';

!(async () => {
    function canvasClarifier(canvas, ctx, width, height) {
        const originalSize = {
            width: (width ? width : canvas.offsetWidth),
            height: (height ? height : canvas.offsetHeight)
        }
        var ratio = window.devicePixelRatio || 1;
        canvas.width = originalSize.width * ratio;
        canvas.height = originalSize.height * ratio;
        ctx.scale(ratio, ratio);
        if (originalSize.width != canvas.offsetWidth || originalSize.height != canvas.offsetHeight) {
            canvas.style.width = originalSize.width + 'px';
            canvas.style.height = originalSize.height + 'px';
        }
    }

    function random(min, max, f = false) {
        if (!max) {
            max = min;
            min = 0;
        }
        if (f == false) {
            return Math.random() * (max - min) + min;
        } else {
            min = Math.ceil(min);
            max = Math.floor(max);
            return ~~(Math.random() * (max - min + 1)) + min;
        }
    }

    function preciseInterval(callback) {
        let nextCallTime = Date.now() + 1000;
        function loop() {
            const currentTime = Date.now();
            const ms = new Date(currentTime).getMilliseconds();
            if (currentTime >= nextCallTime) {
                callback();
                nextCallTime = Math.ceil(currentTime / 1000) * 1000;
                if (nextCallTime == currentTime) {
                    nextCallTime += 1000;
                }
            }
            const delay = nextCallTime - Date.now();
            const deviation = ms > 500 ? ms - 1000 : ms;
            console.log(`Second : ${new Date(currentTime).getSeconds()}\n%cMs : ${new Date(currentTime).getMilliseconds()}\n%cDeviation : %c${deviation}`, `color:rgb(255,${~~((500 - Math.abs(deviation)) / 500 * 255)},${~~((500 - Math.abs(deviation)) / 500 * 255)})`, 'color:initial', `color:${Math.sign(deviation) >= 0 ? '#45ff45' : '#ff3d3d'}`, `\nDelay : ${delay}\nCorrected : ${delay - deviation}`);
            setTimeout(loop, delay);
        }
        loop();
    }

    function executeOnExactSecond(callback) {
        function loop() {
            const now = new Date();
            const ms = now.getMilliseconds();
            const delay = 1000 - ms;

            setTimeout(() => {
                var deviation = ms > 500 ? 500 - ms : ms;
                console.log(`Deviation : %c${deviation}`, `color:${Math.sign(deviation) >= 0 ? '#45ff45' : '#ff3d3d'}`);
                // console.log("Exact second:", new Date());
                callback();
                loop();
            }, delay);
        }
        loop();
    }

    /*
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', {
        willReadFrequently: true
    });
    canvas.className = 'countdown-canvas';
    countdown.appendChild(canvas);
    */

    var targetTime = new Date('2025/01/01 00:00:00').getTime();
    var now = Date.now();
    var remainings = {};
    var remainingSeconds = 0;
    var renderContent = ['00', '00', '00', '00'];

    // Update remaining time
    function update() {
        now = Date.now();
        remainingSeconds = ~~((targetTime - now) / 1000);
        if (remainingSeconds <= 0) {
            // Times up
        }
        var currentRemainings = {
            days: ~~(remainingSeconds / 86400),
            hours: ~~(remainingSeconds / 3600 % 24),
            minutes: ~~(remainingSeconds / 60 % 60),
            seconds: ~~(remainingSeconds % 60)
        }
        if (currentRemainings.days != remainings.days) {
            remainings.days = currentRemainings.days;
            renderContent[0] = remainings.days.toString().padStart(2, '0');
        }
        if (currentRemainings.hours != remainings.hours) {
            remainings.hours = currentRemainings.hours;
            renderContent[1] = remainings.hours.toString().padStart(2, '0');
        }
        if (currentRemainings.minutes != remainings.minutes) {
            remainings.minutes = currentRemainings.minutes;
            renderContent[2] = remainings.minutes.toString().padStart(2, '0');
        }
        if (currentRemainings.seconds != remainings.seconds) {
            remainings.seconds = currentRemainings.seconds;
            renderContent[3] = remainings.seconds.toString().padStart(2, '0');
        }
        updateCountdown();
    }

    var fontSize = 144;
    var fontFamily = 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color emoji';

    // Countdown
    const countdownContainer = document.querySelector('.countdown-container');
    const countdown = document.createElement('div');
    const countdownDays = document.createElement('div');
    const countdownDaysNumber = document.createElement('div');
    const countdownDaysUnit = document.createElement('div');
    const countdownHours = document.createElement('div');
    const countdownHoursNumber = document.createElement('div');
    const countdownHoursUnit = document.createElement('div');
    const countdownMinutes = document.createElement('div');
    const countdownMinutesNumber = document.createElement('div');
    const countdownMinutesUnit = document.createElement('div');
    const countdownSeconds = document.createElement('div');
    const countdownSecondsNumber = document.createElement('div');
    const countdownSecondsUnit = document.createElement('div');

    countdown.className = 'countdown';
    countdownDays.className = 'countdown-timer';
    countdownDaysNumber.className = 'countdown-number';
    countdownDaysUnit.className = 'countdown-unit';
    countdownHours.className = 'countdown-timer';
    countdownHoursNumber.className = 'countdown-number';
    countdownHoursUnit.className = 'countdown-unit';
    countdownMinutes.className = 'countdown-timer';
    countdownMinutesNumber.className = 'countdown-number';
    countdownMinutesUnit.className = 'countdown-unit';
    countdownSeconds.className = 'countdown-timer';
    countdownSecondsNumber.className = 'countdown-number';
    countdownSecondsUnit.className = 'countdown-unit';

    countdownDaysUnit.textContent = '天';
    countdownHoursUnit.textContent = '小時';
    countdownMinutesUnit.textContent = '分鐘';
    countdownSecondsUnit.textContent = '秒鐘';

    countdownContainer.appendChild(countdown);
    countdown.appendChild(countdownDays);
    countdownDays.appendChild(countdownDaysNumber);
    countdownDays.appendChild(countdownDaysUnit);
    countdown.appendChild(countdownHours);
    countdownHours.appendChild(countdownHoursNumber);
    countdownHours.appendChild(countdownHoursUnit);
    countdown.appendChild(countdownMinutes);
    countdownMinutes.appendChild(countdownMinutesNumber);
    countdownMinutes.appendChild(countdownMinutesUnit);
    countdown.appendChild(countdownSeconds);
    countdownSeconds.appendChild(countdownSecondsNumber);
    countdownSeconds.appendChild(countdownSecondsUnit);

    // Controller
    const controllerContainer = document.querySelector('.controller-container');
    const controller = document.createElement('div');
    const controllerFontSize = document.createElement('div');
    const controllerFontSizeDecrease = document.createElement('button');
    const controllerFontSizeCurrent = document.createElement('div');
    const controllerFontSizeIncrease = document.createElement('button');
    const controllerFontSizeReset = document.createElement('button');
    const controllerView = document.createElement('div');
    const controllerFullscreen = document.createElement('button');
    const controllerHide = document.createElement('button');

    controller.className = 'controller';
    controllerFontSize.className = 'controller-font-size controller-group';
    controllerFontSizeDecrease.className = 'controller-font-size-decrease controller-button';
    controllerFontSizeCurrent.className = 'controller-font-size-current';
    controllerFontSizeIncrease.className = 'controller-font-size-increase controller-button';
    controllerFontSizeReset.className = 'controller-font-size-reset controller-button';
    controllerView.className = 'controller-view controller-group';
    controllerFullscreen.className = 'controller-fullscreen controller-button';
    controllerHide.className = 'controller-hide controller-button';

    controllerFontSizeDecrease.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-out"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>`;
    controllerFontSizeCurrent.textContent = `100%`;
    controllerFontSizeIncrease.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zoom-in"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>`;
    controllerFontSizeReset.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`;
    controllerFullscreen.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`;
    controllerHide.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>`;

    controllerContainer.appendChild(controller);
    controller.appendChild(controllerFontSize);
    controllerFontSize.appendChild(controllerFontSizeDecrease);
    controllerFontSize.appendChild(controllerFontSizeCurrent);
    controllerFontSize.appendChild(controllerFontSizeIncrease);
    controllerFontSize.appendChild(controllerFontSizeReset);
    controller.appendChild(controllerView);
    controllerView.appendChild(controllerFullscreen);
    controllerView.appendChild(controllerHide);

    function updateCountdown() {
        if (renderContent[0] != countdownDaysNumber.textContent) {
            countdownDaysNumber.textContent = renderContent[0];
        }
        if (renderContent[1] != countdownHoursNumber.textContent) {
            countdownHoursNumber.textContent = renderContent[1];
        }
        if (renderContent[2] != countdownMinutesNumber.textContent) {
            countdownMinutesNumber.textContent = renderContent[2];
        }
        if (renderContent[3] != countdownSecondsNumber.textContent) {
            countdownSecondsNumber.textContent = renderContent[3];
        }
    }

    var scales = [0.1, 0.25, 0.33, 0.5, 0.75, 0.8, 0.9, 1, 1.1, 1.2, 1.5, 1.75, 2, 2.5, 4, 5, 7.5, 8, 10];

    //update();
    //preciseInterval(update);
    /*
    var l = Date.now();
    preciseInterval(() => {
        var now = Date.now();
        var p = now - l;
        var d = p >= 1000 ? p - 1000 : 1000 - p;
        var percent = (d / 1000);
        percent = 1 - (percent > 1 ? 1 : percent < 0 ? 0 : percent);
        console.log(`Called in ${(now - l)} ms ( %c${now - l >= 1000 ? '+' : '-'}${now - l >= 1000 ? now - l - 1000 : 1000 - (now - l)} %c)`, `color:rgb(255, ${~~(percent * 255)}, ${~~(percent * 255)})`, 'color:initial');
        l = now;
    });
    */

    update();
    preciseInterval(update);

    function render() {
        canvasClarifier(canvas, ctx);

        requestAnimationFrame(render);
    }
})();