$(document).ready(function() {
    // Window scroll event
    $(window).scroll(function() {
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Slide up script
    $('.scroll-up-btn').click(function() {
        $('html').animate({ scrollTop: 0 });
    });

    // Toggle menu / navbar script
    $('.menu-btn').click(function() {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Typing animation script
    var typedOptions = {
        strings: ["Web Developer", "Software Engineer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    };

    // new Typed(".typing", typedOptions);
    new Typed(".typing-2", typedOptions);

    // Owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });

    // Scroll position for sections
    $('.menu a').click(function(event) {
        event.preventDefault();
        var target = $(this).attr('href');
        var offset = 0; // Default offset

        if (target === '#home') {
            offset = 0;
        } else if (target === '#about') {
            offset = 100;
        } else if (target === '#projects') {
            offset = 110;
        } else {
            offset = 90;
        }

        $('html, body').animate({
            scrollTop: $(target).offset().top + offset
        }, 500);
    });
});
