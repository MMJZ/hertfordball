function thing() {
    var navItems = document.querySelectorAll('nav ul li');

    var newClass = navItems[1].className === 'show' ? '' : 'show';
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].className = newClass;
    }

    navItems[0].className = '';
}
