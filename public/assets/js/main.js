/* ----------------- Start Document ----------------- */
(function ($) {
  $(document).ready(() => {
    /*--------------------------------------------------*/
    /*  Mobile Menu - mmenu.js
		/*--------------------------------------------------*/
    $(() => {
      function mmenuInit() {
        const wi = $(window).width();
        if (wi <= '1099') {
          $('.mmenu-init').remove();
          $('#navigation')
            .clone()
            .addClass('mmenu-init')
            .insertBefore('#navigation')
            .removeAttr('id')
            .removeClass('style-1 style-2')
            .find('ul, div')
            .removeClass('style-1 style-2')
            .removeAttr('id');
          $('.mmenu-init')
            .find('ul')
            .addClass('mm-listview');
          $('.mmenu-init')
            .find('.mobile-styles .mm-listview')
            .unwrap();

          // $(".mmenu-init").mmenu({
          // 	"counters": true
          // }, {
          // 	// configuration
          // 	offCanvas: {
          // 		pageNodetype: "#wrapper"
          // 	}
          // });

          const mmenuAPI = $('.mmenu-init').data('mmenu');
          const $icon = $('.mmenu-trigger .hamburger');

          $('.mmenu-trigger').on('click', () => {
            mmenuAPI.open();
          });
        }
        $('.mm-next').addClass('mm-fullsubopen');
      }
      mmenuInit();
      $(window).resize(() => {
        mmenuInit();
      });
    });

    /*----------------------------------------------------*/
    /*  Sidebar Nav Submenus
		/*----------------------------------------------------*/

    $('.sidebar_innr ul li a').on('click', function (e) {
      if (
        $(this)
          .closest('li')
          .children('ul').length
      ) {
        if (
          $(this)
            .closest('li')
            .is('.active-submenu')
        ) {
          $('.sidebar_innr ul li').removeClass('active-submenu');
        } else {
          $('.sidebar_innr ul li').removeClass('active-submenu');
          $(this)
            .parent('li')
            .addClass('active-submenu');
        }
        e.preventDefault();
      }
    });

    /*----------------------------------------------------*/
    /*  Back to Top
		/*----------------------------------------------------*/

    // Button
    function backToTop() {
      $('body').append('<div id="backtotop"><a href="#"></a></div>');
    }
    backToTop();

    // Showing Button
    const pxShow = 100; // height on which the button will show
    const scrollSpeed = 500; // how slow / fast you want the button to scroll to top.

    $(window).scroll(() => {
      if ($(window).scrollTop() >= pxShow) {
        $('#backtotop').addClass('visible uk-animation-slide-bottom');
      } else {
        $('#backtotop').removeClass('visible uk-animation-slide-bottom');
      }
    });

    $('#backtotop a').on('click', () => {
      $('html, body').animate(
        {
          scrollTop: 0,
        },
        scrollSpeed,
      );
      return false;
    });

    /*--------------------------------------------------*/
    /*  NProgress
		/*-------------------------------------------------- */
    NProgress.start(); // start
    NProgress.set(0.4); // To set a progress percentage, call .set(n), where n is a number between 0..1
    NProgress.inc(); // To increment the progress bar, just use .inc(). This increments it with a random amount. This will never get to 100%: use it for every image load (or similar).If you want to increment by a specific value, you can pass that as a parameter
    NProgress.configure({
      ease: 'ease',
      speed: 1000,
    }); // Adjust animation settings using easing (a CSS easing string) and speed (in ms). (default: ease and 200)
    NProgress.configure({
      trickleSpeed: 800,
    }); // Adjust how often to trickle/increment, in ms.
    NProgress.configure({
      showSpinner: true,
    }); // Turn off loading spinner by setting it to false. (default: true)
    NProgress.configure({
      parent: '#wrapper',
    }); // specify this to change the parent container. (default: body)
    NProgress.done(); // end

    // ------------------ End Document ------------------ //
  });
}(this.jQuery));

/*! NProgress (c) 2013, Rico Sta. Cruz
 *  http://ricostacruz.com/nprogress */

(function (factory) {
  if (typeof module === 'function') {
    module.exports = factory(this.jQuery || require('jquery'));
  } else {
    this.NProgress = factory(this.jQuery);
  }
}(($) => {
  const NProgress = {};

  NProgress.version = '0.1.2';

  const Settings = (NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
  });

  /**
     * Updates configuration.
     *
     *     NProgress.configure({
     *       minimum: 0.1
     *     });
     */
  NProgress.configure = function (options) {
    $.extend(Settings, options);
    return this;
  };

  /**
     * Last number.
     */

  NProgress.status = null;

  /**
     * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
     *
     *     NProgress.set(0.4);
     *     NProgress.set(1.0);
     */

  NProgress.set = function (n) {
    const started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = n === 1 ? null : n;

    const $progress = NProgress.render(!started);
    const $bar = $progress.find('[role="bar"]');
    const { speed } = Settings;
    const ease = Settings.easing;

    $progress[0].offsetWidth; /* Repaint */

    $progress.queue((next) => {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      $bar.css(barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        $progress.css({
          transition: 'none',
          opacity: 1,
        });
        $progress[0].offsetWidth; /* Repaint */

        setTimeout(() => {
          $progress.css({
            transition: `all ${speed}ms linear`,
            opacity: 0,
          });
          setTimeout(() => {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function () {
    return typeof NProgress.status === 'number';
  };

  /**
     * Shows the progress bar.
     * This is the same as setting the status to 0%, except that it doesn't go backwards.
     *
     *     NProgress.start();
     *
     */
  NProgress.start = function () {
    if (!NProgress.status) NProgress.set(0);

    var work = function () {
      setTimeout(() => {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
     * Hides the progress bar.
     * This is the *sort of* the same as setting the status to 100%, with the
     * difference being `done()` makes some placebo effect of some realistic motion.
     *
     *     NProgress.done();
     *
     * If `true` is passed, it will show the progress bar even if its hidden.
     *
     *     NProgress.done(true);
     */

  NProgress.done = function (force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
     * Increments by a random amount.
     */

  NProgress.inc = function (amount) {
    let n = NProgress.status;

    if (!n) {
      return NProgress.start();
    }
    if (typeof amount !== 'number') {
      amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
    }

    n = clamp(n + amount, 0, 0.994);
    return NProgress.set(n);
  };

  NProgress.trickle = function () {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
     * (Internal) renders the progress bar markup based on the `template`
     * setting.
     */

  NProgress.render = function (fromStart) {
    if (NProgress.isRendered()) return $('#nprogress');
    $('html').addClass('nprogress-busy');

    const $el = $("<div id='nprogress'>").html(Settings.template);

    const perc = fromStart ? '-100' : toBarPerc(NProgress.status || 0);

    $el.find('[role="bar"]').css({
      transition: 'all 0 linear',
      transform: `translate3d(${perc}%,0,0)`,
    });

    if (!Settings.showSpinner) $el.find('[role="spinner"]').remove();

    $el.appendTo(document.body);

    return $el;
  };

  /**
     * Removes the element. Opposite of render().
     */

  NProgress.remove = function () {
    $('html').removeClass('nprogress-busy');
    $('#nprogress').remove();
  };

  /**
     * Checks if the progress bar is rendered.
     */

  NProgress.isRendered = function () {
    return $('#nprogress').length > 0;
  };

  /**
     * Determine which positioning CSS rule to use.
     */

  NProgress.getPositioningCSS = function () {
    // Sniff on document.body.style
    const bodyStyle = document.body.style;

    // Sniff prefixes
    const vendorPrefix = 'WebkitTransform' in bodyStyle
      ? 'Webkit'
      : 'MozTransform' in bodyStyle
        ? 'Moz'
        : 'msTransform' in bodyStyle
          ? 'ms'
          : 'OTransform' in bodyStyle
            ? 'O'
            : '';

    if (`${vendorPrefix}Perspective` in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    }
    if (`${vendorPrefix}Transform` in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    }
    // Browsers without translate() support, e.g. IE7-8
    return 'margin';
  };

  /**
     * Helpers
     */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
     * (Internal) converts a percentage (`0..1`) to a bar translateX
     * percentage (`-100%..0%`).
     */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }

  /**
     * (Internal) returns the correct CSS for changing the bar's
     * position given an n percentage, and speed and ease from Settings
     */

  function barPositionCSS(n, speed, ease) {
    let barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = {
        transform: `translate3d(${toBarPerc(n)}%,0,0)`,
      };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = {
        transform: `translate(${toBarPerc(n)}%,0)`,
      };
    } else {
      barCSS = {
        'margin-left': `${toBarPerc(n)}%`,
      };
    }

    barCSS.transition = `all ${speed}ms ${ease}`;

    return barCSS;
  }

  return NProgress;
}));
