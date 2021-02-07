/**
 * Copyright 2021 Jonathan ARNAULT
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

function throttle (fn, duration) {
    let timer = null;

    return function() {
        if (timer == null) {
            fn.apply(this, arguments);
            timer = setTimeout(function () {
                timer = null;
            }, duration);
        }
    }
}

(function () {
    const $navToggle = document.querySelector('header input[type="checkbox"]');
    const $navLinks = document.querySelectorAll('nav a');
    for (const $navLink of $navLinks) {
        $navLink.addEventListener('click', function () {
            $navToggle.checked = false;
        });
    }
})();


(function () {
    const $charts = document.querySelector('.charts')
    const skillsChartTopOffset = document.querySelector('#skills').offsetTop;
    const skillsChartTopRelative = 196;
    window.addEventListener('scroll', throttle(function() {
        const position = Math.min(skillsChartTopOffset, window.pageYOffset) / skillsChartTopOffset;
        const top =  Math.ceil(position * skillsChartTopRelative) - skillsChartTopRelative;
        $charts.style.top = `${top}px`;
    }), 150);
})();

(function(Chart) {
    const backgroundColor = 'rgba(28, 122, 131, 0.6)';
    const options = {
        legend: {
            display: false,
        },
        scale: {
            ticks: {
                maxTicksLimit: 8,
                display: false,
                min: 0,
                max: 100,
            },
        },
    };

    Chart.defaults.global.defaultFontColor = '#222222'
    Chart.defaults.global.defaultFontFamily = `'Oxygen', sans-serif`;
    Chart.defaults.global.defaultFontSize = 16;
    
    // Skills
    new Chart(document.querySelector('#chart-skills canvas'), {
        type: 'radar',
        data: {
            labels: [ 'JavaScript', 'HTML / CSS', 'Swift', 'C', 'Go' ],
            datasets: [
                {
                    data: [ 90, 90, 50, 80, 80 ],
                    backgroundColor,
                },
            ],
        },
        options,
    });
    
    // Interests
    new Chart(document.querySelector('#chart-interests canvas'), {
        type: 'radar',
        data: {
            labels: [ 'UX Design', 'Learning', 'Ecology', 'Pastry', 'Teaching' ],
            datasets: [
                {
                    data: [ 80, 100, 70, 60, 80 ],
                    backgroundColor,
                },
            ],
        },
        options,
    });

})(window.Chart);
