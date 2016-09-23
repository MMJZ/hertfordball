function scrollToSection(divNum) {
    var offset = 20;
    $('.parallax').animate({
        scrollTop: $("#group" + divNum).offset().top + offset
    }, 2000);
}
