var $ = require("jquery");
window.jQuery = $;
import Noty from "noty";
import Inputmask from "inputmask";

import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
Swiper.use([Navigation, Pagination, Thumbs]);

import tippy from 'tippy.js';

// import ISpin from "ispin";

import JsTabs from "js-tabs";

import MmenuLight from "mmenu-light";

require("@fancyapps/fancybox");



$(document).ready(function () {



    // Tooltips
    tippy("[data-tippy-content]", {
        interactive: true,
        theme: "light",
        arrow: true,
        delay: [0,500]
    });



    // Spoilers
    function spoiler() {
        var spoiler = $(".spoiler");
        if ( spoiler.length ) {
            $('.spoiler__header').click(function() {
                $(this).closest(".spoiler").find(".spoiler__body").slideToggle( function () {
                    $(this).closest(".spoiler").toggleClass("collapsed");
                });
            });
        }
    }
    spoiler();



    // Tabs
    if ( $(".tabs").length ) {
        const jstabs = new JsTabs({
            elm: '.tabs',
            shouldScrollTabIntoView: false
        })
        jstabs.init()
    }



    // Slider
    var slider = new Swiper('.slider', {
        spaceBetween: 10,
        navigation: {
            nextEl: '.slide-next',
            prevEl: '.slide-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

    // Carousel
    var carousel = new Swiper('.swiper-container', {

        slidesPerView: "auto",
        watchSlidesVisibility: true,
        slideActiveClass: "active",
        slidesOffsetBefore: 0,
        slidesOffsetAfter: -30,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
        },

    });

    // Gallery
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 3,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    var galleryPhoto = new Swiper('.gallery-photo', {
        spaceBetween: 10,
        navigation: {
            nextEl: '.slide-next',
            prevEl: '.slide-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable: true,
        },
        thumbs: {
            swiper: galleryThumbs,
            slideThumbActiveClass: "active",
            slideActiveClass: "active"
        },
    });



    // Notifications
    function notifications() {

        new Noty({
            layout: "topLeft",
            text: "Ваш город <b>Новосибирск</b>?<br><button class='btn btn-sm btn-primary mr-1 mt-2'>Верно</button><button class='btn btn-sm btn-outline-primary mt-2' data-fancybox data-src='#modal-geo'>Выбрать город</button>",
            theme: "bootstrap-v4",
            type: "alert",
            timeout: 3000
        }).show();

        $("[data-noty]").each(function () {
            $(this).on("click", function () {
                new Noty({
                    text: $(this).data("noty"),
                    theme: "bootstrap-v4",
                    timeout: 3000
                }).show();
            })
        });

    }
    notifications();



    // Mobile menu
    const menu = new MmenuLight(
        document.querySelector( "#mobile-menu")
    );

    const navigator = menu.navigation({title: "Меню"});
    const drawer = menu.offcanvas({});

    document.querySelectorAll( '.toggle-menu' ).forEach(function (element) {
        element.addEventListener( 'click', ( evnt ) => {
            evnt.preventDefault();
            drawer.open();
        });
    })



    // Autocomplete
    function autocomplete() {
        var input = $("[data-autocomplete]")
        var results = $(input.attr("data-autocomplete"));

        input
            .keyup(function (){
                input.val() ? results.addClass("active") : results.removeClass("active");
            })
            .focus(function (){
                if ( input.val() ) results.addClass("active")
            })

        $(document).click(function (e) {
            if ( !$(e.target).parents(".autocomplete").length && !$(e.target).attr("data-autocomplete")) {
                results.removeClass("active")
            }
        })
    }
    autocomplete();


    // Input mask
    function mask() {
        if ( document.querySelector("[data-inputmask]") ) {
            Inputmask().mask(document.querySelectorAll("input"));
        }
    }
    mask();



    // Fancybox
    $.fancybox.defaults.backFocus = false;
    $.fancybox.defaults.hash = false;
    $.fancybox.defaults.lang  = "ru";
    $.fancybox.defaults.i18n.ru = {
        CLOSE: "Закрыть",
        NEXT: "Вперед",
        PREV: "Назад",
        ERROR: "Ошибка при загрузке. <br/> Пожалуйста, повторите позже.",
        PLAY_START: "Слайдшоу",
        PLAY_STOP: "Остановить",
        FULL_SCREEN: "Во весь экран",
        THUMBS: "Превью",
        DOWNLOAD: "Скачать",
        SHARE: "Поделиться",
        ZOOM: "Увеличить"
    };


    // Tooltips
    tippy("[data-tippy-content]", {
        interactive: true,
        theme: "light",
        arrow: true,
        delay: [0,500]
    });


    // Add class on click
    if ( $("[data-class-active]").length ) {
        $("[data-class-active]").on("click", function() {
            $(this).toggleClass( $(this).data("class-active") );
        });
    }

    // Text in active element
    if ( $("[data-text-active]").length ) {
        $("[data-text-active]").on("click", function () {
            if ($(this).hasClass("active")) {
                $(this).data("text-default", $(this).text()).text($(this).data("text-active"));
            } else {
                $(this).text($(this).data("text-default"));
            }
        })
    }


})

/*

$(document).ready(function () {


    // Tabs
    var myTabs = new JsTabs({
        elm: '.jstabs'
    })
    myTabs.init()





    // Search filter
    function searchFilter() {

        var searchFilterInput, searchFilterInputText, searchFilterList, searchFilterListItem, searchFilterListEl, searchFilterTextVal;

        searchFilterInput = $(".search-filter__input");
        searchFilterInputText = searchFilterInput.val().toUpperCase();
        searchFilterList = $(".search-filter__list");
        searchFilterListItem = searchFilterList.find(".search-filter__list-item");


        // Loop through all list items, and hide those who don't match the search query
        for (var i=0; i < searchFilterListItem.length; i++) {
            searchFilterListEl = searchFilterListItem.eq(i).find("a");
            searchFilterTextVal = searchFilterListEl.text();
            if (searchFilterTextVal.toUpperCase().indexOf(searchFilterInputText) > -1) {
                searchFilterListItem.eq(i).slideDown();
            } else {
                searchFilterListItem.eq(i).slideUp();
            }
        }

    }
    $(".search-filter__input").keyup( function(){searchFilter()} );



    // Comparison table
    function comparisonTable() {
        function liAutoHeight() {
            var li = $("li.auto-height");
            var liNumber = li.filter(":last-child").index()+1;
            var maxHeight, currentLi;

            li.height("auto");

            for (var i=1; i<=liNumber; i++) {

                currentLi = li.filter(":nth-child(" + i + ")");

                maxHeight = Math.max.apply(null, currentLi.map(
                    function(){
                        return $(this).height();
                    }).get()
                );

                currentLi.each(function () {
                    $(this).height(maxHeight)
                });

            }

        }
        liAutoHeight();

        $(window).on("resize",function () {
            liAutoHeight();
        })
    }
    comparisonTable();



    // Scroll top button
    function scrollTop() {
        $("button.up").on("click", function () {
            $("html, body").stop().animate({scrollTop: 0}, 2000, 'swing');
        })
    }
    scrollTop();



});*/
