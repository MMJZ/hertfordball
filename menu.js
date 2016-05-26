function expandNav() {
    document.getElementsByTagName("nav").innerHTML = '<ul><li><a href="index.html">Home</a></li><li><a href="sponsors.html">Sponsors</a></li><li><a href="tickets.html">Tickets</a></li><li><a href="contact.html">Contact</a></li><li><a href="about.html">About</a></li></ul>';
}

function condenseNav() {
    document.getElementsByTagName("nav").innerHTML = '<ul><li><a onclick="expandNav()">Home</a></li></ul>';
}

function ready() {
    if (true) {
        condenseNav();
        document.getElementById("Footer").innerHTML = 'site by Antonia Siu &amp; Michael Agius';
    }
}