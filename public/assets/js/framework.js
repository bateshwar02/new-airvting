/*! UIkit 3.2.1 | http://www.getuikit.com | (c) 2014 - 2019 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define('uikit', factory) :
            (global = global || self, global.UIkit = factory());
}(this, function () { 

    const objPrototype = Object.prototype;
    const {hasOwnProperty} = objPrototype;

    function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key);
    }

    const hyphenateCache = {};
    const hyphenateRe = /([a-z\d])([A-Z])/g;

    function hyphenate(str) {

        if (!(str in hyphenateCache)) {
            hyphenateCache[str] = str
                .replace(hyphenateRe, '$1-$2')
                .toLowerCase();
        }

        return hyphenateCache[str];
    }

    const camelizeRe = /-(\w)/g;

    function camelize(str) {
        return str.replace(camelizeRe, toUpper);
    }

    function toUpper(_, c) {
        return c ? c.toUpperCase() : '';
    }

    function ucfirst(str) {
        return str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : '';
    }

    const strPrototype = String.prototype;
    const startsWithFn = strPrototype.startsWith || function (search) { return this.lastIndexOf(search, 0) === 0; };

    function startsWith(str, search) {
        return startsWithFn.call(str, search);
    }

    const endsWithFn = strPrototype.endsWith || function (search) { return this.substr(-search.length) === search; };

    function endsWith(str, search) {
        return endsWithFn.call(str, search);
    }

    const arrPrototype = Array.prototype;

    const includesFn = function (search, i) { return ~this.indexOf(search, i); };
    const includesStr = strPrototype.includes || includesFn;
    const includesArray = arrPrototype.includes || includesFn;

    function includes(obj, search) {
        return obj && (isString(obj) ? includesStr : includesArray).call(obj, search);
    }

    const findIndexFn = arrPrototype.findIndex || function (predicate) {
        const arguments$1 = arguments;

        for (let i = 0; i < this.length; i++) {
            if (predicate.call(arguments$1[1], this[i], i, this)) {
                return i;
            }
        }
        return -1;
    };

    function findIndex(array, predicate) {
        return findIndexFn.call(array, predicate);
    }

    const {isArray} = Array;

    function isFunction(obj) {
        return typeof obj === 'function';
    }

    function isObject(obj) {
        return obj !== null && typeof obj === 'object';
    }

    const {toString} = objPrototype;
    function isPlainObject(obj) {
        return toString.call(obj) === '[object Object]';
    }

    function isWindow(obj) {
        return isObject(obj) && obj === obj.window;
    }

    function isDocument(obj) {
        return isObject(obj) && obj.nodeType === 9;
    }

    function isJQuery(obj) {
        return isObject(obj) && !!obj.jquery;
    }

    function isNode(obj) {
        return obj instanceof Node || isObject(obj) && obj.nodeType >= 1;
    }

    function isNodeCollection(obj) {
        return toString.call(obj).match(/^\[object (NodeList|HTMLCollection)\]$/);
    }

    function isBoolean(value) {
        return typeof value === 'boolean';
    }

    function isString(value) {
        return typeof value === 'string';
    }

    function isNumber(value) {
        return typeof value === 'number';
    }

    function isNumeric(value) {
        return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
    }

    function isEmpty(obj) {
        return !(isArray(obj)
            ? obj.length
            : isObject(obj)
                ? Object.keys(obj).length
                : false
        );
    }

    function isUndefined(value) {
        return value === void 0;
    }

    function toBoolean(value) {
        return isBoolean(value)
            ? value
            : value === 'true' || value === '1' || value === ''
                ? true
                : value === 'false' || value === '0'
                    ? false
                    : value;
    }

    function toNumber(value) {
        const number = Number(value);
        return !isNaN(number) ? number : false;
    }

    function toFloat(value) {
        return parseFloat(value) || 0;
    }

    function toNode(element) {
        return isNode(element) || isWindow(element) || isDocument(element)
            ? element
            : isNodeCollection(element) || isJQuery(element)
                ? element[0]
                : isArray(element)
                    ? toNode(element[0])
                    : null;
    }

    function toNodes(element) {
        return isNode(element)
            ? [element]
            : isNodeCollection(element)
                ? arrPrototype.slice.call(element)
                : isArray(element)
                    ? element.map(toNode).filter(Boolean)
                    : isJQuery(element)
                        ? element.toArray()
                        : [];
    }

    function toList(value) {
        return isArray(value)
            ? value
            : isString(value)
                ? value.split(/,(?![^(]*\))/).map(function (value) { return isNumeric(value)
                    ? toNumber(value)
                    : toBoolean(value.trim()); })
                : [value];
    }

    function toMs(time) {
        return !time
            ? 0
            : endsWith(time, 'ms')
                ? toFloat(time)
                : toFloat(time) * 1000;
    }

    function isEqual(value, other) {
        return value === other
            || isObject(value)
            && isObject(other)
            && Object.keys(value).length === Object.keys(other).length
            && each(value, function (val, key) { return val === other[key]; });
    }

    function swap(value, a, b) {
        return value.replace(new RegExp((`${a  }|${  b}`), 'mg'), function (match) {
            return match === a ? b : a;
        });
    }

    const assign = Object.assign || function (target) {
        const args = []; let len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        target = Object(target);
        for (let i = 0; i < args.length; i++) {
            const source = args[i];
            if (source !== null) {
                for (const key in source) {
                    if (hasOwn(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };

    function last(array) {
        return array[array.length - 1];
    }

    function each(obj, cb) {
        for (const key in obj) {
            if (cb(obj[key], key) === false) {
                return false;
            }
        }
        return true;
    }

    function sortBy(array, prop) {
        return array.sort(function (ref, ref$1) {
            let propA = ref[prop]; if ( propA === void 0 ) propA = 0;
            let propB = ref$1[prop]; if ( propB === void 0 ) propB = 0;

            return propA > propB
                ? 1
                : propB > propA
                    ? -1
                    : 0;
        }
        );
    }

    function uniqueBy(array, prop) {
        const seen = new Set();
        return array.filter(function (ref) {
            const check = ref[prop];

            return seen.has(check)
                ? false
                : seen.add(check) || true;
        } // IE 11 does not return the Set object
        );
    }

    function clamp(number, min, max) {
        if ( min === void 0 ) min = 0;
        if ( max === void 0 ) max = 1;

        return Math.min(Math.max(toNumber(number) || 0, min), max);
    }

    function noop() {}

    function intersectRect(r1, r2) {
        return r1.left < r2.right &&
            r1.right > r2.left &&
            r1.top < r2.bottom &&
            r1.bottom > r2.top;
    }

    function pointInRect(point, rect) {
        return point.x <= rect.right &&
            point.x >= rect.left &&
            point.y <= rect.bottom &&
            point.y >= rect.top;
    }

    const Dimensions = {

        ratio(dimensions, prop, value) {
            let obj;


            const aProp = prop === 'width' ? 'height' : 'width';

            return ( obj = {}, obj[aProp] = dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp], obj[prop] = value, obj );
        },

        contain(dimensions, maxDimensions) {
            const this$1 = this;

            dimensions = { ...dimensions};

            each(dimensions, function (_, prop) { return dimensions = dimensions[prop] > maxDimensions[prop]
                ? this$1.ratio(dimensions, prop, maxDimensions[prop])
                : dimensions; }
            );

            return dimensions;
        },

        cover(dimensions, maxDimensions) {
            const this$1 = this;

            dimensions = this.contain(dimensions, maxDimensions);

            each(dimensions, function (_, prop) { return dimensions = dimensions[prop] < maxDimensions[prop]
                ? this$1.ratio(dimensions, prop, maxDimensions[prop])
                : dimensions; }
            );

            return dimensions;
        }

    };

    function attr(element, name, value) {

        if (isObject(name)) {
            for (const key in name) {
                attr(element, key, name[key]);
            }
            return;
        }

        if (isUndefined(value)) {
            element = toNode(element);
            return element && element.getAttribute(name);
        } 
        toNodes(element).forEach(function (element) {

            if (isFunction(value)) {
                value = value.call(element, attr(element, name));
            }

            if (value === null) {
                removeAttr(element, name);
            } else {
                element.setAttribute(name, value);
            }
        });
        

    }

    function hasAttr(element, name) {
        return toNodes(element).some(function (element) { return element.hasAttribute(name); });
    }

    function removeAttr(element, name) {
        element = toNodes(element);
        name.split(' ').forEach(function (name) { return element.forEach(function (element) { return element.hasAttribute(name) && element.removeAttribute(name); }
        ); }
        );
    }

    function data(element, attribute) {
        for (let i = 0, attrs = [attribute, (`data-${  attribute}`)]; i < attrs.length; i++) {
            if (hasAttr(element, attrs[i])) {
                return attr(element, attrs[i]);
            }
        }
    }

    /* global DocumentTouch */

    const isIE = /msie|trident/i.test(window.navigator.userAgent);
    const isRtl = attr(document.documentElement, 'dir') === 'rtl';

    const hasTouchEvents = 'ontouchstart' in window;
    const hasPointerEvents = window.PointerEvent;
    const hasTouch = hasTouchEvents
        || window.DocumentTouch && document instanceof DocumentTouch
        || navigator.maxTouchPoints; // IE >=11

    const pointerDown = hasPointerEvents ? 'pointerdown' : hasTouchEvents ? 'touchstart' : 'mousedown';
    const pointerMove = hasPointerEvents ? 'pointermove' : hasTouchEvents ? 'touchmove' : 'mousemove';
    const pointerUp = hasPointerEvents ? 'pointerup' : hasTouchEvents ? 'touchend' : 'mouseup';
    const pointerEnter = hasPointerEvents ? 'pointerenter' : hasTouchEvents ? '' : 'mouseenter';
    const pointerLeave = hasPointerEvents ? 'pointerleave' : hasTouchEvents ? '' : 'mouseleave';
    const pointerCancel = hasPointerEvents ? 'pointercancel' : 'touchcancel';

    function query(selector, context) {
        return toNode(selector) || find(selector, getContext(selector, context));
    }

    function queryAll(selector, context) {
        const nodes = toNodes(selector);
        return nodes.length && nodes || findAll(selector, getContext(selector, context));
    }

    function getContext(selector, context) {
        if ( context === void 0 ) context = document;

        return isContextSelector(selector) || isDocument(context)
            ? context
            : context.ownerDocument;
    }

    function find(selector, context) {
        return toNode(_query(selector, context, 'querySelector'));
    }

    function findAll(selector, context) {
        return toNodes(_query(selector, context, 'querySelectorAll'));
    }

    function _query(selector, context, queryFn) {
        if ( context === void 0 ) context = document;


        if (!selector || !isString(selector)) {
            return null;
        }

        selector = selector.replace(contextSanitizeRe, '$1 *');

        let removes;

        if (isContextSelector(selector)) {

            removes = [];

            selector = splitSelector(selector).map(function (selector, i) {

                let ctx = context;

                if (selector[0] === '!') {

                    const selectors = selector.substr(1).trim().split(' ');
                    ctx = closest(context.parentNode, selectors[0]);
                    selector = selectors.slice(1).join(' ').trim();

                }

                if (selector[0] === '-') {

                    const selectors$1 = selector.substr(1).trim().split(' ');
                    const prev = (ctx || context).previousElementSibling;
                    ctx = matches(prev, selector.substr(1)) ? prev : null;
                    selector = selectors$1.slice(1).join(' ');

                }

                if (!ctx) {
                    return null;
                }

                if (!ctx.id) {
                    ctx.id = `uk-${  Date.now()  }${i}`;
                    removes.push(function () { return removeAttr(ctx, 'id'); });
                }

                return (`#${  escape(ctx.id)  } ${  selector}`);

            }).filter(Boolean).join(',');

            context = document;

        }

        try {

            return context[queryFn](selector);

        } catch (e) {

            return null;

        } finally {

            removes && removes.forEach(function (remove) { return remove(); });

        }

    }

    const contextSelectorRe = /(^|[^\\],)\s*[!>+~-]/;
    var contextSanitizeRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;

    function isContextSelector(selector) {
        return isString(selector) && selector.match(contextSelectorRe);
    }

    const selectorRe = /.*?[^\\](?:,|$)/g;

    function splitSelector(selector) {
        return selector.match(selectorRe).map(function (selector) { return selector.replace(/,$/, '').trim(); });
    }

    const elProto = Element.prototype;
    const matchesFn = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector;

    function matches(element, selector) {
        return toNodes(element).some(function (element) { return matchesFn.call(element, selector); });
    }

    const closestFn = elProto.closest || function (selector) {
        let ancestor = this;

        do {

            if (matches(ancestor, selector)) {
                return ancestor;
            }

            ancestor = ancestor.parentNode;

        } while (ancestor && ancestor.nodeType === 1);
    };

    function closest(element, selector) {

        if (startsWith(selector, '>')) {
            selector = selector.slice(1);
        }

        return isNode(element)
            ? closestFn.call(element, selector)
            : toNodes(element).map(function (element) { return closest(element, selector); }).filter(Boolean);
    }

    function parents(element, selector) {
        const elements = [];
        element = toNode(element);

        while ((element = element.parentNode) && element.nodeType === 1) {
            if (matches(element, selector)) {
                elements.push(element);
            }
        }

        return elements;
    }

    const escapeFn = window.CSS && CSS.escape || function (css) { return css.replace(/([^\x7f-\uFFFF\w-])/g, function (match) { return (`\\${  match}`); }); };
    function escape(css) {
        return isString(css) ? escapeFn.call(null, css) : '';
    }

    const voidElements = {
        area: true,
        base: true,
        br: true,
        col: true,
        embed: true,
        hr: true,
        img: true,
        input: true,
        keygen: true,
        link: true,
        menuitem: true,
        meta: true,
        param: true,
        source: true,
        track: true,
        wbr: true
    };
    function isVoidElement(element) {
        return toNodes(element).some(function (element) { return voidElements[element.tagName.toLowerCase()]; });
    }

    function isVisible(element) {
        return toNodes(element).some(function (element) { return element.offsetWidth || element.offsetHeight || element.getClientRects().length; });
    }

    const selInput = 'input,select,textarea,button';
    function isInput(element) {
        return toNodes(element).some(function (element) { return matches(element, selInput); });
    }

    function filter(element, selector) {
        return toNodes(element).filter(function (element) { return matches(element, selector); });
    }

    function within(element, selector) {
        return !isString(selector)
            ? element === selector || (isDocument(selector)
                ? selector.documentElement
                : toNode(selector)).contains(toNode(element)) // IE 11 document does not implement contains
            : matches(element, selector) || closest(element, selector);
    }

    function on() {
        const args = []; let len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];


        const ref = getArgs(args);
        let targets = ref[0];
        const type = ref[1];
        const selector = ref[2];
        let listener = ref[3];
        let useCapture = ref[4];

        targets = toEventTargets(targets);

        if (listener.length > 1) {
            listener = detail(listener);
        }

        if (selector) {
            listener = delegate(targets, selector, listener);
        }

        if (useCapture && useCapture.self) {
            listener = selfFilter(listener);
        }

        useCapture = useCaptureFilter(useCapture);

        type.split(' ').forEach(function (type) { return targets.forEach(function (target) { return target.addEventListener(type, listener, useCapture); }
        ); }
        );
        return function () { return off(targets, type, listener, useCapture); };
    }

    function off(targets, type, listener, useCapture) {
        if ( useCapture === void 0 ) useCapture = false;

        useCapture = useCaptureFilter(useCapture);
        targets = toEventTargets(targets);
        type.split(' ').forEach(function (type) { return targets.forEach(function (target) { return target.removeEventListener(type, listener, useCapture); }
        ); }
        );
    }

    function once() {
        const args = []; let len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];


        const ref = getArgs(args);
        const element = ref[0];
        const type = ref[1];
        const selector = ref[2];
        const listener = ref[3];
        const useCapture = ref[4];
        const condition = ref[5];
        var off = on(element, type, selector, function (e) {
            const result = !condition || condition(e);
            if (result) {
                off();
                listener(e, result);
            }
        }, useCapture);

        return off;
    }

    function trigger(targets, event, detail) {
        return toEventTargets(targets).reduce(function (notCanceled, target) { return notCanceled && target.dispatchEvent(createEvent(event, true, true, detail)); }
            , true);
    }

    function createEvent(e, bubbles, cancelable, detail) {
        if ( bubbles === void 0 ) bubbles = true;
        if ( cancelable === void 0 ) cancelable = false;

        if (isString(e)) {
            const event = document.createEvent('CustomEvent'); // IE 11
            event.initCustomEvent(e, bubbles, cancelable, detail);
            e = event;
        }

        return e;
    }

    function getArgs(args) {
        if (isFunction(args[2])) {
            args.splice(2, 0, false);
        }
        return args;
    }

    function delegate(delegates, selector, listener) {
        const this$1 = this;

        return function (e) {

            delegates.forEach(function (delegate) {

                const current = selector[0] === '>'
                    ? findAll(selector, delegate).reverse().filter(function (element) { return within(e.target, element); })[0]
                    : closest(e.target, selector);

                if (current) {
                    e.delegate = delegate;
                    e.current = current;

                    listener.call(this$1, e);
                }

            });

        };
    }

    function detail(listener) {
        return function (e) { return isArray(e.detail) ? listener.apply(void 0, [e].concat(e.detail)) : listener(e); };
    }

    function selfFilter(listener) {
        return function (e) {
            if (e.target === e.currentTarget || e.target === e.current) {
                return listener.call(null, e);
            }
        };
    }

    function useCaptureFilter(options) {
        return options && isIE && !isBoolean(options)
            ? !!options.capture
            : options;
    }

    function isEventTarget(target) {
        return target && 'addEventListener' in target;
    }

    function toEventTarget(target) {
        return isEventTarget(target) ? target : toNode(target);
    }

    function toEventTargets(target) {
        return isArray(target)
            ? target.map(toEventTarget).filter(Boolean)
            : isString(target)
                ? findAll(target)
                : isEventTarget(target)
                    ? [target]
                    : toNodes(target);
    }

    function isTouch(e) {
        return e.pointerType === 'touch' || !!e.touches;
    }

    function getEventPos(e, prop) {
        if ( prop === void 0 ) prop = 'client';

        const {touches} = e;
        const {changedTouches} = e;
        const ref = touches && touches[0] || changedTouches && changedTouches[0] || e;
        const x = ref[(`${prop  }X`)];
        const y = ref[(`${prop  }Y`)];

        return {x, y};
    }

    /* global setImmediate */

    const Promise = 'Promise' in window ? window.Promise : PromiseFn;

    const Deferred = function() {
        const this$1 = this;

        this.promise = new Promise(function (resolve, reject) {
            this$1.reject = reject;
            this$1.resolve = resolve;
        });
    };

    /**
     * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
     */

    const RESOLVED = 0;
    const REJECTED = 1;
    const PENDING = 2;

    const async = 'setImmediate' in window ? setImmediate : setTimeout;

    function PromiseFn(executor) {

        this.state = PENDING;
        this.value = undefined;
        this.deferred = [];

        const promise = this;

        try {
            executor(
                function (x) {
                    promise.resolve(x);
                },
                function (r) {
                    promise.reject(r);
                }
            );
        } catch (e) {
            promise.reject(e);
        }
    }

    PromiseFn.reject = function (r) {
        return new PromiseFn(function (resolve, reject) {
            reject(r);
        });
    };

    PromiseFn.resolve = function (x) {
        return new PromiseFn(function (resolve, reject) {
            resolve(x);
        });
    };

    PromiseFn.all = function all(iterable) {
        return new PromiseFn(function (resolve, reject) {
            const result = [];
            let count = 0;

            if (iterable.length === 0) {
                resolve(result);
            }

            function resolver(i) {
                return function (x) {
                    result[i] = x;
                    count += 1;

                    if (count === iterable.length) {
                        resolve(result);
                    }
                };
            }

            for (let i = 0; i < iterable.length; i += 1) {
                PromiseFn.resolve(iterable[i]).then(resolver(i), reject);
            }
        });
    };

    PromiseFn.race = function race(iterable) {
        return new PromiseFn(function (resolve, reject) {
            for (let i = 0; i < iterable.length; i += 1) {
                PromiseFn.resolve(iterable[i]).then(resolve, reject);
            }
        });
    };

    const p = PromiseFn.prototype;

    p.resolve = function resolve(x) {
        const promise = this;

        if (promise.state === PENDING) {
            if (x === promise) {
                throw new TypeError('Promise settled with itself.');
            }

            let called = false;

            try {
                const then = x && x.then;

                if (x !== null && isObject(x) && isFunction(then)) {
                    then.call(
                        x,
                        function (x) {
                            if (!called) {
                                promise.resolve(x);
                            }
                            called = true;
                        },
                        function (r) {
                            if (!called) {
                                promise.reject(r);
                            }
                            called = true;
                        }
                    );
                    return;
                }
            } catch (e) {
                if (!called) {
                    promise.reject(e);
                }
                return;
            }

            promise.state = RESOLVED;
            promise.value = x;
            promise.notify();
        }
    };

    p.reject = function reject(reason) {
        const promise = this;

        if (promise.state === PENDING) {
            if (reason === promise) {
                throw new TypeError('Promise settled with itself.');
            }

            promise.state = REJECTED;
            promise.value = reason;
            promise.notify();
        }
    };

    p.notify = function notify() {
        const this$1 = this;

        async(function () {
            if (this$1.state !== PENDING) {
                while (this$1.deferred.length) {
                    const ref = this$1.deferred.shift();
                    const onResolved = ref[0];
                    const onRejected = ref[1];
                    const resolve = ref[2];
                    const reject = ref[3];

                    try {
                        if (this$1.state === RESOLVED) {
                            if (isFunction(onResolved)) {
                                resolve(onResolved.call(undefined, this$1.value));
                            } else {
                                resolve(this$1.value);
                            }
                        } else if (this$1.state === REJECTED) {
                            if (isFunction(onRejected)) {
                                resolve(onRejected.call(undefined, this$1.value));
                            } else {
                                reject(this$1.value);
                            }
                        }
                    } catch (e) {
                        reject(e);
                    }
                }
            }
        });
    };

    p.then = function then(onResolved, onRejected) {
        const this$1 = this;

        return new PromiseFn(function (resolve, reject) {
            this$1.deferred.push([onResolved, onRejected, resolve, reject]);
            this$1.notify();
        });
    };

    p.catch = function (onRejected) {
        return this.then(undefined, onRejected);
    };

    function ajax(url, options) {
        return new Promise(function (resolve, reject) {

            const env = {data: null,
                method: 'GET',
                headers: {},
                xhr: new XMLHttpRequest(),
                beforeSend: noop,
                responseType: '', ...options};

            env.beforeSend(env);

            const {xhr} = env;

            for (const prop in env) {
                if (prop in xhr) {
                    try {

                        xhr[prop] = env[prop];

                    } catch (e) {}
                }
            }

            xhr.open(env.method.toUpperCase(), url);

            for (const header in env.headers) {
                xhr.setRequestHeader(header, env.headers[header]);
            }

            on(xhr, 'load', function () {

                if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    resolve(xhr);
                } else {
                    reject(assign(Error(xhr.statusText), {
                        xhr,
                        status: xhr.status
                    }));
                }

            });

            on(xhr, 'error', function () { return reject(assign(Error('Network Error'), {xhr})); });
            on(xhr, 'timeout', function () { return reject(assign(Error('Network Timeout'), {xhr})); });

            xhr.send(env.data);
        });
    }

    function getImage(src, srcset, sizes) {

        return new Promise(function (resolve, reject) {
            const img = new Image();

            img.onerror = reject;
            img.onload = function () { return resolve(img); };

            sizes && (img.sizes = sizes);
            srcset && (img.srcset = srcset);
            img.src = src;
        });

    }

    function ready(fn) {

        if (document.readyState !== 'loading') {
            fn();
            return;
        }

        var unbind = on(document, 'DOMContentLoaded', function () {
            unbind();
            fn();
        });
    }

    function index(element, ref) {
        return ref
            ? toNodes(element).indexOf(toNode(ref))
            : toNodes((element = toNode(element)) && element.parentNode.children).indexOf(element);
    }

    function getIndex(i, elements, current, finite) {
        if ( current === void 0 ) current = 0;
        if ( finite === void 0 ) finite = false;


        elements = toNodes(elements);

        const {length} = elements;

        i = isNumeric(i)
            ? toNumber(i)
            : i === 'next'
                ? current + 1
                : i === 'previous'
                    ? current - 1
                    : index(elements, i);

        if (finite) {
            return clamp(i, 0, length - 1);
        }

        i %= length;

        return i < 0 ? i + length : i;
    }

    function empty(element) {
        element = $(element);
        element.innerHTML = '';
        return element;
    }

    function html(parent, html) {
        parent = $(parent);
        return isUndefined(html)
            ? parent.innerHTML
            : append(parent.hasChildNodes() ? empty(parent) : parent, html);
    }

    function prepend(parent, element) {

        parent = $(parent);

        if (!parent.hasChildNodes()) {
            return append(parent, element);
        } 
        return insertNodes(element, function (element) { return parent.insertBefore(element, parent.firstChild); });
        
    }

    function append(parent, element) {
        parent = $(parent);
        return insertNodes(element, function (element) { return parent.appendChild(element); });
    }

    function before(ref, element) {
        ref = $(ref);
        return insertNodes(element, function (element) { return ref.parentNode.insertBefore(element, ref); });
    }

    function after(ref, element) {
        ref = $(ref);
        return insertNodes(element, function (element) { return ref.nextSibling
            ? before(ref.nextSibling, element)
            : append(ref.parentNode, element); }
        );
    }

    function insertNodes(element, fn) {
        element = isString(element) ? fragment(element) : element;
        return element
            ? 'length' in element
                ? toNodes(element).map(fn)
                : fn(element)
            : null;
    }

    function remove(element) {
        toNodes(element).map(function (element) { return element.parentNode && element.parentNode.removeChild(element); });
    }

    function wrapAll(element, structure) {

        structure = toNode(before(element, structure));

        while (structure.firstChild) {
            structure = structure.firstChild;
        }

        append(structure, element);

        return structure;
    }

    function wrapInner(element, structure) {
        return toNodes(toNodes(element).map(function (element) { return element.hasChildNodes ? wrapAll(toNodes(element.childNodes), structure) : append(element, structure); }
        ));
    }

    function unwrap(element) {
        toNodes(element)
            .map(function (element) { return element.parentNode; })
            .filter(function (value, index, self) { return self.indexOf(value) === index; })
            .forEach(function (parent) {
                before(parent, parent.childNodes);
                remove(parent);
            });
    }

    const fragmentRe = /^\s*<(\w+|!)[^>]*>/;
    const singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;

    function fragment(html) {

        const matches = singleTagRe.exec(html);
        if (matches) {
            return document.createElement(matches[1]);
        }

        const container = document.createElement('div');
        if (fragmentRe.test(html)) {
            container.insertAdjacentHTML('beforeend', html.trim());
        } else {
            container.textContent = html;
        }

        return container.childNodes.length > 1 ? toNodes(container.childNodes) : container.firstChild;

    }

    function apply(node, fn) {

        if (!node || node.nodeType !== 1) {
            return;
        }

        fn(node);
        node = node.firstElementChild;
        while (node) {
            apply(node, fn);
            node = node.nextElementSibling;
        }
    }

    function $(selector, context) {
        return !isString(selector)
            ? toNode(selector)
            : isHtml(selector)
                ? toNode(fragment(selector))
                : find(selector, context);
    }

    function $$(selector, context) {
        return !isString(selector)
            ? toNodes(selector)
            : isHtml(selector)
                ? toNodes(fragment(selector))
                : findAll(selector, context);
    }

    function isHtml(str) {
        return str[0] === '<' || str.match(/^\s*</);
    }

    function addClass(element) {
        const args = []; let len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        apply$1(element, args, 'add');
    }

    function removeClass(element) {
        const args = []; let len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        apply$1(element, args, 'remove');
    }

    function removeClasses(element, cls) {
        attr(element, 'class', function (value) { return (value || '').replace(new RegExp((`\\b${  cls  }\\b`), 'g'), ''); });
    }

    function replaceClass(element) {
        const args = []; let len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        args[0] && removeClass(element, args[0]);
        args[1] && addClass(element, args[1]);
    }

    function hasClass(element, cls) {
        return cls && toNodes(element).some(function (element) { return element.classList.contains(cls.split(' ')[0]); });
    }

    function toggleClass(element) {
        let args = []; let len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];


        if (!args.length) {
            return;
        }

        args = getArgs$1(args);

        const force = !isString(last(args)) ? args.pop() : []; // in iOS 9.3 force === undefined evaluates to false

        args = args.filter(Boolean);

        toNodes(element).forEach(function (ref) {
            const {classList} = ref;

            for (let i = 0; i < args.length; i++) {
                supports.Force
                    ? classList.toggle.apply(classList, [args[i]].concat(force))
                    : (classList[(!isUndefined(force) ? force : !classList.contains(args[i])) ? 'add' : 'remove'](args[i]));
            }
        });

    }

    function apply$1(element, args, fn) {
        args = getArgs$1(args).filter(Boolean);

        args.length && toNodes(element).forEach(function (ref) {
            const {classList} = ref;

            supports.Multiple
                ? classList[fn].apply(classList, args)
                : args.forEach(function (cls) { return classList[fn](cls); });
        });
    }

    function getArgs$1(args) {
        return args.reduce(function (args, arg) { return args.concat.call(args, isString(arg) && includes(arg, ' ') ? arg.trim().split(' ') : arg); }
            , []);
    }

    // IE 11
    var supports = {

        get Multiple() {
            return this.get('_multiple');
        },

        get Force() {
            return this.get('_force');
        },

        get(key) {

            if (!hasOwn(this, key)) {
                const ref = document.createElement('_');
                const {classList} = ref;
                classList.add('a', 'b');
                classList.toggle('c', false);
                this._multiple = classList.contains('b');
                this._force = !classList.contains('c');
            }

            return this[key];
        }

    };

    const cssNumber = {
        'animation-iteration-count': true,
        'column-count': true,
        'fill-opacity': true,
        'flex-grow': true,
        'flex-shrink': true,
        'font-weight': true,
        'line-height': true,
        'opacity': true,
        'order': true,
        'orphans': true,
        'stroke-dasharray': true,
        'stroke-dashoffset': true,
        'widows': true,
        'z-index': true,
        'zoom': true
    };

    function css(element, property, value) {

        return toNodes(element).map(function (element) {

            if (isString(property)) {

                property = propName(property);

                if (isUndefined(value)) {
                    return getStyle(element, property);
                } if (!value && !isNumber(value)) {
                    element.style.removeProperty(property);
                } else {
                    element.style[property] = isNumeric(value) && !cssNumber[property] ? (`${value  }px`) : value;
                }

            } else if (isArray(property)) {

                const styles = getStyles(element);

                return property.reduce(function (props, property) {
                    props[property] = styles[propName(property)];
                    return props;
                }, {});

            } else if (isObject(property)) {
                each(property, function (value, property) { return css(element, property, value); });
            }

            return element;

        })[0];

    }

    function getStyles(element, pseudoElt) {
        element = toNode(element);
        return element.ownerDocument.defaultView.getComputedStyle(element, pseudoElt);
    }

    function getStyle(element, property, pseudoElt) {
        return getStyles(element, pseudoElt)[property];
    }

    const vars = {};

    function getCssVar(name) {

        const docEl = document.documentElement;

        if (!isIE) {
            return getStyles(docEl).getPropertyValue((`--uk-${  name}`));
        }

        if (!(name in vars)) {

            /* usage in css: .uk-name:before { content:"xyz" } */

            const element = append(docEl, document.createElement('div'));

            addClass(element, (`uk-${  name}`));

            vars[name] = getStyle(element, 'content', ':before').replace(/^["'](.*)["']$/, '$1');

            remove(element);

        }

        return vars[name];

    }

    const cssProps = {};

    function propName(name) {

        let ret = cssProps[name];
        if (!ret) {
            ret = cssProps[name] = vendorPropName(name) || name;
        }
        return ret;
    }

    const cssPrefixes = ['webkit', 'moz', 'ms'];

    function vendorPropName(name) {

        name = hyphenate(name);

        const ref = document.documentElement;
        const {style} = ref;

        if (name in style) {
            return name;
        }

        let i = cssPrefixes.length; let prefixedName;

        while (i--) {
            prefixedName = `-${  cssPrefixes[i]  }-${  name}`;
            if (prefixedName in style) {
                return prefixedName;
            }
        }
    }

    function transition(element, props, duration, timing) {
        if ( duration === void 0 ) duration = 400;
        if ( timing === void 0 ) timing = 'linear';


        return Promise.all(toNodes(element).map(function (element) { return new Promise(function (resolve, reject) {

            for (const name in props) {
                const value = css(element, name);
                if (value === '') {
                    css(element, name, value);
                }
            }

            const timer = setTimeout(function () { return trigger(element, 'transitionend'); }, duration);

            once(element, 'transitionend transitioncanceled', function (ref) {
                const {type} = ref;

                clearTimeout(timer);
                removeClass(element, 'uk-transition');
                css(element, {
                    'transition-property': '',
                    'transition-duration': '',
                    'transition-timing-function': ''
                });
                type === 'transitioncanceled' ? reject() : resolve();
            }, {self: true});

            addClass(element, 'uk-transition');
            css(element, {'transition-property': Object.keys(props).map(propName).join(','),
                'transition-duration': (`${duration  }ms`),
                'transition-timing-function': timing, ...props});

        }); }
        ));

    }

    const Transition = {

        start: transition,

        stop(element) {
            trigger(element, 'transitionend');
            return Promise.resolve();
        },

        cancel(element) {
            trigger(element, 'transitioncanceled');
        },

        inProgress(element) {
            return hasClass(element, 'uk-transition');
        }

    };

    const animationPrefix = 'uk-animation-';
    const clsCancelAnimation = 'uk-cancel-animation';

    function animate(element, animation, duration, origin, out) {
        const arguments$1 = arguments;
        if ( duration === void 0 ) duration = 200;


        return Promise.all(toNodes(element).map(function (element) { return new Promise(function (resolve, reject) {

            if (hasClass(element, clsCancelAnimation)) {
                requestAnimationFrame(function () { return Promise.resolve().then(function () { return animate.apply(void 0, arguments$1).then(resolve, reject); }
                ); }
                );
                return;
            }

            let cls = `${animation  } ${  animationPrefix  }${out ? 'leave' : 'enter'}`;

            if (startsWith(animation, animationPrefix)) {

                if (origin) {
                    cls += ` uk-transform-origin-${  origin}`;
                }

                if (out) {
                    cls += ` ${  animationPrefix  }reverse`;
                }

            }

            reset();

            once(element, 'animationend animationcancel', function (ref) {
                const {type} = ref;


                let hasReset = false;

                if (type === 'animationcancel') {
                    reject();
                    reset();
                } else {
                    resolve();
                    Promise.resolve().then(function () {
                        hasReset = true;
                        reset();
                    });
                }

                requestAnimationFrame(function () {
                    if (!hasReset) {
                        addClass(element, clsCancelAnimation);

                        requestAnimationFrame(function () { return removeClass(element, clsCancelAnimation); });
                    }
                });

            }, {self: true});

            css(element, 'animationDuration', (`${duration  }ms`));
            addClass(element, cls);

            function reset() {
                css(element, 'animationDuration', '');
                removeClasses(element, (`${animationPrefix  }\\S*`));
            }

        }); }
        ));

    }

    const inProgress = new RegExp((`${animationPrefix  }(enter|leave)`));
    const Animation = {

        in(element, animation, duration, origin) {
            return animate(element, animation, duration, origin, false);
        },

        out(element, animation, duration, origin) {
            return animate(element, animation, duration, origin, true);
        },

        inProgress(element) {
            return inProgress.test(attr(element, 'class'));
        },

        cancel(element) {
            trigger(element, 'animationcancel');
        }

    };

    const dirs = {
        width: ['x', 'left', 'right'],
        height: ['y', 'top', 'bottom']
    };

    function positionAt(element, target, elAttach, targetAttach, elOffset, targetOffset, flip, boundary) {

        elAttach = getPos(elAttach);
        targetAttach = getPos(targetAttach);

        const flipped = {element: elAttach, target: targetAttach};

        if (!element || !target) {
            return flipped;
        }

        const dim = getDimensions(element);
        const targetDim = getDimensions(target);
        const position = targetDim;

        moveTo(position, elAttach, dim, -1);
        moveTo(position, targetAttach, targetDim, 1);

        elOffset = getOffsets(elOffset, dim.width, dim.height);
        targetOffset = getOffsets(targetOffset, targetDim.width, targetDim.height);

        elOffset.x += targetOffset.x;
        elOffset.y += targetOffset.y;

        position.left += elOffset.x;
        position.top += elOffset.y;

        if (flip) {

            const boundaries = [getDimensions(getWindow(element))];

            if (boundary) {
                boundaries.unshift(getDimensions(boundary));
            }

            each(dirs, function (ref, prop) {
                const dir = ref[0];
                const align = ref[1];
                const alignFlip = ref[2];


                if (!(flip === true || includes(flip, dir))) {
                    return;
                }

                boundaries.some(function (boundary) {

                    const elemOffset = elAttach[dir] === align
                        ? -dim[prop]
                        : elAttach[dir] === alignFlip
                            ? dim[prop]
                            : 0;

                    const targetOffset = targetAttach[dir] === align
                        ? targetDim[prop]
                        : targetAttach[dir] === alignFlip
                            ? -targetDim[prop]
                            : 0;

                    if (position[align] < boundary[align] || position[align] + dim[prop] > boundary[alignFlip]) {

                        const centerOffset = dim[prop] / 2;
                        const centerTargetOffset = targetAttach[dir] === 'center' ? -targetDim[prop] / 2 : 0;

                        return elAttach[dir] === 'center' && (
                            apply(centerOffset, centerTargetOffset)
                            || apply(-centerOffset, -centerTargetOffset)
                        ) || apply(elemOffset, targetOffset);

                    }

                    function apply(elemOffset, targetOffset) {

                        const newVal = position[align] + elemOffset + targetOffset - elOffset[dir] * 2;

                        if (newVal >= boundary[align] && newVal + dim[prop] <= boundary[alignFlip]) {
                            position[align] = newVal;

                            ['element', 'target'].forEach(function (el) {
                                flipped[el][dir] = !elemOffset
                                    ? flipped[el][dir]
                                    : flipped[el][dir] === dirs[prop][1]
                                        ? dirs[prop][2]
                                        : dirs[prop][1];
                            });

                            return true;
                        }

                    }

                });

            });
        }

        offset(element, position);

        return flipped;
    }

    function offset(element, coordinates) {

        element = toNode(element);

        if (coordinates) {

            const currentOffset = offset(element);
            const pos = css(element, 'position');

            ['left', 'top'].forEach(function (prop) {
                if (prop in coordinates) {
                    const value = css(element, prop);
                    css(element, prop, coordinates[prop] - currentOffset[prop]
                        + toFloat(pos === 'absolute' && value === 'auto'
                            ? position(element)[prop]
                            : value)
                    );
                }
            });

            return;
        }

        return getDimensions(element);
    }

    function getDimensions(element) {

        element = toNode(element);

        if (!element) {
            return {};
        }

        const ref = getWindow(element);
        const top = ref.pageYOffset;
        const left = ref.pageXOffset;

        if (isWindow(element)) {

            const height = element.innerHeight;
            const width = element.innerWidth;

            return {
                top,
                left,
                height,
                width,
                bottom: top + height,
                right: left + width
            };
        }

        let style; let hidden;

        if (!isVisible(element) && css(element, 'display') === 'none') {

            style = attr(element, 'style');
            hidden = attr(element, 'hidden');

            attr(element, {
                style: (`${style || ''  };display:block !important;`),
                hidden: null
            });
        }

        const rect = element.getBoundingClientRect();

        if (!isUndefined(style)) {
            attr(element, {style, hidden});
        }

        return {
            height: rect.height,
            width: rect.width,
            top: rect.top + top,
            left: rect.left + left,
            bottom: rect.bottom + top,
            right: rect.right + left
        };
    }

    function position(element) {
        element = toNode(element);

        const parent = element.offsetParent || getDocEl(element);
        const parentOffset = offset(parent);
        const ref = ['top', 'left'].reduce(function (props, prop) {
            const propName = ucfirst(prop);
            props[prop] -= parentOffset[prop]
                + toFloat(css(element, (`margin${  propName}`)))
                + toFloat(css(parent, (`border${  propName  }Width`)));
            return props;
        }, offset(element));
        const {top} = ref;
        const {left} = ref;

        return {top, left};
    }

    const height = dimension('height');
    const width = dimension('width');

    function dimension(prop) {
        const propName = ucfirst(prop);
        return function (element, value) {

            element = toNode(element);

            if (isUndefined(value)) {

                if (isWindow(element)) {
                    return element[(`inner${  propName}`)];
                }

                if (isDocument(element)) {
                    const doc = element.documentElement;
                    return Math.max(doc[(`offset${  propName}`)], doc[(`scroll${  propName}`)]);
                }

                value = css(element, prop);
                value = value === 'auto' ? element[(`offset${  propName}`)] : toFloat(value) || 0;

                return value - boxModelAdjust(prop, element);

            } 

            css(element, prop, !value && value !== 0
                ? ''
                : `${+value + boxModelAdjust(prop, element)  }px`
            );

            

        };
    }

    function boxModelAdjust(prop, element, sizing) {
        if ( sizing === void 0 ) sizing = 'border-box';

        return css(element, 'boxSizing') === sizing
            ? dirs[prop].slice(1).map(ucfirst).reduce(function (value, prop) { return value
                + toFloat(css(element, (`padding${  prop}`)))
                + toFloat(css(element, (`border${  prop  }Width`))); }
            , 0)
            : 0;
    }

    function moveTo(position, attach, dim, factor) {
        each(dirs, function (ref, prop) {
            const dir = ref[0];
            const align = ref[1];
            const alignFlip = ref[2];

            if (attach[dir] === alignFlip) {
                position[align] += dim[prop] * factor;
            } else if (attach[dir] === 'center') {
                position[align] += dim[prop] * factor / 2;
            }
        });
    }

    function getPos(pos) {

        const x = /left|center|right/;
        const y = /top|center|bottom/;

        pos = (pos || '').split(' ');

        if (pos.length === 1) {
            pos = x.test(pos[0])
                ? pos.concat(['center'])
                : y.test(pos[0])
                    ? ['center'].concat(pos)
                    : ['center', 'center'];
        }

        return {
            x: x.test(pos[0]) ? pos[0] : 'center',
            y: y.test(pos[1]) ? pos[1] : 'center'
        };
    }

    function getOffsets(offsets, width, height) {

        const ref = (offsets || '').split(' ');
        const x = ref[0];
        const y = ref[1];

        return {
            x: x ? toFloat(x) * (endsWith(x, '%') ? width / 100 : 1) : 0,
            y: y ? toFloat(y) * (endsWith(y, '%') ? height / 100 : 1) : 0
        };
    }

    function flipPosition(pos) {
        switch (pos) {
            case 'left':
                return 'right';
            case 'right':
                return 'left';
            case 'top':
                return 'bottom';
            case 'bottom':
                return 'top';
            default:
                return pos;
        }
    }

    function isInView(element, topOffset, leftOffset) {
        if ( topOffset === void 0 ) topOffset = 0;
        if ( leftOffset === void 0 ) leftOffset = 0;


        if (!isVisible(element)) {
            return false;
        }

        element = toNode(element);

        const win = getWindow(element);
        const client = element.getBoundingClientRect();
        const bounding = {
            top: -topOffset,
            left: -leftOffset,
            bottom: topOffset + height(win),
            right: leftOffset + width(win)
        };

        return intersectRect(client, bounding) || pointInRect({x: client.left, y: client.top}, bounding);

    }

    function scrolledOver(element, heightOffset) {
        if ( heightOffset === void 0 ) heightOffset = 0;


        if (!isVisible(element)) {
            return 0;
        }

        element = toNode(element);

        const win = getWindow(element);
        const doc = getDocument(element);
        const elHeight = element.offsetHeight + heightOffset;
        const ref = offsetPosition(element);
        const top = ref[0];
        const vp = height(win);
        const vh = vp + Math.min(0, top - vp);
        const diff = Math.max(0, vp - (height(doc) + heightOffset - (top + elHeight)));

        return clamp(((vh + win.pageYOffset - top) / ((vh + (elHeight - (diff < vp ? diff : 0))) / 100)) / 100);
    }

    function scrollTop(element, top) {
        element = toNode(element);

        if (isWindow(element) || isDocument(element)) {
            const ref = getWindow(element);
            const {scrollTo} = ref;
            const {pageXOffset} = ref;
            scrollTo(pageXOffset, top);
        } else {
            element.scrollTop = top;
        }
    }

    function offsetPosition(element) {
        const offset = [0, 0];

        do {

            offset[0] += element.offsetTop;
            offset[1] += element.offsetLeft;

            if (css(element, 'position') === 'fixed') {
                const win = getWindow(element);
                offset[0] += win.pageYOffset;
                offset[1] += win.pageXOffset;
                return offset;
            }

        } while ((element = element.offsetParent));

        return offset;
    }

    function toPx(value, property, element) {
        if ( property === void 0 ) property = 'width';
        if ( element === void 0 ) element = window;

        return isNumeric(value)
            ? +value
            : endsWith(value, 'vh')
                ? percent(height(getWindow(element)), value)
                : endsWith(value, 'vw')
                    ? percent(width(getWindow(element)), value)
                    : endsWith(value, '%')
                        ? percent(getDimensions(element)[property], value)
                        : toFloat(value);
    }

    function percent(base, value) {
        return base * toFloat(value) / 100;
    }

    function getWindow(element) {
        return isWindow(element) ? element : getDocument(element).defaultView;
    }

    function getDocument(element) {
        return toNode(element).ownerDocument;
    }

    function getDocEl(element) {
        return getDocument(element).documentElement;
    }

    /*
        Based on:
        Copyright (c) 2016 Wilson Page wilsonpage@me.com
        https://github.com/wilsonpage/fastdom
    */

    const fastdom = {

        reads: [],
        writes: [],

        read(task) {
            this.reads.push(task);
            scheduleFlush();
            return task;
        },

        write(task) {
            this.writes.push(task);
            scheduleFlush();
            return task;
        },

        clear(task) {
            return remove$1(this.reads, task) || remove$1(this.writes, task);
        },

        flush

    };

    function flush() {
        runTasks(fastdom.reads);
        runTasks(fastdom.writes.splice(0, fastdom.writes.length));

        fastdom.scheduled = false;

        if (fastdom.reads.length || fastdom.writes.length) {
            scheduleFlush(true);
        }
    }

    function scheduleFlush(microtask) {
        if ( microtask === void 0 ) microtask = false;

        if (!fastdom.scheduled) {
            fastdom.scheduled = true;
            if (microtask) {
                Promise.resolve().then(flush);
            } else {
                requestAnimationFrame(flush);
            }
        }
    }

    function runTasks(tasks) {
        let task;
        while ((task = tasks.shift())) {
            task();
        }
    }

    function remove$1(array, item) {
        const index = array.indexOf(item);
        return !!~index && !!array.splice(index, 1);
    }

    function MouseTracker() {}

    MouseTracker.prototype = {

        positions: [],
        position: null,

        init() {
            const this$1 = this;


            this.positions = [];
            this.position = null;

            let ticking = false;
            this.unbind = on(document, 'mousemove', function (e) {

                if (ticking) {
                    return;
                }

                setTimeout(function () {

                    const time = Date.now();
                    const ref = this$1.positions;
                    const {length} = ref;

                    if (length && (time - this$1.positions[length - 1].time > 100)) {
                        this$1.positions.splice(0, length);
                    }

                    this$1.positions.push({time, x: e.pageX, y: e.pageY});

                    if (this$1.positions.length > 5) {
                        this$1.positions.shift();
                    }

                    ticking = false;
                }, 5);

                ticking = true;
            });

        },

        cancel() {
            if (this.unbind) {
                this.unbind();
            }
        },

        movesTo(target) {

            if (this.positions.length < 2) {
                return false;
            }

            const p = offset(target);
            const position = last(this.positions);
            const ref = this.positions;
            const prevPos = ref[0];

            if (p.left <= position.x && position.x <= p.right && p.top <= position.y && position.y <= p.bottom) {
                return false;
            }

            const points = [
                [{x: p.left, y: p.top}, {x: p.right, y: p.bottom}],
                [{x: p.right, y: p.top}, {x: p.left, y: p.bottom}]
            ];

            if (p.right <= position.x) ; else if (p.left >= position.x) {
                points[0].reverse();
                points[1].reverse();
            } else if (p.bottom <= position.y) {
                points[0].reverse();
            } else if (p.top >= position.y) {
                points[1].reverse();
            }

            return !!points.reduce(function (result, point) {
                return result + (slope(prevPos, point[0]) < slope(position, point[0]) && slope(prevPos, point[1]) > slope(position, point[1]));
            }, 0);
        }

    };

    function slope(a, b) {
        return (b.y - a.y) / (b.x - a.x);
    }

    const strats = {};

    strats.events =
    strats.created =
    strats.beforeConnect =
    strats.connected =
    strats.beforeDisconnect =
    strats.disconnected =
    strats.destroy = concatStrat;

    // args strategy
    strats.args = function (parentVal, childVal) {
        return childVal !== false && concatStrat(childVal || parentVal);
    };

    // update strategy
    strats.update = function (parentVal, childVal) {
        return sortBy(concatStrat(parentVal, isFunction(childVal) ? {read: childVal} : childVal), 'order');
    };

    // property strategy
    strats.props = function (parentVal, childVal) {

        if (isArray(childVal)) {
            childVal = childVal.reduce(function (value, key) {
                value[key] = String;
                return value;
            }, {});
        }

        return strats.methods(parentVal, childVal);
    };

    // extend strategy
    strats.computed =
    strats.methods = function (parentVal, childVal) {
        return childVal
            ? parentVal
                ? ({ ...parentVal, ...childVal})
                : childVal
            : parentVal;
    };

    // data strategy
    strats.data = function (parentVal, childVal, vm) {

        if (!vm) {

            if (!childVal) {
                return parentVal;
            }

            if (!parentVal) {
                return childVal;
            }

            return function (vm) {
                return mergeFnData(parentVal, childVal, vm);
            };

        }

        return mergeFnData(parentVal, childVal, vm);
    };

    function mergeFnData(parentVal, childVal, vm) {
        return strats.computed(
            isFunction(parentVal)
                ? parentVal.call(vm, vm)
                : parentVal,
            isFunction(childVal)
                ? childVal.call(vm, vm)
                : childVal
        );
    }

    // concat strategy
    function concatStrat(parentVal, childVal) {

        parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;

        return childVal
            ? parentVal
                ? parentVal.concat(childVal)
                : isArray(childVal)
                    ? childVal
                    : [childVal]
            : parentVal;
    }

    // default strategy
    function defaultStrat(parentVal, childVal) {
        return isUndefined(childVal) ? parentVal : childVal;
    }

    function mergeOptions(parent, child, vm) {

        const options = {};

        if (isFunction(child)) {
            child = child.options;
        }

        if (child.extends) {
            parent = mergeOptions(parent, child.extends, vm);
        }

        if (child.mixins) {
            for (let i = 0, l = child.mixins.length; i < l; i++) {
                parent = mergeOptions(parent, child.mixins[i], vm);
            }
        }

        for (const key in parent) {
            mergeKey(key);
        }

        for (const key$1 in child) {
            if (!hasOwn(parent, key$1)) {
                mergeKey(key$1);
            }
        }

        function mergeKey(key) {
            options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
        }

        return options;
    }

    function parseOptions(options, args) {
        let obj;

        if ( args === void 0 ) args = [];

        try {

            return !options
                ? {}
                : startsWith(options, '{')
                    ? JSON.parse(options)
                    : args.length && !includes(options, ':')
                        ? (( obj = {}, obj[args[0]] = options, obj ))
                        : options.split(';').reduce(function (options, option) {
                            const ref = option.split(/:(.*)/);
                            const key = ref[0];
                            const value = ref[1];
                            if (key && !isUndefined(value)) {
                                options[key.trim()] = value.trim();
                            }
                            return options;
                        }, {});

        } catch (e) {
            return {};
        }

    }

    let id = 0;

    const Player = function(el) {
        this.id = ++id;
        this.el = toNode(el);
    };

    Player.prototype.isVideo = function () {
        return this.isYoutube() || this.isVimeo() || this.isHTML5();
    };

    Player.prototype.isHTML5 = function () {
        return this.el.tagName === 'VIDEO';
    };

    Player.prototype.isIFrame = function () {
        return this.el.tagName === 'IFRAME';
    };

    Player.prototype.isYoutube = function () {
        return this.isIFrame() && !!this.el.src.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/);
    };

    Player.prototype.isVimeo = function () {
        return this.isIFrame() && !!this.el.src.match(/vimeo\.com\/video\/.*/);
    };

    Player.prototype.enableApi = function () {
        const this$1 = this;


        if (this.ready) {
            return this.ready;
        }

        const youtube = this.isYoutube();
        const vimeo = this.isVimeo();

        let poller;

        if (youtube || vimeo) {

            return this.ready = new Promise(function (resolve) {

                once(this$1.el, 'load', function () {
                    if (youtube) {
                        const listener = function () { return post(this$1.el, {event: 'listening', id: this$1.id}); };
                        poller = setInterval(listener, 100);
                        listener();
                    }
                });

                listen(function (data) { return youtube && data.id === this$1.id && data.event === 'onReady' || vimeo && Number(data.player_id) === this$1.id; })
                    .then(function () {
                        resolve();
                        poller && clearInterval(poller);
                    });

                attr(this$1.el, 'src', (`${  this$1.el.src  }${includes(this$1.el.src, '?') ? '&' : '?'  }${youtube ? 'enablejsapi=1' : (`api=1&player_id=${  this$1.id}`)}`));

            });

        }

        return Promise.resolve();

    };

    Player.prototype.play = function () {
        const this$1 = this;


        if (!this.isVideo()) {
            return;
        }

        if (this.isIFrame()) {
            this.enableApi().then(function () { return post(this$1.el, {func: 'playVideo', method: 'play'}); });
        } else if (this.isHTML5()) {
            try {
                const promise = this.el.play();

                if (promise) {
                    promise.catch(noop);
                }
            } catch (e) {}
        }
    };

    Player.prototype.pause = function () {
        const this$1 = this;


        if (!this.isVideo()) {
            return;
        }

        if (this.isIFrame()) {
            this.enableApi().then(function () { return post(this$1.el, {func: 'pauseVideo', method: 'pause'}); });
        } else if (this.isHTML5()) {
            this.el.pause();
        }
    };

    Player.prototype.mute = function () {
        const this$1 = this;


        if (!this.isVideo()) {
            return;
        }

        if (this.isIFrame()) {
            this.enableApi().then(function () { return post(this$1.el, {func: 'mute', method: 'setVolume', value: 0}); });
        } else if (this.isHTML5()) {
            this.el.muted = true;
            attr(this.el, 'muted', '');
        }

    };

    function post(el, cmd) {
        try {
            el.contentWindow.postMessage(JSON.stringify({event: 'command', ...cmd}), '*');
        } catch (e) {}
    }

    function listen(cb) {

        return new Promise(function (resolve) {

            once(window, 'message', function (_, data) { return resolve(data); }, false, function (ref) {
                let {data} = ref;


                if (!data || !isString(data)) {
                    return;
                }

                try {
                    data = JSON.parse(data);
                } catch (e) {
                    return;
                }

                return data && cb(data);

            });

        });

    }

    const IntersectionObserver = 'IntersectionObserver' in window
        ? window.IntersectionObserver
        : /* @__PURE__ */(function () {
            function IntersectionObserverClass(callback, ref) {
                const this$1 = this;
                if ( ref === void 0 ) ref = {};
                let {rootMargin} = ref; if ( rootMargin === void 0 ) rootMargin = '0 0';


                this.targets = [];

                const ref$1 = (rootMargin || '0 0').split(' ').map(toFloat);
                const offsetTop = ref$1[0];
                const offsetLeft = ref$1[1];

                this.offsetTop = offsetTop;
                this.offsetLeft = offsetLeft;

                let pending;
                this.apply = function () {

                    if (pending) {
                        return;
                    }

                    pending = requestAnimationFrame(function () { return setTimeout(function () {
                        const records = this$1.takeRecords();

                        if (records.length) {
                            callback(records, this$1);
                        }

                        pending = false;
                    }); });

                };

                this.off = on(window, 'scroll resize load', this.apply, {passive: true, capture: true});

            }

            IntersectionObserverClass.prototype.takeRecords = function () {
                const this$1 = this;

                return this.targets.filter(function (entry) {

                    const inView = isInView(entry.target, this$1.offsetTop, this$1.offsetLeft);

                    if (entry.isIntersecting === null || inView ^ entry.isIntersecting) {
                        entry.isIntersecting = inView;
                        return true;
                    }

                });
            };

            IntersectionObserverClass.prototype.observe = function (target) {
                this.targets.push({
                    target,
                    isIntersecting: null
                });
                this.apply();
            };

            IntersectionObserverClass.prototype.disconnect = function () {
                this.targets = [];
                this.off();
            };

            return IntersectionObserverClass;
        }());



    const util = /* #__PURE__ */Object.freeze({
        ajax,
        getImage,
        transition,
        Transition,
        animate,
        Animation,
        attr,
        hasAttr,
        removeAttr,
        data,
        addClass,
        removeClass,
        removeClasses,
        replaceClass,
        hasClass,
        toggleClass,
        positionAt,
        offset,
        position,
        height,
        width,
        boxModelAdjust,
        flipPosition,
        isInView,
        scrolledOver,
        scrollTop,
        offsetPosition,
        toPx,
        ready,
        index,
        getIndex,
        empty,
        html,
        prepend,
        append,
        before,
        after,
        remove,
        wrapAll,
        wrapInner,
        unwrap,
        fragment,
        apply,
        $,
        $$,
        isIE,
        isRtl,
        hasTouch,
        pointerDown,
        pointerMove,
        pointerUp,
        pointerEnter,
        pointerLeave,
        pointerCancel,
        on,
        off,
        once,
        trigger,
        createEvent,
        toEventTargets,
        isTouch,
        getEventPos,
        fastdom,
        isVoidElement,
        isVisible,
        selInput,
        isInput,
        filter,
        within,
        hasOwn,
        hyphenate,
        camelize,
        ucfirst,
        startsWith,
        endsWith,
        includes,
        findIndex,
        isArray,
        isFunction,
        isObject,
        isPlainObject,
        isWindow,
        isDocument,
        isJQuery,
        isNode,
        isNodeCollection,
        isBoolean,
        isString,
        isNumber,
        isNumeric,
        isEmpty,
        isUndefined,
        toBoolean,
        toNumber,
        toFloat,
        toNode,
        toNodes,
        toList,
        toMs,
        isEqual,
        swap,
        assign,
        last,
        each,
        sortBy,
        uniqueBy,
        clamp,
        noop,
        intersectRect,
        pointInRect,
        Dimensions,
        MouseTracker,
        mergeOptions,
        parseOptions,
        Player,
        Promise,
        Deferred,
        IntersectionObserver,
        query,
        queryAll,
        find,
        findAll,
        matches,
        closest,
        parents,
        escape,
        css,
        getStyles,
        getStyle,
        getCssVar,
        propName
    });

    function componentAPI (UIkit) {

        const DATA = UIkit.data;

        const components = {};

        UIkit.component = function (name, options) {

            if (!options) {

                if (isPlainObject(components[name])) {
                    components[name] = UIkit.extend(components[name]);
                }

                return components[name];

            }

            UIkit[name] = function (element, data) {
                let i = arguments.length; const argsArray = Array(i);
                while ( i-- ) argsArray[i] = arguments[i];


                const component = UIkit.component(name);

                if (isPlainObject(element)) {
                    return new component({data: element});
                }

                if (component.options.functional) {
                    return new component({data: [].concat( argsArray )});
                }

                return element && element.nodeType ? init(element) : $$(element).map(init)[0];

                function init(element) {

                    const instance = UIkit.getComponent(element, name);

                    if (instance) {
                        if (!data) {
                            return instance;
                        } 
                        instance.$destroy();
                        
                    }

                    return new component({el: element, data});

                }

            };

            const opt = isPlainObject(options) ? ({ ...options}) : options.options;

            opt.name = name;

            if (opt.install) {
                opt.install(UIkit, opt, name);
            }

            if (UIkit._initialized && !opt.functional) {
                const id = hyphenate(name);
                fastdom.read(function () { return UIkit[name]((`[uk-${  id  }],[data-uk-${  id  }]`)); });
            }

            return components[name] = isPlainObject(options) ? opt : options;
        };

        UIkit.getComponents = function (element) { return element && element[DATA] || {}; };
        UIkit.getComponent = function (element, name) { return UIkit.getComponents(element)[name]; };

        UIkit.connect = function (node) {

            if (node[DATA]) {
                for (const name in node[DATA]) {
                    node[DATA][name]._callConnected();
                }
            }

            for (let i = 0; i < node.attributes.length; i++) {

                const name$1 = getComponentName(node.attributes[i].name);

                if (name$1 && name$1 in components) {
                    UIkit[name$1](node);
                }

            }

        };

        UIkit.disconnect = function (node) {
            for (const name in node[DATA]) {
                node[DATA][name]._callDisconnected();
            }
        };

    }

    function getComponentName(attribute) {
        return startsWith(attribute, 'uk-') || startsWith(attribute, 'data-uk-')
            ? camelize(attribute.replace('data-uk-', '').replace('uk-', ''))
            : false;
    }

    function boot (UIkit) {

        const {connect} = UIkit;
        const {disconnect} = UIkit;

        if (!('MutationObserver' in window)) {
            return;
        }

        if (document.body) {

            fastdom.read(init);

        } else {

            (new MutationObserver(function () {

                if (document.body) {
                    this.disconnect();
                    init();
                }

            })).observe(document, {childList: true, subtree: true});

        }

        function init() {

            apply(document.body, connect);

            // Safari renders prior to first animation frame
            fastdom.flush();

            (new MutationObserver(function (mutations) { return mutations.forEach(applyMutation); })).observe(document, {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: true
            });

            UIkit._initialized = true;
        }

        function applyMutation(mutation) {

            const {target} = mutation;
            const {type} = mutation;

            const update = type !== 'attributes'
                ? applyChildList(mutation)
                : applyAttribute(mutation);

            update && UIkit.update(target);

        }

        function applyAttribute(ref) {
            const {target} = ref;
            const {attributeName} = ref;


            if (attributeName === 'href') {
                return true;
            }

            const name = getComponentName(attributeName);

            if (!name || !(name in UIkit)) {
                return;
            }

            if (hasAttr(target, attributeName)) {
                UIkit[name](target);
                return true;
            }

            const component = UIkit.getComponent(target, name);

            if (component) {
                component.$destroy();
                return true;
            }

        }

        function applyChildList(ref) {
            const {addedNodes} = ref;
            const {removedNodes} = ref;


            for (let i = 0; i < addedNodes.length; i++) {
                apply(addedNodes[i], connect);
            }

            for (let i$1 = 0; i$1 < removedNodes.length; i$1++) {
                apply(removedNodes[i$1], disconnect);
            }

            return true;
        }

        function apply(node, fn) {

            if (node.nodeType !== 1 || hasAttr(node, 'uk-no-boot')) {
                return;
            }

            fn(node);
            node = node.firstElementChild;
            while (node) {
                const next = node.nextElementSibling;
                apply(node, fn);
                node = next;
            }
        }

    }

    function globalAPI (UIkit) {

        const DATA = UIkit.data;

        UIkit.use = function (plugin) {

            if (plugin.installed) {
                return;
            }

            plugin.call(null, this);
            plugin.installed = true;

            return this;
        };

        UIkit.mixin = function (mixin, component) {
            component = (isString(component) ? UIkit.component(component) : component) || this;
            component.options = mergeOptions(component.options, mixin);
        };

        UIkit.extend = function (options) {

            options = options || {};

            const Super = this;
            const Sub = function UIkitComponent(options) {
                this._init(options);
            };

            Sub.prototype = Object.create(Super.prototype);
            Sub.prototype.constructor = Sub;
            Sub.options = mergeOptions(Super.options, options);

            Sub.super = Super;
            Sub.extend = Super.extend;

            return Sub;
        };

        UIkit.update = function (element, e) {

            element = element ? toNode(element) : document.body;

            path(element, function (element) { return update(element[DATA], e); });
            apply(element, function (element) { return update(element[DATA], e); });

        };

        let container;
        Object.defineProperty(UIkit, 'container', {

            get() {
                return container || document.body;
            },

            set(element) {
                container = $(element);
            }

        });

        function update(data, e) {

            if (!data) {
                return;
            }

            for (const name in data) {
                if (data[name]._connected) {
                    data[name]._callUpdate(e);
                }
            }

        }

        function path(node, fn) {
            if (node && node !== document.body && node.parentNode) {
                path(node.parentNode, fn);
                fn(node.parentNode);
            }
        }

    }

    function hooksAPI (UIkit) {

        UIkit.prototype._callHook = function (hook) {
            const this$1 = this;


            const handlers = this.$options[hook];

            if (handlers) {
                handlers.forEach(function (handler) { return handler.call(this$1); });
            }
        };

        UIkit.prototype._callConnected = function () {

            if (this._connected) {
                return;
            }

            this._data = {};
            this._computeds = {};
            this._initProps();

            this._callHook('beforeConnect');
            this._connected = true;

            this._initEvents();
            this._initObserver();

            this._callHook('connected');
            this._callUpdate();
        };

        UIkit.prototype._callDisconnected = function () {

            if (!this._connected) {
                return;
            }

            this._callHook('beforeDisconnect');

            if (this._observer) {
                this._observer.disconnect();
                this._observer = null;
            }

            this._unbindEvents();
            this._callHook('disconnected');

            this._connected = false;

        };

        UIkit.prototype._callUpdate = function (e) {
            const this$1 = this;
            if ( e === void 0 ) e = 'update';


            const type = e.type || e;

            if (includes(['update', 'resize'], type)) {
                this._callWatches();
            }

            const updates = this.$options.update;
            const ref = this._frames;
            const {reads} = ref;
            const {writes} = ref;

            if (!updates) {
                return;
            }

            updates.forEach(function (ref, i) {
                const {read} = ref;
                const {write} = ref;
                const {events} = ref;


                if (type !== 'update' && !includes(events, type)) {
                    return;
                }

                if (read && !includes(fastdom.reads, reads[i])) {
                    reads[i] = fastdom.read(function () {

                        const result = this$1._connected && read.call(this$1, this$1._data, type);

                        if (result === false && write) {
                            fastdom.clear(writes[i]);
                        } else if (isPlainObject(result)) {
                            assign(this$1._data, result);
                        }
                    });
                }

                if (write && !includes(fastdom.writes, writes[i])) {
                    writes[i] = fastdom.write(function () { return this$1._connected && write.call(this$1, this$1._data, type); });
                }

            });

        };

    }

    function stateAPI (UIkit) {

        let uid = 0;

        UIkit.prototype._init = function (options) {

            options = options || {};
            options.data = normalizeData(options, this.constructor.options);

            this.$options = mergeOptions(this.constructor.options, options, this);
            this.$el = null;
            this.$props = {};

            this._frames = {reads: {}, writes: {}};
            this._events = [];

            this._uid = uid++;
            this._initData();
            this._initMethods();
            this._initComputeds();
            this._callHook('created');

            if (options.el) {
                this.$mount(options.el);
            }
        };

        UIkit.prototype._initData = function () {

            const ref = this.$options;
            let {data} = ref; if ( data === void 0 ) data = {};

            for (const key in data) {
                this.$props[key] = this[key] = data[key];
            }
        };

        UIkit.prototype._initMethods = function () {

            const ref = this.$options;
            const {methods} = ref;

            if (methods) {
                for (const key in methods) {
                    this[key] = methods[key].bind(this);
                }
            }
        };

        UIkit.prototype._initComputeds = function () {

            const ref = this.$options;
            const {computed} = ref;

            this._computeds = {};

            if (computed) {
                for (const key in computed) {
                    registerComputed(this, key, computed[key]);
                }
            }
        };

        UIkit.prototype._callWatches = function () {

            const ref = this;
            const {computed} = ref.$options;
            const {_computeds} = ref;

            for (const key in _computeds) {

                const value = _computeds[key];
                delete _computeds[key];

                if (computed[key].watch && !isEqual(value, this[key])) {
                    computed[key].watch.call(this, this[key], value);
                }

            }

        };

        UIkit.prototype._initProps = function (props) {

            let key;

            props = props || getProps(this.$options, this.$name);

            for (key in props) {
                if (!isUndefined(props[key])) {
                    this.$props[key] = props[key];
                }
            }

            const exclude = [this.$options.computed, this.$options.methods];
            for (key in this.$props) {
                if (key in props && notIn(exclude, key)) {
                    this[key] = this.$props[key];
                }
            }
        };

        UIkit.prototype._initEvents = function () {
            const this$1 = this;


            const ref = this.$options;
            const {events} = ref;

            if (events) {

                events.forEach(function (event) {

                    if (!hasOwn(event, 'handler')) {
                        for (const key in event) {
                            registerEvent(this$1, event[key], key);
                        }
                    } else {
                        registerEvent(this$1, event);
                    }

                });
            }
        };

        UIkit.prototype._unbindEvents = function () {
            this._events.forEach(function (unbind) { return unbind(); });
            this._events = [];
        };

        UIkit.prototype._initObserver = function () {
            const this$1 = this;


            const ref = this.$options;
            let {attrs} = ref;
            const {props} = ref;
            const {el} = ref;
            if (this._observer || !props || attrs === false) {
                return;
            }

            attrs = isArray(attrs) ? attrs : Object.keys(props);

            this._observer = new MutationObserver(function () {

                const data = getProps(this$1.$options, this$1.$name);
                if (attrs.some(function (key) { return !isUndefined(data[key]) && data[key] !== this$1.$props[key]; })) {
                    this$1.$reset();
                }

            });

            const filter = attrs.map(function (key) { return hyphenate(key); }).concat(this.$name);

            this._observer.observe(el, {
                attributes: true,
                attributeFilter: filter.concat(filter.map(function (key) { return (`data-${  key}`); }))
            });
        };

        function getProps(opts, name) {

            const data$1 = {};
            let {args} = opts; if ( args === void 0 ) args = [];
            let {props} = opts; if ( props === void 0 ) props = {};
            const {el} = opts;

            if (!props) {
                return data$1;
            }

            for (const key in props) {
                const prop = hyphenate(key);
                let value = data(el, prop);

                if (!isUndefined(value)) {

                    value = props[key] === Boolean && value === ''
                        ? true
                        : coerce(props[key], value);

                    if (prop === 'target' && (!value || startsWith(value, '_'))) {
                        continue;
                    }

                    data$1[key] = value;
                }
            }

            const options = parseOptions(data(el, name), args);

            for (const key$1 in options) {
                const prop$1 = camelize(key$1);
                if (props[prop$1] !== undefined) {
                    data$1[prop$1] = coerce(props[prop$1], options[key$1]);
                }
            }

            return data$1;
        }

        function registerComputed(component, key, cb) {
            Object.defineProperty(component, key, {

                enumerable: true,

                get() {

                    const {_computeds} = component;
                    const {$props} = component;
                    const {$el} = component;

                    if (!hasOwn(_computeds, key)) {
                        _computeds[key] = (cb.get || cb).call(component, $props, $el);
                    }

                    return _computeds[key];
                },

                set(value) {

                    const {_computeds} = component;

                    _computeds[key] = cb.set ? cb.set.call(component, value) : value;

                    if (isUndefined(_computeds[key])) {
                        delete _computeds[key];
                    }
                }

            });
        }

        function registerEvent(component, event, key) {

            if (!isPlainObject(event)) {
                event = ({name: key, handler: event});
            }

            const {name} = event;
            let {el} = event;
            const {handler} = event;
            const {capture} = event;
            const {passive} = event;
            const {delegate} = event;
            const {filter} = event;
            const {self} = event;
            el = isFunction(el)
                ? el.call(component)
                : el || component.$el;

            if (isArray(el)) {
                el.forEach(function (el) { return registerEvent(component, { ...event, el}, key); });
                return;
            }

            if (!el || filter && !filter.call(component)) {
                return;
            }

            component._events.push(
                on(
                    el,
                    name,
                    !delegate
                        ? null
                        : isString(delegate)
                            ? delegate
                            : delegate.call(component),
                    isString(handler) ? component[handler] : handler.bind(component),
                    {passive, capture, self}
                )
            );

        }

        function notIn(options, key) {
            return options.every(function (arr) { return !arr || !hasOwn(arr, key); });
        }

        function coerce(type, value) {

            if (type === Boolean) {
                return toBoolean(value);
            } if (type === Number) {
                return toNumber(value);
            } if (type === 'list') {
                return toList(value);
            }

            return type ? type(value) : value;
        }

        function normalizeData(ref, ref$1) {
            let {data} = ref;
            const {el} = ref;
            const {args} = ref$1;
            let {props} = ref$1; if ( props === void 0 ) props = {};

            data = isArray(data)
                ? !isEmpty(args)
                    ? data.slice(0, args.length).reduce(function (data, value, index) {
                        if (isPlainObject(value)) {
                            assign(data, value);
                        } else {
                            data[args[index]] = value;
                        }
                        return data;
                    }, {})
                    : undefined
                : data;

            if (data) {
                for (const key in data) {
                    if (isUndefined(data[key])) {
                        delete data[key];
                    } else {
                        data[key] = props[key] ? coerce(props[key], data[key]) : data[key];
                    }
                }
            }

            return data;
        }
    }

    function instanceAPI (UIkit) {

        const DATA = UIkit.data;

        UIkit.prototype.$mount = function (el) {

            const ref = this.$options;
            const {name} = ref;

            if (!el[DATA]) {
                el[DATA] = {};
            }

            if (el[DATA][name]) {
                return;
            }

            el[DATA][name] = this;

            this.$el = this.$options.el = this.$options.el || el;

            if (within(el, document)) {
                this._callConnected();
            }
        };

        UIkit.prototype.$emit = function (e) {
            this._callUpdate(e);
        };

        UIkit.prototype.$reset = function () {
            this._callDisconnected();
            this._callConnected();
        };

        UIkit.prototype.$destroy = function (removeEl) {
            if ( removeEl === void 0 ) removeEl = false;


            const ref = this.$options;
            const {el} = ref;
            const {name} = ref;

            if (el) {
                this._callDisconnected();
            }

            this._callHook('destroy');

            if (!el || !el[DATA]) {
                return;
            }

            delete el[DATA][name];

            if (!isEmpty(el[DATA])) {
                delete el[DATA];
            }

            if (removeEl) {
                remove(this.$el);
            }
        };

        UIkit.prototype.$create = function (component, element, data) {
            return UIkit[component](element, data);
        };

        UIkit.prototype.$update = UIkit.update;
        UIkit.prototype.$getComponent = UIkit.getComponent;

        const names = {};
        Object.defineProperties(UIkit.prototype, {

            $container: Object.getOwnPropertyDescriptor(UIkit, 'container'),

            $name: {

                get() {
                    const ref = this.$options;
                    const {name} = ref;

                    if (!names[name]) {
                        names[name] = UIkit.prefix + hyphenate(name);
                    }

                    return names[name];
                }

            }

        });

    }

    const UIkit = function (options) {
        this._init(options);
    };

    UIkit.util = util;
    UIkit.data = '__uikit__';
    UIkit.prefix = 'uk-';
    UIkit.options = {};

    globalAPI(UIkit);
    hooksAPI(UIkit);
    stateAPI(UIkit);
    componentAPI(UIkit);
    instanceAPI(UIkit);

    const Class = {

        connected() {
            !hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
        }

    };

    const Togglable = {

        props: {
            cls: Boolean,
            animation: 'list',
            duration: Number,
            origin: String,
            transition: String,
            queued: Boolean
        },

        data: {
            cls: false,
            animation: [false],
            duration: 200,
            origin: false,
            transition: 'linear',
            queued: false,

            initProps: {
                overflow: '',
                height: '',
                paddingTop: '',
                paddingBottom: '',
                marginTop: '',
                marginBottom: ''
            },

            hideProps: {
                overflow: 'hidden',
                height: 0,
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                marginBottom: 0
            }

        },

        computed: {

            hasAnimation(ref) {
                const {animation} = ref;

                return !!animation[0];
            },

            hasTransition(ref) {
                const {animation} = ref;

                return this.hasAnimation && animation[0] === true;
            }

        },

        methods: {

            toggleElement(targets, show, animate) {
                const this$1 = this;

                return new Promise(function (resolve) {

                    targets = toNodes(targets);

                    const all = function (targets) { return Promise.all(targets.map(function (el) { return this$1._toggleElement(el, show, animate); })); };
                    const toggled = targets.filter(function (el) { return this$1.isToggled(el); });
                    const untoggled = targets.filter(function (el) { return !includes(toggled, el); });

                    let p;

                    if (!this$1.queued || !isUndefined(animate) || !isUndefined(show) || !this$1.hasAnimation || targets.length < 2) {

                        p = all(untoggled.concat(toggled));

                    } else {

                        const {body} = document;
                        const scroll = body.scrollTop;
                        const el = toggled[0];
                        const inProgress = Animation.inProgress(el) && hasClass(el, 'uk-animation-leave')
                                || Transition.inProgress(el) && el.style.height === '0px';

                        p = all(toggled);

                        if (!inProgress) {
                            p = p.then(function () {
                                const p = all(untoggled);
                                body.scrollTop = scroll;
                                return p;
                            });
                        }

                    }

                    p.then(resolve, noop);

                });
            },

            toggleNow(targets, show) {
                const this$1 = this;

                return new Promise(function (resolve) { return Promise.all(toNodes(targets).map(function (el) { return this$1._toggleElement(el, show, false); })).then(resolve, noop); });
            },

            isToggled(el) {
                const nodes = toNodes(el || this.$el);
                return this.cls
                    ? hasClass(nodes, this.cls.split(' ')[0])
                    : !hasAttr(nodes, 'hidden');
            },

            updateAria(el) {
                if (this.cls === false) {
                    attr(el, 'aria-hidden', !this.isToggled(el));
                }
            },

            _toggleElement(el, show, animate) {
                const this$1 = this;


                show = isBoolean(show)
                    ? show
                    : Animation.inProgress(el)
                        ? hasClass(el, 'uk-animation-leave')
                        : Transition.inProgress(el)
                            ? el.style.height === '0px'
                            : !this.isToggled(el);

                if (!trigger(el, (`before${  show ? 'show' : 'hide'}`), [this])) {
                    return Promise.reject();
                }

                const promise = (
                    isFunction(animate)
                        ? animate
                        : animate === false || !this.hasAnimation
                            ? this._toggle
                            : this.hasTransition
                                ? toggleHeight(this)
                                : toggleAnimation(this)
                )(el, show);

                trigger(el, show ? 'show' : 'hide', [this]);

                const final = function () {
                    trigger(el, show ? 'shown' : 'hidden', [this$1]);
                    this$1.$update(el);
                };

                return promise ? promise.then(final) : Promise.resolve(final());
            },

            _toggle(el, toggled) {

                if (!el) {
                    return;
                }

                toggled = Boolean(toggled);

                let changed;
                if (this.cls) {
                    changed = includes(this.cls, ' ') || toggled !== hasClass(el, this.cls);
                    changed && toggleClass(el, this.cls, includes(this.cls, ' ') ? undefined : toggled);
                } else {
                    changed = toggled === hasAttr(el, 'hidden');
                    changed && attr(el, 'hidden', !toggled ? '' : null);
                }

                $$('[autofocus]', el).some(function (el) { return isVisible(el) ? el.focus() || true : el.blur(); });

                this.updateAria(el);
                changed && this.$update(el);
            }

        }

    };

    function toggleHeight(ref) {
        const {isToggled} = ref;
        const {duration} = ref;
        const {initProps} = ref;
        const {hideProps} = ref;
        const {transition} = ref;
        const {_toggle} = ref;

        return function (el, show) {

            const inProgress = Transition.inProgress(el);
            const inner = el.hasChildNodes ? toFloat(css(el.firstElementChild, 'marginTop')) + toFloat(css(el.lastElementChild, 'marginBottom')) : 0;
            const currentHeight = isVisible(el) ? height(el) + (inProgress ? 0 : inner) : 0;

            Transition.cancel(el);

            if (!isToggled(el)) {
                _toggle(el, true);
            }

            height(el, '');

            // Update child components first
            fastdom.flush();

            const endHeight = height(el) + (inProgress ? 0 : inner);
            height(el, currentHeight);

            return (show
                ? Transition.start(el, { ...initProps, overflow: 'hidden', height: endHeight}, Math.round(duration * (1 - currentHeight / endHeight)), transition)
                : Transition.start(el, hideProps, Math.round(duration * (currentHeight / endHeight)), transition).then(function () { return _toggle(el, false); })
            ).then(function () { return css(el, initProps); });

        };
    }

    function toggleAnimation(ref) {
        const {animation} = ref;
        const {duration} = ref;
        const {origin} = ref;
        const {_toggle} = ref;

        return function (el, show) {

            Animation.cancel(el);

            if (show) {
                _toggle(el, true);
                return Animation.in(el, animation[0], duration, origin);
            }

            return Animation.out(el, animation[1] || animation[0], duration, origin).then(function () { return _toggle(el, false); });
        };
    }

    const Accordion = {

        mixins: [Class, Togglable],

        props: {
            targets: String,
            active: null,
            collapsible: Boolean,
            multiple: Boolean,
            toggle: String,
            content: String,
            transition: String
        },

        data: {
            targets: '> *',
            active: false,
            animation: [true],
            collapsible: true,
            multiple: false,
            clsOpen: 'uk-open',
            toggle: '> .uk-accordion-title',
            content: '> .uk-accordion-content',
            transition: 'ease'
        },

        computed: {

            items(ref, $el) {
                const {targets} = ref;

                return $$(targets, $el);
            }

        },

        events: [

            {

                name: 'click',

                delegate() {
                    return (`${this.targets  } ${  this.$props.toggle}`);
                },

                handler(e) {
                    e.preventDefault();
                    this.toggle(index($$((`${this.targets  } ${  this.$props.toggle}`), this.$el), e.current));
                }

            }

        ],

        connected() {

            if (this.active === false) {
                return;
            }

            const active = this.items[Number(this.active)];
            if (active && !hasClass(active, this.clsOpen)) {
                this.toggle(active, false);
            }
        },

        update() {
            const this$1 = this;


            this.items.forEach(function (el) { return this$1._toggle($(this$1.content, el), hasClass(el, this$1.clsOpen)); });

            const active = !this.collapsible && !hasClass(this.items, this.clsOpen) && this.items[0];
            if (active) {
                this.toggle(active, false);
            }
        },

        methods: {

            toggle(item, animate) {
                const this$1 = this;


                const index = getIndex(item, this.items);
                const active = filter(this.items, (`.${  this.clsOpen}`));

                item = this.items[index];

                item && [item]
                    .concat(!this.multiple && !includes(active, item) && active || [])
                    .forEach(function (el) {

                        const isItem = el === item;
                        const state = isItem && !hasClass(el, this$1.clsOpen);

                        if (!state && isItem && !this$1.collapsible && active.length < 2) {
                            return;
                        }

                        toggleClass(el, this$1.clsOpen, state);

                        const content = el._wrapper ? el._wrapper.firstElementChild : $(this$1.content, el);

                        if (!el._wrapper) {
                            el._wrapper = wrapAll(content, '<div>');
                            attr(el._wrapper, 'hidden', state ? '' : null);
                        }

                        this$1._toggle(content, true);
                        this$1.toggleElement(el._wrapper, state, animate).then(function () {

                            if (hasClass(el, this$1.clsOpen) !== state) {
                                return;
                            }

                            if (!state) {
                                this$1._toggle(content, false);
                            }

                            el._wrapper = null;
                            unwrap(content);

                        });

                    });
            }

        }

    };

    const Alert = {

        mixins: [Class, Togglable],

        args: 'animation',

        props: {
            close: String
        },

        data: {
            animation: [true],
            selClose: '.uk-alert-close',
            duration: 150,
            hideProps: {opacity: 0, ...Togglable.data.hideProps}
        },

        events: [

            {

                name: 'click',

                delegate() {
                    return this.selClose;
                },

                handler(e) {
                    e.preventDefault();
                    this.close();
                }

            }

        ],

        methods: {

            close() {
                const this$1 = this;

                this.toggleElement(this.$el).then(function () { return this$1.$destroy(true); });
            }

        }

    };

    function Core (UIkit) {

        ready(function () {

            UIkit.update();
            on(window, 'load resize', function () { return UIkit.update(null, 'resize'); });
            on(document, 'loadedmetadata load', function (ref) {
                const {target} = ref;

                return UIkit.update(target, 'resize');
            }, true);

            // throttle `scroll` event (Safari triggers multiple `scroll` events per frame)
            let pending;
            on(window, 'scroll', function (e) {

                if (pending) {
                    return;
                }
                pending = true;
                fastdom.write(function () { return pending = false; });

                const {target} = e;
                UIkit.update(target.nodeType !== 1 ? document.body : target, e.type);

            }, {passive: true, capture: true});

            let started = 0;
            on(document, 'animationstart', function (ref) {
                const {target} = ref;

                if ((css(target, 'animationName') || '').match(/^uk-.*(left|right)/)) {

                    started++;
                    css(document.body, 'overflowX', 'hidden');
                    setTimeout(function () {
                        if (!--started) {
                            css(document.body, 'overflowX', '');
                        }
                    }, toMs(css(target, 'animationDuration')) + 100);
                }
            }, true);

            let off;
            on(document, pointerDown, function (e) {

                off && off();

                if (!isTouch(e)) {
                    return;
                }

                // Handle Swipe Gesture
                const pos = getEventPos(e);
                const target = 'tagName' in e.target ? e.target : e.target.parentNode;
                off = once(document, (`${pointerUp  } ${  pointerCancel}`), function (e) {

                    const ref = getEventPos(e);
                    const {x} = ref;
                    const {y} = ref;

                    // swipe
                    if (target && x && Math.abs(pos.x - x) > 100 || y && Math.abs(pos.y - y) > 100) {

                        setTimeout(function () {
                            trigger(target, 'swipe');
                            trigger(target, (`swipe${  swipeDirection(pos.x, pos.y, x, y)}`));
                        });

                    }

                });

                // Force click event anywhere on iOS < 13
                if (pointerDown === 'touchstart') {
                    css(document.body, 'cursor', 'pointer');
                    once(document, (`${pointerUp  } ${  pointerCancel}`), function () { return setTimeout(function () { return css(document.body, 'cursor', ''); }
                        , 50); }
                    );
                }

            }, {passive: true});

        });

    }

    function swipeDirection(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2)
            ? x1 - x2 > 0
                ? 'Left'
                : 'Right'
            : y1 - y2 > 0
                ? 'Up'
                : 'Down';
    }

    const Video = {

        args: 'autoplay',

        props: {
            automute: Boolean,
            autoplay: Boolean
        },

        data: {
            automute: false,
            autoplay: true
        },

        computed: {

            inView(ref) {
                const {autoplay} = ref;

                return autoplay === 'inview';
            }

        },

        connected() {

            if (this.inView && !hasAttr(this.$el, 'preload')) {
                this.$el.preload = 'none';
            }

            this.player = new Player(this.$el);

            if (this.automute) {
                this.player.mute();
            }

        },

        update: {

            read() {

                return !this.player
                    ? false
                    : {
                        visible: isVisible(this.$el) && css(this.$el, 'visibility') !== 'hidden',
                        inView: this.inView && isInView(this.$el)
                    };
            },

            write(ref) {
                const {visible} = ref;
                const {inView} = ref;


                if (!visible || this.inView && !inView) {
                    this.player.pause();
                } else if (this.autoplay === true || this.inView && inView) {
                    this.player.play();
                }

            },

            events: ['resize', 'scroll']

        }

    };

    const Cover = {

        mixins: [Class, Video],

        props: {
            width: Number,
            height: Number
        },

        data: {
            automute: true
        },

        update: {

            read() {

                const el = this.$el;
                const ref = el.parentNode;
                const height = ref.offsetHeight;
                const width = ref.offsetWidth;
                const dim = Dimensions.cover(
                    {
                        width: this.width || el.naturalWidth || el.videoWidth || el.clientWidth,
                        height: this.height || el.naturalHeight || el.videoHeight || el.clientHeight
                    },
                    {
                        width: width + (width % 2 ? 1 : 0),
                        height: height + (height % 2 ? 1 : 0)
                    }
                );

                if (!dim.width || !dim.height) {
                    return false;
                }

                return dim;
            },

            write(ref) {
                const {height} = ref;
                const {width} = ref;

                css(this.$el, {height, width});
            },

            events: ['resize']

        }

    };

    const Position = {

        props: {
            pos: String,
            offset: null,
            flip: Boolean,
            clsPos: String
        },

        data: {
            pos: (`bottom-${  !isRtl ? 'left' : 'right'}`),
            flip: true,
            offset: false,
            clsPos: ''
        },

        computed: {

            pos(ref) {
                const {pos} = ref;

                return (pos + (!includes(pos, '-') ? '-center' : '')).split('-');
            },

            dir() {
                return this.pos[0];
            },

            align() {
                return this.pos[1];
            }

        },

        methods: {

            positionAt(element, target, boundary) {

                removeClasses(element, (`${this.clsPos  }-(top|bottom|left|right)(-[a-z]+)?`));
                css(element, {top: '', left: ''});

                let node;
                const ref = this;
                let offset$1 = ref.offset;
                const axis = this.getAxis();

                if (!isNumeric(offset$1)) {
                    node = $(offset$1);
                    offset$1 = node
                        ? offset(node)[axis === 'x' ? 'left' : 'top'] - offset(target)[axis === 'x' ? 'right' : 'bottom']
                        : 0;
                }

                const ref$1 = positionAt(
                    element,
                    target,
                    axis === 'x' ? (`${flipPosition(this.dir)  } ${  this.align}`) : (`${this.align  } ${  flipPosition(this.dir)}`),
                    axis === 'x' ? (`${this.dir  } ${  this.align}`) : (`${this.align  } ${  this.dir}`),
                    axis === 'x' ? (`${  this.dir === 'left' ? -offset$1 : offset$1}`) : (` ${  this.dir === 'top' ? -offset$1 : offset$1}`),
                    null,
                    this.flip,
                    boundary
                ).target;
                const {x} = ref$1;
                const {y} = ref$1;

                this.dir = axis === 'x' ? x : y;
                this.align = axis === 'x' ? y : x;

                toggleClass(element, (`${this.clsPos  }-${  this.dir  }-${  this.align}`), this.offset === false);

            },

            getAxis() {
                return this.dir === 'top' || this.dir === 'bottom' ? 'y' : 'x';
            }

        }

    };

    let active;

    const Drop = {

        mixins: [Position, Togglable],

        args: 'pos',

        props: {
            mode: 'list',
            toggle: Boolean,
            boundary: Boolean,
            boundaryAlign: Boolean,
            delayShow: Number,
            delayHide: Number,
            clsDrop: String
        },

        data: {
            mode: ['click', 'hover'],
            toggle: '- *',
            boundary: window,
            boundaryAlign: false,
            delayShow: 0,
            delayHide: 800,
            clsDrop: false,
            hoverIdle: 200,
            animation: ['uk-animation-fade'],
            cls: 'uk-open'
        },

        computed: {

            boundary(ref, $el) {
                const {boundary} = ref;

                return query(boundary, $el);
            },

            clsDrop(ref) {
                const {clsDrop} = ref;

                return clsDrop || (`uk-${  this.$options.name}`);
            },

            clsPos() {
                return this.clsDrop;
            }

        },

        created() {
            this.tracker = new MouseTracker();
        },

        connected() {

            addClass(this.$el, this.clsDrop);

            const ref = this.$props;
            const {toggle} = ref;
            this.toggle = toggle && this.$create('toggle', query(toggle, this.$el), {
                target: this.$el,
                mode: this.mode
            });

            !this.toggle && trigger(this.$el, 'updatearia');

        },

        events: [


            {

                name: 'click',

                delegate() {
                    return (`.${  this.clsDrop  }-close`);
                },

                handler(e) {
                    e.preventDefault();
                    this.hide(false);
                }

            },

            {

                name: 'click',

                delegate() {
                    return 'a[href^="#"]';
                },

                handler(ref) {
                    const {defaultPrevented} = ref;
                    const {hash} = ref.current;

                    if (!defaultPrevented && hash && !within(hash, this.$el)) {
                        this.hide(false);
                    }
                }

            },

            {

                name: 'beforescroll',

                handler() {
                    this.hide(false);
                }

            },

            {

                name: 'toggle',

                self: true,

                handler(e, toggle) {

                    e.preventDefault();

                    if (this.isToggled()) {
                        this.hide(false);
                    } else {
                        this.show(toggle, false);
                    }
                }

            },

            {

                name: pointerEnter,

                filter() {
                    return includes(this.mode, 'hover');
                },

                handler(e) {

                    if (isTouch(e)) {
                        return;
                    }

                    if (active
                        && active !== this
                        && active.toggle
                        && includes(active.toggle.mode, 'hover')
                        && !within(e.target, active.toggle.$el)
                        && !pointInRect({x: e.pageX, y: e.pageY}, offset(active.$el))
                    ) {
                        active.hide(false);
                    }

                    e.preventDefault();
                    this.show(this.toggle);
                }

            },

            {

                name: 'toggleshow',

                handler(e, toggle) {

                    if (toggle && !includes(toggle.target, this.$el)) {
                        return;
                    }

                    e.preventDefault();
                    this.show(toggle || this.toggle);
                }

            },

            {

                name: (`togglehide ${  pointerLeave}`),

                handler(e, toggle) {

                    if (isTouch(e) || toggle && !includes(toggle.target, this.$el)) {
                        return;
                    }

                    e.preventDefault();

                    if (this.toggle && includes(this.toggle.mode, 'hover')) {
                        this.hide();
                    }
                }

            },

            {

                name: 'beforeshow',

                self: true,

                handler() {
                    this.clearTimers();
                    Animation.cancel(this.$el);
                    this.position();
                }

            },

            {

                name: 'show',

                self: true,

                handler() {
                    const this$1 = this;

                    this.tracker.init();
                    trigger(this.$el, 'updatearia');

                    // If triggered from an click event handler, delay adding the click handler
                    const off = delayOn(document, 'click', function (ref) {
                        const {defaultPrevented} = ref;
                        const {target} = ref;

                        if (!defaultPrevented && !within(target, this$1.$el) && !(this$1.toggle && within(target, this$1.toggle.$el))) {
                            this$1.hide(false);
                        }
                    });

                    once(this.$el, 'hide', off, {self: true});
                }

            },

            {

                name: 'beforehide',

                self: true,

                handler() {
                    this.clearTimers();
                }

            },

            {

                name: 'hide',

                handler(ref) {
                    const {target} = ref;


                    if (this.$el !== target) {
                        active = active === null && within(target, this.$el) && this.isToggled() ? this : active;
                        return;
                    }

                    active = this.isActive() ? null : active;
                    trigger(this.$el, 'updatearia');
                    this.tracker.cancel();
                }

            },

            {

                name: 'updatearia',

                self: true,

                handler(e, toggle) {

                    e.preventDefault();

                    this.updateAria(this.$el);

                    if (toggle || this.toggle) {
                        attr((toggle || this.toggle).$el, 'aria-expanded', this.isToggled());
                        toggleClass(this.toggle.$el, this.cls, this.isToggled());
                    }
                }
            }

        ],

        update: {

            write() {

                if (this.isToggled() && !Animation.inProgress(this.$el)) {
                    this.position();
                }

            },

            events: ['resize']

        },

        methods: {

            show(toggle, delay) {
                const this$1 = this;
                if ( delay === void 0 ) delay = true;


                const show = function () { return !this$1.isToggled() && this$1.toggleElement(this$1.$el, true); };
                const tryShow = function () {

                    this$1.toggle = toggle || this$1.toggle;

                    this$1.clearTimers();

                    if (this$1.isActive()) {
                        return;
                    } if (delay && active && active !== this$1 && active.isDelaying) {
                        this$1.showTimer = setTimeout(this$1.show, 10);
                        return;
                    } if (this$1.isParentOf(active)) {

                        if (active.hideTimer) {
                            active.hide(false);
                        } else {
                            return;
                        }

                    } else if (this$1.isChildOf(active)) {

                        active.clearTimers();

                    } else if (active && !this$1.isChildOf(active) && !this$1.isParentOf(active)) {

                        let prev;
                        while (active && active !== prev && !this$1.isChildOf(active)) {
                            prev = active;
                            active.hide(false);
                        }

                    }

                    if (delay && this$1.delayShow) {
                        this$1.showTimer = setTimeout(show, this$1.delayShow);
                    } else {
                        show();
                    }

                    active = this$1;
                };

                if (toggle && this.toggle && toggle.$el !== this.toggle.$el) {

                    once(this.$el, 'hide', tryShow);
                    this.hide(false);

                } else {
                    tryShow();
                }
            },

            hide(delay) {
                const this$1 = this;
                if ( delay === void 0 ) delay = true;


                const hide = function () { return this$1.toggleNow(this$1.$el, false); };

                this.clearTimers();

                this.isDelaying = this.tracker.movesTo(this.$el);

                if (delay && this.isDelaying) {
                    this.hideTimer = setTimeout(this.hide, this.hoverIdle);
                } else if (delay && this.delayHide) {
                    this.hideTimer = setTimeout(hide, this.delayHide);
                } else {
                    hide();
                }
            },

            clearTimers() {
                clearTimeout(this.showTimer);
                clearTimeout(this.hideTimer);
                this.showTimer = null;
                this.hideTimer = null;
                this.isDelaying = false;
            },

            isActive() {
                return active === this;
            },

            isChildOf(drop) {
                return drop && drop !== this && within(this.$el, drop.$el);
            },

            isParentOf(drop) {
                return drop && drop !== this && within(drop.$el, this.$el);
            },

            position() {

                removeClasses(this.$el, (`${this.clsDrop  }-(stack|boundary)`));
                css(this.$el, {top: '', left: '', display: 'block'});
                toggleClass(this.$el, (`${this.clsDrop  }-boundary`), this.boundaryAlign);

                const boundary = offset(this.boundary);
                const alignTo = this.boundaryAlign ? boundary : offset(this.toggle.$el);

                if (this.align === 'justify') {
                    const prop = this.getAxis() === 'y' ? 'width' : 'height';
                    css(this.$el, prop, alignTo[prop]);
                } else if (this.$el.offsetWidth > Math.max(boundary.right - alignTo.left, alignTo.right - boundary.left)) {
                    addClass(this.$el, (`${this.clsDrop  }-stack`));
                }

                this.positionAt(this.$el, this.boundaryAlign ? this.boundary : this.toggle.$el, this.boundary);

                css(this.$el, 'display', '');

            }

        }

    };

    function delayOn(el, type, fn) {
        var off = once(el, type, function () { return off = on(el, type, fn); }
            , true);
        return function () { return off(); };
    }

    const Dropdown = {

        extends: Drop

    };

    const FormCustom = {

        mixins: [Class],

        args: 'target',

        props: {
            target: Boolean
        },

        data: {
            target: false
        },

        computed: {

            input(_, $el) {
                return $(selInput, $el);
            },

            state() {
                return this.input.nextElementSibling;
            },

            target(ref, $el) {
                const {target} = ref;

                return target && (target === true
                    && this.input.parentNode === $el
                    && this.input.nextElementSibling
                    || query(target, $el));
            }

        },

        update() {

            const ref = this;
            const {target} = ref;
            const {input} = ref;

            if (!target) {
                return;
            }

            let option;
            const prop = isInput(target) ? 'value' : 'textContent';
            const prev = target[prop];
            const value = input.files && input.files[0]
                ? input.files[0].name
                : matches(input, 'select') && (option = $$('option', input).filter(function (el) { return el.selected; })[0]) // eslint-disable-line prefer-destructuring
                    ? option.textContent
                    : input.value;

            if (prev !== value) {
                target[prop] = value;
            }

        },

        events: [

            {
                name: 'change',

                handler() {
                    this.$emit();
                }
            },

            {
                name: 'reset',

                el() {
                    return closest(this.$el, 'form');
                },

                handler() {
                    this.$emit();
                }
            }

        ]

    };

    // Deprecated
    const Gif = {

        update: {

            read(data) {

                const inview = isInView(this.$el);

                if (!inview || data.isInView === inview) {
                    return false;
                }

                data.isInView = inview;
            },

            write() {
                this.$el.src = this.$el.src;
            },

            events: ['scroll', 'resize']
        }

    };

    const Margin = {

        props: {
            margin: String,
            firstColumn: Boolean
        },

        data: {
            margin: 'uk-margin-small-top',
            firstColumn: 'uk-first-column'
        },

        update: {

            read(data) {

                const items = this.$el.children;
                const rows = [[]];

                if (!items.length || !isVisible(this.$el)) {
                    return data.rows = rows;
                }

                data.rows = getRows(items);
                data.stacks = !data.rows.some(function (row) { return row.length > 1; });

            },

            write(ref) {
                const this$1 = this;
                const {rows} = ref;


                rows.forEach(function (row, i) { return row.forEach(function (el, j) {
                    toggleClass(el, this$1.margin, i !== 0);
                    toggleClass(el, this$1.firstColumn, j === 0);
                }); }
                );

            },

            events: ['resize']

        }

    };

    function getRows(items) {
        const rows = [[]];

        for (let i = 0; i < items.length; i++) {

            const el = items[i];
            let dim = getOffset(el);

            if (!dim.height) {
                continue;
            }

            for (let j = rows.length - 1; j >= 0; j--) {

                const row = rows[j];

                if (!row[0]) {
                    row.push(el);
                    break;
                }

                let leftDim = (void 0);
                if (row[0].offsetParent === el.offsetParent) {
                    leftDim = getOffset(row[0]);
                } else {
                    dim = getOffset(el, true);
                    leftDim = getOffset(row[0], true);
                }

                if (dim.top >= leftDim.bottom - 1 && dim.top !== leftDim.top) {
                    rows.push([el]);
                    break;
                }

                if (dim.bottom > leftDim.top) {

                    if (dim.left < leftDim.left && !isRtl) {
                        row.unshift(el);
                        break;
                    }

                    row.push(el);
                    break;
                }

                if (j === 0) {
                    rows.unshift([el]);
                    break;
                }

            }

        }

        return rows;

    }

    function getOffset(element, offset) {
        let assign;

        if ( offset === void 0 ) offset = false;

        let {offsetTop} = element;
        let {offsetLeft} = element;
        const {offsetHeight} = element;

        if (offset) {
            (assign = offsetPosition(element), offsetTop = assign[0], offsetLeft = assign[1]);
        }

        return {
            top: offsetTop,
            left: offsetLeft,
            height: offsetHeight,
            bottom: offsetTop + offsetHeight
        };
    }

    const Grid = {

        extends: Margin,

        mixins: [Class],

        name: 'grid',

        props: {
            masonry: Boolean,
            parallax: Number
        },

        data: {
            margin: 'uk-grid-margin',
            clsStack: 'uk-grid-stack',
            masonry: false,
            parallax: 0
        },

        computed: {

            length(_, $el) {
                return $el.children.length;
            },

            parallax(ref) {
                const {parallax} = ref;

                return parallax && this.length ? Math.abs(parallax) : '';
            }

        },

        connected() {
            this.masonry && addClass(this.$el, 'uk-flex-top uk-flex-wrap-top');
        },

        update: [

            {

                read(ref) {
                    let {rows} = ref;


                    if (this.masonry || this.parallax) {
                        rows = rows.map(function (elements) { return sortBy(elements, 'offsetLeft'); });

                        if (isRtl) {
                            rows.map(function (row) { return row.reverse(); });
                        }

                    }

                    const transitionInProgress = rows.some(function (elements) { return elements.some(Transition.inProgress); });
                    let translates = false;
                    let elHeight = '';

                    if (this.masonry && this.length) {

                        let height = 0;

                        translates = rows.reduce(function (translates, row, i) {

                            translates[i] = row.map(function (_, j) { return i === 0 ? 0 : toFloat(translates[i - 1][j]) + (height - toFloat(rows[i - 1][j] && rows[i - 1][j].offsetHeight)); });
                            height = row.reduce(function (height, el) { return Math.max(height, el.offsetHeight); }, 0);

                            return translates;

                        }, []);

                        elHeight = maxColumnHeight(rows) + getMarginTop(this.$el, this.margin) * (rows.length - 1);

                    }

                    const padding = this.parallax && getPaddingBottom(this.parallax, rows, translates);

                    return {padding, rows, translates, height: !transitionInProgress ? elHeight : false};

                },

                write(ref) {
                    const {stacks} = ref;
                    const {height} = ref;
                    const {padding} = ref;


                    toggleClass(this.$el, this.clsStack, stacks);

                    css(this.$el, 'paddingBottom', padding);
                    height !== false && css(this.$el, 'height', height);

                },

                events: ['resize']

            },

            {

                read(ref) {
                    const height$1 = ref.height;

                    return {
                        scrolled: this.parallax
                            ? scrolledOver(this.$el, height$1 ? height$1 - height(this.$el) : 0) * this.parallax
                            : false
                    };
                },

                write(ref) {
                    const {rows} = ref;
                    const {scrolled} = ref;
                    const {translates} = ref;


                    if (scrolled === false && !translates) {
                        return;
                    }

                    rows.forEach(function (row, i) { return row.forEach(function (el, j) { return css(el, 'transform', !scrolled && !translates ? '' : (`translateY(${  (translates && -translates[i][j]) + (scrolled ? j % 2 ? scrolled : scrolled / 8 : 0)  }px)`)); }
                    ); }
                    );

                },

                events: ['scroll', 'resize']

            }

        ]

    };

    function getPaddingBottom(distance, rows, translates) {
        let column = 0;
        let max = 0;
        let maxScrolled = 0;
        for (let i = rows.length - 1; i >= 0; i--) {
            for (let j = column; j < rows[i].length; j++) {
                const el = rows[i][j];
                const bottom = el.offsetTop + height(el) + (translates && -translates[i][j]);
                max = Math.max(max, bottom);
                maxScrolled = Math.max(maxScrolled, bottom + (j % 2 ? distance : distance / 8));
                column++;
            }
        }
        return maxScrolled - max;
    }

    function getMarginTop(root, cls) {

        const nodes = toNodes(root.children);
        const ref = nodes.filter(function (el) { return hasClass(el, cls); });
        const node = ref[0];

        return toFloat(node
            ? css(node, 'marginTop')
            : css(nodes[0], 'paddingLeft'));
    }

    function maxColumnHeight(rows) {
        return Math.max.apply(Math, rows.reduce(function (sum, row) {
            row.forEach(function (el, i) { return sum[i] = (sum[i] || 0) + el.offsetHeight; });
            return sum;
        }, []));
    }

    // IE 11 fix (min-height on a flex container won't apply to its flex items)
    const FlexBug = isIE ? {

        props: {
            selMinHeight: String
        },

        data: {
            selMinHeight: false,
            forceHeight: false
        },

        computed: {

            elements(ref, $el) {
                const {selMinHeight} = ref;

                return selMinHeight ? $$(selMinHeight, $el) : [$el];
            }

        },

        update: [

            {

                read() {
                    css(this.elements, 'height', '');
                },

                order: -5,

                events: ['resize']

            },

            {

                write() {
                    const this$1 = this;

                    this.elements.forEach(function (el) {
                        const height = toFloat(css(el, 'minHeight'));
                        if (height && (this$1.forceHeight || Math.round(height + boxModelAdjust('height', el, 'content-box')) >= el.offsetHeight)) {
                            css(el, 'height', height);
                        }
                    });
                },

                order: 5,

                events: ['resize']

            }

        ]

    } : {};

    const HeightMatch = {

        mixins: [FlexBug],

        args: 'target',

        props: {
            target: String,
            row: Boolean
        },

        data: {
            target: '> *',
            row: true,
            forceHeight: true
        },

        computed: {

            elements(ref, $el) {
                const {target} = ref;

                return $$(target, $el);
            }

        },

        update: {

            read() {
                return {
                    rows: (this.row ? getRows(this.elements) : [this.elements]).map(match)
                };
            },

            write(ref) {
                const {rows} = ref;

                rows.forEach(function (ref) {
                    const {heights} = ref;
                    const {elements} = ref;

                    return elements.forEach(function (el, i) { return css(el, 'minHeight', heights[i]); }
                    );
                }
                );
            },

            events: ['resize']

        }

    };

    function match(elements) {
        let assign;


        if (elements.length < 2) {
            return {heights: [''], elements};
        }

        const ref = getHeights(elements);
        let {heights} = ref;
        let {max} = ref;
        const hasMinHeight = elements.some(function (el) { return el.style.minHeight; });
        const hasShrunk = elements.some(function (el, i) { return !el.style.minHeight && heights[i] < max; });

        if (hasMinHeight && hasShrunk) {
            css(elements, 'minHeight', '');
            ((assign = getHeights(elements), heights = assign.heights, max = assign.max));
        }

        heights = elements.map(function (el, i) { return heights[i] === max && toFloat(el.style.minHeight).toFixed(2) !== max.toFixed(2) ? '' : max; }
        );

        return {heights, elements};
    }

    function getHeights(elements) {
        const heights = elements.map(function (el) { return offset(el).height - boxModelAdjust('height', el, 'content-box'); });
        const max = Math.max.apply(null, heights);

        return {heights, max};
    }

    const HeightViewport = {

        mixins: [FlexBug],

        props: {
            expand: Boolean,
            offsetTop: Boolean,
            offsetBottom: Boolean,
            minHeight: Number
        },

        data: {
            expand: false,
            offsetTop: false,
            offsetBottom: false,
            minHeight: 0
        },

        update: {

            read(ref) {
                const prev = ref.minHeight;


                if (!isVisible(this.$el)) {
                    return false;
                }

                let minHeight = '';
                const box = boxModelAdjust('height', this.$el, 'content-box');

                if (this.expand) {

                    this.$el.dataset.heightExpand = '';

                    if ($('[data-height-expand]') !== this.$el) {
                        return false;
                    }

                    minHeight = height(window) - (offsetHeight(document.documentElement) - offsetHeight(this.$el)) - box || '';

                } else {

                    // on mobile devices (iOS and Android) window.innerHeight !== 100vh
                    minHeight = 'calc(100vh';

                    if (this.offsetTop) {

                        const ref$1 = offset(this.$el);
                        const {top} = ref$1;
                        minHeight += top > 0 && top < height(window) / 2 ? (` - ${  top  }px`) : '';

                    }

                    if (this.offsetBottom === true) {

                        minHeight += ` - ${  offsetHeight(this.$el.nextElementSibling)  }px`;

                    } else if (isNumeric(this.offsetBottom)) {

                        minHeight += ` - ${  this.offsetBottom  }vh`;

                    } else if (this.offsetBottom && endsWith(this.offsetBottom, 'px')) {

                        minHeight += ` - ${  toFloat(this.offsetBottom)  }px`;

                    } else if (isString(this.offsetBottom)) {

                        minHeight += ` - ${  offsetHeight(query(this.offsetBottom, this.$el))  }px`;

                    }

                    minHeight += `${box ? (` - ${  box  }px`) : ''  })`;

                }

                return {minHeight, prev};
            },

            write(ref) {
                const {minHeight} = ref;
                const {prev} = ref;


                css(this.$el, {minHeight});

                if (minHeight !== prev) {
                    this.$update(this.$el, 'resize');
                }

                if (this.minHeight && toFloat(css(this.$el, 'minHeight')) < this.minHeight) {
                    css(this.$el, 'minHeight', this.minHeight);
                }

            },

            events: ['resize']

        }

    };

    function offsetHeight(el) {
        return el && offset(el).height || 0;
    }

    const Svg = {

        args: 'src',

        props: {
            id: Boolean,
            icon: String,
            src: String,
            style: String,
            width: Number,
            height: Number,
            ratio: Number,
            class: String,
            strokeAnimation: Boolean,
            focusable: Boolean, // IE 11
            attributes: 'list'
        },

        data: {
            ratio: 1,
            include: ['style', 'class', 'focusable'],
            class: '',
            strokeAnimation: false
        },

        beforeConnect() {
            const this$1 = this;
            let assign;


            this.class += ' uk-svg';

            if (!this.icon && includes(this.src, '#')) {

                const parts = this.src.split('#');

                if (parts.length > 1) {
                    (assign = parts, this.src = assign[0], this.icon = assign[1]);
                }
            }

            this.svg = this.getSvg().then(function (el) {
                this$1.applyAttributes(el);
                return this$1.svgEl = insertSVG(el, this$1.$el);
            }, noop);

        },

        disconnected() {
            const this$1 = this;


            if (isVoidElement(this.$el)) {
                attr(this.$el, 'hidden', null);
            }

            if (this.svg) {
                this.svg.then(function (svg) { return (!this$1._connected || svg !== this$1.svgEl) && remove(svg); }, noop);
            }

            this.svg = this.svgEl = null;

        },

        update: {

            read() {
                return !!(this.strokeAnimation && this.svgEl && isVisible(this.svgEl));
            },

            write() {
                applyAnimation(this.svgEl);
            },

            type: ['resize']

        },

        methods: {

            getSvg() {
                const this$1 = this;

                return loadSVG(this.src).then(function (svg) { return parseSVG(svg, this$1.icon) || Promise.reject('SVG not found.'); }
                );
            },

            applyAttributes(el) {
                const this$1 = this;


                for (const prop in this.$options.props) {
                    if (this[prop] && includes(this.include, prop)) {
                        attr(el, prop, this[prop]);
                    }
                }

                for (const attribute in this.attributes) {
                    const ref = this.attributes[attribute].split(':', 2);
                    const prop$1 = ref[0];
                    const value = ref[1];
                    attr(el, prop$1, value);
                }

                if (!this.id) {
                    removeAttr(el, 'id');
                }

                const props = ['width', 'height'];
                let dimensions = [this.width, this.height];

                if (!dimensions.some(function (val) { return val; })) {
                    dimensions = props.map(function (prop) { return attr(el, prop); });
                }

                const viewBox = attr(el, 'viewBox');
                if (viewBox && !dimensions.some(function (val) { return val; })) {
                    dimensions = viewBox.split(' ').slice(2);
                }

                dimensions.forEach(function (val, i) {
                    val = (val | 0) * this$1.ratio;
                    val && attr(el, props[i], val);

                    if (val && !dimensions[i ^ 1]) {
                        removeAttr(el, props[i ^ 1]);
                    }
                });

                attr(el, 'data-svg', this.icon || this.src);

            }

        }

    };

    const svgs = {};

    function loadSVG(src) {

        if (svgs[src]) {
            return svgs[src];
        }

        return svgs[src] = new Promise(function (resolve, reject) {

            if (!src) {
                reject();
                return;
            }

            if (startsWith(src, 'data:')) {
                resolve(decodeURIComponent(src.split(',')[1]));
            } else {

                ajax(src).then(
                    function (xhr) { return resolve(xhr.response); },
                    function () { return reject('SVG not found.'); }
                );

            }

        });
    }

    function parseSVG(svg, icon) {

        if (icon && includes(svg, '<symbol')) {
            svg = parseSymbols(svg, icon) || svg;
        }

        svg = $(svg.substr(svg.indexOf('<svg')));
        return svg && svg.hasChildNodes() && svg;
    }

    const symbolRe = /<symbol(.*?id=(['"])(.*?)\2[^]*?<\/)symbol>/g;
    const symbols = {};

    function parseSymbols(svg, icon) {

        if (!symbols[svg]) {

            symbols[svg] = {};

            let match;
            while ((match = symbolRe.exec(svg))) {
                symbols[svg][match[3]] = `<svg xmlns="http://www.w3.org/2000/svg"${  match[1]  }svg>`;
            }

            symbolRe.lastIndex = 0;

        }

        return symbols[svg][icon];
    }

    function applyAnimation(el) {

        const length = getMaxPathLength(el);

        if (length) {
            el.style.setProperty('--uk-animation-stroke', length);
        }

    }

    function getMaxPathLength(el) {
        return Math.ceil(Math.max.apply(Math, $$('[stroke]', el).map(function (stroke) { return stroke.getTotalLength && stroke.getTotalLength() || 0; }
        ).concat([0])));
    }

    function insertSVG(el, root) {
        if (isVoidElement(root) || root.tagName === 'CANVAS') {

            attr(root, 'hidden', true);

            const next = root.nextElementSibling;
            return equals(el, next)
                ? next
                : after(root, el);

        } 

        const last = root.lastElementChild;
        return equals(el, last)
            ? last
            : append(root, el);

        
    }

    function equals(el, other) {
        return attr(el, 'data-svg') === attr(other, 'data-svg');
    }

    const closeIcon = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"1\" y1=\"1\" x2=\"13\" y2=\"13\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"13\" y1=\"1\" x2=\"1\" y2=\"13\"/></svg>";

    const closeLarge = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"1\" y1=\"1\" x2=\"19\" y2=\"19\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"19\" y1=\"1\" x2=\"1\" y2=\"19\"/></svg>";

    const marker = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"9\" y=\"4\" width=\"1\" height=\"11\"/><rect x=\"4\" y=\"9\" width=\"11\" height=\"1\"/></svg>";

    const navbarToggleIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><rect y=\"9\" width=\"20\" height=\"2\"/><rect y=\"3\" width=\"20\" height=\"2\"/><rect y=\"15\" width=\"20\" height=\"2\"/></svg>";

    const overlayIcon = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"19\" y=\"0\" width=\"1\" height=\"40\"/><rect x=\"0\" y=\"19\" width=\"40\" height=\"1\"/></svg>";

    const paginationNext = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 1 6 6 1 11\"/></svg>";

    const paginationPrevious = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"6 1 1 6 6 11\"/></svg>";

    const searchIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"9\" cy=\"9\" r=\"7\"/><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" d=\"M14,14 L18,18 L14,14 Z\"/></svg>";

    const searchLarge = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" cx=\"17.5\" cy=\"17.5\" r=\"16.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" x1=\"38\" y1=\"39\" x2=\"29\" y2=\"30\"/></svg>";

    const searchNavbar = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"10.5\" cy=\"10.5\" r=\"9.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"23\" y1=\"23\" x2=\"17\" y2=\"17\"/></svg>";

    const slidenavNext = "<svg width=\"14px\" height=\"24px\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"1.225,23 12.775,12 1.225,1 \"/></svg>";

    const slidenavNextLarge = "<svg width=\"25px\" height=\"40px\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"4.002,38.547 22.527,20.024 4,1.5 \"/></svg>";

    const slidenavPrevious = "<svg width=\"14px\" height=\"24px\" viewBox=\"0 0 14 24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"12.775,1 1.225,12 12.775,23 \"/></svg>";

    const slidenavPreviousLarge = "<svg width=\"25px\" height=\"40px\" viewBox=\"0 0 25 40\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"20.527,1.5 2,20.024 20.525,38.547 \"/></svg>";

    const spinner = "<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"none\" stroke=\"#000\" cx=\"15\" cy=\"15\" r=\"14\"/></svg>";

    const totop = "<svg width=\"18\" height=\"10\" viewBox=\"0 0 18 10\" xmlns=\"http://www.w3.org/2000/svg\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 9 9 1 17 9 \"/></svg>";

    const parsed = {};
    const icons = {
        spinner,
        totop,
        marker,
        'close-icon': closeIcon,
        'close-large': closeLarge,
        'navbar-toggle-icon': navbarToggleIcon,
        'overlay-icon': overlayIcon,
        'pagination-next': paginationNext,
        'pagination-previous': paginationPrevious,
        'search-icon': searchIcon,
        'search-large': searchLarge,
        'search-navbar': searchNavbar,
        'slidenav-next': slidenavNext,
        'slidenav-next-large': slidenavNextLarge,
        'slidenav-previous': slidenavPrevious,
        'slidenav-previous-large': slidenavPreviousLarge
    };

    const Icon = {

        install,

        extends: Svg,

        args: 'icon',

        props: ['icon'],

        data: {
            include: ['focusable']
        },

        isIcon: true,

        beforeConnect() {
            addClass(this.$el, 'uk-icon');
        },

        methods: {

            getSvg() {

                const icon = getIcon(applyRtl(this.icon));

                if (!icon) {
                    return Promise.reject('Icon not found.');
                }

                return Promise.resolve(icon);
            }

        }

    };

    const IconComponent = {

        args: false,

        extends: Icon,

        data (vm) { return ({
            icon: hyphenate(vm.constructor.options.name)
        }); },

        beforeConnect() {
            addClass(this.$el, this.$name);
        }

    };

    const Slidenav = {

        extends: IconComponent,

        beforeConnect() {
            addClass(this.$el, 'uk-slidenav');
        },

        computed: {

            icon(ref, $el) {
                const {icon} = ref;

                return hasClass($el, 'uk-slidenav-large')
                    ? (`${icon  }-large`)
                    : icon;
            }

        }

    };

    const Search = {

        extends: IconComponent,

        computed: {

            icon(ref, $el) {
                const {icon} = ref;

                return hasClass($el, 'uk-search-icon') && parents($el, '.uk-search-large').length
                    ? 'search-large'
                    : parents($el, '.uk-search-navbar').length
                        ? 'search-navbar'
                        : icon;
            }

        }

    };

    const Close = {

        extends: IconComponent,

        computed: {

            icon() {
                return (`close-${  hasClass(this.$el, 'uk-close-large') ? 'large' : 'icon'}`);
            }

        }

    };

    const Spinner = {

        extends: IconComponent,

        connected() {
            const this$1 = this;

            this.svg.then(function (svg) { return this$1.ratio !== 1 && css($('circle', svg), 'strokeWidth', 1 / this$1.ratio); }, noop);
        }

    };

    function install(UIkit) {
        UIkit.icon.add = function (name, svg) {
            let obj;


            const added = isString(name) ? (( obj = {}, obj[name] = svg, obj )) : name;
            each(added, function (svg, name) {
                icons[name] = svg;
                delete parsed[name];
            });

            if (UIkit._initialized) {
                apply(document.body, function (el) { return each(UIkit.getComponents(el), function (cmp) {
                    cmp.$options.isIcon && cmp.icon in added && cmp.$reset();
                }); }
                );
            }
        };
    }

    function getIcon(icon) {

        if (!icons[icon]) {
            return null;
        }

        if (!parsed[icon]) {
            parsed[icon] = $(icons[icon].trim());
        }

        return parsed[icon].cloneNode(true);
    }

    function applyRtl(icon) {
        return isRtl ? swap(swap(icon, 'left', 'right'), 'previous', 'next') : icon;
    }

    const Img = {

        args: 'dataSrc',

        props: {
            dataSrc: String,
            dataSrcset: Boolean,
            sizes: String,
            width: Number,
            height: Number,
            offsetTop: String,
            offsetLeft: String,
            target: String
        },

        data: {
            dataSrc: '',
            dataSrcset: false,
            sizes: false,
            width: false,
            height: false,
            offsetTop: '50vh',
            offsetLeft: 0,
            target: false
        },

        computed: {

            cacheKey(ref) {
                const {dataSrc} = ref;

                return (`${this.$name  }.${  dataSrc}`);
            },

            width(ref) {
                const {width} = ref;
                const {dataWidth} = ref;

                return width || dataWidth;
            },

            height(ref) {
                const {height} = ref;
                const {dataHeight} = ref;

                return height || dataHeight;
            },

            sizes(ref) {
                const {sizes} = ref;
                const {dataSizes} = ref;

                return sizes || dataSizes;
            },

            isImg(_, $el) {
                return isImg($el);
            },

            target: {

                get(ref) {
                    const {target} = ref;

                    return [this.$el].concat(queryAll(target, this.$el));
                },

                watch() {
                    this.observe();
                }

            },

            offsetTop(ref) {
                const {offsetTop} = ref;

                return toPx(offsetTop, 'height');
            },

            offsetLeft(ref) {
                const {offsetLeft} = ref;

                return toPx(offsetLeft, 'width');
            }

        },

        connected() {

            if (storage[this.cacheKey]) {
                setSrcAttrs(this.$el, storage[this.cacheKey] || this.dataSrc, this.dataSrcset, this.sizes);
            } else if (this.isImg && this.width && this.height) {
                setSrcAttrs(this.$el, getPlaceholderImage(this.width, this.height, this.sizes));
            }

            this.observer = new IntersectionObserver(this.load, {
                rootMargin: (`${this.offsetTop  }px ${  this.offsetLeft  }px`)
            });

            requestAnimationFrame(this.observe);

        },

        disconnected() {
            this.observer.disconnect();
        },

        update: {

            read(ref) {
                const this$1 = this;
                const {image} = ref;


                if (!image && document.readyState === 'complete') {
                    this.load(this.observer.takeRecords());
                }

                if (this.isImg) {
                    return false;
                }

                image && image.then(function (img) { return img && img.currentSrc !== '' && setSrcAttrs(this$1.$el, currentSrc(img)); });

            },

            write(data) {

                if (this.dataSrcset && window.devicePixelRatio !== 1) {

                    const bgSize = css(this.$el, 'backgroundSize');
                    if (bgSize.match(/^(auto\s?)+$/) || toFloat(bgSize) === data.bgSize) {
                        data.bgSize = getSourceSize(this.dataSrcset, this.sizes);
                        css(this.$el, 'backgroundSize', (`${data.bgSize  }px`));
                    }

                }

            },

            events: ['resize']

        },

        methods: {

            load(entries) {
                const this$1 = this;


                // Old chromium based browsers (UC Browser) did not implement `isIntersecting`
                if (!entries.some(function (entry) { return isUndefined(entry.isIntersecting) || entry.isIntersecting; })) {
                    return;
                }

                this._data.image = getImage(this.dataSrc, this.dataSrcset, this.sizes).then(function (img) {

                    setSrcAttrs(this$1.$el, currentSrc(img), img.srcset, img.sizes);
                    storage[this$1.cacheKey] = currentSrc(img);
                    return img;

                }, noop);

                this.observer.disconnect();
            },

            observe() {
                const this$1 = this;

                if (!this._data.image && this._connected) {
                    this.target.forEach(function (el) { return this$1.observer.observe(el); });
                }
            }

        }

    };

    function setSrcAttrs(el, src, srcset, sizes) {

        if (isImg(el)) {
            sizes && (el.sizes = sizes);
            srcset && (el.srcset = srcset);
            src && (el.src = src);
        } else if (src) {

            const change = !includes(el.style.backgroundImage, src);
            if (change) {
                css(el, 'backgroundImage', (`url(${  escape(src)  })`));
                trigger(el, createEvent('load', false));
            }

        }

    }

    function getPlaceholderImage(width, height, sizes) {
        let assign;


        if (sizes) {
            ((assign = Dimensions.ratio({width, height}, 'width', toPx(sizesToPixel(sizes))), width = assign.width, height = assign.height));
        }

        return (`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${  width  }" height="${  height  }"></svg>`);
    }

    const sizesRe = /\s*(.*?)\s*(\w+|calc\(.*?\))\s*(?:,|$)/g;
    function sizesToPixel(sizes) {
        let matches;

        sizesRe.lastIndex = 0;

        while ((matches = sizesRe.exec(sizes))) {
            if (!matches[1] || window.matchMedia(matches[1]).matches) {
                matches = evaluateSize(matches[2]);
                break;
            }
        }

        return matches || '100vw';
    }

    const sizeRe = /\d+(?:\w+|%)/g;
    const additionRe = /[+-]?(\d+)/g;
    function evaluateSize(size) {
        return startsWith(size, 'calc')
            ? size
                .substring(5, size.length - 1)
                .replace(sizeRe, function (size) { return toPx(size); })
                .replace(/ /g, '')
                .match(additionRe)
                .reduce(function (a, b) { return a + +b; }, 0)
            : size;
    }

    const srcSetRe = /\s+\d+w\s*(?:,|$)/g;
    function getSourceSize(srcset, sizes) {
        const srcSize = toPx(sizesToPixel(sizes));
        const descriptors = (srcset.match(srcSetRe) || []).map(toFloat).sort(function (a, b) { return a - b; });

        return descriptors.filter(function (size) { return size >= srcSize; })[0] || descriptors.pop() || '';
    }

    function isImg(el) {
        return el.tagName === 'IMG';
    }

    function currentSrc(el) {
        return el.currentSrc || el.src;
    }

    const key = '__test__';
    let storage;

    // workaround for Safari's private browsing mode and accessing sessionStorage in Blink
    try {
        storage = window.sessionStorage || {};
        storage[key] = 1;
        delete storage[key];
    } catch (e) {
        storage = {};
    }

    const Media = {

        props: {
            media: Boolean
        },

        data: {
            media: false
        },

        computed: {

            matchMedia() {
                const media = toMedia(this.media);
                return !media || window.matchMedia(media).matches;
            }

        }

    };

    function toMedia(value) {

        if (isString(value)) {
            if (value[0] === '@') {
                const name = `breakpoint-${  value.substr(1)}`;
                value = toFloat(getCssVar(name));
            } else if (isNaN(value)) {
                return value;
            }
        }

        return value && !isNaN(value) ? (`(min-width: ${  value  }px)`) : false;
    }

    const Leader = {

        mixins: [Class, Media],

        props: {
            fill: String
        },

        data: {
            fill: '',
            clsWrapper: 'uk-leader-fill',
            clsHide: 'uk-leader-hide',
            attrFill: 'data-fill'
        },

        computed: {

            fill(ref) {
                const {fill} = ref;

                return fill || getCssVar('leader-fill-content');
            }

        },

        connected() {
            let assign;

            (assign = wrapInner(this.$el, (`<span class="${  this.clsWrapper  }">`)), this.wrapper = assign[0]);
        },

        disconnected() {
            unwrap(this.wrapper.childNodes);
        },

        update: {

            read(ref) {
                const {changed} = ref;
                let {width} = ref;


                const prev = width;

                width = Math.floor(this.$el.offsetWidth / 2);

                return {
                    width,
                    fill: this.fill,
                    changed: changed || prev !== width,
                    hide: !this.matchMedia
                };
            },

            write(data) {

                toggleClass(this.wrapper, this.clsHide, data.hide);

                if (data.changed) {
                    data.changed = false;
                    attr(this.wrapper, this.attrFill, new Array(data.width).join(data.fill));
                }

            },

            events: ['resize']

        }

    };

    const Container = {

        props: {
            container: Boolean
        },

        data: {
            container: true
        },

        computed: {

            container(ref) {
                const {container} = ref;

                return container === true && this.$container || container && $(container);
            }

        }

    };

    const active$1 = [];

    const Modal = {

        mixins: [Class, Container, Togglable],

        props: {
            selPanel: String,
            selClose: String,
            escClose: Boolean,
            bgClose: Boolean,
            stack: Boolean
        },

        data: {
            cls: 'uk-open',
            escClose: true,
            bgClose: true,
            overlay: true,
            stack: false
        },

        computed: {

            panel(ref, $el) {
                const {selPanel} = ref;

                return $(selPanel, $el);
            },

            transitionElement() {
                return this.panel;
            },

            bgClose(ref) {
                const {bgClose} = ref;

                return bgClose && this.panel;
            }

        },

        beforeDisconnect() {
            if (this.isToggled()) {
                this.toggleNow(this.$el, false);
            }
        },

        events: [

            {

                name: 'click',

                delegate() {
                    return this.selClose;
                },

                handler(e) {
                    e.preventDefault();
                    this.hide();
                }

            },

            {

                name: 'toggle',

                self: true,

                handler(e) {

                    if (e.defaultPrevented) {
                        return;
                    }

                    e.preventDefault();
                    this.toggle();
                }

            },

            {
                name: 'beforeshow',

                self: true,

                handler(e) {

                    if (includes(active$1, this)) {
                        return false;
                    }

                    if (!this.stack && active$1.length) {
                        Promise.all(active$1.map(function (modal) { return modal.hide(); })).then(this.show);
                        e.preventDefault();
                    } else {
                        active$1.push(this);
                    }
                }

            },

            {

                name: 'show',

                self: true,

                handler() {
                    const this$1 = this;


                    if (width(window) - width(document) && this.overlay) {
                        css(document.body, 'overflowY', 'scroll');
                    }

                    addClass(document.documentElement, this.clsPage);

                    if (this.bgClose) {
                        once(this.$el, 'hide', delayOn(document, 'click', function (ref) {
                            const {defaultPrevented} = ref;
                            const {target} = ref;

                            const current = last(active$1);
                            if (!defaultPrevented
                                && current === this$1
                                && (!current.overlay || within(target, current.$el))
                                && !within(target, current.panel)
                            ) {
                                current.hide();
                            }
                        }), {self: true});
                    }

                    if (this.escClose) {
                        once(this.$el, 'hide', on(document, 'keydown', function (e) {
                            const current = last(active$1);
                            if (e.keyCode === 27 && current === this$1) {
                                e.preventDefault();
                                current.hide();
                            }
                        }), {self: true});
                    }
                }

            },

            {

                name: 'hidden',

                self: true,

                handler() {
                    const this$1 = this;


                    active$1.splice(active$1.indexOf(this), 1);

                    if (!active$1.length) {
                        css(document.body, 'overflowY', '');
                    }

                    if (!active$1.some(function (modal) { return modal.clsPage === this$1.clsPage; })) {
                        removeClass(document.documentElement, this.clsPage);
                    }

                }

            }

        ],

        methods: {

            toggle() {
                return this.isToggled() ? this.hide() : this.show();
            },

            show() {
                const this$1 = this;


                if (this.container && this.$el.parentNode !== this.container) {
                    append(this.container, this.$el);
                    return new Promise(function (resolve) { return requestAnimationFrame(function () { return this$1.show().then(resolve); }
                    ); }
                    );
                }

                return this.toggleElement(this.$el, true, animate$1(this));
            },

            hide() {
                return this.toggleElement(this.$el, false, animate$1(this));
            }

        }

    };

    function animate$1(ref) {
        const {transitionElement} = ref;
        const {_toggle} = ref;

        return function (el, show) { return new Promise(function (resolve, reject) { return once(el, 'show hide', function () {
            el._reject && el._reject();
            el._reject = reject;

            _toggle(el, show);

            const off = once(transitionElement, 'transitionstart', function () {
                once(transitionElement, 'transitionend transitioncancel', resolve, {self: true});
                clearTimeout(timer);
            }, {self: true});

            var timer = setTimeout(function () {
                off();
                resolve();
            }, toMs(css(transitionElement, 'transitionDuration')));

        }); }
        ); };
    }

    const Modal$1 = {

        install: install$1,

        mixins: [Modal],

        data: {
            clsPage: 'uk-modal-page',
            selPanel: '.uk-modal-dialog',
            selClose: '.uk-modal-close, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full'
        },

        events: [

            {
                name: 'show',

                self: true,

                handler() {

                    if (hasClass(this.panel, 'uk-margin-auto-vertical')) {
                        addClass(this.$el, 'uk-flex');
                    } else {
                        css(this.$el, 'display', 'block');
                    }

                    height(this.$el); // force reflow
                }
            },

            {
                name: 'hidden',

                self: true,

                handler() {

                    css(this.$el, 'display', '');
                    removeClass(this.$el, 'uk-flex');

                }
            }

        ]

    };

    function install$1(UIkit) {

        UIkit.modal.dialog = function (content, options) {

            const dialog = UIkit.modal((` <div class="uk-modal"> <div class="uk-modal-dialog">${  content  }</div> </div> `), options);

            dialog.show();

            on(dialog.$el, 'hidden', function () { return Promise.resolve(function () { return dialog.$destroy(true); }); }, {self: true});

            return dialog;
        };

        UIkit.modal.alert = function (message, options) {

            options = {bgClose: false, escClose: false, labels: UIkit.modal.labels, ...options};

            return new Promise(
                function (resolve) { return on(UIkit.modal.dialog((` <div class="uk-modal-body">${  isString(message) ? message : html(message)  }</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-primary uk-modal-close" autofocus>${  options.labels.ok  }</button> </div> `), options).$el, 'hide', resolve); }
            );
        };

        UIkit.modal.confirm = function (message, options) {

            options = {bgClose: false, escClose: true, labels: UIkit.modal.labels, ...options};

            return new Promise(function (resolve, reject) {

                const confirm = UIkit.modal.dialog((` <form> <div class="uk-modal-body">${  isString(message) ? message : html(message)  }</div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">${  options.labels.cancel  }</button> <button class="uk-button uk-button-primary" autofocus>${  options.labels.ok  }</button> </div> </form> `), options);

                let resolved = false;

                on(confirm.$el, 'submit', 'form', function (e) {
                    e.preventDefault();
                    resolve();
                    resolved = true;
                    confirm.hide();
                });
                on(confirm.$el, 'hide', function () {
                    if (!resolved) {
                        reject();
                    }
                });

            });
        };

        UIkit.modal.prompt = function (message, value, options) {

            options = {bgClose: false, escClose: true, labels: UIkit.modal.labels, ...options};

            return new Promise(function (resolve) {

                const prompt = UIkit.modal.dialog((` <form class="uk-form-stacked"> <div class="uk-modal-body"> <label>${  isString(message) ? message : html(message)  }</label> <input class="uk-input" autofocus> </div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">${  options.labels.cancel  }</button> <button class="uk-button uk-button-primary">${  options.labels.ok  }</button> </div> </form> `), options);
                const input = $('input', prompt.$el);

                input.value = value;

                let resolved = false;

                on(prompt.$el, 'submit', 'form', function (e) {
                    e.preventDefault();
                    resolve(input.value);
                    resolved = true;
                    prompt.hide();
                });
                on(prompt.$el, 'hide', function () {
                    if (!resolved) {
                        resolve(null);
                    }
                });

            });
        };

        UIkit.modal.labels = {
            ok: 'Ok',
            cancel: 'Cancel'
        };

    }

    const Nav = {

        extends: Accordion,

        data: {
            targets: '> .uk-parent',
            toggle: '> a',
            content: '> ul'
        }

    };

    const Navbar = {

        mixins: [Class, FlexBug],

        props: {
            dropdown: String,
            mode: 'list',
            align: String,
            offset: Number,
            boundary: Boolean,
            boundaryAlign: Boolean,
            clsDrop: String,
            delayShow: Number,
            delayHide: Number,
            dropbar: Boolean,
            dropbarMode: String,
            dropbarAnchor: Boolean,
            duration: Number
        },

        data: {
            dropdown: '.uk-navbar-nav > li',
            align: !isRtl ? 'left' : 'right',
            clsDrop: 'uk-navbar-dropdown',
            mode: undefined,
            offset: undefined,
            delayShow: undefined,
            delayHide: undefined,
            boundaryAlign: undefined,
            flip: 'x',
            boundary: true,
            dropbar: false,
            dropbarMode: 'slide',
            dropbarAnchor: false,
            duration: 200,
            forceHeight: true,
            selMinHeight: '.uk-navbar-nav > li > a, .uk-navbar-item, .uk-navbar-toggle'
        },

        computed: {

            boundary(ref, $el) {
                const {boundary} = ref;
                const {boundaryAlign} = ref;

                return (boundary === true || boundaryAlign) ? $el : boundary;
            },

            dropbarAnchor(ref, $el) {
                const {dropbarAnchor} = ref;

                return query(dropbarAnchor, $el);
            },

            pos(ref) {
                const {align} = ref;

                return (`bottom-${  align}`);
            },

            dropdowns(ref, $el) {
                const {dropdown} = ref;
                const {clsDrop} = ref;

                return $$((`${dropdown  } .${  clsDrop}`), $el);
            }

        },

        beforeConnect() {

            const ref = this.$props;
            const {dropbar} = ref;

            this.dropbar = dropbar && (query(dropbar, this.$el) || $('+ .uk-navbar-dropbar', this.$el) || $('<div></div>'));

            if (this.dropbar) {

                addClass(this.dropbar, 'uk-navbar-dropbar');

                if (this.dropbarMode === 'slide') {
                    addClass(this.dropbar, 'uk-navbar-dropbar-slide');
                }
            }

        },

        disconnected() {
            this.dropbar && remove(this.dropbar);
        },

        update() {
            const this$1 = this;


            this.$create(
                'drop',
                this.dropdowns.filter(function (el) { return !this$1.getDropdown(el); }),
                { ...this.$props, boundary: this.boundary, pos: this.pos, offset: this.dropbar || this.offset}
            );

        },

        events: [

            {
                name: 'mouseover',

                delegate() {
                    return this.dropdown;
                },

                handler(ref) {
                    const {current} = ref;

                    const active = this.getActive();
                    if (active && active.toggle && !within(active.toggle.$el, current) && !active.tracker.movesTo(active.$el)) {
                        active.hide(false);
                    }
                }

            },

            {
                name: 'mouseleave',

                el() {
                    return this.dropbar;
                },

                handler() {
                    const active = this.getActive();

                    if (active && !this.dropdowns.some(function (el) { return matches(el, ':hover'); })) {
                        active.hide();
                    }
                }
            },

            {
                name: 'beforeshow',

                capture: true,

                filter() {
                    return this.dropbar;
                },

                handler() {

                    if (!this.dropbar.parentNode) {
                        after(this.dropbarAnchor || this.$el, this.dropbar);
                    }

                }
            },

            {
                name: 'show',

                capture: true,

                filter() {
                    return this.dropbar;
                },

                handler(_, drop) {

                    const {$el} = drop;
                    const {dir} = drop;

                    this.clsDrop && addClass($el, (`${this.clsDrop  }-dropbar`));

                    if (dir === 'bottom') {
                        this.transitionTo($el.offsetHeight + toFloat(css($el, 'marginTop')) + toFloat(css($el, 'marginBottom')), $el);
                    }
                }
            },

            {
                name: 'beforehide',

                filter() {
                    return this.dropbar;
                },

                handler(e, ref) {
                    const {$el} = ref;


                    const active = this.getActive();

                    if (matches(this.dropbar, ':hover') && active && active.$el === $el) {
                        e.preventDefault();
                    }
                }
            },

            {
                name: 'hide',

                filter() {
                    return this.dropbar;
                },

                handler(_, ref) {
                    const {$el} = ref;


                    const active = this.getActive();

                    if (!active || active && active.$el === $el) {
                        this.transitionTo(0);
                    }
                }
            }

        ],

        methods: {

            getActive() {
                const ref = this.dropdowns.map(this.getDropdown).filter(function (drop) { return drop && drop.isActive(); });
                const active = ref[0];
                return active && includes(active.mode, 'hover') && within(active.toggle.$el, this.$el) && active;
            },

            transitionTo(newHeight, el) {
                const this$1 = this;


                const ref = this;
                const {dropbar} = ref;
                const oldHeight = isVisible(dropbar) ? height(dropbar) : 0;

                el = oldHeight < newHeight && el;

                css(el, 'clip', (`rect(0,${  el.offsetWidth  }px,${  oldHeight  }px,0)`));

                height(dropbar, oldHeight);

                Transition.cancel([el, dropbar]);
                return Promise.all([
                    Transition.start(dropbar, {height: newHeight}, this.duration),
                    Transition.start(el, {clip: (`rect(0,${  el.offsetWidth  }px,${  newHeight  }px,0)`)}, this.duration)
                ])
                    .catch(noop)
                    .then(function () {
                        css(el, {clip: ''});
                        this$1.$update(dropbar);
                    });
            },

            getDropdown(el) {
                return this.$getComponent(el, 'drop') || this.$getComponent(el, 'dropdown');
            }

        }

    };

    const Offcanvas = {

        mixins: [Modal],

        args: 'mode',

        props: {
            mode: String,
            flip: Boolean,
            overlay: Boolean
        },

        data: {
            mode: 'slide',
            flip: false,
            overlay: false,
            clsPage: 'uk-offcanvas-page',
            clsContainer: 'uk-offcanvas-container',
            selPanel: '.uk-offcanvas-bar',
            clsFlip: 'uk-offcanvas-flip',
            clsContainerAnimation: 'uk-offcanvas-container-animation',
            clsSidebarAnimation: 'uk-offcanvas-bar-animation',
            clsMode: 'uk-offcanvas',
            clsOverlay: 'uk-offcanvas-overlay',
            selClose: '.uk-offcanvas-close',
            container: false
        },

        computed: {

            clsFlip(ref) {
                const {flip} = ref;
                const {clsFlip} = ref;

                return flip ? clsFlip : '';
            },

            clsOverlay(ref) {
                const {overlay} = ref;
                const {clsOverlay} = ref;

                return overlay ? clsOverlay : '';
            },

            clsMode(ref) {
                const {mode} = ref;
                const {clsMode} = ref;

                return (`${clsMode  }-${  mode}`);
            },

            clsSidebarAnimation(ref) {
                const {mode} = ref;
                const {clsSidebarAnimation} = ref;

                return mode === 'none' || mode === 'reveal' ? '' : clsSidebarAnimation;
            },

            clsContainerAnimation(ref) {
                const {mode} = ref;
                const {clsContainerAnimation} = ref;

                return mode !== 'push' && mode !== 'reveal' ? '' : clsContainerAnimation;
            },

            transitionElement(ref) {
                const {mode} = ref;

                return mode === 'reveal' ? this.panel.parentNode : this.panel;
            }

        },

        events: [

            {

                name: 'click',

                delegate() {
                    return 'a[href^="#"]';
                },

                handler(ref) {
                    const {hash} = ref.current;
                    const {defaultPrevented} = ref;

                    if (!defaultPrevented && hash && $(hash, document.body)) {
                        this.hide();
                    }
                }

            },

            {
                name: 'touchstart',

                passive: true,

                el() {
                    return this.panel;
                },

                handler(ref) {
                    const {targetTouches} = ref;


                    if (targetTouches.length === 1) {
                        this.clientY = targetTouches[0].clientY;
                    }

                }

            },

            {
                name: 'touchmove',

                self: true,
                passive: false,

                filter() {
                    return this.overlay;
                },

                handler(e) {
                    e.cancelable && e.preventDefault();
                }

            },

            {
                name: 'touchmove',

                passive: false,

                el() {
                    return this.panel;
                },

                handler(e) {

                    if (e.targetTouches.length !== 1) {
                        return;
                    }

                    const clientY = event.targetTouches[0].clientY - this.clientY;
                    const ref = this.panel;
                    const {scrollTop} = ref;
                    const {scrollHeight} = ref;
                    const {clientHeight} = ref;

                    if (clientHeight >= scrollHeight
                        || scrollTop === 0 && clientY > 0
                        || scrollHeight - scrollTop <= clientHeight && clientY < 0
                    ) {
                        e.cancelable && e.preventDefault();
                    }

                }

            },

            {
                name: 'show',

                self: true,

                handler() {

                    if (this.mode === 'reveal' && !hasClass(this.panel.parentNode, this.clsMode)) {
                        wrapAll(this.panel, '<div>');
                        addClass(this.panel.parentNode, this.clsMode);
                    }

                    css(document.documentElement, 'overflowY', this.overlay ? 'hidden' : '');
                    addClass(document.body, this.clsContainer, this.clsFlip);
                    css(document.body, 'touch-action', 'pan-y pinch-zoom');
                    css(this.$el, 'display', 'block');
                    addClass(this.$el, this.clsOverlay);
                    addClass(this.panel, this.clsSidebarAnimation, this.mode !== 'reveal' ? this.clsMode : '');

                    height(document.body); // force reflow
                    addClass(document.body, this.clsContainerAnimation);

                    this.clsContainerAnimation && suppressUserScale();


                }
            },

            {
                name: 'hide',

                self: true,

                handler() {
                    removeClass(document.body, this.clsContainerAnimation);
                    css(document.body, 'touch-action', '');
                }
            },

            {
                name: 'hidden',

                self: true,

                handler() {

                    this.clsContainerAnimation && resumeUserScale();

                    if (this.mode === 'reveal') {
                        unwrap(this.panel);
                    }

                    removeClass(this.panel, this.clsSidebarAnimation, this.clsMode);
                    removeClass(this.$el, this.clsOverlay);
                    css(this.$el, 'display', '');
                    removeClass(document.body, this.clsContainer, this.clsFlip);

                    css(document.documentElement, 'overflowY', '');

                }
            },

            {
                name: 'swipeLeft swipeRight',

                handler(e) {

                    if (this.isToggled() && endsWith(e.type, 'Left') ^ this.flip) {
                        this.hide();
                    }

                }
            }

        ]

    };

    // Chrome in responsive mode zooms page upon opening offcanvas
    function suppressUserScale() {
        getViewport().content += ',user-scalable=0';
    }

    function resumeUserScale() {
        const viewport = getViewport();
        viewport.content = viewport.content.replace(/,user-scalable=0$/, '');
    }

    function getViewport() {
        return $('meta[name="viewport"]', document.head) || append(document.head, '<meta name="viewport">');
    }

    const OverflowAuto = {

        mixins: [Class],

        props: {
            selContainer: String,
            selContent: String
        },

        data: {
            selContainer: '.uk-modal',
            selContent: '.uk-modal-dialog'
        },

        computed: {

            container(ref, $el) {
                const {selContainer} = ref;

                return closest($el, selContainer);
            },

            content(ref, $el) {
                const {selContent} = ref;

                return closest($el, selContent);
            }

        },

        connected() {
            css(this.$el, 'minHeight', 150);
        },

        update: {

            read() {

                if (!this.content || !this.container) {
                    return false;
                }

                return {
                    current: toFloat(css(this.$el, 'maxHeight')),
                    max: Math.max(150, height(this.container) - (offset(this.content).height - height(this.$el)))
                };
            },

            write(ref) {
                const {current} = ref;
                const {max} = ref;

                css(this.$el, 'maxHeight', max);
                if (Math.round(current) !== Math.round(max)) {
                    trigger(this.$el, 'resize');
                }
            },

            events: ['resize']

        }

    };

    const Responsive = {

        props: ['width', 'height'],

        connected() {
            addClass(this.$el, 'uk-responsive-width');
        },

        update: {

            read() {
                return isVisible(this.$el) && this.width && this.height
                    ? {width: width(this.$el.parentNode), height: this.height}
                    : false;
            },

            write(dim) {
                height(this.$el, Dimensions.contain({
                    height: this.height,
                    width: this.width
                }, dim).height);
            },

            events: ['resize']

        }

    };

    const Scroll = {

        props: {
            duration: Number,
            offset: Number
        },

        data: {
            duration: 1000,
            offset: 0
        },

        methods: {

            scrollTo(el) {
                const this$1 = this;


                el = el && $(el) || document.body;

                const docHeight = height(document);
                const winHeight = height(window);

                let target = offset(el).top - this.offset;
                if (target + winHeight > docHeight) {
                    target = docHeight - winHeight;
                }

                if (!trigger(this.$el, 'beforescroll', [this, el])) {
                    return;
                }

                const start = Date.now();
                const startY = window.pageYOffset;
                var step = function () {

                    const currentY = startY + (target - startY) * ease(clamp((Date.now() - start) / this$1.duration));

                    scrollTop(window, currentY);

                    // scroll more if we have not reached our destination
                    if (currentY !== target) {
                        requestAnimationFrame(step);
                    } else {
                        trigger(this$1.$el, 'scrolled', [this$1, el]);
                    }

                };

                step();

            }

        },

        events: {

            click(e) {

                if (e.defaultPrevented) {
                    return;
                }

                e.preventDefault();
                this.scrollTo(escape(decodeURIComponent(this.$el.hash)).substr(1));
            }

        }

    };

    function ease(k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    const Scrollspy = {

        args: 'cls',

        props: {
            cls: String,
            target: String,
            hidden: Boolean,
            offsetTop: Number,
            offsetLeft: Number,
            repeat: Boolean,
            delay: Number
        },

        data () { return ({
            cls: false,
            target: false,
            hidden: true,
            offsetTop: 0,
            offsetLeft: 0,
            repeat: false,
            delay: 0,
            inViewClass: 'uk-scrollspy-inview'
        }); },

        computed: {

            elements(ref, $el) {
                const {target} = ref;

                return target ? $$(target, $el) : [$el];
            }

        },

        update: [

            {

                write() {
                    if (this.hidden) {
                        css(filter(this.elements, (`:not(.${  this.inViewClass  })`)), 'visibility', 'hidden');
                    }
                }

            },

            {

                read(ref) {
                    const this$1 = this;
                    const {update} = ref;


                    if (!update) {
                        return;
                    }

                    this.elements.forEach(function (el) {

                        let state = el._ukScrollspyState;

                        if (!state) {
                            state = {cls: data(el, 'uk-scrollspy-class') || this$1.cls};
                        }

                        state.show = isInView(el, this$1.offsetTop, this$1.offsetLeft);
                        el._ukScrollspyState = state;

                    });

                },

                write(data) {
                    const this$1 = this;


                    // Let child components be applied at least once first
                    if (!data.update) {
                        this.$emit();
                        return data.update = true;
                    }

                    this.elements.forEach(function (el) {

                        const state = el._ukScrollspyState;
                        const toggle = function (inview) {

                            css(el, 'visibility', !inview && this$1.hidden ? 'hidden' : '');

                            toggleClass(el, this$1.inViewClass, inview);
                            toggleClass(el, state.cls);

                            trigger(el, inview ? 'inview' : 'outview');

                            state.inview = inview;

                            this$1.$update(el);

                        };

                        if (state.show && !state.inview && !state.queued) {

                            state.queued = true;

                            data.promise = (data.promise || Promise.resolve()).then(function () { return new Promise(function (resolve) { return setTimeout(resolve, this$1.delay); }
                            ); }
                            ).then(function () {
                                toggle(true);
                                setTimeout(function () { return state.queued = false; }, 300);
                            });

                        } else if (!state.show && state.inview && !state.queued && this$1.repeat) {

                            toggle(false);

                        }

                    });

                },

                events: ['scroll', 'resize']

            }

        ]

    };

    const ScrollspyNav = {

        props: {
            cls: String,
            closest: String,
            scroll: Boolean,
            overflow: Boolean,
            offset: Number
        },

        data: {
            cls: 'uk-active',
            closest: false,
            scroll: false,
            overflow: true,
            offset: 0
        },

        computed: {

            links(_, $el) {
                return $$('a[href^="#"]', $el).filter(function (el) { return el.hash; });
            },

            elements(ref) {
                const selector = ref.closest;

                return closest(this.links, selector || '*');
            },

            targets() {
                return $$(this.links.map(function (el) { return escape(el.hash).substr(1); }).join(','));
            }

        },

        update: [

            {

                read() {
                    if (this.scroll) {
                        this.$create('scroll', this.links, {offset: this.offset || 0});
                    }
                }

            },

            {

                read(data) {
                    const this$1 = this;


                    const scroll = window.pageYOffset + this.offset + 1;
                    const max = height(document) - height(window) + this.offset;

                    data.active = false;

                    this.targets.every(function (el, i) {

                        const ref = offset(el);
                        const {top} = ref;
                        const last = i + 1 === this$1.targets.length;

                        if (!this$1.overflow && (i === 0 && top > scroll || last && top + el.offsetTop < scroll)) {
                            return false;
                        }

                        if (!last && offset(this$1.targets[i + 1]).top <= scroll) {
                            return true;
                        }

                        if (scroll >= max) {
                            for (let j = this$1.targets.length - 1; j > i; j--) {
                                if (isInView(this$1.targets[j])) {
                                    el = this$1.targets[j];
                                    break;
                                }
                            }
                        }

                        return !(data.active = $(filter(this$1.links, (`[href="#${  el.id  }"]`))));

                    });

                },

                write(ref) {
                    const {active} = ref;


                    this.links.forEach(function (el) { return el.blur(); });
                    removeClass(this.elements, this.cls);

                    if (active) {
                        trigger(this.$el, 'active', [active, addClass(this.closest ? closest(active, this.closest) : active, this.cls)]);
                    }

                },

                events: ['scroll', 'resize']

            }

        ]

    };

    const Sticky = {

        mixins: [Class, Media],

        props: {
            top: null,
            bottom: Boolean,
            offset: String,
            animation: String,
            clsActive: String,
            clsInactive: String,
            clsFixed: String,
            clsBelow: String,
            selTarget: String,
            widthElement: Boolean,
            showOnUp: Boolean,
            targetOffset: Number
        },

        data: {
            top: 0,
            bottom: false,
            offset: 0,
            animation: '',
            clsActive: 'uk-active',
            clsInactive: '',
            clsFixed: 'uk-sticky-fixed',
            clsBelow: 'uk-sticky-below',
            selTarget: '',
            widthElement: false,
            showOnUp: false,
            targetOffset: false
        },

        computed: {

            offset(ref) {
                const {offset} = ref;

                return toPx(offset);
            },

            selTarget(ref, $el) {
                const {selTarget} = ref;

                return selTarget && $(selTarget, $el) || $el;
            },

            widthElement(ref, $el) {
                const {widthElement} = ref;

                return query(widthElement, $el) || this.placeholder;
            },

            isActive: {

                get() {
                    return hasClass(this.selTarget, this.clsActive);
                },

                set(value) {
                    if (value && !this.isActive) {
                        replaceClass(this.selTarget, this.clsInactive, this.clsActive);
                        trigger(this.$el, 'active');
                    } else if (!value && !hasClass(this.selTarget, this.clsInactive)) {
                        replaceClass(this.selTarget, this.clsActive, this.clsInactive);
                        trigger(this.$el, 'inactive');
                    }
                }

            }

        },

        connected() {
            this.placeholder = $('+ .uk-sticky-placeholder', this.$el) || $('<div class="uk-sticky-placeholder"></div>');
            this.isFixed = false;
            this.isActive = false;
        },

        disconnected() {

            if (this.isFixed) {
                this.hide();
                removeClass(this.selTarget, this.clsInactive);
            }

            remove(this.placeholder);
            this.placeholder = null;
            this.widthElement = null;
        },

        events: [

            {

                name: 'load hashchange popstate',

                el: window,

                handler() {
                    const this$1 = this;


                    if (!(this.targetOffset !== false && location.hash && window.pageYOffset > 0)) {
                        return;
                    }

                    const target = $(location.hash);

                    if (target) {
                        fastdom.read(function () {

                            const ref = offset(target);
                            const {top} = ref;
                            const elTop = offset(this$1.$el).top;
                            const elHeight = this$1.$el.offsetHeight;

                            if (this$1.isFixed && elTop + elHeight >= top && elTop <= top + target.offsetHeight) {
                                scrollTop(window, top - elHeight - (isNumeric(this$1.targetOffset) ? this$1.targetOffset : 0) - this$1.offset);
                            }

                        });
                    }

                }

            }

        ],

        update: [

            {

                read(ref, type) {
                    let {height} = ref;


                    if (this.isActive && type !== 'update') {

                        this.hide();
                        height = this.$el.offsetHeight;
                        this.show();

                    }

                    height = !this.isActive ? this.$el.offsetHeight : height;

                    this.topOffset = offset(this.isFixed ? this.placeholder : this.$el).top;
                    this.bottomOffset = this.topOffset + height;

                    const bottom = parseProp('bottom', this);

                    this.top = Math.max(toFloat(parseProp('top', this)), this.topOffset) - this.offset;
                    this.bottom = bottom && bottom - height;
                    this.inactive = !this.matchMedia;

                    return {
                        lastScroll: false,
                        height,
                        margins: css(this.$el, ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'])
                    };
                },

                write(ref) {
                    const {height} = ref;
                    const {margins} = ref;


                    const ref$1 = this;
                    const {placeholder} = ref$1;

                    css(placeholder, {height, ...margins});

                    if (!within(placeholder, document)) {
                        after(this.$el, placeholder);
                        attr(placeholder, 'hidden', '');
                    }

                    // ensure active/inactive classes are applied
                    this.isActive = this.isActive;

                },

                events: ['resize']

            },

            {

                read(ref) {
                    let {scroll} = ref; if ( scroll === void 0 ) scroll = 0;


                    this.width = (isVisible(this.widthElement) ? this.widthElement : this.$el).offsetWidth;

                    this.scroll = window.pageYOffset;

                    return {
                        dir: scroll <= this.scroll ? 'down' : 'up',
                        scroll: this.scroll,
                        visible: isVisible(this.$el),
                        top: offsetPosition(this.placeholder)[0]
                    };
                },

                write(data, type) {
                    const this$1 = this;


                    let {initTimestamp} = data; if ( initTimestamp === void 0 ) initTimestamp = 0;
                    const {dir} = data;
                    const {lastDir} = data;
                    const {lastScroll} = data;
                    const {scroll} = data;
                    const {top} = data;
                    const {visible} = data;
                    const now = performance.now();

                    data.lastScroll = scroll;

                    if (scroll < 0 || scroll === lastScroll || !visible || this.disabled || this.showOnUp && type !== 'scroll') {
                        return;
                    }

                    if (now - initTimestamp > 300 || dir !== lastDir) {
                        data.initScroll = scroll;
                        data.initTimestamp = now;
                    }

                    data.lastDir = dir;

                    if (this.showOnUp && Math.abs(data.initScroll - scroll) <= 30 && Math.abs(lastScroll - scroll) <= 10) {
                        return;
                    }

                    if (this.inactive
                        || scroll < this.top
                        || this.showOnUp && (scroll <= this.top || dir === 'down' || dir === 'up' && !this.isFixed && scroll <= this.bottomOffset)
                    ) {

                        if (!this.isFixed) {

                            if (Animation.inProgress(this.$el) && top > scroll) {
                                Animation.cancel(this.$el);
                                this.hide();
                            }

                            return;
                        }

                        this.isFixed = false;

                        if (this.animation && scroll > this.topOffset) {
                            Animation.cancel(this.$el);
                            Animation.out(this.$el, this.animation).then(function () { return this$1.hide(); }, noop);
                        } else {
                            this.hide();
                        }

                    } else if (this.isFixed) {

                        this.update();

                    } else if (this.animation) {

                        Animation.cancel(this.$el);
                        this.show();
                        Animation.in(this.$el, this.animation).catch(noop);

                    } else {
                        this.show();
                    }

                },

                events: ['resize', 'scroll']

            }

        ],

        methods: {

            show() {

                this.isFixed = true;
                this.update();
                attr(this.placeholder, 'hidden', null);

            },

            hide() {

                this.isActive = false;
                removeClass(this.$el, this.clsFixed, this.clsBelow);
                css(this.$el, {position: '', top: '', width: ''});
                attr(this.placeholder, 'hidden', '');

            },

            update() {

                const active = this.top !== 0 || this.scroll > this.top;
                let top = Math.max(0, this.offset);

                if (this.bottom && this.scroll > this.bottom - this.offset) {
                    top = this.bottom - this.scroll;
                }

                css(this.$el, {
                    position: 'fixed',
                    top: (`${top  }px`),
                    width: this.width
                });

                this.isActive = active;
                toggleClass(this.$el, this.clsBelow, this.scroll > this.bottomOffset);
                addClass(this.$el, this.clsFixed);

            }

        }

    };

    function parseProp(prop, ref) {
        const {$props} = ref;
        const {$el} = ref;
        const propOffset = ref[(`${prop  }Offset`)];


        const value = $props[prop];

        if (!value) {
            return;
        }

        if (isNumeric(value) && isString(value) && value.match(/^-?\d/)) {

            return propOffset + toPx(value);

        } 

        return offset(value === true ? $el.parentNode : query(value, $el)).bottom;

        
    }

    const Switcher = {

        mixins: [Togglable],

        args: 'connect',

        props: {
            connect: String,
            toggle: String,
            active: Number,
            swiping: Boolean
        },

        data: {
            connect: '~.uk-switcher',
            toggle: '> * > :first-child',
            active: 0,
            swiping: true,
            cls: 'uk-active',
            clsContainer: 'uk-switcher',
            attrItem: 'uk-switcher-item',
            queued: true
        },

        computed: {

            connects(ref, $el) {
                const {connect} = ref;

                return queryAll(connect, $el);
            },

            toggles(ref, $el) {
                const {toggle} = ref;

                return $$(toggle, $el);
            }

        },

        events: [

            {

                name: 'click',

                delegate() {
                    return (`${this.toggle  }:not(.uk-disabled)`);
                },

                handler(e) {
                    e.preventDefault();
                    this.show(toNodes(this.$el.children).filter(function (el) { return within(e.current, el); })[0]);
                }

            },

            {
                name: 'click',

                el() {
                    return this.connects;
                },

                delegate() {
                    return (`[${  this.attrItem  }],[data-${  this.attrItem  }]`);
                },

                handler(e) {
                    e.preventDefault();
                    this.show(data(e.current, this.attrItem));
                }
            },

            {
                name: 'swipeRight swipeLeft',

                filter() {
                    return this.swiping;
                },

                el() {
                    return this.connects;
                },

                handler(ref) {
                    const {type} = ref;

                    this.show(endsWith(type, 'Left') ? 'next' : 'previous');
                }
            }

        ],

        update() {
            const this$1 = this;


            this.connects.forEach(function (list) { return this$1.updateAria(list.children); });
            const ref = this.$el;
            const {children} = ref;
            this.show(filter(children, (`.${  this.cls}`))[0] || children[this.active] || children[0]);

            this.swiping && css(this.connects, 'touch-action', 'pan-y pinch-zoom');

        },

        methods: {

            index() {
                return !isEmpty(this.connects) && index(filter(this.connects[0].children, (`.${  this.cls}`))[0]);
            },

            show(item) {
                const this$1 = this;


                const ref = this.$el;
                const {children} = ref;
                const {length} = children;
                const prev = this.index();
                const hasPrev = prev >= 0;
                const dir = item === 'previous' ? -1 : 1;

                let toggle; let active; let next = getIndex(item, children, prev);

                for (let i = 0; i < length; i++, next = (next + dir + length) % length) {
                    if (!matches(this.toggles[next], '.uk-disabled *, .uk-disabled, [disabled]')) {
                        toggle = this.toggles[next];
                        active = children[next];
                        break;
                    }
                }

                if (!active || prev >= 0 && hasClass(active, this.cls) || prev === next) {
                    return;
                }

                removeClass(children, this.cls);
                addClass(active, this.cls);
                attr(this.toggles, 'aria-expanded', false);
                attr(toggle, 'aria-expanded', true);

                this.connects.forEach(function (list) {
                    if (!hasPrev) {
                        this$1.toggleNow(list.children[next]);
                    } else {
                        this$1.toggleElement([list.children[prev], list.children[next]]);
                    }
                });

            }

        }

    };

    const Tab = {

        mixins: [Class],

        extends: Switcher,

        props: {
            media: Boolean
        },

        data: {
            media: 960,
            attrItem: 'uk-tab-item'
        },

        connected() {

            const cls = hasClass(this.$el, 'uk-tab-left')
                ? 'uk-tab-left'
                : hasClass(this.$el, 'uk-tab-right')
                    ? 'uk-tab-right'
                    : false;

            if (cls) {
                this.$create('toggle', this.$el, {cls, mode: 'media', media: this.media});
            }
        }

    };

    const Toggle = {

        mixins: [Media, Togglable],

        args: 'target',

        props: {
            href: String,
            target: null,
            mode: 'list'
        },

        data: {
            href: false,
            target: false,
            mode: 'click',
            queued: true
        },

        computed: {

            target(ref, $el) {
                const {href} = ref;
                let {target} = ref;

                target = queryAll(target || href, $el);
                return target.length && target || [$el];
            }

        },

        connected() {
            trigger(this.target, 'updatearia', [this]);
        },

        events: [

            {

                name: (`${pointerEnter  } ${  pointerLeave}`),

                filter() {
                    return includes(this.mode, 'hover');
                },

                handler(e) {
                    if (!isTouch(e)) {
                        this.toggle((`toggle${  e.type === pointerEnter ? 'show' : 'hide'}`));
                    }
                }

            },

            {

                name: 'click',

                filter() {
                    return includes(this.mode, 'click') || hasTouch && includes(this.mode, 'hover');
                },

                handler(e) {

                    // TODO better isToggled handling
                    let link;
                    if (closest(e.target, 'a[href="#"], a[href=""]')
                        || (link = closest(e.target, 'a[href]')) && (
                            this.cls
                            || !isVisible(this.target)
                            || link.hash && matches(this.target, link.hash)
                        )
                    ) {
                        e.preventDefault();
                    }

                    this.toggle();
                }

            }

        ],

        update: {

            read() {
                return includes(this.mode, 'media') && this.media
                    ? {match: this.matchMedia}
                    : false;
            },

            write(ref) {
                const {match} = ref;


                const toggled = this.isToggled(this.target);
                if (match ? !toggled : toggled) {
                    this.toggle();
                }

            },

            events: ['resize']

        },

        methods: {

            toggle(type) {
                if (trigger(this.target, type || 'toggle', [this])) {
                    this.toggleElement(this.target);
                }
            }

        }

    };

    function core (UIkit) {

        // core components
        UIkit.component('accordion', Accordion);
        UIkit.component('alert', Alert);
        UIkit.component('cover', Cover);
        UIkit.component('drop', Drop);
        UIkit.component('dropdown', Dropdown);
        UIkit.component('formCustom', FormCustom);
        UIkit.component('gif', Gif);
        UIkit.component('grid', Grid);
        UIkit.component('heightMatch', HeightMatch);
        UIkit.component('heightViewport', HeightViewport);
        UIkit.component('icon', Icon);
        UIkit.component('img', Img);
        UIkit.component('leader', Leader);
        UIkit.component('margin', Margin);
        UIkit.component('modal', Modal$1);
        UIkit.component('nav', Nav);
        UIkit.component('navbar', Navbar);
        UIkit.component('offcanvas', Offcanvas);
        UIkit.component('overflowAuto', OverflowAuto);
        UIkit.component('responsive', Responsive);
        UIkit.component('scroll', Scroll);
        UIkit.component('scrollspy', Scrollspy);
        UIkit.component('scrollspyNav', ScrollspyNav);
        UIkit.component('sticky', Sticky);
        UIkit.component('svg', Svg);
        UIkit.component('switcher', Switcher);
        UIkit.component('tab', Tab);
        UIkit.component('toggle', Toggle);
        UIkit.component('video', Video);

        // Icon components
        UIkit.component('close', Close);
        UIkit.component('marker', IconComponent);
        UIkit.component('navbarToggleIcon', IconComponent);
        UIkit.component('overlayIcon', IconComponent);
        UIkit.component('paginationNext', IconComponent);
        UIkit.component('paginationPrevious', IconComponent);
        UIkit.component('searchIcon', Search);
        UIkit.component('slidenavNext', Slidenav);
        UIkit.component('slidenavPrevious', Slidenav);
        UIkit.component('spinner', Spinner);
        UIkit.component('totop', IconComponent);

        // core functionality
        UIkit.use(Core);

    }

    UIkit.version = '3.2.1';

    core(UIkit);

    const Countdown = {

        mixins: [Class],

        props: {
            date: String,
            clsWrapper: String
        },

        data: {
            date: '',
            clsWrapper: '.uk-countdown-%unit%'
        },

        computed: {

            date(ref) {
                const {date} = ref;

                return Date.parse(date);
            },

            days(ref, $el) {
                const {clsWrapper} = ref;

                return $(clsWrapper.replace('%unit%', 'days'), $el);
            },

            hours(ref, $el) {
                const {clsWrapper} = ref;

                return $(clsWrapper.replace('%unit%', 'hours'), $el);
            },

            minutes(ref, $el) {
                const {clsWrapper} = ref;

                return $(clsWrapper.replace('%unit%', 'minutes'), $el);
            },

            seconds(ref, $el) {
                const {clsWrapper} = ref;

                return $(clsWrapper.replace('%unit%', 'seconds'), $el);
            },

            units() {
                const this$1 = this;

                return ['days', 'hours', 'minutes', 'seconds'].filter(function (unit) { return this$1[unit]; });
            }

        },

        connected() {
            this.start();
        },

        disconnected() {
            const this$1 = this;

            this.stop();
            this.units.forEach(function (unit) { return empty(this$1[unit]); });
        },

        events: [

            {

                name: 'visibilitychange',

                el: document,

                handler() {
                    if (document.hidden) {
                        this.stop();
                    } else {
                        this.start();
                    }
                }

            }

        ],

        update: {

            write() {
                const this$1 = this;


                const timespan = getTimeSpan(this.date);

                if (timespan.total <= 0) {

                    this.stop();

                    timespan.days
                        = timespan.hours
                        = timespan.minutes
                        = timespan.seconds
                        = 0;
                }

                this.units.forEach(function (unit) {

                    let digits = String(Math.floor(timespan[unit]));

                    digits = digits.length < 2 ? (`0${  digits}`) : digits;

                    const el = this$1[unit];
                    if (el.textContent !== digits) {
                        digits = digits.split('');

                        if (digits.length !== el.children.length) {
                            html(el, digits.map(function () { return '<span></span>'; }).join(''));
                        }

                        digits.forEach(function (digit, i) { return el.children[i].textContent = digit; });
                    }

                });

            }

        },

        methods: {

            start() {
                const this$1 = this;


                this.stop();

                if (this.date && this.units.length) {
                    this.$emit();
                    this.timer = setInterval(function () { return this$1.$emit(); }, 1000);
                }

            },

            stop() {

                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }

            }

        }

    };

    function getTimeSpan(date) {

        const total = date - Date.now();

        return {
            total,
            seconds: total / 1000 % 60,
            minutes: total / 1000 / 60 % 60,
            hours: total / 1000 / 60 / 60 % 24,
            days: total / 1000 / 60 / 60 / 24
        };
    }

    const targetClass = 'uk-animation-target';

    const Animate = {

        props: {
            animation: Number
        },

        data: {
            animation: 150
        },

        computed: {

            target() {
                return this.$el;
            }

        },

        methods: {

            animate(action) {
                const this$1 = this;


                addStyle();

                let children = toNodes(this.target.children);
                let propsFrom = children.map(function (el) { return getProps(el, true); });

                const oldHeight = height(this.target);
                const oldScrollY = window.pageYOffset;

                action();

                Transition.cancel(this.target);
                children.forEach(Transition.cancel);

                reset(this.target);
                this.$update(this.target);
                fastdom.flush();

                const newHeight = height(this.target);

                children = children.concat(toNodes(this.target.children).filter(function (el) { return !includes(children, el); }));

                const propsTo = children.map(function (el, i) { return el.parentNode && i in propsFrom
                    ? propsFrom[i]
                        ? isVisible(el)
                            ? getPositionWithMargin(el)
                            : {opacity: 0}
                        : {opacity: isVisible(el) ? 1 : 0}
                    : false; }
                );

                propsFrom = propsTo.map(function (props, i) {
                    const from = children[i].parentNode === this$1.target
                        ? propsFrom[i] || getProps(children[i])
                        : false;

                    if (from) {
                        if (!props) {
                            delete from.opacity;
                        } else if (!('opacity' in props)) {
                            const {opacity} = from;

                            if (opacity % 1) {
                                props.opacity = 1;
                            } else {
                                delete from.opacity;
                            }
                        }
                    }

                    return from;
                });

                addClass(this.target, targetClass);
                children.forEach(function (el, i) { return propsFrom[i] && css(el, propsFrom[i]); });
                css(this.target, 'height', oldHeight);
                scrollTop(window, oldScrollY);

                return Promise.all(children.map(function (el, i) { return propsFrom[i] && propsTo[i]
                    ? Transition.start(el, propsTo[i], this$1.animation, 'ease')
                    : Promise.resolve(); }
                ).concat(Transition.start(this.target, {height: newHeight}, this.animation, 'ease'))).then(function () {
                    children.forEach(function (el, i) { return css(el, {display: propsTo[i].opacity === 0 ? 'none' : '', zIndex: ''}); });
                    reset(this$1.target);
                    this$1.$update(this$1.target);
                    fastdom.flush(); // needed for IE11
                }, noop);

            }
        }
    };

    function getProps(el, opacity) {

        const zIndex = css(el, 'zIndex');

        return isVisible(el)
            ? ({display: '',
                opacity: opacity ? css(el, 'opacity') : '0',
                pointerEvents: 'none',
                position: 'absolute',
                zIndex: zIndex === 'auto' ? index(el) : zIndex, ...getPositionWithMargin(el)})
            : false;
    }

    function reset(el) {
        css(el.children, {
            height: '',
            left: '',
            opacity: '',
            pointerEvents: '',
            position: '',
            top: '',
            width: ''
        });
        removeClass(el, targetClass);
        css(el, 'height', '');
    }

    function getPositionWithMargin(el) {
        const ref = el.getBoundingClientRect();
        const {height} = ref;
        const {width} = ref;
        const ref$1 = position(el);
        let {top} = ref$1;
        const {left} = ref$1;
        top += toFloat(css(el, 'marginTop'));

        return {top, left, height, width};
    }

    let style;

    function addStyle() {
        if (style) {
            return;
        }
        style = append(document.head, '<style>').sheet;
        style.insertRule(
            (`.${  targetClass  } > * {\n            margin-top: 0 !important;\n            transform: none !important;\n        }`), 0
        );
    }

    const Filter = {

        mixins: [Animate],

        args: 'target',

        props: {
            target: Boolean,
            selActive: Boolean
        },

        data: {
            target: null,
            selActive: false,
            attrItem: 'uk-filter-control',
            cls: 'uk-active',
            animation: 250
        },

        computed: {

            toggles: {

                get(ref, $el) {
                    const {attrItem} = ref;

                    return $$((`[${  this.attrItem  }],[data-${  this.attrItem  }]`), $el);
                },

                watch() {
                    this.updateState();
                }

            },

            target(ref, $el) {
                const {target} = ref;

                return $(target, $el);
            },

            children: {

                get() {
                    return toNodes(this.target && this.target.children);
                },

                watch(list, old) {
                    if (!isEqualList(list, old)) {
                        this.updateState();
                    }
                }
            }

        },

        events: [

            {

                name: 'click',

                delegate() {
                    return (`[${  this.attrItem  }],[data-${  this.attrItem  }]`);
                },

                handler(e) {

                    e.preventDefault();
                    this.apply(e.current);

                }

            }

        ],

        connected() {
            const this$1 = this;


            this.updateState();

            if (this.selActive !== false) {
                const actives = $$(this.selActive, this.$el);
                this.toggles.forEach(function (el) { return toggleClass(el, this$1.cls, includes(actives, el)); });
            }

        },

        methods: {

            apply(el) {
                this.setState(mergeState(el, this.attrItem, this.getState()));
            },

            getState() {
                const this$1 = this;

                return this.toggles
                    .filter(function (item) { return hasClass(item, this$1.cls); })
                    .reduce(function (state, el) { return mergeState(el, this$1.attrItem, state); }, {filter: {'': ''}, sort: []});
            },

            setState(state, animate) {
                const this$1 = this;
                if ( animate === void 0 ) animate = true;


                state = {filter: {'': ''}, sort: [], ...state};

                trigger(this.$el, 'beforeFilter', [this, state]);

                const ref = this;
                const {children} = ref;

                this.toggles.forEach(function (el) { return toggleClass(el, this$1.cls, !!matchFilter(el, this$1.attrItem, state)); });

                const apply = function () {

                    const selector = getSelector(state);

                    children.forEach(function (el) { return css(el, 'display', selector && !matches(el, selector) ? 'none' : ''); });

                    const ref = state.sort;
                    const sort = ref[0];
                    const order = ref[1];

                    if (sort) {
                        const sorted = sortItems(children, sort, order);
                        if (!isEqual(sorted, children)) {
                            sorted.forEach(function (el) { return append(this$1.target, el); });
                        }
                    }

                };

                if (animate) {
                    this.animate(apply).then(function () { return trigger(this$1.$el, 'afterFilter', [this$1]); });
                } else {
                    apply();
                    trigger(this.$el, 'afterFilter', [this]);
                }

            },

            updateState() {
                const this$1 = this;

                fastdom.write(function () { return this$1.setState(this$1.getState(), false); });
            }

        }

    };

    function getFilter(el, attr) {
        return parseOptions(data(el, attr), ['filter']);
    }

    function mergeState(el, attr, state) {

        const filterBy = getFilter(el, attr);
        const {filter} = filterBy;
        const {group} = filterBy;
        const {sort} = filterBy;
        let {order} = filterBy; if ( order === void 0 ) order = 'asc';

        if (filter || isUndefined(sort)) {

            if (group) {

                if (filter) {
                    delete state.filter[''];
                    state.filter[group] = filter;
                } else {
                    delete state.filter[group];

                    if (isEmpty(state.filter) || '' in state.filter) {
                        state.filter = {'': filter || ''};
                    }

                }

            } else {
                state.filter = {'': filter || ''};
            }

        }

        if (!isUndefined(sort)) {
            state.sort = [sort, order];
        }

        return state;
    }

    function matchFilter(el, attr, ref) {
        let stateFilter = ref.filter; if ( stateFilter === void 0 ) stateFilter = {'': ''};
        const ref_sort = ref.sort;
        const stateSort = ref_sort[0];
        const stateOrder = ref_sort[1];


        const ref$1 = getFilter(el, attr);
        let {filter} = ref$1; if ( filter === void 0 ) filter = '';
        let {group} = ref$1; if ( group === void 0 ) group = '';
        const {sort} = ref$1;
        let {order} = ref$1; if ( order === void 0 ) order = 'asc';

        return isUndefined(sort)
            ? group in stateFilter && filter === stateFilter[group]
                || !filter && group && !(group in stateFilter) && !stateFilter['']
            : stateSort === sort && stateOrder === order;
    }

    function isEqualList(listA, listB) {
        return listA.length === listB.length
            && listA.every(function (el) { return ~listB.indexOf(el); });
    }

    function getSelector(ref) {
        const {filter} = ref;

        let selector = '';
        each(filter, function (value) { return selector += value || ''; });
        return selector;
    }

    function sortItems(nodes, sort, order) {
        return assign([], nodes).sort(function (a, b) { return data(a, sort).localeCompare(data(b, sort), undefined, {numeric: true}) * (order === 'asc' || -1); });
    }

    const Animations = {

        slide: {

            show(dir) {
                return [
                    {transform: translate(dir * -100)},
                    {transform: translate()}
                ];
            },

            percent(current) {
                return translated(current);
            },

            translate(percent, dir) {
                return [
                    {transform: translate(dir * -100 * percent)},
                    {transform: translate(dir * 100 * (1 - percent))}
                ];
            }

        }

    };

    function translated(el) {
        return Math.abs(css(el, 'transform').split(',')[4] / el.offsetWidth) || 0;
    }

    function translate(value, unit) {
        if ( value === void 0 ) value = 0;
        if ( unit === void 0 ) unit = '%';

        value += value ? unit : '';
        return isIE ? (`translateX(${  value  })`) : (`translate3d(${  value  }, 0, 0)`); // currently not translate3d in IE, translate3d within translate3d does not work while transitioning
    }

    function scale3d(value) {
        return (`scale3d(${  value  }, ${  value  }, 1)`);
    }

    const Animations$1 = { ...Animations, fade: {

        show() {
            return [
                {opacity: 0},
                {opacity: 1}
            ];
        },

        percent(current) {
            return 1 - css(current, 'opacity');
        },

        translate(percent) {
            return [
                {opacity: 1 - percent},
                {opacity: percent}
            ];
        }

    },

    scale: {

        show() {
            return [
                {opacity: 0, transform: scale3d(1 - .2)},
                {opacity: 1, transform: scale3d(1)}
            ];
        },

        percent(current) {
            return 1 - css(current, 'opacity');
        },

        translate(percent) {
            return [
                {opacity: 1 - percent, transform: scale3d(1 - .2 * percent)},
                {opacity: percent, transform: scale3d(1 - .2 + .2 * percent)}
            ];
        }

    }};

    function Transitioner(prev, next, dir, ref) {
        const {animation} = ref;
        const {easing} = ref;


        const {percent} = animation;
        const {translate} = animation;
        let {show} = animation; if ( show === void 0 ) show = noop;
        const props = show(dir);
        const deferred = new Deferred();

        return {

            dir,

            show(duration, percent, linear) {
                const this$1 = this;
                if ( percent === void 0 ) percent = 0;


                const timing = linear ? 'linear' : easing;
                duration -= Math.round(duration * clamp(percent, -1, 1));

                this.translate(percent);

                triggerUpdate(next, 'itemin', {percent, duration, timing, dir});
                triggerUpdate(prev, 'itemout', {percent: 1 - percent, duration, timing, dir});

                Promise.all([
                    Transition.start(next, props[1], duration, timing),
                    Transition.start(prev, props[0], duration, timing)
                ]).then(function () {
                    this$1.reset();
                    deferred.resolve();
                }, noop);

                return deferred.promise;
            },

            stop() {
                return Transition.stop([next, prev]);
            },

            cancel() {
                Transition.cancel([next, prev]);
            },

            reset() {
                for (const prop in props[0]) {
                    css([next, prev], prop, '');
                }
            },

            forward(duration, percent) {
                if ( percent === void 0 ) percent = this.percent();

                Transition.cancel([next, prev]);
                return this.show(duration, percent, true);

            },

            translate(percent) {

                this.reset();

                const props = translate(percent, dir);
                css(next, props[1]);
                css(prev, props[0]);
                triggerUpdate(next, 'itemtranslatein', {percent, dir});
                triggerUpdate(prev, 'itemtranslateout', {percent: 1 - percent, dir});

            },

            percent() {
                return percent(prev || next, next, dir);
            },

            getDistance() {
                return prev && prev.offsetWidth;
            }

        };

    }

    function triggerUpdate(el, type, data) {
        trigger(el, createEvent(type, false, false, data));
    }

    const SliderAutoplay = {

        props: {
            autoplay: Boolean,
            autoplayInterval: Number,
            pauseOnHover: Boolean
        },

        data: {
            autoplay: false,
            autoplayInterval: 7000,
            pauseOnHover: true
        },

        connected() {
            this.autoplay && this.startAutoplay();
        },

        disconnected() {
            this.stopAutoplay();
        },

        update() {
            attr(this.slides, 'tabindex', '-1');
        },

        events: [

            {

                name: 'visibilitychange',

                el: document,

                filter() {
                    return this.autoplay;
                },

                handler() {
                    if (document.hidden) {
                        this.stopAutoplay();
                    } else {
                        this.startAutoplay();
                    }
                }

            }

        ],

        methods: {

            startAutoplay() {
                const this$1 = this;


                this.stopAutoplay();

                this.interval = setInterval(
                    function () { return (!this$1.draggable || !$(':focus', this$1.$el))
                        && (!this$1.pauseOnHover || !matches(this$1.$el, ':hover'))
                        && !this$1.stack.length
                        && this$1.show('next'); },
                    this.autoplayInterval
                );

            },

            stopAutoplay() {
                this.interval && clearInterval(this.interval);
            }

        }

    };

    const SliderDrag = {

        props: {
            draggable: Boolean
        },

        data: {
            draggable: true,
            threshold: 10
        },

        created() {
            const this$1 = this;


            ['start', 'move', 'end'].forEach(function (key) {

                const fn = this$1[key];
                this$1[key] = function (e) {

                    const pos = getEventPos(e).x * (isRtl ? -1 : 1);

                    this$1.prevPos = pos !== this$1.pos ? this$1.pos : this$1.prevPos;
                    this$1.pos = pos;

                    fn(e);
                };

            });

        },

        events: [

            {

                name: pointerDown,

                delegate() {
                    return this.selSlides;
                },

                handler(e) {

                    if (!this.draggable
                        || !isTouch(e) && hasTextNodesOnly(e.target)
                        || closest(e.target, selInput)
                        || e.button > 0
                        || this.length < 2
                    ) {
                        return;
                    }

                    this.start(e);
                }

            },

            {

                // Workaround for iOS 11 bug: https://bugs.webkit.org/show_bug.cgi?id=184250

                name: 'touchmove',
                passive: false,
                handler: 'move',
                delegate() {
                    return this.selSlides;
                }

            },

            {
                name: 'dragstart',

                handler(e) {
                    e.preventDefault();
                }
            }

        ],

        methods: {

            start() {
                const this$1 = this;


                this.drag = this.pos;

                if (this._transitioner) {

                    this.percent = this._transitioner.percent();
                    this.drag += this._transitioner.getDistance() * this.percent * this.dir;

                    this._transitioner.cancel();
                    this._transitioner.translate(this.percent);

                    this.dragging = true;

                    this.stack = [];

                } else {
                    this.prevIndex = this.index;
                }

                // See above workaround notice
                const off = pointerMove !== 'touchmove'
                    ? on(document, pointerMove, this.move, {passive: false})
                    : noop;
                this.unbindMove = function () {
                    off();
                    this$1.unbindMove = null;
                };
                on(window, 'scroll', this.unbindMove);
                on(document, pointerUp, this.end, true);

                css(this.list, 'userSelect', 'none');

            },

            move(e) {
                const this$1 = this;


                // See above workaround notice
                if (!this.unbindMove) {
                    return;
                }

                const distance = this.pos - this.drag;

                if (distance === 0 || this.prevPos === this.pos || !this.dragging && Math.abs(distance) < this.threshold) {
                    return;
                }

                css(this.list, 'pointerEvents', 'none');

                e.cancelable && e.preventDefault();

                this.dragging = true;
                this.dir = (distance < 0 ? 1 : -1);

                const ref = this;
                const {slides} = ref;
                const ref$1 = this;
                let {prevIndex} = ref$1;
                let dis = Math.abs(distance);
                let nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
                let width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;

                while (nextIndex !== prevIndex && dis > width) {

                    this.drag -= width * this.dir;

                    prevIndex = nextIndex;
                    dis -= width;
                    nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
                    width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;

                }

                this.percent = dis / width;

                const prev = slides[prevIndex];
                const next = slides[nextIndex];
                const changed = this.index !== nextIndex;
                const edge = prevIndex === nextIndex;

                let itemShown;

                [this.index, this.prevIndex].filter(function (i) { return !includes([nextIndex, prevIndex], i); }).forEach(function (i) {
                    trigger(slides[i], 'itemhidden', [this$1]);

                    if (edge) {
                        itemShown = true;
                        this$1.prevIndex = prevIndex;
                    }

                });

                if (this.index === prevIndex && this.prevIndex !== prevIndex || itemShown) {
                    trigger(slides[this.index], 'itemshown', [this]);
                }

                if (changed) {
                    this.prevIndex = prevIndex;
                    this.index = nextIndex;

                    !edge && trigger(prev, 'beforeitemhide', [this]);
                    trigger(next, 'beforeitemshow', [this]);
                }

                this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);

                if (changed) {
                    !edge && trigger(prev, 'itemhide', [this]);
                    trigger(next, 'itemshow', [this]);
                }

            },

            end() {

                off(window, 'scroll', this.unbindMove);
                this.unbindMove && this.unbindMove();
                off(document, pointerUp, this.end, true);

                if (this.dragging) {

                    this.dragging = null;

                    if (this.index === this.prevIndex) {
                        this.percent = 1 - this.percent;
                        this.dir *= -1;
                        this._show(false, this.index, true);
                        this._transitioner = null;
                    } else {

                        const dirChange = (isRtl ? this.dir * (isRtl ? 1 : -1) : this.dir) < 0 === this.prevPos > this.pos;
                        this.index = dirChange ? this.index : this.prevIndex;

                        if (dirChange) {
                            this.percent = 1 - this.percent;
                        }

                        this.show(this.dir > 0 && !dirChange || this.dir < 0 && dirChange ? 'next' : 'previous', true);
                    }

                }

                css(this.list, {userSelect: '', pointerEvents: ''});

                this.drag
                    = this.percent
                    = null;

            }

        }

    };

    function hasTextNodesOnly(el) {
        return !el.children.length && el.childNodes.length;
    }

    const SliderNav = {

        data: {
            selNav: false
        },

        computed: {

            nav(ref, $el) {
                const {selNav} = ref;

                return $(selNav, $el);
            },

            selNavItem(ref) {
                const {attrItem} = ref;

                return (`[${  attrItem  }],[data-${  attrItem  }]`);
            },

            navItems(_, $el) {
                return $$(this.selNavItem, $el);
            }

        },

        update: {

            write() {
                const this$1 = this;


                if (this.nav && this.length !== this.nav.children.length) {
                    html(this.nav, this.slides.map(function (_, i) { return (`<li ${  this$1.attrItem  }="${  i  }"><a href="#"></a></li>`); }).join(''));
                }

                toggleClass($$(this.selNavItem, this.$el).concat(this.nav), 'uk-hidden', !this.maxIndex);

                this.updateNav();

            },

            events: ['resize']

        },

        events: [

            {

                name: 'click',

                delegate() {
                    return this.selNavItem;
                },

                handler(e) {
                    e.preventDefault();
                    this.show(data(e.current, this.attrItem));
                }

            },

            {

                name: 'itemshow',
                handler: 'updateNav'

            }

        ],

        methods: {

            updateNav() {
                const this$1 = this;


                const i = this.getValidIndex();
                this.navItems.forEach(function (el) {

                    const cmd = data(el, this$1.attrItem);

                    toggleClass(el, this$1.clsActive, toNumber(cmd) === i);
                    toggleClass(el, 'uk-invisible', this$1.finite && (cmd === 'previous' && i === 0 || cmd === 'next' && i >= this$1.maxIndex));
                });

            }

        }

    };

    const Slider = {

        mixins: [SliderAutoplay, SliderDrag, SliderNav],

        props: {
            clsActivated: Boolean,
            easing: String,
            index: Number,
            finite: Boolean,
            velocity: Number,
            selSlides: String
        },

        data () { return ({
            easing: 'ease',
            finite: false,
            velocity: 1,
            index: 0,
            prevIndex: -1,
            stack: [],
            percent: 0,
            clsActive: 'uk-active',
            clsActivated: false,
            Transitioner: false,
            transitionOptions: {}
        }); },

        connected() {
            this.prevIndex = -1;
            this.index = this.getValidIndex(this.index);
            this.stack = [];
        },

        disconnected() {
            removeClass(this.slides, this.clsActive);
        },

        computed: {

            duration(ref, $el) {
                const {velocity} = ref;

                return speedUp($el.offsetWidth / velocity);
            },

            list(ref, $el) {
                const {selList} = ref;

                return $(selList, $el);
            },

            maxIndex() {
                return this.length - 1;
            },

            selSlides(ref) {
                const {selList} = ref;
                const {selSlides} = ref;

                return (`${selList  } ${  selSlides || '> *'}`);
            },

            slides: {

                get() {
                    return $$(this.selSlides, this.$el);
                },

                watch() {
                    this.$reset();
                }

            },

            length() {
                return this.slides.length;
            }

        },

        events: {

            itemshown() {
                this.$update(this.list);
            }

        },

        methods: {

            show(index, force) {
                const this$1 = this;
                if ( force === void 0 ) force = false;


                if (this.dragging || !this.length) {
                    return;
                }

                const ref = this;
                const {stack} = ref;
                const queueIndex = force ? 0 : stack.length;
                const reset = function () {
                    stack.splice(queueIndex, 1);

                    if (stack.length) {
                        this$1.show(stack.shift(), true);
                    }
                };

                stack[force ? 'unshift' : 'push'](index);

                if (!force && stack.length > 1) {

                    if (stack.length === 2) {
                        this._transitioner.forward(Math.min(this.duration, 200));
                    }

                    return;
                }

                const prevIndex = this.index;
                const prev = hasClass(this.slides, this.clsActive) && this.slides[prevIndex];
                const nextIndex = this.getIndex(index, this.index);
                const next = this.slides[nextIndex];

                if (prev === next) {
                    reset();
                    return;
                }

                this.dir = getDirection(index, prevIndex);
                this.prevIndex = prevIndex;
                this.index = nextIndex;

                prev && trigger(prev, 'beforeitemhide', [this]);
                if (!trigger(next, 'beforeitemshow', [this, prev])) {
                    this.index = this.prevIndex;
                    reset();
                    return;
                }

                const promise = this._show(prev, next, force).then(function () {

                    prev && trigger(prev, 'itemhidden', [this$1]);
                    trigger(next, 'itemshown', [this$1]);

                    return new Promise(function (resolve) {
                        fastdom.write(function () {
                            stack.shift();
                            if (stack.length) {
                                this$1.show(stack.shift(), true);
                            } else {
                                this$1._transitioner = null;
                            }
                            resolve();
                        });
                    });

                });

                prev && trigger(prev, 'itemhide', [this]);
                trigger(next, 'itemshow', [this]);

                return promise;

            },

            getIndex(index, prev) {
                if ( index === void 0 ) index = this.index;
                if ( prev === void 0 ) prev = this.index;

                return clamp(getIndex(index, this.slides, prev, this.finite), 0, this.maxIndex);
            },

            getValidIndex(index, prevIndex) {
                if ( index === void 0 ) index = this.index;
                if ( prevIndex === void 0 ) prevIndex = this.prevIndex;

                return this.getIndex(index, prevIndex);
            },

            _show(prev, next, force) {

                this._transitioner = this._getTransitioner(
                    prev,
                    next,
                    this.dir,
                    {easing: force
                        ? next.offsetWidth < 600
                            ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' /* easeOutQuad */
                            : 'cubic-bezier(0.165, 0.84, 0.44, 1)' /* easeOutQuart */
                        : this.easing, ...this.transitionOptions}
                );

                if (!force && !prev) {
                    this._transitioner.translate(1);
                    return Promise.resolve();
                }

                const ref = this.stack;
                const {length} = ref;
                return this._transitioner[length > 1 ? 'forward' : 'show'](length > 1 ? Math.min(this.duration, 75 + 75 / (length - 1)) : this.duration, this.percent);

            },

            _getDistance(prev, next) {
                return this._getTransitioner(prev, prev !== next && next).getDistance();
            },

            _translate(percent, prev, next) {
                if ( prev === void 0 ) prev = this.prevIndex;
                if ( next === void 0 ) next = this.index;

                const transitioner = this._getTransitioner(prev !== next ? prev : false, next);
                transitioner.translate(percent);
                return transitioner;
            },

            _getTransitioner(prev, next, dir, options) {
                if ( prev === void 0 ) prev = this.prevIndex;
                if ( next === void 0 ) next = this.index;
                if ( dir === void 0 ) dir = this.dir || 1;
                if ( options === void 0 ) options = this.transitionOptions;

                return new this.Transitioner(
                    isNumber(prev) ? this.slides[prev] : prev,
                    isNumber(next) ? this.slides[next] : next,
                    dir * (isRtl ? -1 : 1),
                    options
                );
            }

        }

    };

    function getDirection(index, prevIndex) {
        return index === 'next'
            ? 1
            : index === 'previous'
                ? -1
                : index < prevIndex
                    ? -1
                    : 1;
    }

    function speedUp(x) {
        return .5 * x + 300; // parabola through (400,500; 600,600; 1800,1200)
    }

    const Slideshow = {

        mixins: [Slider],

        props: {
            animation: String
        },

        data: {
            animation: 'slide',
            clsActivated: 'uk-transition-active',
            Animations,
            Transitioner
        },

        computed: {

            animation(ref) {
                const {animation} = ref;
                const {Animations} = ref;

                return assign(animation in Animations ? Animations[animation] : Animations.slide, {name: animation});
            },

            transitionOptions() {
                return {animation: this.animation};
            }

        },

        events: {

            'itemshow itemhide itemshown itemhidden': function(ref) {
                const {target} = ref;

                this.$update(target);
            },

            beforeitemshow(ref) {
                const {target} = ref;

                addClass(target, this.clsActive);
            },

            itemshown(ref) {
                const {target} = ref;

                addClass(target, this.clsActivated);
            },

            itemhidden(ref) {
                const {target} = ref;

                removeClass(target, this.clsActive, this.clsActivated);
            }

        }

    };

    const lightboxPanel = {

        mixins: [Container, Modal, Togglable, Slideshow],

        functional: true,

        props: {
            delayControls: Number,
            preload: Number,
            videoAutoplay: Boolean,
            template: String
        },

        data () { return ({
            preload: 1,
            videoAutoplay: false,
            delayControls: 3000,
            items: [],
            cls: 'uk-open',
            clsPage: 'uk-lightbox-page',
            selList: '.uk-lightbox-items',
            attrItem: 'uk-lightbox-item',
            selClose: '.uk-close-large',
            selCaption: '.uk-lightbox-caption',
            pauseOnHover: false,
            velocity: 2,
            Animations: Animations$1,
            template: "<div class=\"uk-lightbox uk-overflow-hidden\"> <ul class=\"uk-lightbox-items\"></ul> <div class=\"uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque\"> <button class=\"uk-lightbox-toolbar-icon uk-close-large\" type=\"button\" uk-close></button> </div> <a class=\"uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade\" href=\"#\" uk-slidenav-previous uk-lightbox-item=\"previous\"></a> <a class=\"uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade\" href=\"#\" uk-slidenav-next uk-lightbox-item=\"next\"></a> <div class=\"uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque\"></div> </div>"
        }); },

        created() {

            const $el = $(this.template);
            const list = $(this.selList, $el);
            this.items.forEach(function () { return append(list, '<li></li>'); });

            this.$mount(append(this.container, $el));

        },

        computed: {

            caption(ref, $el) {
                const {selCaption} = ref;

                return $('.uk-lightbox-caption', $el);
            }

        },

        events: [

            {

                name: (`${pointerMove  } ${  pointerDown  } keydown`),

                handler: 'showControls'

            },

            {

                name: 'click',

                self: true,

                delegate() {
                    return this.selSlides;
                },

                handler(e) {

                    if (e.defaultPrevented) {
                        return;
                    }

                    this.hide();
                }

            },

            {

                name: 'shown',

                self: true,

                handler() {
                    this.showControls();
                }

            },

            {

                name: 'hide',

                self: true,

                handler() {

                    this.hideControls();

                    removeClass(this.slides, this.clsActive);
                    Transition.stop(this.slides);

                }
            },

            {

                name: 'hidden',

                self: true,

                handler() {
                    this.$destroy(true);
                }

            },

            {

                name: 'keyup',

                el: document,

                handler(e) {

                    if (!this.isToggled(this.$el)) {
                        return;
                    }

                    switch (e.keyCode) {
                        case 37:
                            this.show('previous');
                            break;
                        case 39:
                            this.show('next');
                            break;
                    }
                }
            },

            {

                name: 'beforeitemshow',

                handler(e) {

                    if (this.isToggled()) {
                        return;
                    }

                    this.draggable = false;

                    e.preventDefault();

                    this.toggleNow(this.$el, true);

                    this.animation = Animations$1.scale;
                    removeClass(e.target, this.clsActive);
                    this.stack.splice(1, 0, this.index);

                }

            },

            {

                name: 'itemshow',

                handler(ref) {
                    const {target} = ref;


                    const i = index(target);
                    const ref$1 = this.getItem(i);
                    const {caption} = ref$1;

                    css(this.caption, 'display', caption ? '' : 'none');
                    html(this.caption, caption);

                    for (let j = 0; j <= this.preload; j++) {
                        this.loadItem(this.getIndex(i + j));
                        this.loadItem(this.getIndex(i - j));
                    }

                }

            },

            {

                name: 'itemshown',

                handler() {
                    this.draggable = this.$props.draggable;
                }

            },

            {

                name: 'itemload',

                handler(_, item) {
                    const this$1 = this;


                    const {source} = item;
                    const {type} = item;
                    const {alt} = item;

                    this.setItem(item, '<span uk-spinner></span>');

                    if (!source) {
                        return;
                    }

                    let matches;

                    // Image
                    if (type === 'image' || source.match(/\.(jp(e)?g|png|gif|svg|webp)($|\?)/i)) {

                        getImage(source).then(
                            function (img) { return this$1.setItem(item, (`<img width="${  img.width  }" height="${  img.height  }" src="${  source  }" alt="${  alt || ''  }">`)); },
                            function () { return this$1.setError(item); }
                        );

                        // Video
                    } else if (type === 'video' || source.match(/\.(mp4|webm|ogv)($|\?)/i)) {

                        const video = $((`<video controls playsinline${  item.poster ? (` poster="${  item.poster  }"`) : ''  } uk-video="${  this.videoAutoplay  }"></video>`));
                        attr(video, 'src', source);

                        once(video, 'error loadedmetadata', function (type) {
                            if (type === 'error') {
                                this$1.setError(item);
                            } else {
                                attr(video, {width: video.videoWidth, height: video.videoHeight});
                                this$1.setItem(item, video);
                            }
                        });

                        // Iframe
                    } else if (type === 'iframe' || source.match(/\.(html|php)($|\?)/i)) {

                        this.setItem(item, (`<iframe class="uk-lightbox-iframe" src="${  source  }" frameborder="0" allowfullscreen></iframe>`));

                        // YouTube
                    } else if ((matches = source.match(/\/\/.*?youtube(-nocookie)?\.[a-z]+\/watch\?v=([^&\s]+)/) || source.match(/()youtu\.be\/(.*)/))) {

                        const id = matches[2];
                        const setIframe = function (width, height) {
                            if ( width === void 0 ) width = 640;
                            if ( height === void 0 ) height = 450;

                            return this$1.setItem(item, getIframe((`https://www.youtube${  matches[1] || ''  }.com/embed/${  id}`), width, height, this$1.videoAutoplay));
                        };

                        getImage((`https://img.youtube.com/vi/${  id  }/maxresdefault.jpg`)).then(
                            function (ref) {
                                const {width} = ref;
                                const {height} = ref;

                                // YouTube default 404 thumb, fall back to low resolution
                                if (width === 120 && height === 90) {
                                    getImage((`https://img.youtube.com/vi/${  id  }/0.jpg`)).then(
                                        function (ref) {
                                            const {width} = ref;
                                            const {height} = ref;

                                            return setIframe(width, height);
                                        },
                                        setIframe
                                    );
                                } else {
                                    setIframe(width, height);
                                }
                            },
                            setIframe
                        );

                        // Vimeo
                    } else if ((matches = source.match(/(\/\/.*?)vimeo\.[a-z]+\/([0-9]+).*?/))) {

                        ajax((`https://vimeo.com/api/oembed.json?maxwidth=1920&url=${  encodeURI(source)}`), {responseType: 'json', withCredentials: false})
                            .then(
                                function (ref) {
                                    const ref_response = ref.response;
                                    const {height} = ref_response;
                                    const {width} = ref_response;

                                    return this$1.setItem(item, getIframe((`https://player.vimeo.com/video/${  matches[2]}`), width, height, this$1.videoAutoplay));
                                },
                                function () { return this$1.setError(item); }
                            );

                    }

                }

            }

        ],

        methods: {

            loadItem(index) {
                if ( index === void 0 ) index = this.index;


                const item = this.getItem(index);

                if (item.content) {
                    return;
                }

                trigger(this.$el, 'itemload', [item]);
            },

            getItem(index) {
                if ( index === void 0 ) index = this.index;

                return this.items[index] || {};
            },

            setItem(item, content) {
                assign(item, {content});
                const el = html(this.slides[this.items.indexOf(item)], content);
                trigger(this.$el, 'itemloaded', [this, el]);
                this.$update(el);
            },

            setError(item) {
                this.setItem(item, '<span uk-icon="icon: bolt; ratio: 2"></span>');
            },

            showControls() {

                clearTimeout(this.controlsTimer);
                this.controlsTimer = setTimeout(this.hideControls, this.delayControls);

                addClass(this.$el, 'uk-active', 'uk-transition-active');

            },

            hideControls() {
                removeClass(this.$el, 'uk-active', 'uk-transition-active');
            }

        }

    };

    function getIframe(src, width, height, autoplay) {
        return (`<iframe src="${  src  }" width="${  width  }" height="${  height  }" style="max-width: 100%; box-sizing: border-box;" frameborder="0" allowfullscreen uk-video="autoplay: ${  autoplay  }" uk-responsive></iframe>`);
    }

    const Lightbox = {

        install: install$2,

        props: {toggle: String},

        data: {toggle: 'a'},

        computed: {

            toggles: {

                get(ref, $el) {
                    const {toggle} = ref;

                    return $$(toggle, $el);
                },

                watch() {
                    this.hide();
                }

            },

            items() {
                return uniqueBy(this.toggles.map(toItem), 'source');
            }

        },

        disconnected() {
            this.hide();
        },

        events: [

            {

                name: 'click',

                delegate() {
                    return (`${this.toggle  }:not(.uk-disabled)`);
                },

                handler(e) {
                    e.preventDefault();
                    const src = data(e.current, 'href');
                    this.show(findIndex(this.items, function (ref) {
                        const {source} = ref;

                        return source === src;
                    }));
                }

            }

        ],

        methods: {

            show(index) {
                const this$1 = this;


                this.panel = this.panel || this.$create('lightboxPanel', { ...this.$props, items: this.items});

                on(this.panel.$el, 'hidden', function () { return this$1.panel = false; });

                return this.panel.show(index);

            },

            hide() {

                return this.panel && this.panel.hide();

            }

        }

    };

    function install$2(UIkit, Lightbox) {

        if (!UIkit.lightboxPanel) {
            UIkit.component('lightboxPanel', lightboxPanel);
        }

        assign(
            Lightbox.props,
            UIkit.component('lightboxPanel').options.props
        );

    }

    function toItem(el) {
        return ['href', 'caption', 'type', 'poster', 'alt'].reduce(function (obj, attr) {
            obj[attr === 'href' ? 'source' : attr] = data(el, attr);
            return obj;
        }, {});
    }

    let obj;

    const containers = {};

    const Notification = {

        functional: true,

        args: ['message', 'status'],

        data: {
            message: '',
            status: '',
            timeout: 5000,
            group: null,
            pos: 'top-center',
            clsClose: 'uk-notification-close',
            clsMsg: 'uk-notification-message'
        },

        install: install$3,

        computed: {

            marginProp(ref) {
                const {pos} = ref;

                return (`margin${  startsWith(pos, 'top') ? 'Top' : 'Bottom'}`);
            },

            startProps() {
                let obj;

                return ( obj = {opacity: 0}, obj[this.marginProp] = -this.$el.offsetHeight, obj );
            }

        },

        created() {

            if (!containers[this.pos]) {
                containers[this.pos] = append(this.$container, (`<div class="uk-notification uk-notification-${  this.pos  }"></div>`));
            }

            const container = css(containers[this.pos], 'display', 'block');

            this.$mount(append(container,
                (`<div class="${  this.clsMsg  }${this.status ? (` ${  this.clsMsg  }-${  this.status}`) : ''  }"> <a href="#" class="${  this.clsClose  }" data-uk-close></a> <div>${  this.message  }</div> </div>`)
            ));

        },

        connected() {
            const this$1 = this;
            let obj;


            const margin = toFloat(css(this.$el, this.marginProp));
            Transition.start(
                css(this.$el, this.startProps),
                ( obj = {opacity: 1}, obj[this.marginProp] = margin, obj )
            ).then(function () {
                if (this$1.timeout) {
                    this$1.timer = setTimeout(this$1.close, this$1.timeout);
                }
            });

        },

        events: ( obj = {

            click(e) {
                if (closest(e.target, 'a[href="#"],a[href=""]')) {
                    e.preventDefault();
                }
                this.close();
            }

        }, obj[pointerEnter] = function () {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        }, obj[pointerLeave] = function () {
            if (this.timeout) {
                this.timer = setTimeout(this.close, this.timeout);
            }
        }, obj ),

        methods: {

            close(immediate) {
                const this$1 = this;


                const removeFn = function () {

                    trigger(this$1.$el, 'close', [this$1]);
                    remove(this$1.$el);

                    if (!containers[this$1.pos].children.length) {
                        css(containers[this$1.pos], 'display', 'none');
                    }

                };

                if (this.timer) {
                    clearTimeout(this.timer);
                }

                if (immediate) {
                    removeFn();
                } else {
                    Transition.start(this.$el, this.startProps).then(removeFn);
                }
            }

        }

    };

    function install$3(UIkit) {
        UIkit.notification.closeAll = function (group, immediate) {
            apply(document.body, function (el) {
                const notification = UIkit.getComponent(el, 'notification');
                if (notification && (!group || group === notification.group)) {
                    notification.close(immediate);
                }
            });
        };
    }

    const props = ['x', 'y', 'bgx', 'bgy', 'rotate', 'scale', 'color', 'backgroundColor', 'borderColor', 'opacity', 'blur', 'hue', 'grayscale', 'invert', 'saturate', 'sepia', 'fopacity', 'stroke'];

    const Parallax = {

        mixins: [Media],

        props: props.reduce(function (props, prop) {
            props[prop] = 'list';
            return props;
        }, {}),

        data: props.reduce(function (data, prop) {
            data[prop] = undefined;
            return data;
        }, {}),

        computed: {

            props(properties, $el) {
                const this$1 = this;


                return props.reduce(function (props, prop) {

                    if (isUndefined(properties[prop])) {
                        return props;
                    }

                    const isColor = prop.match(/color/i);
                    const isCssProp = isColor || prop === 'opacity';

                    let pos; let bgPos; let diff;
                    let steps = properties[prop].slice(0);

                    if (isCssProp) {
                        css($el, prop, '');
                    }

                    if (steps.length < 2) {
                        steps.unshift((prop === 'scale'
                            ? 1
                            : isCssProp
                                ? css($el, prop)
                                : 0) || 0);
                    }

                    const unit = getUnit(steps);

                    if (isColor) {

                        const ref = $el.style;
                        const {color} = ref;
                        steps = steps.map(function (step) { return parseColor($el, step); });
                        $el.style.color = color;

                    } else if (startsWith(prop, 'bg')) {

                        const attr = prop === 'bgy' ? 'height' : 'width';
                        steps = steps.map(function (step) { return toPx(step, attr, this$1.$el); });

                        css($el, (`background-position-${  prop[2]}`), '');
                        bgPos = css($el, 'backgroundPosition').split(' ')[prop[2] === 'x' ? 0 : 1]; // IE 11 can't read background-position-[x|y]

                        if (this$1.covers) {

                            const min = Math.min.apply(Math, steps);
                            const max = Math.max.apply(Math, steps);
                            const down = steps.indexOf(min) < steps.indexOf(max);

                            diff = max - min;

                            steps = steps.map(function (step) { return step - (down ? min : max); });
                            pos = `${down ? -diff : 0  }px`;

                        } else {

                            pos = bgPos;

                        }

                    } else {

                        steps = steps.map(toFloat);

                    }

                    if (prop === 'stroke') {

                        if (!steps.some(function (step) { return step; })) {
                            return props;
                        }

                        const length = getMaxPathLength(this$1.$el);
                        css($el, 'strokeDasharray', length);

                        if (unit === '%') {
                            steps = steps.map(function (step) { return step * length / 100; });
                        }

                        steps = steps.reverse();

                        prop = 'strokeDashoffset';
                    }

                    props[prop] = {steps, unit, pos, bgPos, diff};

                    return props;

                }, {});

            },

            bgProps() {
                const this$1 = this;

                return ['bgx', 'bgy'].filter(function (bg) { return bg in this$1.props; });
            },

            covers(_, $el) {
                return covers($el);
            }

        },

        disconnected() {
            delete this._image;
        },

        update: {

            read(data) {
                const this$1 = this;


                data.active = this.matchMedia;

                if (!data.active) {
                    return;
                }

                if (!data.image && this.covers && this.bgProps.length) {
                    const src = css(this.$el, 'backgroundImage').replace(/^none|url\(["']?(.+?)["']?\)$/, '$1');

                    if (src) {
                        const img = new Image();
                        img.src = src;
                        data.image = img;

                        if (!img.naturalWidth) {
                            img.onload = function () { return this$1.$emit(); };
                        }
                    }

                }

                const {image} = data;

                if (!image || !image.naturalWidth) {
                    return;
                }

                const dimEl = {
                    width: this.$el.offsetWidth,
                    height: this.$el.offsetHeight
                };
                const dimImage = {
                    width: image.naturalWidth,
                    height: image.naturalHeight
                };

                let dim = Dimensions.cover(dimImage, dimEl);

                this.bgProps.forEach(function (prop) {

                    const ref = this$1.props[prop];
                    const {diff} = ref;
                    const {bgPos} = ref;
                    const {steps} = ref;
                    const attr = prop === 'bgy' ? 'height' : 'width';
                    const span = dim[attr] - dimEl[attr];

                    if (span < diff) {
                        dimEl[attr] = dim[attr] + diff - span;
                    } else if (span > diff) {

                        const posPercentage = dimEl[attr] / toPx(bgPos, attr, this$1.$el);

                        if (posPercentage) {
                            this$1.props[prop].steps = steps.map(function (step) { return step - (span - diff) / posPercentage; });
                        }
                    }

                    dim = Dimensions.cover(dimImage, dimEl);
                });

                data.dim = dim;
            },

            write(ref) {
                const {dim} = ref;
                const {active} = ref;


                if (!active) {
                    css(this.$el, {backgroundSize: '', backgroundRepeat: ''});
                    return;
                }

                dim && css(this.$el, {
                    backgroundSize: (`${dim.width  }px ${  dim.height  }px`),
                    backgroundRepeat: 'no-repeat'
                });

            },

            events: ['resize']

        },

        methods: {

            reset() {
                const this$1 = this;

                each(this.getCss(0), function (_, prop) { return css(this$1.$el, prop, ''); });
            },

            getCss(percent) {

                const ref = this;
                const {props} = ref;
                return Object.keys(props).reduce(function (css, prop) {

                    const ref = props[prop];
                    const {steps} = ref;
                    let {unit} = ref;
                    const {pos} = ref;
                    const value = getValue(steps, percent);

                    switch (prop) {

                        // transforms
                        case 'x':
                        case 'y': {
                            unit = unit || 'px';
                            css.transform += ` translate${  ucfirst(prop)  }(${  toFloat(value).toFixed(unit === 'px' ? 0 : 2)  }${unit  })`;
                            break;
                        }
                        case 'rotate':
                            unit = unit || 'deg';
                            css.transform += ` rotate(${  value + unit  })`;
                            break;
                        case 'scale':
                            css.transform += ` scale(${  value  })`;
                            break;

                        // bg image
                        case 'bgy':
                        case 'bgx':
                            css[(`background-position-${  prop[2]}`)] = `calc(${  pos  } + ${  value  }px)`;
                            break;

                        // color
                        case 'color':
                        case 'backgroundColor':
                        case 'borderColor': {

                            const ref$1 = getStep(steps, percent);
                            const start = ref$1[0];
                            const end = ref$1[1];
                            const p = ref$1[2];

                            css[prop] = `rgba(${  start.map(function (value, i) {
                                value += p * (end[i] - value);
                                return i === 3 ? toFloat(value) : parseInt(value, 10);
                            }).join(',')  })`;
                            break;
                        }
                        // CSS Filter
                        case 'blur':
                            unit = unit || 'px';
                            css.filter += ` blur(${  value + unit  })`;
                            break;
                        case 'hue':
                            unit = unit || 'deg';
                            css.filter += ` hue-rotate(${  value + unit  })`;
                            break;
                        case 'fopacity':
                            unit = unit || '%';
                            css.filter += ` opacity(${  value + unit  })`;
                            break;
                        case 'grayscale':
                        case 'invert':
                        case 'saturate':
                        case 'sepia':
                            unit = unit || '%';
                            css.filter += ` ${  prop  }(${  value + unit  })`;
                            break;
                        default:
                            css[prop] = value;
                    }

                    return css;

                }, {transform: '', filter: ''});

            }

        }

    };

    function parseColor(el, color) {
        return css(css(el, 'color', color), 'color')
            .split(/[(),]/g)
            .slice(1, -1)
            .concat(1)
            .slice(0, 4)
            .map(toFloat);
    }

    function getStep(steps, percent) {
        const count = steps.length - 1;
        const index = Math.min(Math.floor(count * percent), count - 1);
        const step = steps.slice(index, index + 2);

        step.push(percent === 1 ? 1 : percent % (1 / count) * count);

        return step;
    }

    function getValue(steps, percent, digits) {
        if ( digits === void 0 ) digits = 2;

        const ref = getStep(steps, percent);
        const start = ref[0];
        const end = ref[1];
        const p = ref[2];
        return (isNumber(start)
            ? start + Math.abs(start - end) * p * (start < end ? 1 : -1)
            : +end
        ).toFixed(digits);
    }

    function getUnit(steps) {
        return steps.reduce(function (unit, step) { return isString(step) && step.replace(/-|\d/g, '').trim() || unit; }, '');
    }

    function covers(el) {
        const ref = el.style;
        const {backgroundSize} = ref;
        const covers = css(css(el, 'backgroundSize', ''), 'backgroundSize') === 'cover';
        el.style.backgroundSize = backgroundSize;
        return covers;
    }

    const Parallax$1 = {

        mixins: [Parallax],

        props: {
            target: String,
            viewport: Number,
            easing: Number
        },

        data: {
            target: false,
            viewport: 1,
            easing: 1
        },

        computed: {

            target(ref, $el) {
                const {target} = ref;

                return getOffsetElement(target && query(target, $el) || $el);
            }

        },

        update: {

            read(ref, type) {
                let {percent} = ref;
                const {active} = ref;


                if (type !== 'scroll') {
                    percent = false;
                }

                if (!active) {
                    return;
                }

                const prev = percent;
                percent = ease$1(scrolledOver(this.target) / (this.viewport || 1), this.easing);

                return {
                    percent,
                    style: prev !== percent ? this.getCss(percent) : false
                };
            },

            write(ref) {
                const {style} = ref;
                const {active} = ref;


                if (!active) {
                    this.reset();
                    return;
                }

                style && css(this.$el, style);

            },

            events: ['scroll', 'resize']
        }

    };

    function ease$1(percent, easing) {
        return clamp(percent * (1 - (easing - easing * percent)));
    }

    // SVG elements do not inherit from HTMLElement
    function getOffsetElement(el) {
        return el
            ? 'offsetTop' in el
                ? el
                : getOffsetElement(el.parentNode)
            : document.body;
    }

    const SliderReactive = {

        update: {

            write() {

                if (this.stack.length || this.dragging) {
                    return;
                }

                const index = this.getValidIndex(this.index);

                if (!~this.prevIndex || this.index !== index) {
                    this.show(index);
                }

            },

            events: ['resize']

        }

    };

    function Transitioner$1 (prev, next, dir, ref) {
        const {center} = ref;
        const {easing} = ref;
        const {list} = ref;


        const deferred = new Deferred();

        const from = prev
            ? getLeft(prev, list, center)
            : getLeft(next, list, center) + bounds(next).width * dir;
        const to = next
            ? getLeft(next, list, center)
            : from + bounds(prev).width * dir * (isRtl ? -1 : 1);

        return {

            dir,

            show(duration, percent, linear) {
                if ( percent === void 0 ) percent = 0;


                const timing = linear ? 'linear' : easing;
                duration -= Math.round(duration * clamp(percent, -1, 1));

                this.translate(percent);

                prev && this.updateTranslates();
                percent = prev ? percent : clamp(percent, 0, 1);
                triggerUpdate$1(this.getItemIn(), 'itemin', {percent, duration, timing, dir});
                prev && triggerUpdate$1(this.getItemIn(true), 'itemout', {percent: 1 - percent, duration, timing, dir});

                Transition
                    .start(list, {transform: translate(-to * (isRtl ? -1 : 1), 'px')}, duration, timing)
                    .then(deferred.resolve, noop);

                return deferred.promise;

            },

            stop() {
                return Transition.stop(list);
            },

            cancel() {
                Transition.cancel(list);
            },

            reset() {
                css(list, 'transform', '');
            },

            forward(duration, percent) {
                if ( percent === void 0 ) percent = this.percent();

                Transition.cancel(list);
                return this.show(duration, percent, true);
            },

            translate(percent) {

                const distance = this.getDistance() * dir * (isRtl ? -1 : 1);

                css(list, 'transform', translate(clamp(
                    -to + (distance - distance * percent),
                    -getWidth(list),
                    bounds(list).width
                ) * (isRtl ? -1 : 1), 'px'));

                this.updateTranslates();

                if (prev) {
                    percent = clamp(percent, -1, 1);
                    triggerUpdate$1(this.getItemIn(), 'itemtranslatein', {percent, dir});
                    triggerUpdate$1(this.getItemIn(true), 'itemtranslateout', {percent: 1 - percent, dir});
                }

            },

            percent() {
                return Math.abs((css(list, 'transform').split(',')[4] * (isRtl ? -1 : 1) + from) / (to - from));
            },

            getDistance() {
                return Math.abs(to - from);
            },

            getItemIn(out) {
                if ( out === void 0 ) out = false;


                const actives = this.getActives();
                const all = sortBy(slides(list), 'offsetLeft');
                const i = index(all, actives[dir * (out ? -1 : 1) > 0 ? actives.length - 1 : 0]);

                return ~i && all[i + (prev && !out ? dir : 0)];

            },

            getActives() {

                const left = getLeft(prev || next, list, center);

                return sortBy(slides(list).filter(function (slide) {
                    const slideLeft = getElLeft(slide, list);
                    return slideLeft >= left && slideLeft + bounds(slide).width <= bounds(list).width + left;
                }), 'offsetLeft');

            },

            updateTranslates() {

                const actives = this.getActives();

                slides(list).forEach(function (slide) {
                    const isActive = includes(actives, slide);

                    triggerUpdate$1(slide, (`itemtranslate${  isActive ? 'in' : 'out'}`), {
                        percent: isActive ? 1 : 0,
                        dir: slide.offsetLeft <= next.offsetLeft ? 1 : -1
                    });
                });
            }

        };

    }

    function getLeft(el, list, center) {

        const left = getElLeft(el, list);

        return center
            ? left - centerEl(el, list)
            : Math.min(left, getMax(list));

    }

    function getMax(list) {
        return Math.max(0, getWidth(list) - bounds(list).width);
    }

    function getWidth(list) {
        return slides(list).reduce(function (right, el) { return bounds(el).width + right; }, 0);
    }

    function getMaxWidth(list) {
        return slides(list).reduce(function (right, el) { return Math.max(right, bounds(el).width); }, 0);
    }

    function centerEl(el, list) {
        return bounds(list).width / 2 - bounds(el).width / 2;
    }

    function getElLeft(el, list) {
        return (position(el).left + (isRtl ? bounds(el).width - bounds(list).width : 0)) * (isRtl ? -1 : 1);
    }

    function bounds(el) {
        return el.getBoundingClientRect();
    }

    function triggerUpdate$1(el, type, data) {
        trigger(el, createEvent(type, false, false, data));
    }

    function slides(list) {
        return toNodes(list.children);
    }

    const Slider$1 = {

        mixins: [Class, Slider, SliderReactive],

        props: {
            center: Boolean,
            sets: Boolean
        },

        data: {
            center: false,
            sets: false,
            attrItem: 'uk-slider-item',
            selList: '.uk-slider-items',
            selNav: '.uk-slider-nav',
            clsContainer: 'uk-slider-container',
            Transitioner: Transitioner$1
        },

        computed: {

            avgWidth() {
                return getWidth(this.list) / this.length;
            },

            finite(ref) {
                const {finite} = ref;

                return finite || Math.ceil(getWidth(this.list)) < bounds(this.list).width + getMaxWidth(this.list) + this.center;
            },

            maxIndex() {

                if (!this.finite || this.center && !this.sets) {
                    return this.length - 1;
                }

                if (this.center) {
                    return last(this.sets);
                }

                css(this.slides, 'order', '');

                const max = getMax(this.list);
                let i = this.length;

                while (i--) {
                    if (getElLeft(this.list.children[i], this.list) < max) {
                        return Math.min(i + 1, this.length - 1);
                    }
                }

                return 0;
            },

            sets(ref) {
                const this$1 = this;
                let {sets} = ref;


                const width = bounds(this.list).width / (this.center ? 2 : 1);

                let left = 0;
                let leftCenter = width;
                let slideLeft = 0;

                sets = sets && this.slides.reduce(function (sets, slide, i) {

                    const ref = bounds(slide);
                    const slideWidth = ref.width;
                    const slideRight = slideLeft + slideWidth;

                    if (slideRight > left) {

                        if (!this$1.center && i > this$1.maxIndex) {
                            i = this$1.maxIndex;
                        }

                        if (!includes(sets, i)) {

                            const cmp = this$1.slides[i + 1];
                            if (this$1.center && cmp && slideWidth < leftCenter - bounds(cmp).width / 2) {
                                leftCenter -= slideWidth;
                            } else {
                                leftCenter = width;
                                sets.push(i);
                                left = slideLeft + width + (this$1.center ? slideWidth / 2 : 0);
                            }

                        }
                    }

                    slideLeft += slideWidth;

                    return sets;

                }, []);

                return !isEmpty(sets) && sets;

            },

            transitionOptions() {
                return {
                    center: this.center,
                    list: this.list
                };
            }

        },

        connected() {
            toggleClass(this.$el, this.clsContainer, !$((`.${  this.clsContainer}`), this.$el));
        },

        update: {

            write() {
                const this$1 = this;


                $$((`[${  this.attrItem  }],[data-${  this.attrItem  }]`), this.$el).forEach(function (el) {
                    const index = data(el, this$1.attrItem);
                    this$1.maxIndex && toggleClass(el, 'uk-hidden', isNumeric(index) && (this$1.sets && !includes(this$1.sets, toFloat(index)) || index > this$1.maxIndex));
                });

                if (this.length && !this.dragging && !this.stack.length) {
                    this._getTransitioner().translate(1);
                }

            },

            events: ['resize']

        },

        events: {

            beforeitemshow(e) {

                if (!this.dragging && this.sets && this.stack.length < 2 && !includes(this.sets, this.index)) {
                    this.index = this.getValidIndex();
                }

                const diff = Math.abs(
                    this.index
                    - this.prevIndex
                    + (this.dir > 0 && this.index < this.prevIndex || this.dir < 0 && this.index > this.prevIndex ? (this.maxIndex + 1) * this.dir : 0)
                );

                if (!this.dragging && diff > 1) {

                    for (let i = 0; i < diff; i++) {
                        this.stack.splice(1, 0, this.dir > 0 ? 'next' : 'previous');
                    }

                    e.preventDefault();
                    return;
                }

                this.duration = speedUp(this.avgWidth / this.velocity)
                    * (bounds(
                        this.dir < 0 || !this.slides[this.prevIndex]
                            ? this.slides[this.index]
                            : this.slides[this.prevIndex]
                    ).width / this.avgWidth);

                this.reorder();

            },

            itemshow() {
                !isUndefined(this.prevIndex) && addClass(this._getTransitioner().getItemIn(), this.clsActive);
            },

            itemshown() {
                const this$1 = this;

                const actives = this._getTransitioner(this.index).getActives();
                this.slides.forEach(function (slide) { return toggleClass(slide, this$1.clsActive, includes(actives, slide)); });
                (!this.sets || includes(this.sets, toFloat(this.index))) && this.slides.forEach(function (slide) { return toggleClass(slide, this$1.clsActivated, includes(actives, slide)); });
            }

        },

        methods: {

            reorder() {
                const this$1 = this;


                css(this.slides, 'order', '');

                if (this.finite) {
                    return;
                }

                const index = this.dir > 0 && this.slides[this.prevIndex] ? this.prevIndex : this.index;

                this.slides.forEach(function (slide, i) { return css(slide, 'order', this$1.dir > 0 && i < index
                    ? 1
                    : this$1.dir < 0 && i >= this$1.index
                        ? -1
                        : ''
                ); }
                );

                if (!this.center) {
                    return;
                }

                const next = this.slides[index];
                let width = bounds(this.list).width / 2 - bounds(next).width / 2;
                let j = 0;

                while (width > 0) {
                    const slideIndex = this.getIndex(--j + index, index);
                    const slide = this.slides[slideIndex];

                    css(slide, 'order', slideIndex > index ? -2 : -1);
                    width -= bounds(slide).width;
                }

            },

            getValidIndex(index, prevIndex) {
                if ( index === void 0 ) index = this.index;
                if ( prevIndex === void 0 ) prevIndex = this.prevIndex;


                index = this.getIndex(index, prevIndex);

                if (!this.sets) {
                    return index;
                }

                let prev;

                do {

                    if (includes(this.sets, index)) {
                        return index;
                    }

                    prev = index;
                    index = this.getIndex(index + this.dir, prevIndex);

                } while (index !== prev);

                return index;
            }

        }

    };

    const SlideshowParallax = {

        mixins: [Parallax],

        data: {
            selItem: '!li'
        },

        computed: {

            item(ref, $el) {
                const {selItem} = ref;

                return query(selItem, $el);
            }

        },

        events: [

            {

                name: 'itemshown',

                self: true,

                el() {
                    return this.item;
                },

                handler() {
                    css(this.$el, this.getCss(.5));
                }

            },

            {
                name: 'itemin itemout',

                self: true,

                el() {
                    return this.item;
                },

                handler(ref) {
                    const {type} = ref;
                    const ref_detail = ref.detail;
                    const {percent} = ref_detail;
                    const {duration} = ref_detail;
                    const {timing} = ref_detail;
                    const {dir} = ref_detail;


                    Transition.cancel(this.$el);
                    css(this.$el, this.getCss(getCurrent(type, dir, percent)));

                    Transition.start(this.$el, this.getCss(isIn(type)
                        ? .5
                        : dir > 0
                            ? 1
                            : 0
                    ), duration, timing).catch(noop);

                }
            },

            {
                name: 'transitioncanceled transitionend',

                self: true,

                el() {
                    return this.item;
                },

                handler() {
                    Transition.cancel(this.$el);
                }

            },

            {
                name: 'itemtranslatein itemtranslateout',

                self: true,

                el() {
                    return this.item;
                },

                handler(ref) {
                    const {type} = ref;
                    const ref_detail = ref.detail;
                    const {percent} = ref_detail;
                    const {dir} = ref_detail;

                    Transition.cancel(this.$el);
                    css(this.$el, this.getCss(getCurrent(type, dir, percent)));
                }
            }

        ]

    };

    function isIn(type) {
        return endsWith(type, 'in');
    }

    function getCurrent(type, dir, percent) {

        percent /= 2;

        return !isIn(type)
            ? dir < 0
                ? percent
                : 1 - percent
            : dir < 0
                ? 1 - percent
                : percent;
    }

    const Animations$2 = { ...Animations, fade: {

        show() {
            return [
                {opacity: 0, zIndex: 0},
                {zIndex: -1}
            ];
        },

        percent(current) {
            return 1 - css(current, 'opacity');
        },

        translate(percent) {
            return [
                {opacity: 1 - percent, zIndex: 0},
                {zIndex: -1}
            ];
        }

    },

    scale: {

        show() {
            return [
                {opacity: 0, transform: scale3d(1 + .5), zIndex: 0},
                {zIndex: -1}
            ];
        },

        percent(current) {
            return 1 - css(current, 'opacity');
        },

        translate(percent) {
            return [
                {opacity: 1 - percent, transform: scale3d(1 + .5 * percent), zIndex: 0},
                {zIndex: -1}
            ];
        }

    },

    pull: {

        show(dir) {
            return dir < 0
                ? [
                    {transform: translate(30), zIndex: -1},
                    {transform: translate(), zIndex: 0}
                ]
                : [
                    {transform: translate(-100), zIndex: 0},
                    {transform: translate(), zIndex: -1}
                ];
        },

        percent(current, next, dir) {
            return dir < 0
                ? 1 - translated(next)
                : translated(current);
        },

        translate(percent, dir) {
            return dir < 0
                ? [
                    {transform: translate(30 * percent), zIndex: -1},
                    {transform: translate(-100 * (1 - percent)), zIndex: 0}
                ]
                : [
                    {transform: translate(-percent * 100), zIndex: 0},
                    {transform: translate(30 * (1 - percent)), zIndex: -1}
                ];
        }

    },

    push: {

        show(dir) {
            return dir < 0
                ? [
                    {transform: translate(100), zIndex: 0},
                    {transform: translate(), zIndex: -1}
                ]
                : [
                    {transform: translate(-30), zIndex: -1},
                    {transform: translate(), zIndex: 0}
                ];
        },

        percent(current, next, dir) {
            return dir > 0
                ? 1 - translated(next)
                : translated(current);
        },

        translate(percent, dir) {
            return dir < 0
                ? [
                    {transform: translate(percent * 100), zIndex: 0},
                    {transform: translate(-30 * (1 - percent)), zIndex: -1}
                ]
                : [
                    {transform: translate(-30 * percent), zIndex: -1},
                    {transform: translate(100 * (1 - percent)), zIndex: 0}
                ];
        }

    }};

    const Slideshow$1 = {

        mixins: [Class, Slideshow, SliderReactive],

        props: {
            ratio: String,
            minHeight: Number,
            maxHeight: Number
        },

        data: {
            ratio: '16:9',
            minHeight: false,
            maxHeight: false,
            selList: '.uk-slideshow-items',
            attrItem: 'uk-slideshow-item',
            selNav: '.uk-slideshow-nav',
            Animations: Animations$2
        },

        update: {

            read() {

                const ref = this.ratio.split(':').map(Number);
                const width = ref[0];
                let height = ref[1];

                height = height * this.list.offsetWidth / width || 0;

                if (this.minHeight) {
                    height = Math.max(this.minHeight, height);
                }

                if (this.maxHeight) {
                    height = Math.min(this.maxHeight, height);
                }

                return {height: height - boxModelAdjust(this.list, 'content-box')};
            },

            write(ref) {
                const {height} = ref;

                height > 0 && css(this.list, 'minHeight', height);
            },

            events: ['resize']

        }

    };

    const Sortable = {

        mixins: [Class, Animate],

        props: {
            group: String,
            threshold: Number,
            clsItem: String,
            clsPlaceholder: String,
            clsDrag: String,
            clsDragState: String,
            clsBase: String,
            clsNoDrag: String,
            clsEmpty: String,
            clsCustom: String,
            handle: String
        },

        data: {
            group: false,
            threshold: 5,
            clsItem: 'uk-sortable-item',
            clsPlaceholder: 'uk-sortable-placeholder',
            clsDrag: 'uk-sortable-drag',
            clsDragState: 'uk-drag',
            clsBase: 'uk-sortable',
            clsNoDrag: 'uk-sortable-nodrag',
            clsEmpty: 'uk-sortable-empty',
            clsCustom: '',
            handle: false
        },

        created() {
            const this$1 = this;

            ['init', 'start', 'move', 'end'].forEach(function (key) {
                const fn = this$1[key];
                this$1[key] = function (e) {
                    this$1.scrollY = window.pageYOffset;
                    const ref = getEventPos(e, 'page');
                    const {x} = ref;
                    const {y} = ref;
                    this$1.pos = {x, y};

                    fn(e);
                };
            });
        },

        events: {

            name: pointerDown,
            passive: false,
            handler: 'init'

        },

        update: {

            write() {

                if (this.clsEmpty) {
                    toggleClass(this.$el, this.clsEmpty, isEmpty(this.$el.children));
                }

                css(this.handle ? $$(this.handle, this.$el) : this.$el.children, {touchAction: 'none', userSelect: 'none'});

                if (this.drag) {

                    // clamp to viewport
                    const ref = offset(window);
                    const {right} = ref;
                    const {bottom} = ref;
                    offset(this.drag, {
                        top: clamp(this.pos.y + this.origin.top, 0, bottom - this.drag.offsetHeight),
                        left: clamp(this.pos.x + this.origin.left, 0, right - this.drag.offsetWidth)
                    });

                    trackScroll(this.pos);

                }

            }

        },

        methods: {

            init(e) {

                const {target} = e;
                const {button} = e;
                const {defaultPrevented} = e;
                const ref = toNodes(this.$el.children).filter(function (el) { return within(target, el); });
                const placeholder = ref[0];

                if (!placeholder
                    || defaultPrevented
                    || button > 0
                    || isInput(target)
                    || within(target, (`.${  this.clsNoDrag}`))
                    || this.handle && !within(target, this.handle)
                ) {
                    return;
                }

                e.preventDefault();

                this.touched = [this];
                this.placeholder = placeholder;
                this.origin = {target, index: index(placeholder), ...this.pos};

                on(document, pointerMove, this.move);
                on(document, pointerUp, this.end);
                on(window, 'scroll', this.scroll);

                if (!this.threshold) {
                    this.start(e);
                }

            },

            start(e) {

                this.drag = append(this.$container, this.placeholder.outerHTML.replace(/^<li/i, '<div').replace(/li>$/i, 'div>'));

                css(this.drag, {boxSizing: 'border-box',
                    width: this.placeholder.offsetWidth,
                    height: this.placeholder.offsetHeight,
                    overflow: 'hidden', ...css(this.placeholder, ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'])});
                attr(this.drag, 'uk-no-boot', '');
                addClass(this.drag, this.clsDrag, this.clsCustom);

                height(this.drag.firstElementChild, height(this.placeholder.firstElementChild));

                const ref = offset(this.placeholder);
                const {left} = ref;
                const {top} = ref;
                assign(this.origin, {left: left - this.pos.x, top: top - this.pos.y});

                addClass(this.placeholder, this.clsPlaceholder);
                addClass(this.$el.children, this.clsItem);
                addClass(document.documentElement, this.clsDragState);

                trigger(this.$el, 'start', [this, this.placeholder]);

                this.move(e);
            },

            move(e) {

                if (!this.drag) {

                    if (Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold) {
                        this.start(e);
                    }

                    return;
                }

                this.$emit();

                let target = e.type === 'mousemove' ? e.target : document.elementFromPoint(this.pos.x - window.pageXOffset, this.pos.y - window.pageYOffset);

                const sortable = this.getSortable(target);
                const previous = this.getSortable(this.placeholder);
                const move = sortable !== previous;

                if (!sortable || within(target, this.placeholder) || move && (!sortable.group || sortable.group !== previous.group)) {
                    return;
                }

                target = sortable.$el === target.parentNode && target || toNodes(sortable.$el.children).filter(function (element) { return within(target, element); })[0];

                if (move) {
                    previous.remove(this.placeholder);
                } else if (!target) {
                    return;
                }

                sortable.insert(this.placeholder, target);

                if (!includes(this.touched, sortable)) {
                    this.touched.push(sortable);
                }

            },

            end(e) {

                off(document, pointerMove, this.move);
                off(document, pointerUp, this.end);
                off(window, 'scroll', this.scroll);

                if (!this.drag) {
                    if (e.type === 'touchend') {
                        e.target.click();
                    }

                    return;
                }

                untrackScroll();

                const sortable = this.getSortable(this.placeholder);

                if (this === sortable) {
                    if (this.origin.index !== index(this.placeholder)) {
                        trigger(this.$el, 'moved', [this, this.placeholder]);
                    }
                } else {
                    trigger(sortable.$el, 'added', [sortable, this.placeholder]);
                    trigger(this.$el, 'removed', [this, this.placeholder]);
                }

                trigger(this.$el, 'stop', [this, this.placeholder]);

                remove(this.drag);
                this.drag = null;

                const classes = this.touched.map(function (sortable) { return (`${sortable.clsPlaceholder  } ${  sortable.clsItem}`); }).join(' ');
                this.touched.forEach(function (sortable) { return removeClass(sortable.$el.children, classes); });

                removeClass(document.documentElement, this.clsDragState);

            },

            scroll() {
                const scroll = window.pageYOffset;
                if (scroll !== this.scrollY) {
                    this.pos.y += scroll - this.scrollY;
                    this.scrollY = scroll;
                    this.$emit();
                }
            },

            insert(element, target) {
                const this$1 = this;


                addClass(this.$el.children, this.clsItem);

                const insert = function () {

                    if (target) {

                        if (!within(element, this$1.$el) || isPredecessor(element, target)) {
                            before(target, element);
                        } else {
                            after(target, element);
                        }

                    } else {
                        append(this$1.$el, element);
                    }

                };

                if (this.animation) {
                    this.animate(insert);
                } else {
                    insert();
                }

            },

            remove(element) {

                if (!within(element, this.$el)) {
                    return;
                }

                css(this.handle ? $$(this.handle, element) : element, {touchAction: '', userSelect: ''});

                if (this.animation) {
                    this.animate(function () { return remove(element); });
                } else {
                    remove(element);
                }

            },

            getSortable(element) {
                return element && (this.$getComponent(element, 'sortable') || this.getSortable(element.parentNode));
            }

        }

    };

    function isPredecessor(element, target) {
        return element.parentNode === target.parentNode && index(element) > index(target);
    }

    let trackTimer;
    function trackScroll(ref) {
        const {x} = ref;
        const {y} = ref;


        clearTimeout(trackTimer);

        scrollParents(document.elementFromPoint(x - window.pageXOffset, y - window.pageYOffset)).some(function (scrollEl) {

            let scroll = scrollEl.scrollTop;
            let {scrollHeight} = scrollEl;

            if (getScrollingElement() === scrollEl) {
                scrollEl = window;
                scrollHeight -= window.innerHeight;
            }

            const ref = offset(scrollEl);
            const {top} = ref;
            const {bottom} = ref;

            if (top < y && top + 30 > y) {
                scroll -= 5;
            } else if (bottom > y && bottom - 20 < y) {
                scroll += 5;
            }

            if (scroll > 0 && scroll < scrollHeight) {
                return trackTimer = setTimeout(function () {
                    scrollTop(scrollEl, scroll);
                    trackScroll({x, y});
                }, 10);
            }

        });

    }

    function untrackScroll() {
        clearTimeout(trackTimer);
    }

    const overflowRe = /auto|scroll/;

    function scrollParents(element) {
        const scrollEl = getScrollingElement();
        return parents$1(element, function (parent) { return parent === scrollEl || overflowRe.test(css(parent, 'overflow')); });
    }

    function parents$1(element, fn) {
        const parents = [];
        do {
            if (fn(element)) {
                parents.unshift(element);
            }
        } while (element && (element = element.parentElement));
        return parents;
    }

    function getScrollingElement() {
        return document.scrollingElement || document.documentElement;
    }

    let obj$1;

    const actives = [];

    const Tooltip = {

        mixins: [Container, Togglable, Position],

        args: 'title',

        props: {
            delay: Number,
            title: String
        },

        data: {
            pos: 'top',
            title: '',
            delay: 0,
            animation: ['uk-animation-scale-up'],
            duration: 100,
            cls: 'uk-active',
            clsPos: 'uk-tooltip'
        },

        beforeConnect() {
            this._hasTitle = hasAttr(this.$el, 'title');
            attr(this.$el, {title: '', 'aria-expanded': false});
        },

        disconnected() {
            this.hide();
            attr(this.$el, {title: this._hasTitle ? this.title : null, 'aria-expanded': null});
        },

        methods: {

            show() {
                const this$1 = this;


                if (this.isActive() || !this.title) {
                    return;
                }

                actives.forEach(function (active) { return active.hide(); });
                actives.push(this);

                this._unbind = on(document, pointerUp, function (e) { return !within(e.target, this$1.$el) && this$1.hide(); });

                clearTimeout(this.showTimer);
                this.showTimer = setTimeout(function () {
                    this$1._show();
                    this$1.hideTimer = setInterval(function () {

                        if (!isVisible(this$1.$el)) {
                            this$1.hide();
                        }

                    }, 150);
                }, this.delay);
            },

            hide() {

                if (!this.isActive() || matches(this.$el, 'input:focus')) {
                    return;
                }

                actives.splice(actives.indexOf(this), 1);

                clearTimeout(this.showTimer);
                clearInterval(this.hideTimer);
                attr(this.$el, 'aria-expanded', false);
                this.toggleElement(this.tooltip, false);
                this.tooltip && remove(this.tooltip);
                this.tooltip = false;
                this._unbind();

            },

            _show() {

                this.tooltip = append(this.container,
                    (`<div class="${  this.clsPos  }" aria-expanded="true" aria-hidden> <div class="${  this.clsPos  }-inner">${  this.title  }</div> </div>`)
                );

                this.positionAt(this.tooltip, this.$el);

                this.origin = this.getAxis() === 'y'
                    ? (`${flipPosition(this.dir)  }-${  this.align}`)
                    : (`${this.align  }-${  flipPosition(this.dir)}`);

                this.toggleElement(this.tooltip, true);

            },

            isActive() {
                return includes(actives, this);
            }

        },

        events: ( obj$1 = {

            focus: 'show',
            blur: 'hide'

        }, obj$1[(`${pointerEnter  } ${  pointerLeave}`)] = function (e) {
            if (isTouch(e)) {
                return;
            }
            e.type === pointerEnter
                ? this.show()
                : this.hide();
        }, obj$1[pointerDown] = function (e) {
            if (!isTouch(e)) {
                return;
            }
            this.isActive()
                ? this.hide()
                : this.show();
        }, obj$1 )

    };

    const Upload = {

        props: {
            allow: String,
            clsDragover: String,
            concurrent: Number,
            maxSize: Number,
            method: String,
            mime: String,
            msgInvalidMime: String,
            msgInvalidName: String,
            msgInvalidSize: String,
            multiple: Boolean,
            name: String,
            params: Object,
            type: String,
            url: String
        },

        data: {
            allow: false,
            clsDragover: 'uk-dragover',
            concurrent: 1,
            maxSize: 0,
            method: 'POST',
            mime: false,
            msgInvalidMime: 'Invalid File Type: %s',
            msgInvalidName: 'Invalid File Name: %s',
            msgInvalidSize: 'Invalid File Size: %s Kilobytes Max',
            multiple: false,
            name: 'files[]',
            params: {},
            type: '',
            url: '',
            abort: noop,
            beforeAll: noop,
            beforeSend: noop,
            complete: noop,
            completeAll: noop,
            error: noop,
            fail: noop,
            load: noop,
            loadEnd: noop,
            loadStart: noop,
            progress: noop
        },

        events: {

            change(e) {

                if (!matches(e.target, 'input[type="file"]')) {
                    return;
                }

                e.preventDefault();

                if (e.target.files) {
                    this.upload(e.target.files);
                }

                e.target.value = '';
            },

            drop(e) {
                stop(e);

                const transfer = e.dataTransfer;

                if (!transfer || !transfer.files) {
                    return;
                }

                removeClass(this.$el, this.clsDragover);

                this.upload(transfer.files);
            },

            dragenter(e) {
                stop(e);
            },

            dragover(e) {
                stop(e);
                addClass(this.$el, this.clsDragover);
            },

            dragleave(e) {
                stop(e);
                removeClass(this.$el, this.clsDragover);
            }

        },

        methods: {

            upload(files) {
                const this$1 = this;


                if (!files.length) {
                    return;
                }

                trigger(this.$el, 'upload', [files]);

                for (let i = 0; i < files.length; i++) {

                    if (this.maxSize && this.maxSize * 1000 < files[i].size) {
                        this.fail(this.msgInvalidSize.replace('%s', this.maxSize));
                        return;
                    }

                    if (this.allow && !match$1(this.allow, files[i].name)) {
                        this.fail(this.msgInvalidName.replace('%s', this.allow));
                        return;
                    }

                    if (this.mime && !match$1(this.mime, files[i].type)) {
                        this.fail(this.msgInvalidMime.replace('%s', this.mime));
                        return;
                    }

                }

                if (!this.multiple) {
                    files = [files[0]];
                }

                this.beforeAll(this, files);

                const chunks = chunk(files, this.concurrent);
                var upload = function (files) {

                    const data = new FormData();

                    files.forEach(function (file) { return data.append(this$1.name, file); });

                    for (const key in this$1.params) {
                        data.append(key, this$1.params[key]);
                    }

                    ajax(this$1.url, {
                        data,
                        method: this$1.method,
                        responseType: this$1.type,
                        beforeSend (env) {

                            const {xhr} = env;
                            xhr.upload && on(xhr.upload, 'progress', this$1.progress);
                            ['loadStart', 'load', 'loadEnd', 'abort'].forEach(function (type) { return on(xhr, type.toLowerCase(), this$1[type]); }
                            );

                            this$1.beforeSend(env);

                        }
                    }).then(
                        function (xhr) {

                            this$1.complete(xhr);

                            if (chunks.length) {
                                upload(chunks.shift());
                            } else {
                                this$1.completeAll(xhr);
                            }

                        },
                        function (e) { return this$1.error(e); }
                    );

                };

                upload(chunks.shift());

            }

        }

    };

    function match$1(pattern, path) {
        return path.match(new RegExp((`^${  pattern.replace(/\//g, '\\/').replace(/\*\*/g, '(\\/[^\\/]+)*').replace(/\*/g, '[^\\/]+').replace(/((?!\\))\?/g, '$1.')  }$`), 'i'));
    }

    function chunk(files, size) {
        const chunks = [];
        for (let i = 0; i < files.length; i += size) {
            const chunk = [];
            for (let j = 0; j < size; j++) {
                chunk.push(files[i + j]);
            }
            chunks.push(chunk);
        }
        return chunks;
    }

    function stop(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    UIkit.component('countdown', Countdown);
    UIkit.component('filter', Filter);
    UIkit.component('lightbox', Lightbox);
    UIkit.component('lightboxPanel', lightboxPanel);
    UIkit.component('notification', Notification);
    UIkit.component('parallax', Parallax$1);
    UIkit.component('slider', Slider$1);
    UIkit.component('sliderParallax', SlideshowParallax);
    UIkit.component('slideshow', Slideshow$1);
    UIkit.component('slideshowParallax', SlideshowParallax);
    UIkit.component('sortable', Sortable);
    UIkit.component('tooltip', Tooltip);
    UIkit.component('upload', Upload);

    {
        boot(UIkit);
    }

    return UIkit;

}));
