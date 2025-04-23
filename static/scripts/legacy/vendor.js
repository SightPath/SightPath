var e = Object.defineProperty
    , t = Object.defineProperties
    , s = Object.getOwnPropertyDescriptors
    , i = Object.getOwnPropertySymbols
    , r = Object.prototype.hasOwnProperty
    , n = Object.prototype.propertyIsEnumerable
    , a = (t, s, i) => s in t ? e(t, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: i
    }) : t[s] = i
    , o = (e, t) => {
        for (var s in t || (t = {}))
            r.call(t, s) && a(e, s, t[s]);
        if (i)
            for (var s of i(t))
                n.call(t, s) && a(e, s, t[s]);
        return e
    }
    , l = (e, i) => t(e, s(i));
function d(e) {
    return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
}
function c(e, t) {
    void 0 === e && (e = {}),
        void 0 === t && (t = {}),
        Object.keys(t).forEach((s => {
            void 0 === e[s] ? e[s] = t[s] : d(t[s]) && d(e[s]) && Object.keys(t[s]).length > 0 && c(e[s], t[s])
        }
        ))
}
const p = {
    body: {},
    addEventListener() { },
    removeEventListener() { },
    activeElement: {
        blur() { },
        nodeName: ""
    },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({
        initEvent() { }
    }),
    createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() { },
        getElementsByTagName: () => []
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    }
};
function u() {
    const e = "undefined" != typeof document ? document : {};
    return c(e, p),
        e
}
const f = {
    document: p,
    navigator: {
        userAgent: ""
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    },
    history: {
        replaceState() { },
        pushState() { },
        go() { },
        back() { }
    },
    CustomEvent: function () {
        return this
    },
    addEventListener() { },
    removeEventListener() { },
    getComputedStyle: () => ({
        getPropertyValue: () => ""
    }),
    Image() { },
    Date() { },
    screen: {},
    setTimeout() { },
    clearTimeout() { },
    matchMedia: () => ({}),
    requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(),
        null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e)
    }
};
function h() {
    const e = "undefined" != typeof window ? window : {};
    return c(e, f),
        e
}
function m(e, t) {
    return void 0 === t && (t = 0),
        setTimeout(e, t)
}
function v() {
    return Date.now()
}
function g(e, t) {
    void 0 === t && (t = "x");
    const s = h();
    let i, r, n;
    const a = function (e) {
        const t = h();
        let s;
        return t.getComputedStyle && (s = t.getComputedStyle(e, null)),
            !s && e.currentStyle && (s = e.currentStyle),
            s || (s = e.style),
            s
    }(e);
    return s.WebKitCSSMatrix ? (r = a.transform || a.webkitTransform,
        r.split(",").length > 6 && (r = r.split(", ").map((e => e.replace(",", "."))).join(", ")),
        n = new s.WebKitCSSMatrix("none" === r ? "" : r)) : (n = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
            i = n.toString().split(",")),
        "x" === t && (r = s.WebKitCSSMatrix ? n.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
        "y" === t && (r = s.WebKitCSSMatrix ? n.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])),
        r || 0
}
function w(e) {
    return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
}
function S(e) {
    return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType)
}
function T() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0])
        , t = ["__proto__", "constructor", "prototype"];
    for (let s = 1; s < arguments.length; s += 1) {
        const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
        if (null != i && !S(i)) {
            const s = Object.keys(Object(i)).filter((e => t.indexOf(e) < 0));
            for (let t = 0, r = s.length; t < r; t += 1) {
                const r = s[t]
                    , n = Object.getOwnPropertyDescriptor(i, r);
                void 0 !== n && n.enumerable && (w(e[r]) && w(i[r]) ? i[r].__swiper__ ? e[r] = i[r] : T(e[r], i[r]) : !w(e[r]) && w(i[r]) ? (e[r] = {},
                    i[r].__swiper__ ? e[r] = i[r] : T(e[r], i[r])) : e[r] = i[r])
            }
        }
    }
    return e
}
function b(e, t, s) {
    e.style.setProperty(t, s)
}
function y(e) {
    let { swiper: t, targetPosition: s, side: i } = e;
    const r = h()
        , n = -t.translate;
    let a, o = null;
    const l = t.params.speed;
    t.wrapperEl.style.scrollSnapType = "none",
        r.cancelAnimationFrame(t.cssModeFrameID);
    const d = s > n ? "next" : "prev"
        , c = (e, t) => "next" === d && e >= t || "prev" === d && e <= t
        , p = () => {
            a = (new Date).getTime(),
                null === o && (o = a);
            const e = Math.max(Math.min((a - o) / l, 1), 0)
                , d = .5 - Math.cos(e * Math.PI) / 2;
            let u = n + d * (s - n);
            if (c(u, s) && (u = s),
                t.wrapperEl.scrollTo({
                    [i]: u
                }),
                c(u, s))
                return t.wrapperEl.style.overflow = "hidden",
                    t.wrapperEl.style.scrollSnapType = "",
                    setTimeout((() => {
                        t.wrapperEl.style.overflow = "",
                            t.wrapperEl.scrollTo({
                                [i]: u
                            })
                    }
                    )),
                    void r.cancelAnimationFrame(t.cssModeFrameID);
            t.cssModeFrameID = r.requestAnimationFrame(p)
        }
        ;
    p()
}
function x(e, t) {
    void 0 === t && (t = "");
    const s = [...e.children];
    return e instanceof HTMLSlotElement && s.push(...e.assignedElements()),
        t ? s.filter((e => e.matches(t))) : s
}
function E(e) {
    try {
        return void console.warn(e)
    } catch (t) { }
}
function M(e, t) {
    void 0 === t && (t = []);
    const s = document.createElement(e);
    return s.classList.add(...Array.isArray(t) ? t : function (e) {
        return void 0 === e && (e = ""),
            e.trim().split(" ").filter((e => !!e.trim()))
    }(t)),
        s
}
function P(e, t) {
    return h().getComputedStyle(e, null).getPropertyValue(t)
}
function C(e) {
    let t, s = e;
    if (s) {
        for (t = 0; null !== (s = s.previousSibling);)
            1 === s.nodeType && (t += 1);
        return t
    }
}
function I(e, t, s) {
    const i = h();
    return s ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth
}
let L, O, k;
function A() {
    return L || (L = function () {
        const e = h()
            , t = u();
        return {
            smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior" in t.documentElement.style,
            touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch)
        }
    }()),
        L
}
function z(e) {
    return void 0 === e && (e = {}),
        O || (O = function (e) {
            let { userAgent: t } = void 0 === e ? {} : e;
            const s = A()
                , i = h()
                , r = i.navigator.platform
                , n = t || i.navigator.userAgent
                , a = {
                    ios: !1,
                    android: !1
                }
                , o = i.screen.width
                , l = i.screen.height
                , d = n.match(/(Android);?[\s\/]+([\d.]+)?/);
            let c = n.match(/(iPad).*OS\s([\d_]+)/);
            const p = n.match(/(iPod)(.*OS\s([\d_]+))?/)
                , u = !c && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
                , f = "Win32" === r;
            let m = "MacIntel" === r;
            return !c && m && s.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${o}x${l}`) >= 0 && (c = n.match(/(Version)\/([\d.]+)/),
                c || (c = [0, 1, "13_0_0"]),
                m = !1),
                d && !f && (a.os = "android",
                    a.android = !0),
                (c || u || p) && (a.os = "ios",
                    a.ios = !0),
                a
        }(e)),
        O
}
function G() {
    return k || (k = function () {
        const e = h()
            , t = z();
        let s = !1;
        function i() {
            const t = e.navigator.userAgent.toLowerCase();
            return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
        }
        if (i()) {
            const t = String(e.navigator.userAgent);
            if (t.includes("Version/")) {
                const [e, i] = t.split("Version/")[1].split(" ")[0].split(".").map((e => Number(e)));
                s = e < 16 || 16 === e && i < 2
            }
        }
        const r = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
            , n = i();
        return {
            isSafari: s || n,
            needPerspectiveFix: s,
            need3dFix: n || r && t.ios,
            isWebView: r
        }
    }()),
        k
}
const D = (e, t, s) => {
    t && !e.classList.contains(s) ? e.classList.add(s) : !t && e.classList.contains(s) && e.classList.remove(s)
    // if (t && !e.classList.contains(s)) {
    //     // so that swiper-slide-prev won't be visible in the fringe area
    //     if (!e.classList.contains("swiper-slide-prev")) {
    //         e.classList.add(s)
    //     }
    // } else {
    //     !t && e.classList.contains(s) && e.classList.remove(s)
    // }
};
const _ = (e, t, s) => {
    t && !e.classList.contains(s) ? e.classList.add(s) : !t && e.classList.contains(s) && e.classList.remove(s)
};
const V = (e, t) => {
    if (!e || e.destroyed || !e.params)
        return;
    const s = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
    if (s) {
        let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t && e.isElement && (s.shadowRoot ? t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame((() => {
            s.shadowRoot && (t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`),
                t && t.remove())
        }
        ))),
            t && t.remove()
    }
}
    , N = (e, t) => {
        if (!e.slides[t])
            return;
        const s = e.slides[t].querySelector('[loading="lazy"]');
        s && s.removeAttribute("loading")
    }
    , B = e => {
        if (!e || e.destroyed || !e.params)
            return;
        let t = e.params.lazyPreloadPrevNext;
        const s = e.slides.length;
        if (!s || !t || t < 0)
            return;
        t = Math.min(t, s);
        const i = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView)
            , r = e.activeIndex;
        if (e.params.grid && e.params.grid.rows > 1) {
            const s = r
                , n = [s - t];
            return n.push(...Array.from({
                length: t
            }).map(((e, t) => s + i + t))),
                void e.slides.forEach(((t, s) => {
                    n.includes(t.column) && N(e, s)
                }
                ))
        }
        const n = r + i - 1;
        if (e.params.rewind || e.params.loop)
            for (let a = r - t; a <= n + t; a += 1) {
                const t = (a % s + s) % s;
                (t < r || t > n) && N(e, t)
            }
        else
            for (let a = Math.max(r - t, 0); a <= Math.min(n + t, s - 1); a += 1)
                a !== r && (a > n || a < r) && N(e, a)
    }
    ;
function F(e) {
    let { swiper: t, runCallbacks: s, direction: i, step: r } = e;
    const { activeIndex: n, previousIndex: a } = t;
    let o = i;
    if (o || (o = n > a ? "next" : n < a ? "prev" : "reset"),
        t.emit(`transition${r}`),
        s && n !== a) {
        if ("reset" === o)
            return void t.emit(`slideResetTransition${r}`);
        t.emit(`slideChangeTransition${r}`),
            "next" === o ? t.emit(`slideNextTransition${r}`) : t.emit(`slidePrevTransition${r}`)
    }
}
function $(e, t, s) {
    const i = h()
        , { params: r } = e
        , n = r.edgeSwipeDetection
        , a = r.edgeSwipeThreshold;
    return !n || !(s <= a || s >= i.innerWidth - a) || "prevent" === n && (t.preventDefault(),
        !0)
}
function j(e) {
    const t = this
        , s = u();
    let i = e;
    i.originalEvent && (i = i.originalEvent);
    const r = t.touchEventsData;
    if ("pointerdown" === i.type) {
        if (null !== r.pointerId && r.pointerId !== i.pointerId)
            return;
        r.pointerId = i.pointerId
    } else
        "touchstart" === i.type && 1 === i.targetTouches.length && (r.touchId = i.targetTouches[0].identifier);
    if ("touchstart" === i.type)
        return void $(t, i, i.targetTouches[0].pageX);
    const { params: n, touches: a, enabled: o } = t;
    if (!o)
        return;
    if (!n.simulateTouch && "mouse" === i.pointerType)
        return;
    if (t.animating && n.preventInteractionOnTransition)
        return;
    !t.animating && n.cssMode && n.loop && t.loopFix();
    let l = i.target;
    if ("wrapper" === n.touchEventsTarget && !function (e, t) {
        const s = t.contains(e);
        if (!s && t instanceof HTMLSlotElement)
            return [...t.assignedElements()].includes(e);
        return s
    }(l, t.wrapperEl))
        return;
    if ("which" in i && 3 === i.which)
        return;
    if ("button" in i && i.button > 0)
        return;
    if (r.isTouched && r.isMoved)
        return;
    const d = !!n.noSwipingClass && "" !== n.noSwipingClass
        , c = i.composedPath ? i.composedPath() : i.path;
    d && i.target && i.target.shadowRoot && c && (l = c[0]);
    const p = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`
        , f = !(!i.target || !i.target.shadowRoot);
    if (n.noSwiping && (f ? function (e, t) {
        return void 0 === t && (t = this),
            function t(s) {
                if (!s || s === u() || s === h())
                    return null;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(e);
                return i || s.getRootNode ? i || t(s.getRootNode().host) : null
            }(t)
    }(p, l) : l.closest(p)))
        return void (t.allowClick = !0);
    if (n.swipeHandler && !l.closest(n.swipeHandler))
        return;
    a.currentX = i.pageX,
        a.currentY = i.pageY;
    const m = a.currentX
        , g = a.currentY;
    if (!$(t, i, m))
        return;
    Object.assign(r, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
    }),
        a.startX = m,
        a.startY = g,
        r.touchStartTime = v(),
        t.allowClick = !0,
        t.updateSize(),
        t.swipeDirection = void 0,
        n.threshold > 0 && (r.allowThresholdMove = !1);
    let w = !0;
    l.matches(r.focusableElements) && (w = !1,
        "SELECT" === l.nodeName && (r.isTouched = !1)),
        s.activeElement && s.activeElement.matches(r.focusableElements) && s.activeElement !== l && s.activeElement.blur();
    const S = w && t.allowTouchMove && n.touchStartPreventDefault;
    !n.touchStartForcePreventDefault && !S || l.isContentEditable || i.preventDefault(),
        n.freeMode && n.freeMode.enabled && t.freeMode && t.animating && !n.cssMode && t.freeMode.onTouchStart(),
        t.emit("touchStart", i)
}
function H(e) {
    const t = u()
        , s = this
        , i = s.touchEventsData
        , { params: r, touches: n, rtlTranslate: a, enabled: o } = s;
    if (!o)
        return;
    if (!r.simulateTouch && "mouse" === e.pointerType)
        return;
    let l, d = e;
    if (d.originalEvent && (d = d.originalEvent),
        "pointermove" === d.type) {
        if (null !== i.touchId)
            return;
        if (d.pointerId !== i.pointerId)
            return
    }
    if ("touchmove" === d.type) {
        if (l = [...d.changedTouches].filter((e => e.identifier === i.touchId))[0],
            !l || l.identifier !== i.touchId)
            return
    } else
        l = d;
    if (!i.isTouched)
        return void (i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", d));
    const c = l.pageX
        , p = l.pageY;
    if (d.preventedByNestedSwiper)
        return n.startX = c,
            void (n.startY = p);
    if (!s.allowTouchMove)
        return d.target.matches(i.focusableElements) || (s.allowClick = !1),
            void (i.isTouched && (Object.assign(n, {
                startX: c,
                startY: p,
                currentX: c,
                currentY: p
            }),
                i.touchStartTime = v()));
    if (r.touchReleaseOnEdges && !r.loop)
        if (s.isVertical()) {
            if (p < n.startY && s.translate <= s.maxTranslate() || p > n.startY && s.translate >= s.minTranslate())
                return i.isTouched = !1,
                    void (i.isMoved = !1)
        } else if (c < n.startX && s.translate <= s.maxTranslate() || c > n.startX && s.translate >= s.minTranslate())
            return;
    if (t.activeElement && d.target === t.activeElement && d.target.matches(i.focusableElements))
        return i.isMoved = !0,
            void (s.allowClick = !1);
    i.allowTouchCallbacks && s.emit("touchMove", d),
        n.previousX = n.currentX,
        n.previousY = n.currentY,
        n.currentX = c,
        n.currentY = p;
    const f = n.currentX - n.startX
        , h = n.currentY - n.startY;
    if (s.params.threshold && Math.sqrt(f ** 2 + h ** 2) < s.params.threshold)
        return;
    if (void 0 === i.isScrolling) {
        let e;
        s.isHorizontal() && n.currentY === n.startY || s.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : f * f + h * h >= 25 && (e = 180 * Math.atan2(Math.abs(h), Math.abs(f)) / Math.PI,
            i.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle)
    }
    if (i.isScrolling && s.emit("touchMoveOpposite", d),
        void 0 === i.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (i.startMoving = !0)),
        i.isScrolling || "touchmove" === d.type && i.preventTouchMoveFromPointerMove)
        return void (i.isTouched = !1);
    if (!i.startMoving)
        return;
    s.allowClick = !1,
        !r.cssMode && d.cancelable && d.preventDefault(),
        r.touchMoveStopPropagation && !r.nested && d.stopPropagation();
    let m = s.isHorizontal() ? f : h
        , g = s.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
    r.oneWayMovement && (m = Math.abs(m) * (a ? 1 : -1),
        g = Math.abs(g) * (a ? 1 : -1)),
        n.diff = m,
        m *= r.touchRatio,
        a && (m = -m,
            g = -g);
    const w = s.touchesDirection;
    s.swipeDirection = m > 0 ? "prev" : "next",
        s.touchesDirection = g > 0 ? "prev" : "next";
    const S = s.params.loop && !r.cssMode
        , T = "next" === s.touchesDirection && s.allowSlideNext || "prev" === s.touchesDirection && s.allowSlidePrev;
    if (!i.isMoved) {
        if (S && T && s.loopFix({
            direction: s.swipeDirection
        }),
            i.startTranslate = s.getTranslate(),
            s.setTransition(0),
            s.animating) {
            const e = new window.CustomEvent("transitionend", {
                bubbles: !0,
                cancelable: !0,
                detail: {
                    bySwiperTouchMove: !0
                }
            });
            s.wrapperEl.dispatchEvent(e)
        }
        i.allowMomentumBounce = !1,
            !r.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0),
            s.emit("sliderFirstMove", d)
    }
    if ((new Date).getTime(),
        i.isMoved && i.allowThresholdMove && w !== s.touchesDirection && S && T && Math.abs(m) >= 1)
        return Object.assign(n, {
            startX: c,
            startY: p,
            currentX: c,
            currentY: p,
            startTranslate: i.currentTranslate
        }),
            i.loopSwapReset = !0,
            void (i.startTranslate = i.currentTranslate);
    s.emit("sliderMove", d),
        i.isMoved = !0,
        i.currentTranslate = m + i.startTranslate;
    let b = !0
        , y = r.resistanceRatio;
    if (r.touchReleaseOnEdges && (y = 0),
        m > 0 ? (S && T && i.allowThresholdMove && i.currentTranslate > (r.centeredSlides ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1] - ("auto" !== r.slidesPerView && s.slides.length - r.slidesPerView >= 2 ? s.slidesSizesGrid[s.activeIndex + 1] + s.params.spaceBetween : 0) - s.params.spaceBetween : s.minTranslate()) && s.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0
        }),
            i.currentTranslate > s.minTranslate() && (b = !1,
                r.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + m) ** y))) : m < 0 && (S && T && i.allowThresholdMove && i.currentTranslate < (r.centeredSlides ? s.maxTranslate() + s.slidesSizesGrid[s.slidesSizesGrid.length - 1] + s.params.spaceBetween + ("auto" !== r.slidesPerView && s.slides.length - r.slidesPerView >= 2 ? s.slidesSizesGrid[s.slidesSizesGrid.length - 1] + s.params.spaceBetween : 0) : s.maxTranslate()) && s.loopFix({
                    direction: "next",
                    setTranslate: !0,
                    activeSlideIndex: s.slides.length - ("auto" === r.slidesPerView ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10)))
                }),
                    i.currentTranslate < s.maxTranslate() && (b = !1,
                        r.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - m) ** y))),
        b && (d.preventedByNestedSwiper = !0),
        !s.allowSlideNext && "next" === s.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
        !s.allowSlidePrev && "prev" === s.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
        s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate),
        r.threshold > 0) {
        if (!(Math.abs(m) > r.threshold || i.allowThresholdMove))
            return void (i.currentTranslate = i.startTranslate);
        if (!i.allowThresholdMove)
            return i.allowThresholdMove = !0,
                n.startX = n.currentX,
                n.startY = n.currentY,
                i.currentTranslate = i.startTranslate,
                void (n.diff = s.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY)
    }
    r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(),
        s.updateSlidesClasses()),
        r.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
        s.updateProgress(i.currentTranslate),
        s.setTranslate(i.currentTranslate))
}
function R(e) {
    const t = this
        , s = t.touchEventsData;
    let i, r = e;
    r.originalEvent && (r = r.originalEvent);
    if ("touchend" === r.type || "touchcancel" === r.type) {
        if (i = [...r.changedTouches].filter((e => e.identifier === s.touchId))[0],
            !i || i.identifier !== s.touchId)
            return
    } else {
        if (null !== s.touchId)
            return;
        if (r.pointerId !== s.pointerId)
            return;
        i = r
    }
    if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(r.type)) {
        if (!(["pointercancel", "contextmenu"].includes(r.type) && (t.browser.isSafari || t.browser.isWebView)))
            return
    }
    s.pointerId = null,
        s.touchId = null;
    const { params: n, touches: a, rtlTranslate: o, slidesGrid: l, enabled: d } = t;
    if (!d)
        return;
    if (!n.simulateTouch && "mouse" === r.pointerType)
        return;
    if (s.allowTouchCallbacks && t.emit("touchEnd", r),
        s.allowTouchCallbacks = !1,
        !s.isTouched)
        return s.isMoved && n.grabCursor && t.setGrabCursor(!1),
            s.isMoved = !1,
            void (s.startMoving = !1);
    n.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
    const c = v()
        , p = c - s.touchStartTime;
    if (t.allowClick) {
        const e = r.path || r.composedPath && r.composedPath();
        t.updateClickedSlide(e && e[0] || r.target, e),
            t.emit("tap click", r),
            p < 300 && c - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", r)
    }
    if (s.lastClickTime = v(),
        m((() => {
            t.destroyed || (t.allowClick = !0)
        }
        )),
        !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === a.diff && !s.loopSwapReset || s.currentTranslate === s.startTranslate && !s.loopSwapReset)
        return s.isTouched = !1,
            s.isMoved = !1,
            void (s.startMoving = !1);
    let u;
    if (s.isTouched = !1,
        s.isMoved = !1,
        s.startMoving = !1,
        u = n.followFinger ? o ? t.translate : -t.translate : -s.currentTranslate,
        n.cssMode)
        return;
    if (n.freeMode && n.freeMode.enabled)
        return void t.freeMode.onTouchEnd({
            currentPos: u
        });
    const f = u >= -t.maxTranslate() && !t.params.loop;
    let h = 0
        , g = t.slidesSizesGrid[0];
    for (let m = 0; m < l.length; m += m < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup) {
        const e = m < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
        void 0 !== l[m + e] ? (f || u >= l[m] && u < l[m + e]) && (h = m,
            g = l[m + e] - l[m]) : (f || u >= l[m]) && (h = m,
                g = l[l.length - 1] - l[l.length - 2])
    }
    let w = null
        , S = null;
    n.rewind && (t.isBeginning ? S = n.virtual && n.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (w = 0));
    const T = (u - l[h]) / g
        , b = h < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
    if (p > n.longSwipesMs) {
        if (!n.longSwipes)
            return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection && (T >= n.longSwipesRatio ? t.slideTo(n.rewind && t.isEnd ? w : h + b) : t.slideTo(h)),
            "prev" === t.swipeDirection && (T > 1 - n.longSwipesRatio ? t.slideTo(h + b) : null !== S && T < 0 && Math.abs(T) > n.longSwipesRatio ? t.slideTo(S) : t.slideTo(h))
    } else {
        if (!n.shortSwipes)
            return void t.slideTo(t.activeIndex);
        t.navigation && (r.target === t.navigation.nextEl || r.target === t.navigation.prevEl) ? r.target === t.navigation.nextEl ? t.slideTo(h + b) : t.slideTo(h) : ("next" === t.swipeDirection && t.slideTo(null !== w ? w : h + b),
            "prev" === t.swipeDirection && t.slideTo(null !== S ? S : h))
    }
}
function W() {
    const e = this
        , { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth)
        return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: r, snapGrid: n } = e
        , a = e.virtual && e.params.virtual.enabled;
    e.allowSlideNext = !0,
        e.allowSlidePrev = !0,
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses();
    const o = a && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || o ? e.params.loop && !a ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0),
        e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout),
            e.autoplay.resizeTimeout = setTimeout((() => {
                e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume()
            }
            ), 500)),
        e.allowSlidePrev = r,
        e.allowSlideNext = i,
        e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow()
}
function Y(e) {
    const t = this;
    t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation && t.animating && (e.stopPropagation(),
            e.stopImmediatePropagation())))
}
function q() {
    const e = this
        , { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i)
        return;
    let r;
    e.previousTranslate = e.translate,
        e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop,
        0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
    const n = e.maxTranslate() - e.minTranslate();
    r = 0 === n ? 0 : (e.translate - e.minTranslate()) / n,
        r !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1)
}
function X(e) {
    const t = this;
    V(t, e.target),
        t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update()
}
function U() {
    const e = this;
    e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0,
        e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"))
}
const K = (e, t) => {
    const s = u()
        , { params: i, el: r, wrapperEl: n, device: a } = e
        , o = !!i.nested
        , l = "on" === t ? "addEventListener" : "removeEventListener"
        , d = t;
    r && "string" != typeof r && (s[l]("touchstart", e.onDocumentTouchStart, {
        passive: !1,
        capture: o
    }),
        r[l]("touchstart", e.onTouchStart, {
            passive: !1
        }),
        r[l]("pointerdown", e.onTouchStart, {
            passive: !1
        }),
        s[l]("touchmove", e.onTouchMove, {
            passive: !1,
            capture: o
        }),
        s[l]("pointermove", e.onTouchMove, {
            passive: !1,
            capture: o
        }),
        s[l]("touchend", e.onTouchEnd, {
            passive: !0
        }),
        s[l]("pointerup", e.onTouchEnd, {
            passive: !0
        }),
        s[l]("pointercancel", e.onTouchEnd, {
            passive: !0
        }),
        s[l]("touchcancel", e.onTouchEnd, {
            passive: !0
        }),
        s[l]("pointerout", e.onTouchEnd, {
            passive: !0
        }),
        s[l]("pointerleave", e.onTouchEnd, {
            passive: !0
        }),
        s[l]("contextmenu", e.onTouchEnd, {
            passive: !0
        }),
        (i.preventClicks || i.preventClicksPropagation) && r[l]("click", e.onClick, !0),
        i.cssMode && n[l]("scroll", e.onScroll),
        i.updateOnWindowResize ? e[d](a.ios || a.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", W, !0) : e[d]("observerUpdate", W, !0),
        r[l]("load", e.onLoad, {
            capture: !0
        }))
}
    ;
const J = (e, t) => e.grid && t.grid && t.grid.rows > 1;
var Q = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: .5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: .85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1
};
function Z(e, t) {
    return function (s) {
        void 0 === s && (s = {});
        const i = Object.keys(s)[0]
            , r = s[i];
        "object" == typeof r && null !== r ? (!0 === e[i] && (e[i] = {
            enabled: !0
        }),
            "navigation" === i && e[i] && e[i].enabled && !e[i].prevEl && !e[i].nextEl && (e[i].auto = !0),
            ["pagination", "scrollbar"].indexOf(i) >= 0 && e[i] && e[i].enabled && !e[i].el && (e[i].auto = !0),
            i in e && "enabled" in r ? ("object" != typeof e[i] || "enabled" in e[i] || (e[i].enabled = !0),
                e[i] || (e[i] = {
                    enabled: !1
                }),
                T(t, s)) : T(t, s)) : T(t, s)
    }
}
const ee = {
    eventsEmitter: {
        on(e, t, s) {
            const i = this;
            if (!i.eventsListeners || i.destroyed)
                return i;
            if ("function" != typeof t)
                return i;
            const r = s ? "unshift" : "push";
            return e.split(" ").forEach((e => {
                i.eventsListeners[e] || (i.eventsListeners[e] = []),
                    i.eventsListeners[e][r](t)
            }
            )),
                i
        },
        once(e, t, s) {
            const i = this;
            if (!i.eventsListeners || i.destroyed)
                return i;
            if ("function" != typeof t)
                return i;
            function r() {
                i.off(e, r),
                    r.__emitterProxy && delete r.__emitterProxy;
                for (var s = arguments.length, n = new Array(s), a = 0; a < s; a++)
                    n[a] = arguments[a];
                t.apply(i, n)
            }
            return r.__emitterProxy = t,
                i.on(e, r, s)
        },
        onAny(e, t) {
            const s = this;
            if (!s.eventsListeners || s.destroyed)
                return s;
            if ("function" != typeof e)
                return s;
            const i = t ? "unshift" : "push";
            return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e),
                s
        },
        offAny(e) {
            const t = this;
            if (!t.eventsListeners || t.destroyed)
                return t;
            if (!t.eventsAnyListeners)
                return t;
            const s = t.eventsAnyListeners.indexOf(e);
            return s >= 0 && t.eventsAnyListeners.splice(s, 1),
                t
        },
        off(e, t) {
            const s = this;
            return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach((e => {
                void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach(((i, r) => {
                    (i === t || i.__emitterProxy && i.__emitterProxy === t) && s.eventsListeners[e].splice(r, 1)
                }
                ))
            }
            )),
                s) : s
        },
        emit() {
            const e = this;
            if (!e.eventsListeners || e.destroyed)
                return e;
            if (!e.eventsListeners)
                return e;
            let t, s, i;
            for (var r = arguments.length, n = new Array(r), a = 0; a < r; a++)
                n[a] = arguments[a];
            "string" == typeof n[0] || Array.isArray(n[0]) ? (t = n[0],
                s = n.slice(1, n.length),
                i = e) : (t = n[0].events,
                    s = n[0].data,
                    i = n[0].context || e),
                s.unshift(i);
            return (Array.isArray(t) ? t : t.split(" ")).forEach((t => {
                e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((e => {
                    e.apply(i, [t, ...s])
                }
                )),
                    e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach((e => {
                        e.apply(i, s)
                    }
                    ))
            }
            )),
                e
        }
    },
    update: {
        updateSize: function () {
            const e = this;
            let t, s;
            const i = e.el;
            t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i.clientWidth,
                s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i.clientHeight,
                0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(P(i, "padding-left") || 0, 10) - parseInt(P(i, "padding-right") || 0, 10),
                    s = s - parseInt(P(i, "padding-top") || 0, 10) - parseInt(P(i, "padding-bottom") || 0, 10),
                    Number.isNaN(t) && (t = 0),
                    Number.isNaN(s) && (s = 0),
                    Object.assign(e, {
                        width: t,
                        height: s,
                        size: e.isHorizontal() ? t : s
                    }))
        },
        updateSlides: function () {
            const e = this;
            function t(t, s) {
                return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0)
            }
            const s = e.params
                , { wrapperEl: i, slidesEl: r, size: n, rtlTranslate: a, wrongRTL: o } = e
                , l = e.virtual && s.virtual.enabled
                , d = l ? e.virtual.slides.length : e.slides.length
                , c = x(r, `.${e.params.slideClass}, swiper-slide`)
                , p = l ? e.virtual.slides.length : c.length;
            let u = [];
            const f = []
                , h = [];
            let m = s.slidesOffsetBefore;
            "function" == typeof m && (m = s.slidesOffsetBefore.call(e));
            let v = s.slidesOffsetAfter;
            "function" == typeof v && (v = s.slidesOffsetAfter.call(e));
            const g = e.snapGrid.length
                , w = e.slidesGrid.length;
            let S = s.spaceBetween
                , T = -m
                , y = 0
                , E = 0;
            if (void 0 === n)
                return;
            "string" == typeof S && S.indexOf("%") >= 0 ? S = parseFloat(S.replace("%", "")) / 100 * n : "string" == typeof S && (S = parseFloat(S)),
                e.virtualSize = -S,
                c.forEach((e => {
                    a ? e.style.marginLeft = "" : e.style.marginRight = "",
                        e.style.marginBottom = "",
                        e.style.marginTop = ""
                }
                )),
                s.centeredSlides && s.cssMode && (b(i, "--swiper-centered-offset-before", ""),
                    b(i, "--swiper-centered-offset-after", ""));
            const M = s.grid && s.grid.rows > 1 && e.grid;
            let C;
            M ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
            const L = "auto" === s.slidesPerView && s.breakpoints && Object.keys(s.breakpoints).filter((e => void 0 !== s.breakpoints[e].slidesPerView)).length > 0;
            for (let b = 0; b < p; b += 1) {
                let i;
                if (C = 0,
                    c[b] && (i = c[b]),
                    M && e.grid.updateSlide(b, i, c),
                    !c[b] || "none" !== P(i, "display")) {
                    if ("auto" === s.slidesPerView) {
                        L && (c[b].style[e.getDirectionLabel("width")] = "");
                        const r = getComputedStyle(i)
                            , n = i.style.transform
                            , a = i.style.webkitTransform;
                        if (n && (i.style.transform = "none"),
                            a && (i.style.webkitTransform = "none"),
                            s.roundLengths)
                            C = e.isHorizontal() ? I(i, "width", !0) : I(i, "height", !0);
                        else {
                            const e = t(r, "width")
                                , s = t(r, "padding-left")
                                , n = t(r, "padding-right")
                                , a = t(r, "margin-left")
                                , o = t(r, "margin-right")
                                , l = r.getPropertyValue("box-sizing");
                            if (l && "border-box" === l)
                                C = e + a + o;
                            else {
                                const { clientWidth: t, offsetWidth: r } = i;
                                C = e + s + n + a + o + (r - t)
                            }
                        }
                        n && (i.style.transform = n),
                            a && (i.style.webkitTransform = a),
                            s.roundLengths && (C = Math.floor(C))
                    } else
                        C = (n - (s.slidesPerView - 1) * S) / s.slidesPerView,
                            s.roundLengths && (C = Math.floor(C)),
                            c[b] && (c[b].style[e.getDirectionLabel("width")] = `${C}px`);
                    c[b] && (c[b].swiperSlideSize = C),
                        h.push(C),
                        s.centeredSlides ? (T = T + C / 2 + y / 2 + S,
                            0 === y && 0 !== b && (T = T - n / 2 - S),
                            0 === b && (T = T - n / 2 - S),
                            Math.abs(T) < .001 && (T = 0),
                            s.roundLengths && (T = Math.floor(T)),
                            E % s.slidesPerGroup == 0 && u.push(T),
                            f.push(T)) : (s.roundLengths && (T = Math.floor(T)),
                                (E - Math.min(e.params.slidesPerGroupSkip, E)) % e.params.slidesPerGroup == 0 && u.push(T),
                                f.push(T),
                                T = T + C + S),
                        e.virtualSize += C + S,
                        y = C,
                        E += 1
                }
            }
            if (e.virtualSize = Math.max(e.virtualSize, n) + v,
                a && o && ("slide" === s.effect || "coverflow" === s.effect) && (i.style.width = `${e.virtualSize + S}px`),
                s.setWrapperSize && (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + S}px`),
                M && e.grid.updateWrapperSize(C, u),
                !s.centeredSlides) {
                const t = [];
                for (let i = 0; i < u.length; i += 1) {
                    let r = u[i];
                    s.roundLengths && (r = Math.floor(r)),
                        u[i] <= e.virtualSize - n && t.push(r)
                }
                u = t,
                    Math.floor(e.virtualSize - n) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - n)
            }
            if (l && s.loop) {
                const t = h[0] + S;
                if (s.slidesPerGroup > 1) {
                    const i = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / s.slidesPerGroup)
                        , r = t * s.slidesPerGroup;
                    for (let e = 0; e < i; e += 1)
                        u.push(u[u.length - 1] + r)
                }
                for (let i = 0; i < e.virtual.slidesBefore + e.virtual.slidesAfter; i += 1)
                    1 === s.slidesPerGroup && u.push(u[u.length - 1] + t),
                        f.push(f[f.length - 1] + t),
                        e.virtualSize += t
            }
            if (0 === u.length && (u = [0]),
                0 !== S) {
                const t = e.isHorizontal() && a ? "marginLeft" : e.getDirectionLabel("marginRight");
                c.filter(((e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1)).forEach((e => {
                    e.style[t] = `${S}px`
                }
                ))
            }
            if (s.centeredSlides && s.centeredSlidesBounds) {
                let e = 0;
                h.forEach((t => {
                    e += t + (S || 0)
                }
                )),
                    e -= S;
                const t = e - n;
                u = u.map((e => e <= 0 ? -m : e > t ? t + v : e))
            }
            if (s.centerInsufficientSlides) {
                let e = 0;
                h.forEach((t => {
                    e += t + (S || 0)
                }
                )),
                    e -= S;
                const t = (s.slidesOffsetBefore || 0) + (s.slidesOffsetAfter || 0);
                if (e + t < n) {
                    const s = (n - e - t) / 2;
                    u.forEach(((e, t) => {
                        u[t] = e - s
                    }
                    )),
                        f.forEach(((e, t) => {
                            f[t] = e + s
                        }
                        ))
                }
            }
            if (Object.assign(e, {
                slides: c,
                snapGrid: u,
                slidesGrid: f,
                slidesSizesGrid: h
            }),
                s.centeredSlides && s.cssMode && !s.centeredSlidesBounds) {
                b(i, "--swiper-centered-offset-before", -u[0] + "px"),
                    b(i, "--swiper-centered-offset-after", e.size / 2 - h[h.length - 1] / 2 + "px");
                const t = -e.snapGrid[0]
                    , s = -e.slidesGrid[0];
                e.snapGrid = e.snapGrid.map((e => e + t)),
                    e.slidesGrid = e.slidesGrid.map((e => e + s))
            }
            if (p !== d && e.emit("slidesLengthChange"),
                u.length !== g && (e.params.watchOverflow && e.checkOverflow(),
                    e.emit("snapGridLengthChange")),
                f.length !== w && e.emit("slidesGridLengthChange"),
                s.watchSlidesProgress && e.updateSlidesOffset(),
                e.emit("slidesUpdated"),
                !(l || s.cssMode || "slide" !== s.effect && "fade" !== s.effect)) {
                const t = `${s.containerModifierClass}backface-hidden`
                    , i = e.el.classList.contains(t);
                p <= s.maxBackfaceHiddenSlides ? i || e.el.classList.add(t) : i && e.el.classList.remove(t)
            }
        },
        updateAutoHeight: function (e) {
            const t = this
                , s = []
                , i = t.virtual && t.params.virtual.enabled;
            let r, n = 0;
            "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
            const a = e => i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
            if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                if (t.params.centeredSlides)
                    (t.visibleSlides || []).forEach((e => {
                        s.push(e)
                    }
                    ));
                else
                    for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
                        const e = t.activeIndex + r;
                        if (e > t.slides.length && !i)
                            break;
                        s.push(a(e))
                    }
            else
                s.push(a(t.activeIndex));
            for (r = 0; r < s.length; r += 1)
                if (void 0 !== s[r]) {
                    const e = s[r].offsetHeight;
                    n = e > n ? e : n
                }
            (n || 0 === n) && (t.wrapperEl.style.height = `${n}px`)
        },
        updateSlidesOffset: function () {
            const e = this
                , t = e.slides
                , s = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
            for (let i = 0; i < t.length; i += 1)
                t[i].swiperSlideOffset = (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) - s - e.cssOverflowAdjustment()
        },
        updateSlidesProgress: function (e) {
            void 0 === e && (e = this && this.translate || 0);
            const t = this
                , s = t.params
                , { slides: i, rtlTranslate: r, snapGrid: n } = t;
            if (0 === i.length)
                return;
            void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
            let a = -e;
            r && (a = e),
                t.visibleSlidesIndexes = [],
                t.visibleSlides = [];
            let o = s.spaceBetween;
            "string" == typeof o && o.indexOf("%") >= 0 ? o = parseFloat(o.replace("%", "")) / 100 * t.size : "string" == typeof o && (o = parseFloat(o));
            for (let l = 0; l < i.length; l += 1) {
                const e = i[l];
                let d = e.swiperSlideOffset;
                s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
                const c = (a + (s.centeredSlides ? t.minTranslate() : 0) - d) / (e.swiperSlideSize + o)
                    , p = (a - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) / (e.swiperSlideSize + o)
                    , u = -(a - d)
                    , f = u + t.slidesSizesGrid[l]
                    , h = u >= 0 && u <= t.size - t.slidesSizesGrid[l]
                    , m = u >= 0 && u < t.size - 1 || f > 1 && f <= t.size || u <= 0 && f >= t.size;
                m && (t.visibleSlides.push(e),
                    t.visibleSlidesIndexes.push(l)),
                    D(e, m, s.slideVisibleClass),
                    D(e, h, s.slideFullyVisibleClass),
                    e.progress = r ? -c : c,
                    e.originalProgress = r ? -p : p
            }
        },
        updateProgress: function (e) {
            const t = this;
            if (void 0 === e) {
                const s = t.rtlTranslate ? -1 : 1;
                e = t && t.translate && t.translate * s || 0
            }
            const s = t.params
                , i = t.maxTranslate() - t.minTranslate();
            let { progress: r, isBeginning: n, isEnd: a, progressLoop: o } = t;
            const l = n
                , d = a;
            if (0 === i)
                r = 0,
                    n = !0,
                    a = !0;
            else {
                r = (e - t.minTranslate()) / i;
                const s = Math.abs(e - t.minTranslate()) < 1
                    , o = Math.abs(e - t.maxTranslate()) < 1;
                n = s || r <= 0,
                    a = o || r >= 1,
                    s && (r = 0),
                    o && (r = 1)
            }
            if (s.loop) {
                const s = t.getSlideIndexByData(0)
                    , i = t.getSlideIndexByData(t.slides.length - 1)
                    , r = t.slidesGrid[s]
                    , n = t.slidesGrid[i]
                    , a = t.slidesGrid[t.slidesGrid.length - 1]
                    , l = Math.abs(e);
                o = l >= r ? (l - r) / a : (l + a - n) / a,
                    o > 1 && (o -= 1)
            }
            Object.assign(t, {
                progress: r,
                progressLoop: o,
                isBeginning: n,
                isEnd: a
            }),
                (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e),
                n && !l && t.emit("reachBeginning toEdge"),
                a && !d && t.emit("reachEnd toEdge"),
                (l && !n || d && !a) && t.emit("fromEdge"),
                t.emit("progress", r)
        },
        updateSlidesClasses: function () {
            const e = this
                , { slides: t, params: s, slidesEl: i, activeIndex: r } = e
                , n = e.virtual && s.virtual.enabled
                , a = e.grid && s.grid && s.grid.rows > 1
                , o = e => x(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
            let l, d, c;
            if (n)
                if (s.loop) {
                    let t = r - e.virtual.slidesBefore;
                    t < 0 && (t = e.virtual.slides.length + t),
                        t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
                        l = o(`[data-swiper-slide-index="${t}"]`)
                } else
                    l = o(`[data-swiper-slide-index="${r}"]`);
            else
                a ? (l = t.filter((e => e.column === r))[0],
                    c = t.filter((e => e.column === r + 1))[0],
                    d = t.filter((e => e.column === r - 1))[0]) : l = t[r];
            l && (a || (c = function (e, t) {
                const s = [];
                for (; e.nextElementSibling;) {
                    const i = e.nextElementSibling;
                    t ? i.matches(t) && s.push(i) : s.push(i),
                        e = i
                }
                return s
            }(l, `.${s.slideClass}, swiper-slide`)[0],
                s.loop && !c && (c = t[0]),
                d = function (e, t) {
                    const s = [];
                    for (; e.previousElementSibling;) {
                        const i = e.previousElementSibling;
                        t ? i.matches(t) && s.push(i) : s.push(i),
                            e = i
                    }
                    return s
                }(l, `.${s.slideClass}, swiper-slide`)[0],
                s.loop && 0 === !d && (d = t[t.length - 1]))),
                t.forEach((e => {
                    _(e, e === l, s.slideActiveClass),
                        _(e, e === c, s.slideNextClass),
                        _(e, e === d, s.slidePrevClass)
                }
                )),
                e.emitSlidesClasses()
        },
        updateActiveIndex: function (e) {
            const t = this
                , s = t.rtlTranslate ? t.translate : -t.translate
                , { snapGrid: i, params: r, activeIndex: n, realIndex: a, snapIndex: o } = t;
            let l, d = e;
            const c = e => {
                let s = e - t.virtual.slidesBefore;
                return s < 0 && (s = t.virtual.slides.length + s),
                    s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
                    s
            }
                ;
            if (void 0 === d && (d = function (e) {
                const { slidesGrid: t, params: s } = e
                    , i = e.rtlTranslate ? e.translate : -e.translate;
                let r;
                for (let n = 0; n < t.length; n += 1)
                    void 0 !== t[n + 1] ? i >= t[n] && i < t[n + 1] - (t[n + 1] - t[n]) / 2 ? r = n : i >= t[n] && i < t[n + 1] && (r = n + 1) : i >= t[n] && (r = n);
                return s.normalizeSlideIndex && (r < 0 || void 0 === r) && (r = 0),
                    r
            }(t)),
                i.indexOf(s) >= 0)
                l = i.indexOf(s);
            else {
                const e = Math.min(r.slidesPerGroupSkip, d);
                l = e + Math.floor((d - e) / r.slidesPerGroup)
            }
            if (l >= i.length && (l = i.length - 1),
                d === n && !t.params.loop)
                return void (l !== o && (t.snapIndex = l,
                    t.emit("snapIndexChange")));
            if (d === n && t.params.loop && t.virtual && t.params.virtual.enabled)
                return void (t.realIndex = c(d));
            const p = t.grid && r.grid && r.grid.rows > 1;
            let u;
            if (t.virtual && r.virtual.enabled && r.loop)
                u = c(d);
            else if (p) {
                const e = t.slides.filter((e => e.column === d))[0];
                let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
                Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
                    u = Math.floor(s / r.grid.rows)
            } else if (t.slides[d]) {
                const e = t.slides[d].getAttribute("data-swiper-slide-index");
                u = e ? parseInt(e, 10) : d
            } else
                u = d;
            Object.assign(t, {
                previousSnapIndex: o,
                snapIndex: l,
                previousRealIndex: a,
                realIndex: u,
                previousIndex: n,
                activeIndex: d
            }),
                t.initialized && B(t),
                t.emit("activeIndexChange"),
                t.emit("snapIndexChange"),
                (t.initialized || t.params.runCallbacksOnInit) && (a !== u && t.emit("realIndexChange"),
                    t.emit("slideChange"))
        },
        updateClickedSlide: function (e, t) {
            const s = this
                , i = s.params;
            let r = e.closest(`.${i.slideClass}, swiper-slide`);
            !r && s.isElement && t && t.length > 1 && t.includes(e) && [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e => {
                !r && e.matches && e.matches(`.${i.slideClass}, swiper-slide`) && (r = e)
            }
            ));
            let n, a = !1;
            if (r)
                for (let o = 0; o < s.slides.length; o += 1)
                    if (s.slides[o] === r) {
                        a = !0,
                            n = o;
                        break
                    }
            if (!r || !a)
                return s.clickedSlide = void 0,
                    void (s.clickedIndex = void 0);
            s.clickedSlide = r,
                s.virtual && s.params.virtual.enabled ? s.clickedIndex = parseInt(r.getAttribute("data-swiper-slide-index"), 10) : s.clickedIndex = n,
                i.slideToClickedSlide && void 0 !== s.clickedIndex && s.clickedIndex !== s.activeIndex && s.slideToClickedSlide()
        }
    },
    translate: {
        getTranslate: function (e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            const { params: t, rtlTranslate: s, translate: i, wrapperEl: r } = this;
            if (t.virtualTranslate)
                return s ? -i : i;
            if (t.cssMode)
                return i;
            let n = g(r, e);
            return n += this.cssOverflowAdjustment(),
                s && (n = -n),
                n || 0
        },
        setTranslate: function (e, t) {
            const s = this
                , { rtlTranslate: i, params: r, wrapperEl: n, progress: a } = s;
            let o, l = 0, d = 0;
            s.isHorizontal() ? l = i ? -e : e : d = e,
                r.roundLengths && (l = Math.floor(l),
                    d = Math.floor(d)),
                s.previousTranslate = s.translate,
                s.translate = s.isHorizontal() ? l : d,
                r.cssMode ? n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -l : -d : r.virtualTranslate || (s.isHorizontal() ? l -= s.cssOverflowAdjustment() : d -= s.cssOverflowAdjustment(),
                    n.style.transform = `translate3d(${l}px, ${d}px, 0px)`);
            const c = s.maxTranslate() - s.minTranslate();
            o = 0 === c ? 0 : (e - s.minTranslate()) / c,
                o !== a && s.updateProgress(e),
                s.emit("setTranslate", s.translate, t)
        },
        minTranslate: function () {
            return -this.snapGrid[0]
        },
        maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1]
        },
        translateTo: function (e, t, s, i, r) {
            void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === s && (s = !0),
                void 0 === i && (i = !0);
            const n = this
                , { params: a, wrapperEl: o } = n;
            if (n.animating && a.preventInteractionOnTransition)
                return !1;
            const l = n.minTranslate()
                , d = n.maxTranslate();
            let c;
            if (c = i && e > l ? l : i && e < d ? d : e,
                n.updateProgress(c),
                a.cssMode) {
                const e = n.isHorizontal();
                if (0 === t)
                    o[e ? "scrollLeft" : "scrollTop"] = -c;
                else {
                    if (!n.support.smoothScroll)
                        return y({
                            swiper: n,
                            targetPosition: -c,
                            side: e ? "left" : "top"
                        }),
                            !0;
                    o.scrollTo({
                        [e ? "left" : "top"]: -c,
                        behavior: "smooth"
                    })
                }
                return !0
            }
            return 0 === t ? (n.setTransition(0),
                n.setTranslate(c),
                s && (n.emit("beforeTransitionStart", t, r),
                    n.emit("transitionEnd"))) : (n.setTransition(t),
                        n.setTranslate(c),
                        s && (n.emit("beforeTransitionStart", t, r),
                            n.emit("transitionStart")),
                        n.animating || (n.animating = !0,
                            n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function (e) {
                                n && !n.destroyed && e.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd),
                                    n.onTranslateToWrapperTransitionEnd = null,
                                    delete n.onTranslateToWrapperTransitionEnd,
                                    n.animating = !1,
                                    s && n.emit("transitionEnd"))
                            }
                            ),
                            n.wrapperEl.addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd))),
                !0
        }
    },
    transition: {
        setTransition: function (e, t) {
            const s = this;
            s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`,
                s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : ""),
                s.emit("setTransition", e, t)
        },
        transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            const s = this
                , { params: i } = s;
            i.cssMode || (i.autoHeight && s.updateAutoHeight(),
                F({
                    swiper: s,
                    runCallbacks: e,
                    direction: t,
                    step: "Start"
                }))
        },
        transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            const s = this
                , { params: i } = s;
            s.animating = !1,
                i.cssMode || (s.setTransition(0),
                    F({
                        swiper: s,
                        runCallbacks: e,
                        direction: t,
                        step: "End"
                    }))
        }
    },
    slide: {
        slideTo: function (e, t, s, i, r) {
            void 0 === e && (e = 0),
                void 0 === s && (s = !0),
                "string" == typeof e && (e = parseInt(e, 10));
            const n = this;
            let a = e;
            a < 0 && (a = 0);
            const { params: o, snapGrid: l, slidesGrid: d, previousIndex: c, activeIndex: p, rtlTranslate: u, wrapperEl: f, enabled: h } = n;
            if (!h && !i && !r || n.destroyed || n.animating && o.preventInteractionOnTransition)
                return !1;
            void 0 === t && (t = n.params.speed);
            const m = Math.min(n.params.slidesPerGroupSkip, a);
            let v = m + Math.floor((a - m) / n.params.slidesPerGroup);
            v >= l.length && (v = l.length - 1);
            const g = -l[v];
            if (o.normalizeSlideIndex)
                for (let S = 0; S < d.length; S += 1) {
                    const e = -Math.floor(100 * g)
                        , t = Math.floor(100 * d[S])
                        , s = Math.floor(100 * d[S + 1]);
                    void 0 !== d[S + 1] ? e >= t && e < s - (s - t) / 2 ? a = S : e >= t && e < s && (a = S + 1) : e >= t && (a = S)
                }
            if (n.initialized && a !== p) {
                if (!n.allowSlideNext && (u ? g > n.translate && g > n.minTranslate() : g < n.translate && g < n.minTranslate()))
                    return !1;
                if (!n.allowSlidePrev && g > n.translate && g > n.maxTranslate() && (p || 0) !== a)
                    return !1
            }
            let w;
            if (a !== (c || 0) && s && n.emit("beforeSlideChangeStart"),
                n.updateProgress(g),
                w = a > p ? "next" : a < p ? "prev" : "reset",
                u && -g === n.translate || !u && g === n.translate)
                return n.updateActiveIndex(a),
                    o.autoHeight && n.updateAutoHeight(),
                    n.updateSlidesClasses(),
                    "slide" !== o.effect && n.setTranslate(g),
                    "reset" !== w && (n.transitionStart(s, w),
                        n.transitionEnd(s, w)),
                    !1;
            if (o.cssMode) {
                const e = n.isHorizontal()
                    , s = u ? g : -g;
                if (0 === t) {
                    const t = n.virtual && n.params.virtual.enabled;
                    t && (n.wrapperEl.style.scrollSnapType = "none",
                        n._immediateVirtual = !0),
                        t && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0,
                            requestAnimationFrame((() => {
                                f[e ? "scrollLeft" : "scrollTop"] = s
                            }
                            ))) : f[e ? "scrollLeft" : "scrollTop"] = s,
                        t && requestAnimationFrame((() => {
                            n.wrapperEl.style.scrollSnapType = "",
                                n._immediateVirtual = !1
                        }
                        ))
                } else {
                    if (!n.support.smoothScroll)
                        return y({
                            swiper: n,
                            targetPosition: s,
                            side: e ? "left" : "top"
                        }),
                            !0;
                    f.scrollTo({
                        [e ? "left" : "top"]: s,
                        behavior: "smooth"
                    })
                }
                return !0
            }
            return n.setTransition(t),
                n.setTranslate(g),
                n.updateActiveIndex(a),
                n.updateSlidesClasses(),
                n.emit("beforeTransitionStart", t, i),
                n.transitionStart(s, w),
                0 === t ? n.transitionEnd(s, w) : n.animating || (n.animating = !0,
                    n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function (e) {
                        n && !n.destroyed && e.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd),
                            n.onSlideToWrapperTransitionEnd = null,
                            delete n.onSlideToWrapperTransitionEnd,
                            n.transitionEnd(s, w))
                    }
                    ),
                    n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)),
                !0
        },
        slideToLoop: function (e, t, s, i) {
            if (void 0 === e && (e = 0),
                void 0 === s && (s = !0),
                "string" == typeof e) {
                e = parseInt(e, 10)
            }
            const r = this;
            if (r.destroyed)
                return;
            void 0 === t && (t = r.params.speed);
            const n = r.grid && r.params.grid && r.params.grid.rows > 1;
            let a = e;
            if (r.params.loop)
                if (r.virtual && r.params.virtual.enabled)
                    a += r.virtual.slidesBefore;
                else {
                    let e;
                    if (n) {
                        const t = a * r.params.grid.rows;
                        e = r.slides.filter((e => 1 * e.getAttribute("data-swiper-slide-index") === t))[0].column
                    } else
                        e = r.getSlideIndexByData(a);
                    const t = n ? Math.ceil(r.slides.length / r.params.grid.rows) : r.slides.length
                        , { centeredSlides: s } = r.params;
                    let o = r.params.slidesPerView;
                    "auto" === o ? o = r.slidesPerViewDynamic() : (o = Math.ceil(parseFloat(r.params.slidesPerView, 10)),
                        s && o % 2 == 0 && (o += 1));
                    let l = t - e < o;
                    if (s && (l = l || e < Math.ceil(o / 2)),
                        i && s && "auto" !== r.params.slidesPerView && !n && (l = !1),
                        l) {
                        const i = s ? e < r.activeIndex ? "prev" : "next" : e - r.activeIndex - 1 < r.params.slidesPerView ? "next" : "prev";
                        r.loopFix({
                            direction: i,
                            slideTo: !0,
                            activeSlideIndex: "next" === i ? e + 1 : e - t + 1,
                            slideRealIndex: "next" === i ? r.realIndex : void 0
                        })
                    }
                    if (n) {
                        const e = a * r.params.grid.rows;
                        a = r.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0].column
                    } else
                        a = r.getSlideIndexByData(a)
                }
            return requestAnimationFrame((() => {
                r.slideTo(a, t, s, i)
            }
            )),
                r
        },
        slideNext: function (e, t, s) {
            void 0 === t && (t = !0);
            const i = this
                , { enabled: r, params: n, animating: a } = i;
            if (!r || i.destroyed)
                return i;
            void 0 === e && (e = i.params.speed);
            let o = n.slidesPerGroup;
            "auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
            const l = i.activeIndex < n.slidesPerGroupSkip ? 1 : o
                , d = i.virtual && n.virtual.enabled;
            if (n.loop) {
                if (a && !d && n.loopPreventsSliding)
                    return !1;
                if (i.loopFix({
                    direction: "next"
                }),
                    i._clientLeft = i.wrapperEl.clientLeft,
                    i.activeIndex === i.slides.length - 1 && n.cssMode)
                    return requestAnimationFrame((() => {
                        i.slideTo(i.activeIndex + l, e, t, s)
                    }
                    )),
                        !0
            }
            return n.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + l, e, t, s)
        },
        slidePrev: function (e, t, s) {
            void 0 === t && (t = !0);
            const i = this
                , { params: r, snapGrid: n, slidesGrid: a, rtlTranslate: o, enabled: l, animating: d } = i;
            if (!l || i.destroyed)
                return i;
            void 0 === e && (e = i.params.speed);
            const c = i.virtual && r.virtual.enabled;
            if (r.loop) {
                if (d && !c && r.loopPreventsSliding)
                    return !1;
                i.loopFix({
                    direction: "prev"
                }),
                    i._clientLeft = i.wrapperEl.clientLeft
            }
            function p(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            const u = p(o ? i.translate : -i.translate)
                , f = n.map((e => p(e)));
            let h = n[f.indexOf(u) - 1];
            if (void 0 === h && r.cssMode) {
                let e;
                n.forEach(((t, s) => {
                    u >= t && (e = s)
                }
                )),
                    void 0 !== e && (h = n[e > 0 ? e - 1 : e])
            }
            let m = 0;
            if (void 0 !== h && (m = a.indexOf(h),
                m < 0 && (m = i.activeIndex - 1),
                "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (m = m - i.slidesPerViewDynamic("previous", !0) + 1,
                    m = Math.max(m, 0))),
                r.rewind && i.isBeginning) {
                const r = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
                return i.slideTo(r, e, t, s)
            }
            return r.loop && 0 === i.activeIndex && r.cssMode ? (requestAnimationFrame((() => {
                i.slideTo(m, e, t, s)
            }
            )),
                !0) : i.slideTo(m, e, t, s)
        },
        slideReset: function (e, t, s) {
            void 0 === t && (t = !0);
            const i = this;
            if (!i.destroyed)
                return void 0 === e && (e = i.params.speed),
                    i.slideTo(i.activeIndex, e, t, s)
        },
        slideToClosest: function (e, t, s, i) {
            void 0 === t && (t = !0),
                void 0 === i && (i = .5);
            const r = this;
            if (r.destroyed)
                return;
            void 0 === e && (e = r.params.speed);
            let n = r.activeIndex;
            const a = Math.min(r.params.slidesPerGroupSkip, n)
                , o = a + Math.floor((n - a) / r.params.slidesPerGroup)
                , l = r.rtlTranslate ? r.translate : -r.translate;
            if (l >= r.snapGrid[o]) {
                const e = r.snapGrid[o];
                l - e > (r.snapGrid[o + 1] - e) * i && (n += r.params.slidesPerGroup)
            } else {
                const e = r.snapGrid[o - 1];
                l - e <= (r.snapGrid[o] - e) * i && (n -= r.params.slidesPerGroup)
            }
            return n = Math.max(n, 0),
                n = Math.min(n, r.slidesGrid.length - 1),
                r.slideTo(n, e, t, s)
        },
        slideToClickedSlide: function () {
            const e = this;
            if (e.destroyed)
                return;
            const { params: t, slidesEl: s } = e
                , i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
            let r, n = e.clickedIndex;
            const a = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
            if (t.loop) {
                if (e.animating)
                    return;
                r = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10),
                    t.centeredSlides ? n < e.loopedSlides - i / 2 || n > e.slides.length - e.loopedSlides + i / 2 ? (e.loopFix(),
                        n = e.getSlideIndex(x(s, `${a}[data-swiper-slide-index="${r}"]`)[0]),
                        m((() => {
                            e.slideTo(n)
                        }
                        ))) : e.slideTo(n) : n > e.slides.length - i ? (e.loopFix(),
                            n = e.getSlideIndex(x(s, `${a}[data-swiper-slide-index="${r}"]`)[0]),
                            m((() => {
                                e.slideTo(n)
                            }
                            ))) : e.slideTo(n)
            } else
                e.slideTo(n)
        }
    },
    loop: {
        loopCreate: function (e) {
            const t = this
                , { params: s, slidesEl: i } = t;
            if (!s.loop || t.virtual && t.params.virtual.enabled)
                return;
            const r = () => {
                x(i, `.${s.slideClass}, swiper-slide`).forEach(((e, t) => {
                    e.setAttribute("data-swiper-slide-index", t)
                }
                ))
            }
                , n = t.grid && s.grid && s.grid.rows > 1
                , a = s.slidesPerGroup * (n ? s.grid.rows : 1)
                , o = t.slides.length % a != 0
                , l = n && t.slides.length % s.grid.rows != 0
                , d = e => {
                    for (let i = 0; i < e; i += 1) {
                        const e = t.isElement ? M("swiper-slide", [s.slideBlankClass]) : M("div", [s.slideClass, s.slideBlankClass]);
                        t.slidesEl.append(e)
                    }
                }
                ;
            if (o) {
                if (s.loopAddBlankSlides) {
                    d(a - t.slides.length % a),
                        t.recalcSlides(),
                        t.updateSlides()
                } else
                    E("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
                r()
            } else if (l) {
                if (s.loopAddBlankSlides) {
                    d(s.grid.rows - t.slides.length % s.grid.rows),
                        t.recalcSlides(),
                        t.updateSlides()
                } else
                    E("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
                r()
            } else
                r();
            t.loopFix({
                slideRealIndex: e,
                direction: s.centeredSlides ? void 0 : "next"
            })
        },
        loopFix: function (e) {
            let { slideRealIndex: t, slideTo: s = !0, direction: i, setTranslate: r, activeSlideIndex: n, byController: a, byMousewheel: d } = void 0 === e ? {} : e;
            const c = this;
            if (!c.params.loop)
                return;
            c.emit("beforeLoopFix");
            const { slides: p, allowSlidePrev: u, allowSlideNext: f, slidesEl: h, params: m } = c
                , { centeredSlides: v } = m;
            if (c.allowSlidePrev = !0,
                c.allowSlideNext = !0,
                c.virtual && m.virtual.enabled)
                return s && (m.centeredSlides || 0 !== c.snapIndex ? m.centeredSlides && c.snapIndex < m.slidesPerView ? c.slideTo(c.virtual.slides.length + c.snapIndex, 0, !1, !0) : c.snapIndex === c.snapGrid.length - 1 && c.slideTo(c.virtual.slidesBefore, 0, !1, !0) : c.slideTo(c.virtual.slides.length, 0, !1, !0)),
                    c.allowSlidePrev = u,
                    c.allowSlideNext = f,
                    void c.emit("loopFix");
            let g = m.slidesPerView;
            "auto" === g ? g = c.slidesPerViewDynamic() : (g = Math.ceil(parseFloat(m.slidesPerView, 10)),
                v && g % 2 == 0 && (g += 1));
            const w = m.slidesPerGroupAuto ? g : m.slidesPerGroup;
            let S = w;
            S % w != 0 && (S += w - S % w),
                S += m.loopAdditionalSlides,
                c.loopedSlides = S;
            const T = c.grid && m.grid && m.grid.rows > 1;
            p.length < g + S ? E("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : T && "row" === m.grid.fill && E("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
            const b = []
                , y = [];
            let x = c.activeIndex;
            void 0 === n ? n = c.getSlideIndex(p.filter((e => e.classList.contains(m.slideActiveClass)))[0]) : x = n;
            const M = "next" === i || !i
                , P = "prev" === i || !i;
            let C = 0
                , I = 0;
            const L = T ? Math.ceil(p.length / m.grid.rows) : p.length
                , O = (T ? p[n].column : n) + (v && void 0 === r ? -g / 2 + .5 : 0);
            if (O < S) {
                C = Math.max(S - O, w);
                for (let e = 0; e < S - O; e += 1) {
                    const t = e - Math.floor(e / L) * L;
                    if (T) {
                        const e = L - t - 1;
                        for (let t = p.length - 1; t >= 0; t -= 1)
                            p[t].column === e && b.push(t)
                    } else
                        b.push(L - t - 1)
                }
            } else if (O + g > L - S) {
                I = Math.max(O - (L - 2 * S), w);
                for (let e = 0; e < I; e += 1) {
                    const t = e - Math.floor(e / L) * L;
                    T ? p.forEach(((e, s) => {
                        e.column === t && y.push(s)
                    }
                    )) : y.push(t)
                }
            }
            if (c.__preventObserver__ = !0,
                requestAnimationFrame((() => {
                    c.__preventObserver__ = !1
                }
                )),
                P && b.forEach((e => {
                    p[e].swiperLoopMoveDOM = !0,
                        h.prepend(p[e]),
                        p[e].swiperLoopMoveDOM = !1
                }
                )),
                M && y.forEach((e => {
                    p[e].swiperLoopMoveDOM = !0,
                        h.append(p[e]),
                        p[e].swiperLoopMoveDOM = !1
                }
                )),
                c.recalcSlides(),
                "auto" === m.slidesPerView ? c.updateSlides() : T && (b.length > 0 && P || y.length > 0 && M) && c.slides.forEach(((e, t) => {
                    c.grid.updateSlide(t, e, c.slides)
                }
                )),
                m.watchSlidesProgress && c.updateSlidesOffset(),
                s)
                if (b.length > 0 && P) {
                    if (void 0 === t) {
                        const e = c.slidesGrid[x]
                            , t = c.slidesGrid[x + C] - e;
                        d ? c.setTranslate(c.translate - t) : (c.slideTo(x + Math.ceil(C), 0, !1, !0),
                            r && (c.touchEventsData.startTranslate = c.touchEventsData.startTranslate - t,
                                c.touchEventsData.currentTranslate = c.touchEventsData.currentTranslate - t))
                    } else if (r) {
                        const e = T ? b.length / m.grid.rows : b.length;
                        c.slideTo(c.activeIndex + e, 0, !1, !0),
                            c.touchEventsData.currentTranslate = c.translate
                    }
                } else if (y.length > 0 && M)
                    if (void 0 === t) {
                        const e = c.slidesGrid[x]
                            , t = c.slidesGrid[x - I] - e;
                        d ? c.setTranslate(c.translate - t) : (c.slideTo(x - I, 0, !1, !0),
                            r && (c.touchEventsData.startTranslate = c.touchEventsData.startTranslate - t,
                                c.touchEventsData.currentTranslate = c.touchEventsData.currentTranslate - t))
                    } else {
                        const e = T ? y.length / m.grid.rows : y.length;
                        c.slideTo(c.activeIndex - e, 0, !1, !0)
                    }
            if (c.allowSlidePrev = u,
                c.allowSlideNext = f,
                c.controller && c.controller.control && !a) {
                const e = {
                    slideRealIndex: t,
                    direction: i,
                    setTranslate: r,
                    activeSlideIndex: n,
                    byController: !0
                };
                Array.isArray(c.controller.control) ? c.controller.control.forEach((t => {
                    !t.destroyed && t.params.loop && t.loopFix(l(o({}, e), {
                        slideTo: t.params.slidesPerView === m.slidesPerView && s
                    }))
                }
                )) : c.controller.control instanceof c.constructor && c.controller.control.params.loop && c.controller.control.loopFix(l(o({}, e), {
                    slideTo: c.controller.control.params.slidesPerView === m.slidesPerView && s
                }))
            }
            c.emit("loopFix")
        },
        loopDestroy: function () {
            const e = this
                , { params: t, slidesEl: s } = e;
            if (!t.loop || e.virtual && e.params.virtual.enabled)
                return;
            e.recalcSlides();
            const i = [];
            e.slides.forEach((e => {
                const t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex;
                i[t] = e
            }
            )),
                e.slides.forEach((e => {
                    e.removeAttribute("data-swiper-slide-index")
                }
                )),
                i.forEach((e => {
                    s.append(e)
                }
                )),
                e.recalcSlides(),
                e.slideTo(e.realIndex, 0)
        }
    },
    grabCursor: {
        setGrabCursor: function (e) {
            const t = this;
            if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)
                return;
            const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
            t.isElement && (t.__preventObserver__ = !0),
                s.style.cursor = "move",
                s.style.cursor = e ? "grabbing" : "grab",
                t.isElement && requestAnimationFrame((() => {
                    t.__preventObserver__ = !1
                }
                ))
        },
        unsetGrabCursor: function () {
            const e = this;
            e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0),
                e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "",
                e.isElement && requestAnimationFrame((() => {
                    e.__preventObserver__ = !1
                }
                )))
        }
    },
    events: {
        attachEvents: function () {
            const e = this
                , { params: t } = e;
            e.onTouchStart = j.bind(e),
                e.onTouchMove = H.bind(e),
                e.onTouchEnd = R.bind(e),
                e.onDocumentTouchStart = U.bind(e),
                t.cssMode && (e.onScroll = q.bind(e)),
                e.onClick = Y.bind(e),
                e.onLoad = X.bind(e),
                K(e, "on")
        },
        detachEvents: function () {
            K(this, "off")
        }
    },
    breakpoints: {
        setBreakpoint: function () {
            const e = this
                , { realIndex: t, initialized: s, params: i, el: r } = e
                , n = i.breakpoints;
            if (!n || n && 0 === Object.keys(n).length)
                return;
            const a = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
            if (!a || e.currentBreakpoint === a)
                return;
            const o = (a in n ? n[a] : void 0) || e.originalParams
                , l = J(e, i)
                , d = J(e, o)
                , c = e.params.grabCursor
                , p = o.grabCursor
                , u = i.enabled;
            l && !d ? (r.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`),
                e.emitContainerClasses()) : !l && d && (r.classList.add(`${i.containerModifierClass}grid`),
                    (o.grid.fill && "column" === o.grid.fill || !o.grid.fill && "column" === i.grid.fill) && r.classList.add(`${i.containerModifierClass}grid-column`),
                    e.emitContainerClasses()),
                c && !p ? e.unsetGrabCursor() : !c && p && e.setGrabCursor(),
                ["navigation", "pagination", "scrollbar"].forEach((t => {
                    if (void 0 === o[t])
                        return;
                    const s = i[t] && i[t].enabled
                        , r = o[t] && o[t].enabled;
                    s && !r && e[t].disable(),
                        !s && r && e[t].enable()
                }
                ));
            const f = o.direction && o.direction !== i.direction
                , h = i.loop && (o.slidesPerView !== i.slidesPerView || f)
                , m = i.loop;
            f && s && e.changeDirection(),
                T(e.params, o);
            const v = e.params.enabled
                , g = e.params.loop;
            Object.assign(e, {
                allowTouchMove: e.params.allowTouchMove,
                allowSlideNext: e.params.allowSlideNext,
                allowSlidePrev: e.params.allowSlidePrev
            }),
                u && !v ? e.disable() : !u && v && e.enable(),
                e.currentBreakpoint = a,
                e.emit("_beforeBreakpoint", o),
                s && (h ? (e.loopDestroy(),
                    e.loopCreate(t),
                    e.updateSlides()) : !m && g ? (e.loopCreate(t),
                        e.updateSlides()) : m && !g && e.loopDestroy()),
                e.emit("breakpoint", o)
        },
        getBreakpoint: function (e, t, s) {
            if (void 0 === t && (t = "window"),
                !e || "container" === t && !s)
                return;
            let i = !1;
            const r = h()
                , n = "window" === t ? r.innerHeight : s.clientHeight
                , a = Object.keys(e).map((e => {
                    if ("string" == typeof e && 0 === e.indexOf("@")) {
                        const t = parseFloat(e.substr(1));
                        return {
                            value: n * t,
                            point: e
                        }
                    }
                    return {
                        value: e,
                        point: e
                    }
                }
                ));
            a.sort(((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10)));
            for (let o = 0; o < a.length; o += 1) {
                const { point: e, value: n } = a[o];
                "window" === t ? r.matchMedia(`(min-width: ${n}px)`).matches && (i = e) : n <= s.clientWidth && (i = e)
            }
            return i || "max"
        }
    },
    checkOverflow: {
        checkOverflow: function () {
            const e = this
                , { isLocked: t, params: s } = e
                , { slidesOffsetBefore: i } = s;
            if (i) {
                const t = e.slides.length - 1
                    , s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                e.isLocked = e.size > s
            } else
                e.isLocked = 1 === e.snapGrid.length;
            !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                t && t !== e.isLocked && (e.isEnd = !1),
                t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
        }
    },
    classes: {
        addClasses: function () {
            const e = this
                , { classNames: t, params: s, rtl: i, el: r, device: n } = e
                , a = function (e, t) {
                    const s = [];
                    return e.forEach((e => {
                        "object" == typeof e ? Object.keys(e).forEach((i => {
                            e[i] && s.push(t + i)
                        }
                        )) : "string" == typeof e && s.push(t + e)
                    }
                    )),
                        s
                }(["initialized", s.direction, {
                    "free-mode": e.params.freeMode && s.freeMode.enabled
                }, {
                        autoheight: s.autoHeight
                    }, {
                        rtl: i
                    }, {
                        grid: s.grid && s.grid.rows > 1
                    }, {
                        "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
                    }, {
                        android: n.android
                    }, {
                        ios: n.ios
                    }, {
                        "css-mode": s.cssMode
                    }, {
                        centered: s.cssMode && s.centeredSlides
                    }, {
                        "watch-progress": s.watchSlidesProgress
                    }], s.containerModifierClass);
            t.push(...a),
                r.classList.add(...t),
                e.emitContainerClasses()
        },
        removeClasses: function () {
            const { el: e, classNames: t } = this;
            e && "string" != typeof e && (e.classList.remove(...t),
                this.emitContainerClasses())
        }
    }
}
    , te = {};
class se {
    constructor() {
        let e, t;
        for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++)
            i[r] = arguments[r];
        1 === i.length && i[0].constructor && "Object" === Object.prototype.toString.call(i[0]).slice(8, -1) ? t = i[0] : [e, t] = i,
            t || (t = {}),
            t = T({}, t),
            e && !t.el && (t.el = e);
        const n = u();
        if (t.el && "string" == typeof t.el && n.querySelectorAll(t.el).length > 1) {
            const e = [];
            return n.querySelectorAll(t.el).forEach((s => {
                const i = T({}, t, {
                    el: s
                });
                e.push(new se(i))
            }
            )),
                e
        }
        const a = this;
        a.__swiper__ = !0,
            a.support = A(),
            a.device = z({
                userAgent: t.userAgent
            }),
            a.browser = G(),
            a.eventsListeners = {},
            a.eventsAnyListeners = [],
            a.modules = [...a.__modules__],
            t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules);
        const o = {};
        a.modules.forEach((e => {
            e({
                params: t,
                swiper: a,
                extendParams: Z(t, o),
                on: a.on.bind(a),
                once: a.once.bind(a),
                off: a.off.bind(a),
                emit: a.emit.bind(a)
            })
        }
        ));
        const l = T({}, Q, o);
        return a.params = T({}, l, te, t),
            a.originalParams = T({}, a.params),
            a.passedParams = T({}, t),
            a.params && a.params.on && Object.keys(a.params.on).forEach((e => {
                a.on(e, a.params.on[e])
            }
            )),
            a.params && a.params.onAny && a.onAny(a.params.onAny),
            Object.assign(a, {
                enabled: a.params.enabled,
                el: e,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: () => "horizontal" === a.params.direction,
                isVertical: () => "vertical" === a.params.direction,
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
                },
                allowSlideNext: a.params.allowSlideNext,
                allowSlidePrev: a.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: a.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    pointerId: null,
                    touchId: null
                },
                allowClick: !0,
                allowTouchMove: a.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            }),
            a.emit("_swiper"),
            a.params.init && a.init(),
            a
    }
    getDirectionLabel(e) {
        return this.isHorizontal() ? e : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom"
        }[e]
    }
    getSlideIndex(e) {
        const { slidesEl: t, params: s } = this
            , i = C(x(t, `.${s.slideClass}, swiper-slide`)[0]);
        return C(e) - i
    }
    getSlideIndexByData(e) {
        return this.getSlideIndex(this.slides.filter((t => 1 * t.getAttribute("data-swiper-slide-index") === e))[0])
    }
    recalcSlides() {
        const { slidesEl: e, params: t } = this;
        this.slides = x(e, `.${t.slideClass}, swiper-slide`)
    }
    enable() {
        const e = this;
        e.enabled || (e.enabled = !0,
            e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"))
    }
    disable() {
        const e = this;
        e.enabled && (e.enabled = !1,
            e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"))
    }
    setProgress(e, t) {
        const s = this;
        e = Math.min(Math.max(e, 0), 1);
        const i = s.minTranslate()
            , r = (s.maxTranslate() - i) * e + i;
        s.translateTo(r, void 0 === t ? 0 : t),
            s.updateActiveIndex(),
            s.updateSlidesClasses()
    }
    emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el)
            return;
        const t = e.el.className.split(" ").filter((t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass)));
        e.emit("_containerClasses", t.join(" "))
    }
    getSlideClasses(e) {
        const t = this;
        return t.destroyed ? "" : e.className.split(" ").filter((e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))).join(" ")
    }
    emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el)
            return;
        const t = [];
        e.slides.forEach((s => {
            const i = e.getSlideClasses(s);
            t.push({
                slideEl: s,
                classNames: i
            }),
                e.emit("_slideClass", s, i)
        }
        )),
            e.emit("_slideClasses", t)
    }
    slidesPerViewDynamic(e, t) {
        void 0 === e && (e = "current"),
            void 0 === t && (t = !1);
        const { params: s, slides: i, slidesGrid: r, slidesSizesGrid: n, size: a, activeIndex: o } = this;
        let l = 1;
        if ("number" == typeof s.slidesPerView)
            return s.slidesPerView;
        if (s.centeredSlides) {
            let e, t = i[o] ? Math.ceil(i[o].swiperSlideSize) : 0;
            for (let s = o + 1; s < i.length; s += 1)
                i[s] && !e && (t += Math.ceil(i[s].swiperSlideSize),
                    l += 1,
                    t > a && (e = !0));
            for (let s = o - 1; s >= 0; s -= 1)
                i[s] && !e && (t += i[s].swiperSlideSize,
                    l += 1,
                    t > a && (e = !0))
        } else if ("current" === e)
            for (let d = o + 1; d < i.length; d += 1) {
                (t ? r[d] + n[d] - r[o] < a : r[d] - r[o] < a) && (l += 1)
            }
        else
            for (let d = o - 1; d >= 0; d -= 1) {
                r[o] - r[d] < a && (l += 1)
            }
        return l
    }
    update() {
        const e = this;
        if (!e || e.destroyed)
            return;
        const { snapGrid: t, params: s } = e;
        function i() {
            const t = e.rtlTranslate ? -1 * e.translate : e.translate
                , s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            e.setTranslate(s),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
        }
        let r;
        if (s.breakpoints && e.setBreakpoint(),
            [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t => {
                t.complete && V(e, t)
            }
            )),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            s.freeMode && s.freeMode.enabled && !s.cssMode)
            i(),
                s.autoHeight && e.updateAutoHeight();
        else {
            if (("auto" === s.slidesPerView || s.slidesPerView > 1) && e.isEnd && !s.centeredSlides) {
                const t = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
                r = e.slideTo(t.length - 1, 0, !1, !0)
            } else
                r = e.slideTo(e.activeIndex, 0, !1, !0);
            r || i()
        }
        s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update")
    }
    changeDirection(e, t) {
        void 0 === t && (t = !0);
        const s = this
            , i = s.params.direction;
        return e || (e = "horizontal" === i ? "vertical" : "horizontal"),
            e === i || "horizontal" !== e && "vertical" !== e || (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
                s.el.classList.add(`${s.params.containerModifierClass}${e}`),
                s.emitContainerClasses(),
                s.params.direction = e,
                s.slides.forEach((t => {
                    "vertical" === e ? t.style.width = "" : t.style.height = ""
                }
                )),
                s.emit("changeDirection"),
                t && s.update()),
            s
    }
    changeLanguageDirection(e) {
        const t = this;
        t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e,
            t.rtlTranslate = "horizontal" === t.params.direction && t.rtl,
            t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
                t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
                    t.el.dir = "ltr"),
            t.update())
    }
    mount(e) {
        const t = this;
        if (t.mounted)
            return !0;
        let s = e || t.params.el;
        if ("string" == typeof s && (s = document.querySelector(s)),
            !s)
            return !1;
        s.swiper = t,
            s.parentNode && s.parentNode.host && s.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
        const i = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let r = (() => {
            if (s && s.shadowRoot && s.shadowRoot.querySelector) {
                return s.shadowRoot.querySelector(i())
            }
            return x(s, i())[0]
        }
        )();
        return !r && t.params.createElements && (r = M("div", t.params.wrapperClass),
            s.append(r),
            x(s, `.${t.params.slideClass}`).forEach((e => {
                r.append(e)
            }
            ))),
            Object.assign(t, {
                el: s,
                wrapperEl: r,
                slidesEl: t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : r,
                hostEl: t.isElement ? s.parentNode.host : s,
                mounted: !0,
                rtl: "rtl" === s.dir.toLowerCase() || "rtl" === P(s, "direction"),
                rtlTranslate: "horizontal" === t.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === P(s, "direction")),
                wrongRTL: "-webkit-box" === P(r, "display")
            }),
            !0
    }
    init(e) {
        const t = this;
        if (t.initialized)
            return t;
        if (!1 === t.mount(e))
            return t;
        t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
            t.params.loop && t.loopCreate(),
            t.attachEvents();
        const s = [...t.el.querySelectorAll('[loading="lazy"]')];
        return t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
            s.forEach((e => {
                e.complete ? V(t, e) : e.addEventListener("load", (e => {
                    V(t, e.target)
                }
                ))
            }
            )),
            B(t),
            t.initialized = !0,
            B(t),
            t.emit("init"),
            t.emit("afterInit"),
            t
    }
    destroy(e, t) {
        void 0 === e && (e = !0),
            void 0 === t && (t = !0);
        const s = this
            , { params: i, el: r, wrapperEl: n, slides: a } = s;
        return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"),
            s.initialized = !1,
            s.detachEvents(),
            i.loop && s.loopDestroy(),
            t && (s.removeClasses(),
                r && "string" != typeof r && r.removeAttribute("style"),
                n && n.removeAttribute("style"),
                a && a.length && a.forEach((e => {
                    e.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass),
                        e.removeAttribute("style"),
                        e.removeAttribute("data-swiper-slide-index")
                }
                ))),
            s.emit("destroy"),
            Object.keys(s.eventsListeners).forEach((e => {
                s.off(e)
            }
            )),
            !1 !== e && (s.el && "string" != typeof s.el && (s.el.swiper = null),
                function (e) {
                    const t = e;
                    Object.keys(t).forEach((e => {
                        try {
                            t[e] = null
                        } catch (s) { }
                        try {
                            delete t[e]
                        } catch (s) { }
                    }
                    ))
                }(s)),
            s.destroyed = !0),
            null
    }
    static extendDefaults(e) {
        T(te, e)
    }
    static get extendedDefaults() {
        return te
    }
    static get defaults() {
        return Q
    }
    static installModule(e) {
        se.prototype.__modules__ || (se.prototype.__modules__ = []);
        const t = se.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
    }
    static use(e) {
        return Array.isArray(e) ? (e.forEach((e => se.installModule(e))),
            se) : (se.installModule(e),
                se)
    }
}
Object.keys(ee).forEach((e => {
    Object.keys(ee[e]).forEach((t => {
        se.prototype[t] = ee[e][t]
    }
    ))
}
)),
    se.use([function (e) {
        let { swiper: t, on: s, emit: i } = e;
        const r = h();
        let n = null
            , a = null;
        const o = () => {
            t && !t.destroyed && t.initialized && (i("beforeResize"),
                i("resize"))
        }
            , l = () => {
                t && !t.destroyed && t.initialized && i("orientationchange")
            }
            ;
        s("init", (() => {
            t.params.resizeObserver && void 0 !== r.ResizeObserver ? t && !t.destroyed && t.initialized && (n = new ResizeObserver((e => {
                a = r.requestAnimationFrame((() => {
                    const { width: s, height: i } = t;
                    let r = s
                        , n = i;
                    e.forEach((e => {
                        let { contentBoxSize: s, contentRect: i, target: a } = e;
                        a && a !== t.el || (r = i ? i.width : (s[0] || s).inlineSize,
                            n = i ? i.height : (s[0] || s).blockSize)
                    }
                    )),
                        r === s && n === i || o()
                }
                ))
            }
            )),
                n.observe(t.el)) : (r.addEventListener("resize", o),
                    r.addEventListener("orientationchange", l))
        }
        )),
            s("destroy", (() => {
                a && r.cancelAnimationFrame(a),
                    n && n.unobserve && t.el && (n.unobserve(t.el),
                        n = null),
                    r.removeEventListener("resize", o),
                    r.removeEventListener("orientationchange", l)
            }
            ))
    }
        , function (e) {
            let { swiper: t, extendParams: s, on: i, emit: r } = e;
            const n = []
                , a = h()
                , o = function (e, s) {
                    void 0 === s && (s = {});
                    const i = new (a.MutationObserver || a.WebkitMutationObserver)((e => {
                        if (t.__preventObserver__)
                            return;
                        if (1 === e.length)
                            return void r("observerUpdate", e[0]);
                        const s = function () {
                            r("observerUpdate", e[0])
                        };
                        a.requestAnimationFrame ? a.requestAnimationFrame(s) : a.setTimeout(s, 0)
                    }
                    ));
                    i.observe(e, {
                        attributes: void 0 === s.attributes || s.attributes,
                        childList: t.isElement || (void 0 === s.childList || s).childList,
                        characterData: void 0 === s.characterData || s.characterData
                    }),
                        n.push(i)
                };
            s({
                observer: !1,
                observeParents: !1,
                observeSlideChildren: !1
            }),
                i("init", (() => {
                    if (t.params.observer) {
                        if (t.params.observeParents) {
                            const e = function (e, t) {
                                const s = [];
                                let i = e.parentElement;
                                for (; i;)
                                    t ? i.matches(t) && s.push(i) : s.push(i),
                                        i = i.parentElement;
                                return s
                            }(t.hostEl);
                            for (let t = 0; t < e.length; t += 1)
                                o(e[t])
                        }
                        o(t.hostEl, {
                            childList: t.params.observeSlideChildren
                        }),
                            o(t.wrapperEl, {
                                attributes: !1
                            })
                    }
                }
                )),
                i("destroy", (() => {
                    n.forEach((e => {
                        e.disconnect()
                    }
                    )),
                        n.splice(0, n.length)
                }
                ))
        }
    ]);
export { se as S };
