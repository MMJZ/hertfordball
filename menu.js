function thing() {
    var navItems = document.getElementsByTagName("nav")[0].children[0].children;

    for (var i = 1; i < navItems.length; i++) {
        navItems[i].className = "show";
    }

    navItems[0].className = "";
}