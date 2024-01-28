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

function emailcheck(email) {
    let emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailregex.test(email);
}

function logincheck() {

    let email = document.getElementById("loginemail").value;
    let pw = document.getElementById("loginpassword").value;
    let em = document.getElementById("loginem");

    if (emailcheck(email)) {
        em.innerHTML = "skål it works";
        return false;
    }
    else {
        em.innerHTML = "Enter a valid email adress";
        return false;
    }
}

function signupcheck() {

    console.log("Signup check function called");

    let email = document.getElementById("signupemail").value;
    let pw = document.getElementById("signuppassword").value;
    let em = document.getElementById("signupem");
    let repeatpw = document.getElementById("repeatpassword").value;

    console.log("Email:", email);
    console.log("Password:", pw);
    console.log("Repeat Password:", repeatpw);


    if (!emailcheck(email)) {
         em.innerHTML = "Enter a valid email adress";
         return false;
    }

    console.log("Password:", pw);
    console.log("Repeat Password:", repeatpw);

    if (pw !== repeatpw) {
         console.log("Passwords don't match");
         em.innerHTML = "Passwords don't match";
         return false;
    }

    if (pw.length < 10) {
        console.log("Password is too short");
        em.innerHTML = "Password is too short, it needs to be at least 10 characters";
        return false;
    }

    // Everything is fine
    em.innerHTML = "SKÅL IT FUCKING WORKS FINALLY";
    return false; // false for now
}    
