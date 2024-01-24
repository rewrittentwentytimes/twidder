displayview = function() {
    let welcomeview = document.getElementById("welcomeview")
    let profileview = document.getElementById("profileview")
    let loggedin = false;
    let contentdisplayer = document.getElementById("content")

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