function e({ swiper: e, on: t }) {
    let r, s, n, i, o, a, c;
    let dict_a = {}
    let id_love = new Set();
    let id_nope = new Set();

    const left_or_right = (e) => {
        const id = e.slides[e.activeIndex - 1].id
        if (e.activeIndex > e.previousIndex) {
            // c < 0 ? "nope" : "love"
            if (c < 0) id_nope.add(id)
            else id_love.add(id)
        }
        else {
            id_love.delete(id)
            id_nope.delete(id)
        }

        // const tot = $('.swiper-slide').length
        const tot = e.slides.length
        console.log(e.activeIndex, tot)
        if (e.activeIndex + 2 == tot) {
            loadCards()
            if (id_love.size > 0) storeData(id_love, "love")
            if (id_nope.size > 0) storeData(id_nope, "nope")
            console.log(id_love, id_nope)
        }
    }

    e.tinder = {
        no() {
            e.touches.currentX = 0,
                e.touches.startX = e.size / 2;
            const t = e.slides[e.activeIndex];
            t.translateY = 0,
                t.style.transformOrigin = "center bottom",
                t.transformOrigin = "bottom",
                e.slideNext(),
                e.animating = !1
        },
        yes() {
            e.touches.currentX = e.size,
                e.touches.startX = e.size / 2;
            const t = e.slides[e.activeIndex];
            t.translateY = 0,
                t.style.transformOrigin = "center bottom",
                t.transformOrigin = "bottom",
                e.slideNext(),
                e.animating = !1
        }
    };
    const d = (e, t) => {
        e && t(e)
    },
        l = (t, r) => {
            e.slides.forEach(((s, n) => {
                n < e.activeIndex || (s.style.transformOrigin = t,
                    s.transformOrigin = r)
            }
            ))
        },
        u = (t, r, s, i, o) => {
            if (n || o)
                if (i)
                    d(document.querySelector(".swiper-tinder-button-yes"), (e => e.classList.add("swiper-tinder-button-hidden"))),
                        d(document.querySelector(".swiper-tinder-button-no"), (e => e.classList.add("swiper-tinder-button-hidden")));
                else {
                    const n = Math.max(Math.min(10 * r - .5, 1), 0);
                    d(t.querySelector(".swiper-tinder-label-yes"), (e => e.style.opacity = s > 0 ? n : 0)),
                        d(t.querySelector(".swiper-tinder-label-no"), (e => e.style.opacity = s < 0 ? n : 0)),
                        d(document.querySelector(".swiper-tinder-button-yes"), (e => e.classList.remove("swiper-tinder-button-hidden"))),
                        d(document.querySelector(".swiper-tinder-button-no"), (e => e.classList.remove("swiper-tinder-button-hidden"))),
                        r >= e.params.longSwipesRatio && !i ? s > 0 ? (d(document.querySelector(".swiper-tinder-button-yes"), (e => e.classList.add("swiper-tinder-button-active"))),
                            d(document.querySelector(".swiper-tinder-button-no"), (e => e.classList.remove("swiper-tinder-button-active")))) : (d(document.querySelector(".swiper-tinder-button-yes"), (e => e.classList.remove("swiper-tinder-button-active"))),
                                d(document.querySelector(".swiper-tinder-button-no"), (e => e.classList.add("swiper-tinder-button-active")))) : (d(document.querySelector(".swiper-tinder-button-yes"), (e => e.classList.remove("swiper-tinder-button-active"))),
                                    d(document.querySelector(".swiper-tinder-button-no"), (e => e.classList.remove("swiper-tinder-button-active"))))
                }
        };
    t("beforeInit", (() => {
        if ("tinder" !== e.params.effect)
            return;
        e.classNames.push(`${e.params.containerModifierClass}tinder`),
            e.classNames.push(`${e.params.containerModifierClass}3d`);
        const t = {
            watchSlidesProgress: !0,
            virtualTranslate: !0,
            longSwipesRatio: .1,
            oneWayMovement: !0
        };
        Object.assign(e.params, t),
            Object.assign(e.originalParams, t)
    })),
        t("init", (() => {
            e.el && e.el.addEventListener && e.el.addEventListener("click", (t => {
                t.target.closest(".swiper-tinder-button-yes") && e.tinder.yes(),
                    t.target.closest(".swiper-tinder-button-no") && e.tinder.no()
            }
            ))
        })),
        t("touchStart", ((t, c) => {
            if ("tinder" !== e.params.effect)
                return;
            n = !0,
                o = !0,
                a = !0;
            const { clientY: d } = c
                , { top: u, height: m } = e.el.getBoundingClientRect();
            s = !1;
            const p = c.target.closest(".swiper-slide, swiper-slide");
            p && p.classList.contains("swiper-slide-active") && (r = p,
                i = e.activeIndex,
                d - u > m / 2 ? l("center top", "top") : l("center bottom", "bottom"))
        })),
        t("touchMove", (t => {
            if ("tinder" !== e.params.effect)
                return;
            const n = t.touches.currentY - t.touches.startY
                , i = t.touches.currentX - t.touches.startX;
            s = (Math.abs(i),
                e.size,
                !1),
                r && (r.translateY = n)
        })),
        t("touchEnd", (() => {
            "tinder" === e.params.effect && (s = !1,
                o = !1,
                r && (Math.abs(r.progress) < .1 || e.slides[e.activeIndex] === r) && delete r.translateY,
                requestAnimationFrame((() => {
                    n = !1
                }
                )))
        })),
        t("setTransition", ((t, r) => {
            "tinder" === e.params.effect && (t.slides.forEach((e => {
                e.style.transitionDuration = `${r}ms`,
                    e.querySelectorAll(".swiper-tinder-label").forEach((t => {
                        t.style.transitionDuration = `${r}ms`,
                            e.progress <= 0 && (t.style.opacity = 0)
                    }
                    ))
            }
            )),
                requestAnimationFrame((() => {
                    d(document.querySelector(".swiper-tinder-button-yes"), (e => e.classList.remove("swiper-tinder-button-active"))),
                        d(document.querySelector(".swiper-tinder-button-no"), (e => e.classList.remove("swiper-tinder-button-active")))
                }
                )))
        })),
        t("slideChange", (() => {
            if (e.activeIndex === e.slides.length - 1 && !e.params.loop) {
                const t = e.slides[e.slides.length - 1]
                    , r = t.progress
                    , s = Math.min(Math.max(r, -2), 2)
                    , n = e.touches.currentX - e.touches.startX;
                u(t, s, n, !0, !0)
            }
            o || (a = !1,
                e.emit("tinderSwipe", c < 0 ? "left" : "right"),
                left_or_right(e))
        })),
        t("transitionStart", (() => {
            e.activeIndex > e.previousIndex
            a && e.activeIndex !== i && (a = !1,
                e.emit("tinderSwipe", c < 0 ? "left" : "right"),
                left_or_right(e))
        })),
        t("setTranslate", ((t, r) => {
            if ("tinder" !== e.params.effect)
                return;
            if (s)
                return;
            if (o && void 0 !== i && void 0 !== e.snapGrid[i + 1]) {
                const t = Math.abs(e.snapGrid[i])
                    , s = Math.abs(t + e.size) - 8;
                if (Math.abs(r) > s)
                    return void e.setTranslate(-s)
            }

            const a = e.touches.currentX - e.touches.startX;
            dict_a[e.activeIndex] = a

            c = a;
            const { slides: d } = e
                , l = e.activeIndex === d.length - 1 && !e.params.loop;
            d.forEach(((t, r) => {
                // console.log(r, e.activeIndex);
                const da = dict_a[r] || dict_a[e.activeIndex];

                const s = t.progress
                    , i = Math.min(Math.max(s, -2), 2);
                let o = -t.swiperSlideOffset
                    , c = 0
                    , m = 100 * i
                    , p = 0
                    , f = 1;
                (i > 0 || 0 === i && n) && (m = 0,
                    p = 45 * i * (da < 0 ? -1 : 1),
                    o += e.size * (da < 0 ? -1 : 1) * i,
                    void 0 !== t.translateY && (c = t.translateY),
                    u(t, i, da, l)),
                    "top" === t.transformOrigin && (p = -p),
                    i > 1 && (f = 5 * (1.2 - i))

                // so that swiper-slide-prev won't be visible in the fringe area
                if (i >= 1) { o += e.size * (da < 0 ? -1 : 1) }

                const h = `\n translate3d(${o}px, ${c}px, ${m}px)\n rotateZ(${p}deg)\n `;
                i >= 1 && !t.tinderTransform && (t.tinderTransform = h,
                    t.tinderTransformSlideIndex = r),
                    (t.tinderTransform && t.tinderTransformSlideIndex !== r || !n) && (t.tinderTransform = ""),
                    t.style.zIndex = -Math.abs(Math.round(s)) + d.length,
                    t.style.transform = t.tinderTransform || h,
                    t.style.opacity = f
            }))
        }))
}
export { e as E };
