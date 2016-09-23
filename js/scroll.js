function scrollToSection(divNum) {
    var offset = 20;
    $('html, body').animate({
        scrollTop: $("#group" + divNum).offset().top + offset
    }, 2000);
}
