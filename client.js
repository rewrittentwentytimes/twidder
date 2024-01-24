displayview = function() {
    var welcomeview = document.getElementById("welcomeview")
    var profileview = document.getElementById("profileview")
    var loggedin = false;
    var contentdisplayer = document.getElementById("content")

    console.log(welcomeview);

    if (!loggedin) {
        contentdisplayer.innerHTML = welcomeview.innerHTML;
    }
    else {
        contentdisplayer.innerHTML = profileview.innerHTML;
    }

};

window.onload = function() {

displayview();

};