/*!
* jquery.counterup.js 1.0
*
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
* Released under the GPL v2 License
*
* Date: Nov 26, 2013
*/
! function(t) {
    "use strict";
    t.fn.counterUp = function(e) {
        var n = t.extend({
            time: 800,
            delay: 10,
            beforedelay: 0
        }, e);
        return this.each(function() {
            var e = t(this),
                u = n,
                a = function() {

                    var t = [],
                        n = u.time / u.delay,
                        a = e.text(),
                        r = /[0-9]+,[0-9]+/.test(a);

                    e.data("counterup-nums", t), e.text("0");                        
					setTimeout( function() {

	                    a = a.replace(/,/g, "");
	                    for (var o = (/^[0-9]+$/.test(a), /^[0-9]+\.[0-9]+$/.test(a)), c = o ? (a.split(".")[1] || []).length : 0, i = n; i >= 1; i--) {
	                        var s = parseInt(a / n * i);
	                        if (o && (s = parseFloat(a / n * i).toFixed(c)), r)
	                            for (;
	                                /(\d+)(\d{3})/.test(s.toString());) s = s.toString().replace(/(\d+)(\d{3})/, "$1,$2");
	                        t.unshift(s)
	                    }

	                    var d = function() {
	                        e.text(e.data("counterup-nums").shift()), e.data("counterup-nums").length ? setTimeout(e.data("counterup-func"), u.delay) : (delete e.data("counterup-nums"), e.data("counterup-nums", null), e.data("counterup-func", null))
	                    };
	                    e.data("counterup-func", d), setTimeout(e.data("counterup-func"), u.delay)
					}, u.beforedelay);                    
          

                };

            e.waypoint(a, {
                offset: "100%",
//                triggerOnce: !0 
            })
        })
    }
}(jQuery);

jQuery(window).on('scroll', function (event) {

    lteChartDoughnut();
}).scroll();

function lteChartDoughnut() {

    var scroll = jQuery(window).scrollTop() + jQuery(window).height();

    if (jQuery(".lte-chart-doughnut").length) {

        jQuery(".lte-chart-doughnut:not(.inited)").each(function(i, el) {

            var canvasEl = jQuery(el).prev().get(0).getContext("2d"),
                value = jQuery(el).data('percent'),
                scrollEl = jQuery(el).offset().top,
                bodyStyles = window.getComputedStyle(document.body),
                colorMain = jQuery.trim(bodyStyles.getPropertyValue('--main')),
                colorSecond = jQuery.trim(bodyStyles.getPropertyValue('--second'));
                colorBlack = jQuery.trim(bodyStyles.getPropertyValue('--black'));


            var gradient = canvasEl.createLinearGradient(0, 0, 0, 600);

            if ( jQuery(el).data('color') == 'main' ) gradient.addColorStop(0, colorMain);
                else
            if ( jQuery(el).data('color') == 'second' ) gradient.addColorStop(0, colorSecond);
                else
            gradient.addColorStop(0, colorBlack);

            var data = {
                datasets: [{
                    data: [value, 100-value],
                    borderWidth: 0,
                    backgroundColor: [
                        gradient,
                        '#eee'
                    ]
                }]
            };

            if (scroll > scrollEl) {

                new Chart(canvasEl, {
                    type: 'doughnut',
                    data: data,
                    options: {
                        responsive: true,
                        legend: {
                          display: false
                        },
                        cutoutPercentage: 88,
                        tooltips: {enabled: false},
                        hover: {mode: null},
                    }
                });

                jQuery(el).addClass('inited');
            }
        });
    }
}
