$( window ).load(function() {
    $('.preloader').hide();
});

function createFullPage() {

    var pTop = '';
    var pBot = '';


    if($(window).width() > 991) {
        pTop = '100px';
        pBot = '70px';
    }else {
        pTop = '70px';
        pBot = '20px';
    }


    $('#fullpage').fullpage({
        scrollOverflow: true,
        navigationPosition: 'right',
        navigation: true,
        fixedElements: '.header, .footer',
        paddingTop: pTop,
        paddingBottom: pBot,
        easing: 'ease-in-out',
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        scrollingSpeed: 1500,
        verticalCentered: true,
        normalScrollElementTouchThreshold: 1,
        fitToSection: true,
        fitToSectionDelay: 2000,
        afterLoad: function(anchorLink, index){
            $('.current-pages').text(index);
            console.log(index);
        },
        onLeave: function(index, nextIndex, direction){


            var $footer = $('.footer'),
                $header = $('.header'),
                $logo = $('.logo__box');

            if(nextIndex == 1){
                $footer.fadeOut();
                $logo.fadeIn();
            }else {
                $footer.fadeIn();
                $logo.fadeOut();
            }

            if(nextIndex == 5 || nextIndex == 7 || nextIndex == 9 || nextIndex == 10|| nextIndex == 11 || nextIndex == 13 ){
                $footer.addClass('black')
            }else {
                $footer.removeClass('black')
            }

            if(nextIndex == 5 || nextIndex == 7 || nextIndex == 13 || nextIndex == 16){
                $header.addClass('black-color');
            }else{
                $header.removeClass('black-color');
            }

            if(nextIndex == 17) {
                $header.hide()
            }else{
                $header.fadeIn();
            }

            if($(window).width() < 767) {
                $footer.hide();
            }
        }
    });

    $(document).on('click', '.mouse-icon', function(){
        $.fn.fullpage.moveSectionDown();
    });

}

$(document).ready(function() {

    var allPages = $('.section').length;
    $('.all-pages').text(allPages);

    createFullPage();




    $(".js-mask").mask("+7 (999) 999-9999");

    $('.validate').parsley();

    $('.popup-modal').magnificPopup({
        type: 'inline'
    });

    call();

});

function call() {

    var $btn = $('.js-send');

    $btn.on('click', function(){

        var form = $(this).closest('form');
        var msg = form.serialize();

        if (form.parsley().isValid()) {
            $.ajax({
                type: 'POST',
                url: 'send.php',
                data: msg,
                success: function (data) {

                    //console.log('Данные успешно отправлены - calController!');
                    if(data=="OK")
                    {
                        location.href ='/thanks.html';
                    }
                },
                error: function (xhr, str) {

                }
            });
            return false;
        }
    });
}