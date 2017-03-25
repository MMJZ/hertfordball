function scrollToSection(nm, t) {
    var offset = -60;
    $('html, body').animate({
        scrollTop: $("#" + nm).offset().top + offset
    }, t * 300 + 400);
}
