!(function (t) {
    'use strict';
    t.fn.succinct = function (e) {
        var i = t.extend(
            {
                size: 240,
                omission: "...",
                ignore: !0,
            },
            e
        );
        return this.each(function () {
            var e,
                o,
                s = /[!-\/:-@\[-`{-~]$/;
            t(this).each(function () {
                (e = t(this).html()).length > i.size &&
                    ((o = t
                        .trim(e)
                        .substring(0, i.size)
                        .split(" ")
                        .slice(0, -1)
                        .join(" ")),
                    i.ignore && (o = o.replace(s, "")),
                    t(this).html(o + i.omission));
            });
        });
    };
})(jQuery),
    (function (t) {
        const { __: e, _x: i, _n: o, _nx: s } = wp.i18n;
        t(
            ".et_pb_section.falkor_blog article.et_pb_post, .et_pb_section.falkor_blog_page_content article.et_pb_post, .et_pb_section.falkor_blog_3 article.et_pb_post, .et_pb_section.falkor_blog_4 article.et_pb_post"
        ).on("click", function () {
            var e = t(this).find(".entry-title > a").attr("href"),
                i = t(this).find(".entry-title > a").attr("target");
            e && (i ? window.open(e, "_blank") : (window.location.href = e));
        }),
            t(".falkor_blog_5  .et_pb_post  .post-meta").each(function () {
                var e = t(this).find("span.author")[0],
                    i = t(this).find("span.published")[0],
                    o = t(this).find('a[rel="category tag"]').toArray(),
                    s = t(this).find(".published").text(),
                    r = s.replace(/\d+/g, ""),
                    n = parseInt(s);
                n <= 9 && (n = "0" + n),
                    (i =
                        '<span class="published"><span class="day"> ' +
                        n +
                        '</span><span class="month"> ' +
                        r +
                        "</span></span>"),
                    (o = (o = t.map(o, function (t) {
                        return t.outerHTML;
                    })).join(", "));
                var _ = "By " + e.outerHTML + " | ";
                (_ += i),
                    (_ += "<span class='categories'>" + o + "</span>"),
                    t(this).html(_);
            }),
            t(".falkor_blog_5 .et_pb_post .post-content p").each(function () {
                t(this).succinct({
                    size: 90,
                });
            }),
            setTimeout(function () {
                t(window).trigger("resize");
            }, 500),
            setTimeout(function () {
                t(window).trigger("resize");
            }, 1e3),
            setTimeout(function () {
                t(window).trigger("resize");
            }, 1500),
            setTimeout(function () {
                t(window).trigger("resize");
            }, 2e3),
            t(".gform_wrapper form .gform_body .gform_fields > li").each(
                function () {
                    var e = t(this);
                    t(this)
                        .find("input, textarea")
                        .focus(function () {
                            e.addClass("focus");
                        }),
                        t(this)
                            .find("input, textarea")
                            .blur(function () {
                                t(this).val()
                                    ? e.addClass("filled")
                                    : e.removeClass("filled"),
                                    e.removeClass("focus");
                            });
                }
            ),
            t(
                " .form_2 .gform_wrapper form .gform_body .gform_fields > li input"
            ).focus(function () {
                t(".form_2  form").addClass("focus-cont");
            }),
            t(
                ".form_2 .gform_wrapper form .gform_body .gform_fields > li input"
            ).blur(function () {
                t(this).val()
                    ? t(".form_2  form").addClass("filled-cont")
                    : t(".form_2  form").removeClass("filled-cont"),
                    t(".form_2  form").removeClass("focus-cont");
            }),
            t(function () {
                t(".form_1 .gform_footer ").on('click', function () {
                    t(".form_1 .gform_footer ").hasClass("processed") ||
                        t(this).addClass(
                            "onclic",
                            250,
                            void (
                                t(".form_1 .gform_footer ").hasClass(
                                    "processed"
                                ) ||
                                setTimeout(function () {
                                    t(".form_1 .gform_footer ").removeClass(
                                        "onclic"
                                    ),
                                        t(".form_1 .gform_footer ").addClass(
                                            "validate",
                                            450,
                                            void setTimeout(function () {
                                                t(
                                                    ".form_1 .gform_footer .gform_button"
                                                ).trigger("click");
                                            }, 200)
                                        ),
                                        t(".form_1 .gform_footer ").addClass(
                                            "processed"
                                        );
                                }, 2e3)
                            )
                        );
                });
            }),
            t(function () {
                t(".form_2 .gform_footer ").on('click', function () {
                    t(".form_2 .gform_footer ").hasClass("processed") ||
                        t(this).addClass(
                            "onclic",
                            250,
                            void (
                                t(".form_2 .gform_footer ").hasClass(
                                    "processed"
                                ) ||
                                setTimeout(function () {
                                    t(".form_2 .gform_footer ").removeClass(
                                        "onclic"
                                    ),
                                        t(".form_2 .gform_footer ").addClass(
                                            "validate",
                                            450,
                                            void setTimeout(function () {
                                                t(
                                                    ".form_2 .gform_footer .gform_button"
                                                ).trigger("click");
                                            }, 200)
                                        ),
                                        t(".form_2 .gform_footer ").addClass(
                                            "processed"
                                        );
                                }, 2e3)
                            )
                        );
                });
            }),
            t(function () {
                t(".form_3 .gform_footer").on("click", function () {
                    t(".form_3 .gform_footer ").hasClass("processed") ||
                        (t(this).addClass("bar"),
                        t(this).addClass("processed")),
                        setTimeout(function () {
                            t(".form_3 .gform_footer").removeClass("bar"),
                                t(".form_3 .gform_footer").addClass(
                                    "done",
                                    450,
                                    void setTimeout(function () {
                                        t(
                                            ".form_3 .gform_footer .gform_button"
                                        ).trigger("click");
                                    }, 500)
                                );
                        }, 1500);
                });
            }),
            t(function () {
                t(".form_4 .gform_footer ").on('click', function () {
                    t(".form_4 .gform_footer ").hasClass("processed") ||
                        t(this).addClass(
                            "onclic",
                            250,
                            void (
                                t(".form_4 .gform_footer ").hasClass(
                                    "processed"
                                ) ||
                                setTimeout(function () {
                                    t(".form_4 .gform_footer ").removeClass(
                                        "onclic"
                                    ),
                                        t(".form_4 .gform_footer ").addClass(
                                            "validate",
                                            450,
                                            void setTimeout(function () {
                                                t(
                                                    ".form_4 .gform_footer .gform_button"
                                                ).trigger("click");
                                            }, 200)
                                        ),
                                        t(".form_4 .gform_footer ").addClass(
                                            "processed"
                                        );
                                }, 2e3)
                            )
                        );
                });
            }),
            t(function () {
                t(".form_5 .gform_footer").on("click", function () {
                    t(".form_5 .gform_footer ").hasClass("processed") ||
                        (t(this).addClass("active"),
                        t(this).addClass("processed")),
                        setTimeout(function () {
                            t(".form_5 .gform_footer .gform_button").trigger(
                                "click"
                            );
                        }, 1e3);
                });
            }),
            t(function () {
                t(".form_6 .gform_footer").on('click', function (e) {
                    if (!t(".form_6 .gform_footer ").hasClass("processed")) {
                        t(this).addClass("dark"), e.pageX, e.pageY;
                        var i = t('<div class="blip"></div>'),
                            o = t('<div class="blip"></div>');
                        o.append(i),
                            t(".form_6 .gform_footer").append(o),
                            t(".form_6 .gform_footer ").addClass("processed");
                    }
                    setTimeout(function () {
                        t(".form_6 .gform_footer").removeClass("dark"),
                            t(".form_6 .gform_footer").addClass(
                                "done",
                                450,
                                void setTimeout(function () {
                                    t(
                                        ".form_6 .gform_footer .gform_button"
                                    ).trigger("click");
                                }, 200)
                            );
                    }, 1500);
                });
            }),
            t(function () {
                t(".form_7 .gform_footer ").on('click', function () {
                    t(".form_7 .gform_footer ").hasClass("processed") ||
                        t(this).addClass(
                            "onclic",
                            250,
                            void (
                                t(".form_7 .gform_footer ").hasClass(
                                    "processed"
                                ) ||
                                setTimeout(function () {
                                    t(".form_7 .gform_footer ").removeClass(
                                        "onclic"
                                    ),
                                        t(".form_7 .gform_footer ").addClass(
                                            "validate",
                                            450,
                                            void setTimeout(function () {
                                                t(
                                                    ".form_7 .gform_footer .gform_button"
                                                ).trigger("click");
                                            }, 200)
                                        ),
                                        t(".form_7 .gform_footer ").addClass(
                                            "processed"
                                        );
                                }, 2e3)
                            )
                        );
                });
            });
        var r = 0;
        t("body").hasClass("et-fb") && (r = 8e3),
            setTimeout(function () {
                t(
                    'body.et-fb .contact_1_falkor textarea[data-original_id="message"]'
                )
                    .parent()
                    .attr("data-id", "message"),
                    t(
                        ' .et_pb_contact .et_pb_contact_form  p:not([data-type="checkbox"]) input,  .et_pb_contact .et_pb_contact_form  p:not([data-type="checkbox"]) textarea'
                    ).focus(function () {
                        t(this).parent("p").addClass("focus");
                    }),
                    t(
                        ' .et_pb_contact .et_pb_contact_form  p:not([data-type="checkbox"]) input,  .et_pb_contact .et_pb_contact_form  p:not([data-type="checkbox"]) textarea'
                    ).blur(function () {
                        t(this).val()
                            ? t(this).parent().addClass("filled")
                            : t(this).parent().removeClass("filled"),
                            t(this).parent("p").removeClass("focus");
                    });
            }, r);
        var n = t(
            '.contact_form_1 .et_pb_contact_field[data-type="select"] select option:first-child'
        )
            .text()
            .replace(/\-/g, " ")
            .replace(/\ /g, " ");
        t(
            '.contact_form_1 .et_pb_contact_field[data-type="select"] select option:first-child'
        ).text(n),
            t('<span class="price">$</span>').insertBefore(
                t(
                    '.contact_form_1 p.et_pb_contact_field[data-id="price"] input'
                )
            ),
            t(
                ' .contact_form_4 .et_pb_contact_form  p[data-id="type_of_project"] .et_pb_contact_field_radio, .contact_form_4 .et_pb_contact_form  p[data-id="price"] .et_pb_contact_field_radio'
            ).on("click", function () {
                t(this).hasClass("clicked") ||
                    (t(this)
                        .parent(".et_pb_contact_field_radio_list")
                        .find(".et_pb_contact_field_radio")
                        .removeClass("clicked"),
                    t(this).addClass("clicked"));
            }),
            t('<div class="details"></div>').insertBefore(
                '.contact_form_4 form p[data-id="type_of_project"]'
            ),
            t('<div class="start_date"></div>').insertAfter(
                '.contact_form_4 form p[data-id="type_of_project"]'
            ),
            t('<div class="end_date"></div>').insertBefore(
                '.contact_form_4 form p[data-id="price"]'
            ),
            t(
                '.contact_form_4 p[data-id="name"], .contact_form_4 p[data-id="email"], .contact_form_4 p[data-id="phone"]'
            ).appendTo(".contact_form_4 .details"),
            t(
                '.contact_form_4 p[data-id="select_month"], .contact_form_4 p[data-id="select_year"], .contact_form_4 p[data-id="no_big_rsuh"]'
            ).appendTo(".contact_form_4 .start_date"),
            t(
                '.contact_form_4 p[data-id="select_end_month"], .contact_form_4 p[data-id="select_end_year"], .contact_form_4 p[data-id="when_its_ready"]'
            ).appendTo(".contact_form_4 .end_date"),
            t(".button_unique").each(function () {
                t(this)
                    .parent(".et_pb_button_module_wrapper")
                    .addClass("button_unique_wrapper");
            }),
            t(window).width() >= 981 &&
                t(
                    ".blurb_8 .et_pb_column_1_3:nth-child(2) .et_pb_main_blurb_image"
                ).insertAfter(
                    t(
                        ".blurb_8 .et_pb_column_1_3:nth-child(2) .et_pb_blurb_container"
                    )
                ),
            t(window).resize(function () {
                t(window).width() >= 981
                    ? t(
                          ".blurb_8 .et_pb_column_1_3:nth-child(2) .et_pb_main_blurb_image"
                      ).insertAfter(
                          t(
                              ".blurb_8 .et_pb_column_1_3:nth-child(2) .et_pb_blurb_container"
                          )
                      )
                    : t(
                          ".blurb_8 .et_pb_column_1_3:nth-child(2) .et_pb_main_blurb_image"
                      ).insertBefore(
                          t(
                              ".blurb_8 .et_pb_column_1_3:nth-child(2) .et_pb_blurb_container"
                          )
                      );
            }),
            t(".team3 .et_pb_column_1_2 .et_pb_team_member  ").hover(
                function () {
                    t(".team3 .et_pb_column_1_2 .et_pb_team_member  ").addClass(
                        "noHover"
                    ),
                        t(this).addClass("hover");
                },
                function () {
                    t(
                        ".team3 .et_pb_column_1_2 .et_pb_team_member  "
                    ).removeClass("noHover"),
                        t(this).removeClass("hover");
                }
            );
        var _ = 0;
        t("body").hasClass("et-fb") && (_ = 8e3),
            setTimeout(function () {
                t(".blurb_10_f .et_pb_column .et_pb_blurb").hover(
                    function () {
                        setTimeout(function () {
                            t(
                                ".blurb_10_f .et_pb_column .et_pb_blurb"
                            ).addClass("noHover"),
                                t(this).addClass("hover");
                        }, 200);
                    },
                    function () {
                        setTimeout(function () {
                            t(
                                ".blurb_10_f .et_pb_column .et_pb_blurb"
                            ).removeClass("noHover"),
                                t(this).removeClass("hover");
                        }, 200);
                    }
                );
            }, _),
            t(".slider_1 .et_pb_slide").each(function () {
                var e = t(this).css("background-image");
                (e = e
                    .replace("url(", "")
                    .replace(")", "")
                    .replace(/\"/gi, "")),
                    t('<img src=" ' + e + ' ">').insertBefore(
                        t(this).find(".et_pb_container")
                    ),
                    t(this).css("background-image", "none");
            }),
            t(".slider_1 .et_pb_slide .et_pb_slide_description").on(
                "click",
                function () {
                    var e = t(this).find("a.et_pb_button").attr("href");
                    e && (window.location.href = e);
                }
            ),
            t(
                ".accordion_2 .et_pb_column_1_3 .et_pb_searchform .et_pb_searchsubmit"
            ).val("U"),
            t(".blurbs_1 .et_pb_blurb ").hover(
                function () {
                    t(this).addClass("hover");
                },
                function () {
                    t(this).removeClass("hover");
                }
            ),
            (t.fn.isInViewport = function () {
                var e = t(this).offset().top,
                    i = e + t(this).outerHeight(),
                    o = t(window).scrollTop(),
                    s = o + t(window).height();
                return i > o && e < s;
            }),
            setTimeout(function () {
                t(".falkor.et_pb_section:not(.header_2_f)").each(function () {
                    t(this).isInViewport()
                        ? t(this).addClass("view_port")
                        : t(this).removeClass("view_port");
                });
            }, 100),
            t(window).on("resize scroll", function () {
                t(
                    ".falkor.et_pb_section:not(.header_2_f):not(.blurb_2_f )"
                ).each(function () {
                    t(this).isInViewport()
                        ? t(this).addClass("view_port")
                        : t(this).removeClass("view_port");
                });
            }),
            t(window).on("resize scroll", function () {
                t(".falkor.et_pb_section.header_2_f").each(function () {
                    t(this).isInViewport() && t(this).addClass("view_port");
                }),
                    t(".falkor.et_pb_section.blurb_2_f").each(function () {
                        t(this).isInViewport() && t(this).addClass("view_port");
                    });
            }),
            (t.fn.succinct = function (e) {
                var i = t.extend(
                    {
                        size: 240,
                        omission: "...",
                        ignore: !0,
                    },
                    e
                );
                return this.each(function () {
                    var e,
                        o,
                        s = /[!-\/:-@\[-`{-~]$/;
                    t(this).each(function () {
                        (e = t(this).html()).length > i.size &&
                            ((o = t
                                .trim(e)
                                .substring(0, i.size)
                                .split(" ")
                                .slice(0, -1)
                                .join(" ")),
                            i.ignore && (o = o.replace(s, "")),
                            t(this).html(o + i.omission));
                    });
                });
            }),
            t(".footer_5_f .et_pb_posts .entry-title a").succinct({
                size: 35,
            });
        var l = 0;

        function a() {
            t(
                ".et_pb_section:not(.pegasus-content13) .et_pb_column h1:not(.dvmd_tw_wrapper), .et_pb_section:not(.pegasus-content13) .et_pb_column h2:not(.dvmd_tw_wrapper), .et_pb_section:not(.pegasus-content13) .et_pb_column h3:not(.dvmd_tw_wrapper), .et_pb_section:not(.pegasus-content13) .et_pb_column h4:not(.dvmd_tw_wrapper), .et_pb_section:not(.pegasus-content13) .et_pb_column h5:not(.dvmd_tw_wrapper), .et_pb_section:not(.pegasus-content13) .et_pb_column h6:not(.dvmd_tw_wrapper)"
            ).each(function () {
                (falkor_title = t(this).html()),
                    (falkor_title_new = falkor_title
                        .replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">")),
                    t(this).html(falkor_title_new);
            });
        }
        if (
            (t("body").hasClass("et-fb") && (l = 5e3),
            setTimeout(a, l),
            t('input.et-fb-settings-option-input--block[type="text"]').keypress(
                function () {
                    a();
                }
            ),
            t(
                ' .et_pb_newsletter .et_pb_newsletter_form p:not([data-type="checkbox"])'
            ).each(function () {
                t(this).find("input").insertBefore(t(this).find("label")),
                    t(this)
                        .find('label[for="et_pb_signup_lastname"]')
                        .each(function () {
                            t(this).text(e("Surname", "ddpro"));
                        }),
                    t(this)
                        .find('label[for="et_pb_signup_firstname"]')
                        .each(function () {
                            t(this).prev().attr("placeholder") ===
                            e("Last Name", "ddpro")
                                ? t(this).text(e("Surname", "ddpro"))
                                : t(this).text(e("Name", "ddpro"));
                        }),
                    (t(this).find("input.et_pb_signup_firstname").required =
                        !1);
            }),
            setTimeout(function () {
                t(" .et_pb_newsletter .et_pb_newsletter_form input").focus(
                    function () {
                        t(this).parent("p").addClass("focus");
                    }
                ),
                    t(" .et_pb_newsletter .et_pb_newsletter_form input").blur(
                        function () {
                            t(this).val()
                                ? t(this).parent().addClass("filled")
                                : t(this).parent().removeClass("filled"),
                                t(this).parent("p").removeClass("focus");
                        }
                    );
            }, r),
            t(
                '.form_2 .et_pb_newsletter .et_pb_newsletter_form > input[name="et_pb_signup_provider"]'
            ).each(function () {
                "aweber" === t(this).attr("value") &&
                    t(this)
                        .parent(".et_pb_newsletter_form")
                        .addClass("aweber_form");
            }),
            t("body .video-popup a").on('click', function (e) {
                return (
                    e.preventDefault(),
                    t.fancybox({
                        padding: 0,
                        autoScale: !1,
                        transitionIn: "none",
                        transitionOut: "none",
                        title: this.title,
                        width: 680,
                        height: 495,
                        href: this.href,
                        type: "swf",
                        swf: {
                            wmode: "transparent",
                            allowfullscreen: "true",
                        },
                    }),
                    !1
                );
            }),
            t("body .video-popup-2").each(function (e) {
                jQuery(this)
                    .find(".et_pb_blurb_content a")
                    .on('click', function (e) {
                        return (
                            e.preventDefault,
                            t(window).width() < 480
                                ? (e.preventDefault(),
                                  t.fancybox({
                                      padding: 0,
                                      autoScale: !1,
                                      transitionIn: "none",
                                      transitionOut: "none",
                                      title: this.title,
                                      width: 400,
                                      height: 300,
                                      href: this.href,
                                      type: "swf",
                                      swf: {
                                          wmode: "transparent",
                                          allowfullscreen: "true",
                                      },
                                  }),
                                  !1)
                                : (e.preventDefault(),
                                  t.fancybox({
                                      padding: 0,
                                      autoScale: !1,
                                      transitionIn: "none",
                                      transitionOut: "none",
                                      title: this.title,
                                      width: 680,
                                      height: 495,
                                      href: this.href,
                                      type: "swf",
                                      swf: {
                                          wmode: "transparent",
                                          allowfullscreen: "true",
                                      },
                                  }),
                                  !1)
                        );
                    }),
                    // t(this)
                    //     .find(".et_pb_video_overlay_hover")
                    //     .on("click", function (e) {
                    //         t(this).find(".et_pb_video_play").trigger('click'),
                    //             e.stopImmediatePropagation();
                    //     }),
                    t(this)
                        .find(".et_pb_video")
                        .on('click', function (e) {
                                var hrefLink = t(this).find('iframe').attr('src');
                                return t(window).width() < 480
                                ? (e.preventDefault(),
                                  t.fancybox({
                                      padding: 0,
                                      autoScale: !1,
                                      transitionIn: "none",
                                      transitionOut: "none",
                                      title: this.title,
                                      width: 400,
                                      height: 300,
                                      href: hrefLink,
                                      type: "swf",
                                      swf: {
                                          wmode: "transparent",
                                          allowfullscreen: "true",
                                      },
                                  }),
                                  !1)
                                : (e.preventDefault(),
                                  t.fancybox({
                                      padding: 0,
                                      autoScale: !1,
                                      transitionIn: "none",
                                      transitionOut: "none",
                                      title: this.title,
                                      width: 680,
                                      height: 495,
                                      href: hrefLink,
                                      type: "swf",
                                      swf: {
                                          wmode: "transparent",
                                          allowfullscreen: "true",
                                      },
                                  }),
                                  !1);
                        });
            }),
            t("body .video-popup h4 a").on("click", function (t) {
                t.preventDefault();
            }),
            t("body .video-popup h4").on("click", function (e) {
                e.preventDefault(),
                    t(this).find("a").attr("href", ""),
                    t(this)
                        .closest(".et_pb_blurb_content")
                        .find(".et_pb_main_blurb_image a")
                        .trigger('click');
            }),
            t("body .video-popup-cta a").on("click", function (e) {
                return (
                    e.preventDefault(),
                    t.fancybox({
                        padding: 0,
                        autoScale: !1,
                        transitionIn: "none",
                        transitionOut: "none",
                        title: this.title,
                        width: 680,
                        height: 495,
                        href: this.href,
                        type: "swf",
                        swf: {
                            wmode: "transparent",
                            allowfullscreen: "true",
                        },
                    }),
                    !1
                );
            }),
            setTimeout(function () {
                t(".edge .footer_6_f .et_pb_newsletter").each(function () {
                    t(this).find("input, textarea").attr("placeholder", "");
                });
            }, 5e3),
            t(".portfolio_slider").length > 0)
        ) {
            var c = 3,
                f = 2;
            t(document).width() <= "767"
                ? ((c = 2), (f = 1))
                : t(document).width() <= "481" && ((c = 1), (f = 1)),
                t(
                    ".portfolio_slider .et_pb_gallery .et_pb_gallery_items .et_pb_gallery_item:first-child,.portfolio_slider .et_pb_gallery .et_pb_gallery_items .et_pb_gallery_item:nth-child(2)"
                )
                    .clone()
                    .insertAfter(
                        ".portfolio_slider .et_pb_gallery .et_pb_gallery_items .et_pb_gallery_item:last-child"
                    ),
                setTimeout(function () {
                    var e = t(
                            ".portfolio_slider .et_pb_gallery_items   .et_pb_gallery_item "
                        ).length,
                        i = t(document).width();
                    t(
                        ".portfolio_slider .et_pb_gallery_items   .et_pb_gallery_item "
                    ).css(
                        "cssText",
                        "width: " + Math.floor(i / c) + "px !important;"
                    );
                    var o = t(
                            ".portfolio_slider .et_pb_gallery_items   .et_pb_gallery_item "
                        )[0].getBoundingClientRect().width,
                        s = e * o;
                    t(".portfolio_slider .et_pb_gallery").css(
                        "cssText",
                        "width:" + i + "px !important;"
                    ),
                        t(
                            ".portfolio_slider .et_pb_gallery  .et_pb_gallery_items  "
                        ).css("cssText", "width: " + s + "px !important;"),
                        t(
                            ".portfolio_slider .et_pb_gallery .et_pb_gallery_items"
                        ).css("margin-left", -o / 2),
                        t('<div class="slide-controllers"></div>').appendTo(
                            ".portfolio_slider .et_pb_gallery"
                        );
                    for (var r = e / f, n = 0; n < r - 1; n++)
                        t(
                            '<a class="dot dot-' + n + '">' + n + "</a>"
                        ).appendTo(".portfolio_slider .slide-controllers");
                    t(".slide-controllers a:first-child").addClass("active"),
                        t(".slide-controllers a").on("click", function () {
                            t(".slide-controllers a").removeClass("active"),
                                t(this).addClass("active");
                            var e = -t(this).text() * f * o;
                            t(
                                ".portfolio_slider .et_pb_gallery .et_pb_gallery_items "
                            ).css({
                                transform: "translate3d(" + e + "px, 0px, 0px)",
                            });
                        });
                }, 1e3),
                t(function () {
                    setInterval(function () {
                        0 !== t("a.dot.active").next().length
                            ? t("a.dot.active").next().trigger("click")
                            : t("a.dot:first-child").trigger("click");
                    }, 8e3);
                });
        }
        var d = 0;
        t("body").hasClass("et-fb") && (d = 8e3),
            setTimeout(function () {
                if (0 !== t(".blurb_12_f").length) {
                    t('<div class="close_button"></div>').appendTo(
                        t(".blurb_12_f .et_pb_row:last-child .et_pb_blurb")
                    ),
                        t('<div class="close_button"></div>').appendTo(
                            t(
                                ".blurb_12_f .et_pb_row.et-last-child .et_pb_blurb"
                            )
                        ),
                        t(
                            ".blurb_12_f .et_pb_row:last-child .et_pb_blurb .et_pb_main_blurb_image"
                        ).each(function () {
                            var e = t(this).find("img").attr("src");
                            t(this).css("background-image", "url(" + e + ")"),
                                t(this).find("img").remove();
                        }),
                        t(
                            ".blurb_12_f .et_pb_row.et-last-child .et_pb_blurb .et_pb_main_blurb_image"
                        ).each(function () {
                            var e = t(this).find("img").attr("src");
                            t(this).css("background-image", "url(" + e + ")"),
                                t(this).find("img").remove();
                        });
                    var e = document.querySelector(
                            ".blurb_12_f .et_pb_row:last-child"
                        ),
                        i = [].slice.call(
                            document.querySelectorAll(
                                ".blurb_12_f .et_pb_row:last-child .et_pb_blurb"
                            )
                        ),
                        o = [].slice.call(
                            document.querySelectorAll(
                                ".blurb_12_f .et_pb_row:last-child .et_pb_blurb .close_button"
                            )
                        );
                    t("body").hasClass("et-fb") &&
                        ((e = document.querySelector(
                            ".blurb_12_f .et_pb_row.et-last-child"
                        )),
                        (i = [].slice.call(
                            document.querySelectorAll(
                                ".blurb_12_f .et_pb_row.et-last-child .et_pb_blurb"
                            )
                        )),
                        (o = [].slice.call(
                            document.querySelectorAll(
                                ".blurb_12_f .et_pb_row.et-last-child .et_pb_blurb .close_button"
                            )
                        ))),
                        setTimeout(function () {
                            e.classList.remove("s--inactive");
                        }, 200),
                        i.forEach(function (t) {
                            t.addEventListener("click", function () {
                                this.classList.contains("s--active") ||
                                    (e.classList.add("s--el-active"),
                                    this.classList.add("s--active"));
                            });
                        }),
                        o.forEach(function (t) {
                            t.addEventListener("click", function (t) {
                                t.stopPropagation(),
                                    e.classList.remove("s--el-active"),
                                    document
                                        .querySelector(".et_pb_blurb.s--active")
                                        .classList.remove("s--active");
                            });
                        });
                }
            }, d);
        var p = 0;
        t("body").hasClass("et-fb") && (p = 8e3),
            setTimeout(function () {
                t(".person_3_f .et_pb_team_member").each(function () {
                    t(this)
                        .find("p.et_pb_member_position")
                        .insertBefore(t(this).find("h4.et_pb_module_header"));
                }),
                    t(
                        ".person_4_f .et_pb_team_member .et_pb_team_member_image img"
                    ).each(function () {
                        t(this).attr("height", "auto"),
                            t(this).attr("sizes", ""),
                            t(this).attr("srcset", ""),
                            t(this).removeAttr("loading");
                    });
            }, p);
        var b = 0;

        function u() {
            setTimeout(function () {
                t(".falkor_slider_1 .et_pb_slider").each(function () {
                    var e = t(this).find(".et_pb_slide").height();
                    t(this).height(e);
                });
            }, 400),
                setTimeout(function () {
                    var e;
                    t(".falkor_slider .et-pb-controllers a").each(function () {
                        var e = t(this).text();
                        1 === e.length ? t(this).text(b + e) : t(this).text(e);
                    }),
                        t(".falkor_slider_2 .et_pb_slider").each(function () {
                            var e = t(this).parent(".et_pb_column").width(),
                                i = e,
                                o = t(this).find(".et_pb_slide").length;
                            t(this).width(i),
                                t(this)
                                    .find(".et_pb_slides")
                                    .width(o * i),
                                t(this).find(".et_pb_slide").width(e);
                        }),
                        (e = t(window).width() < 480 ? 28.5 : 41.5),
                        t(".falkor_slider_1 .et-pb-controllers a").on(
                            "click",
                            function () {
                                if (t(this).hasClass("active"));
                                else {
                                    var i =
                                        t(this).prevAll().length *
                                        t(this).height();
                                    t(
                                        ".falkor_slider_1 .et-pb-controllers"
                                    ).css(
                                        "top",
                                        "calc(" + e + "% - " + i + "px)"
                                    ),
                                        t(
                                            ".falkor_slider_1 .et-pb-controllers a"
                                        ).removeClass("active"),
                                        t(this).addClass("active");
                                }
                                setTimeout(function () {
                                    t(".falkor_slider_1 .et_pb_slider").each(
                                        function () {
                                            var e =
                                                t(this)
                                                    .find(
                                                        ".et_pb_slide.et-pb-active-slide"
                                                    )
                                                    .prevAll().length *
                                                t(this)
                                                    .find(
                                                        ".et_pb_slide.et-pb-active-slide"
                                                    )
                                                    .height();
                                            t(this)
                                                .find(".et_pb_slides")
                                                .css(
                                                    "transform",
                                                    "translate(0, -" + e + "px)"
                                                );
                                        }
                                    );
                                }, 200);
                            }
                        ),
                        t(".falkor_slider_1 .et-pb-slider-arrows a").on(
                            "click",
                            function () {
                                setTimeout(function () {
                                    t(".falkor_slider_1 .et_pb_slider").each(
                                        function () {
                                            var e =
                                                t(this)
                                                    .find(
                                                        ".et_pb_slide.et-pb-active-slide"
                                                    )
                                                    .prevAll().length *
                                                t(this)
                                                    .find(
                                                        ".et_pb_slide.et-pb-active-slide"
                                                    )
                                                    .height();
                                            t(this)
                                                .find(".et_pb_slides")
                                                .css(
                                                    "transform",
                                                    "translate(0, -" + e + "px)"
                                                );
                                        }
                                    );
                                }, 200);
                            }
                        ),
                        setInterval(function () {
                            t(".falkor_slider_1 .et_pb_slider").each(
                                function () {
                                    var e =
                                        t(this)
                                            .find(
                                                ".et_pb_slide.et-pb-active-slide"
                                            )
                                            .prevAll().length *
                                        t(this)
                                            .find(
                                                ".et_pb_slide.et-pb-active-slide"
                                            )
                                            .height();
                                    t(this)
                                        .find(".et_pb_slides")
                                        .css(
                                            "transform",
                                            "translate(0, -" + e + "px)"
                                        );
                                }
                            );
                        }, 200);
                    var i = 15;
                    t(window).width() <= 767 && (i = 35),
                        t(".falkor_slider_2 .et-pb-controllers a").on(
                            "click",
                            function () {
                                if (t(this).hasClass("active"));
                                else {
                                    var e =
                                        t(this).prevAll().length *
                                        t(this).width();
                                    t(
                                        ".falkor_slider_2 .et-pb-controllers"
                                    ).css(
                                        "left",
                                        "calc(" + i + "% - " + e + "px)"
                                    ),
                                        t(
                                            ".falkor_slider_2 .et-pb-controllers a"
                                        ).removeClass("active"),
                                        t(this).addClass("active");
                                }
                                setTimeout(function () {
                                    t(".falkor_slider_2 .et_pb_slider").each(
                                        function () {
                                            var e =
                                                t(this)
                                                    .find(
                                                        ".et_pb_slide.et-pb-active-slide"
                                                    )
                                                    .prevAll().length *
                                                t(this)
                                                    .find(
                                                        ".et_pb_slide.et-pb-active-slide"
                                                    )
                                                    .width();
                                            t(this)
                                                .find(".et_pb_slides")
                                                .css(
                                                    "transform",
                                                    "translate(-" + e + "px, 0)"
                                                );
                                        }
                                    );
                                }, 200);
                            }
                        ),
                        t(".falkor_slider_2 .et-pb-slider-arrows a").on(
                            "click",
                            function () {
                                setTimeout(function () {
                                    t(".falkor_slider_2 .et_pb_slider").each(
                                        function () {
                                            var e =
                                                t(this)
                                                    .find(
                                                        ".et_pb_slide.et-pb-active-slide"
                                                    )
                                                    .prevAll().length *
                                                t(this)
                                                    .find(
                                                        ".et_pb_slide.et-pb-active-slide"
                                                    )
                                                    .width();
                                            t(this)
                                                .find(".et_pb_slides")
                                                .css(
                                                    "transform",
                                                    "translate(-" + e + "px, 0)"
                                                );
                                        }
                                    );
                                }, 200);
                            }
                        ),
                        setInterval(function () {
                            t(".falkor_slider_2 .et_pb_slider").each(
                                function () {
                                    var e =
                                        t(this)
                                            .find(
                                                ".et_pb_slide.et-pb-active-slide"
                                            )
                                            .prevAll().length *
                                        t(this)
                                            .find(
                                                ".et_pb_slide.et-pb-active-slide"
                                            )
                                            .width();
                                    t(this)
                                        .find(".et_pb_slides")
                                        .css(
                                            "transform",
                                            "translate(-" + e + "px, 0)"
                                        );
                                }
                            );
                        }, 200);
                }, 1e3);
        }
        setTimeout(function () {
            t(
                ".falkor_slider.falkor_slider_2 .et_pb_slider .et-pb-slider-arrows"
            )
                .clone()
                .addClass("slide_arrows")
                .insertAfter(
                    ".falkor_slider.falkor_slider_2 .et_pb_slider .et-pb-slider-arrows"
                );
        }, 1e3),
            u(),
            t(window).resize(function () {
                u();
            }),
            t(".pricing_tabel_falkor .et_pb_pricing_table").each(function () {
                t(this)
                    .find(".et_pb_pricing_heading")
                    .insertAfter(t(this).find(".et_pb_et_price"));
            }),
            t(".falkor-pt2 .et_pb_pricing_table").each(function () {
                var e = t(this)
                    .find(".et_pb_frequency")
                    .text()
                    .replace("/", "");
                t(this).find(".et_pb_frequency").text(e);
            }),
            t(
                "#page-container .falkor_blog_4.falkor_home_blog_4 article .more-link"
            ).each(function () {
                t(this).text("More Details");
            });
        var h = 500;
        t("body").hasClass("et-fb") && (h = 5e3),
            setTimeout(function () {
                if (t(".blog_slider").length > 0) {
                    t(".blog_slider .et_pb_slide").on("click", function (e) {
                        var i = t(this)
                            .find("a.et_pb_more_button.et_pb_button")
                            .attr("href");
                        i && (e.preventDefault(), (window.location.href = i));
                    });
                    var e = 2.35;
                    t(document).width() <= "767" && (e = 2),
                        t(document).width() <= "481" && (e = 1);
                    var i = t(".blog_slider.et_pb_slider .et_pb_slide").length,
                        o = t(".falkor_blog .et_pb_column_2_3").width();
                    t(".blog_slider.et_pb_slider .et_pb_slide").css(
                        "cssText",
                        "width: " + Math.floor(o / e) + "px !important;"
                    );
                    var s = t(
                            ".blog_slider.et_pb_slider .et_pb_slide"
                        )[0].getBoundingClientRect().width,
                        r = i * s;
                    t(".blog_slider.et_pb_slider .et_pb_slides").css(
                        "cssText",
                        "width: " + r + "px !important;"
                    ),
                        t(".blog_slider .et-pb-slider-arrows a").on(
                            "click",
                            function (e) {
                                e.preventDefault(),
                                    setTimeout(function () {
                                        var e =
                                            t(
                                                ".blog_slider .et_pb_slide.et-pb-active-slide"
                                            ).prevAll().length * s;
                                        t(window).width() >= 482
                                            ? 0 !==
                                              t(
                                                  ".blog_slider .et_pb_slide.et-pb-active-slide"
                                              ).nextAll().length
                                                ? t(
                                                      ".blog_slider.et_pb_slider .et_pb_slides"
                                                  ).css(
                                                      "transform",
                                                      "translate(-" +
                                                          e +
                                                          "px, 0)"
                                                  )
                                                : t(
                                                      ".blog_slider.et_pb_slider .et_pb_slides"
                                                  ).css(
                                                      "transform",
                                                      "translate(-" +
                                                          (e - s) +
                                                          "px, 0)"
                                                  )
                                            : t(
                                                  ".blog_slider .et_pb_slide.et-pb-active-slide"
                                              ).nextAll().length >= 0
                                            ? t(
                                                  ".blog_slider.et_pb_slider .et_pb_slides"
                                              ).css(
                                                  "transform",
                                                  "translate(-" + e + "px, 0)"
                                              )
                                            : t(
                                                  ".blog_slider.et_pb_slider .et_pb_slides"
                                              ).css(
                                                  "transform",
                                                  "translate(-" +
                                                      (e - s) +
                                                      "px, 0)"
                                              );
                                    }, 200);
                            }
                        ),
                        t(document).width() > 767 &&
                            t(".falkor_blog  .et_pb_slider").mousemove(
                                function (e) {
                                    var i = t(this).parent().offset(),
                                        r = e.pageX - i.left,
                                        n = o - r,
                                        _ = t(
                                            ".blog_slider .et_pb_slide.et-pb-active-slide"
                                        ).prevAll().length,
                                        l = _ * s + 0.65 * s,
                                        a = _ * s;
                                    n <= 30 &&
                                        t(
                                            ".blog_slider .et_pb_slide.et-pb-active-slide"
                                        ).nextAll().length >= 2 &&
                                        t(
                                            ".blog_slider.et_pb_slider .et_pb_slides"
                                        ).css(
                                            "transform",
                                            "translate(-" + l + "px, 0)"
                                        ),
                                        r <= 30 &&
                                            t(
                                                ".blog_slider.et_pb_slider .et_pb_slides"
                                            ).css(
                                                "transform",
                                                "translate(-" + a + "px, 0)"
                                            );
                                }
                            );
                }
            }, h),
            t(
                ".falkor_blog .et_pb_post_slider .et_pb_slide_content > p:not(.post-meta)"
            ).each(function () {
                t(this).succinct({
                    size: 70,
                });
            });
        var m = 500;
        t("body").hasClass("et-fb") && (m = 5e3),
            setTimeout(function () {
                t(".falkor_blog_3 .et_pb_post .post-content p").each(
                    function () {
                        t(this).succinct({
                            size: 80,
                        });
                    }
                );
            }, m),
            setTimeout(function () {
                t("body.et-fb .falkor_blog_4 .et_pb_post").each(function () {
                    t(this)
                        .find("a.more-link")
                        .appendTo(t(this).find(".post-content"));
                }),
                    t(
                        ".falkor_blog_4 .et_pb_post, .falkor_blog_3 .et_pb_post"
                    ).on("click", function (e) {
                        var i = t(this).find("h2.entry-title a").attr("href");
                        i && (e.preventDefault(), (window.location.href = i));
                    }),
                    t(".falkor_blog_3 article").each(function () {
                        var e = t(this)
                            .find("a.entry-featured-image-url img")
                            .attr("src");
                        t(this).css("background-image", "url(" + e + ")");
                    });
            }, m);
        var g = 0;
        t("body").hasClass("et-fb") && (g = 8e3),
            setTimeout(function () {
                t(".blurb_19_f .et_pb_column, .blurb_20_f .et_pb_column").each(
                    function () {
                        t(this)
                            .find(".et_pb_button_module_wrapper ")
                            .insertAfter(
                                t(this).find(".et_pb_blurb_description")
                            );
                    }
                ),
                    t(".blurb_16_f .et_pb_column").each(function () {
                        t(this)
                            .find(".et_pb_button_module_wrapper ")
                            .insertAfter(
                                t(this).find(".et_pb_blurb_description")
                            );
                    });
            }, g),
            t(".falkor-testimonial5 .et_pb_testimonial").each(function () {
                t(this)
                    .find(
                        ".et_pb_testimonial_description_inner p:not(.et_pb_testimonial_meta)"
                    )
                    .insertAfter(
                        t(this).find(
                            ".et_pb_testimonial_description_inner p.et_pb_testimonial_meta"
                        )
                    );
            });
    })(jQuery);
