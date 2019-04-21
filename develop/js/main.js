$(function() {

    // Инициализация
    (function init(){
        $( ".second-service-accordion" ).accordion();
        header();
        event();
        $('.slick-slider').each(function () {
            $(this).slick();
        })
        console.log('asfdasfd')
    })();


    // Обработчики
    function event(){
        $(window).on('scroll', header);
    }

    // Логика
    function header(){
        var header = $('.section-header');
        header.toggleClass('_bg', $('.section-about-us').offset().top - header.outerHeight() <= $(window).scrollTop());
        header.toggleClass('fixed', $(window).scrollTop() > 0);
    }
});