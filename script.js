

$('.toggle').on('click', function() {
    $('.hamburger-menu').css({
        "transform": "translateX(0%)"
    });
    
});

$('.close').on('click', function() {
    $('.hamburger-menu').css({
        "transform": "translateX(-100%)"
    });
})