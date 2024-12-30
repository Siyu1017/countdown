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

    // var start = Date.now();

    // Update remaining time
    function update() {
        now = Date.now();
        // now = new Date('2024/12/31 23:58:55').getTime() + (now - start);
        remainingSeconds = ~~((targetTime - now) / 1000);
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
        if (remainingSeconds <= 0) {
            // Times up
            renderContent[3] = '00';
        }
        updateCountdown();
    }

    var fontSize = 144;
    var fontFamily = 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color emoji';

    const navbar = document.querySelector('.navbar');

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

    controllerFontSizeDecrease.setAttribute('data-tooltip', '減小字體大小');
    controllerFontSizeIncrease.setAttribute('data-tooltip', '增大字體大小');
    controllerFontSizeReset.setAttribute('data-tooltip', '重置字體大小');
    controllerFullscreen.setAttribute('data-tooltip', '全螢幕');
    controllerHide.setAttribute('data-tooltip', '隱藏 UI');

    controllerContainer.appendChild(controller);
    controller.appendChild(controllerFontSize);
    controllerFontSize.appendChild(controllerFontSizeDecrease);
    controllerFontSize.appendChild(controllerFontSizeCurrent);
    controllerFontSize.appendChild(controllerFontSizeIncrease);
    controllerFontSize.appendChild(controllerFontSizeReset);
    controller.appendChild(controllerView);
    controllerView.appendChild(controllerFullscreen);
    // controllerView.appendChild(controllerHide);

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
        if (remainingSeconds < 60) {
            countdownDays.classList.add('invisible');
            countdownHours.classList.add('invisible');
            countdownMinutes.classList.add('invisible');
            countdownSecondsUnit.classList.add('invisible');
            countdownSecondsNumber.style.transform = 'scale(1.5)';
        }
    }

    var showUI = false;
    var scales = [0.01, 0.02, 0.05, 0.1, 0.2, 0.25, 0.33, 0.4, 0.5, 0.66, 0.75, 0.8, 0.9, 1, 1.1, 1.2, 1.35, 1.5, 1.75, 2, 2.5, 3.25, 4, 5, 7.5, 8, 10];
    var scaleIndex = scales.indexOf(1);
    controllerFontSizeDecrease.addEventListener("click", () => {
        scaleIndex -= 1;
        if (scaleIndex < 0) {
            scaleIndex = 0;
        }
        controllerFontSizeCurrent.textContent = ~~(scales[scaleIndex] * 100) + '%';
        document.querySelector(':root').style.setProperty('--countdown-scale', scales[scaleIndex]);
    })
    controllerFontSizeIncrease.addEventListener("click", () => {
        scaleIndex += 1;
        if (scaleIndex > scales.length - 1) {
            scaleIndex = scales.length - 1;
        }
        controllerFontSizeCurrent.textContent = ~~(scales[scaleIndex] * 100) + '%';
        document.querySelector(':root').style.setProperty('--countdown-scale', scales[scaleIndex]);
    })
    controllerFontSizeReset.addEventListener("click", () => {
        scaleIndex = scales.indexOf(1);
        controllerFontSizeCurrent.textContent = '100%';
        document.querySelector(':root').style.setProperty('--countdown-scale', 1);
    })
    function enterFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else {
            console.error("Fullscreen API not supported");
        }
    }
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else {
            console.error("Fullscreen API not supported");
        }
    }
    function updateFullscreenIcon() {
        if (document.fullscreenElement) {
            controllerFullscreen.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>`;
            controllerFullscreen.setAttribute('data-tooltip', '離開全螢幕');
        } else {
            controllerFullscreen.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`;
            controllerFullscreen.setAttribute('data-tooltip', '全螢幕');
        }
    }
    controllerFullscreen.addEventListener("click", () => {
        if (document.fullscreenElement) {
            exitFullscreen();
        } else {
            enterFullscreen(document.documentElement);
        }
    })
    window.addEventListener("resize", () => {
        console.log('Resized');
        updateFullscreenIcon();
    });
    document.addEventListener("fullscreenchange", () => {
        console.log('Fullscreen changed');
        updateFullscreenIcon();
    });
    controllerHide.addEventListener('click', () => {
        showUI = !showUI == true;
        if (showUI == false) {
            navbar.style.transform = 'translateY(-200%)';
            controller.style.transform = 'translateY(200%)';
            controllerHide.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`;
            controllerHide.setAttribute('data-tooltip', '顯示 UI');
        } else {
            navbar.style.transform = 'translateY(0)';
            controller.style.transform = 'translateY(0)';
            controllerHide.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>`;
            controllerHide.setAttribute('data-tooltip', '隱藏 UI');
        }
    })
    var lastMoveTime = Date.now();
    var underUI = false;
    function hideUI() {
        setTimeout(() => {
            if (Date.now() - lastMoveTime < 2000 || showUI == true || underUI == true) {
                return;
            } else {
                navbar.style.transform = 'translateY(-200%)';
                controller.style.transform = 'translateY(200%)';
            }
        }, 2000);
    }
    function setUI() {
        if (showUI == false) {
            if (navbar.contains(e.target) || controller.contains(e.target)) {
                return underUI = true;
            } else {
                underUI = false;
            }
            lastMoveTime = Date.now();
            navbar.style.transform = 'translateY(0)';
            controller.style.transform = 'translateY(0)';
            hideUI();
        }
    }
    window.addEventListener('click', setUI)
    window.addEventListener('touchstart', setUI())
    window.addEventListener('pointermove', setUI())

    setTimeout(() => {
        hideUI();
    }, 4000);

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

    var initialized = false;
    function init() {
        if (initialized == true) {
            return;
        }
        initialized = true;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', {
            willReadFrequently: true
        });
        canvas.className = 'countdown-canvas';
        countdown.appendChild(canvas);

        var gravity = 0.05;
        var particles = [];

        class Particle {
            constructor(x, y) {
                this.spawnX = x;
                this.spawnY = y;
                this.angle = random(0, 360) / 180 * Math.PI;
                this.speed = random(3, 6);
                this.spawn = Date.now();
                this.size = random(2, 4);
            }
            getData() {
                var now = Date.now();
                var x = this.speed * Math.cos(this.angle) * (now - this.spawn) / 1000 + this.spawnX;
                var y = this.speed * Math.sin(this.angle) * (now - this.spawn) / 1000 + gravity * ((now - this.spawn) / 1000) ^ 2 + this.spawnY;
                if (y > canvas.offsetHeight + this.size * 2) {
                    particles.splice(particles.indexOf(this), 1);
                }
                return { x, y };
            }
        }

        class Firework {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.color = `hsl(${random(0, 360)}, 100%, 50%)`;
                for (let i = 0; i < 100; i++) {
                    new Particle(this.x, this.y);
                }
            }
        }

        function launch() {
            var width = canvas.offsetWidth;
            var height = canvas.offsetHeight;
            var x = random(width / 4, width / 4 * 3);
            var y = random(height / 4, height / 2);
            var firework = new Firework(x, y);
        }

        function render() {
            canvasClarifier(canvas, ctx);
            launch();
            requestAnimationFrame(render);
        }
        render();
    }

    // init();
})();