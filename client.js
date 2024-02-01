displayview = function() {
    let welcomeview = document.getElementById("welcomeview");
    let profileview = document.getElementById("profileview");
    let contentdisplayer = document.getElementById("content");
    const savedtoken = localStorage.getItem("token");
    
    
    if (savedtoken) {
        contentdisplayer.innerHTML = profileview.innerHTML;
    }

    else {
        contentdisplayer.innerHTML = welcomeview.innerHTML;
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
        
        const signinfeedback = serverstub.signIn(email, pw);

        if (signinfeedback.success) {

            localStorage.setItem("token", signinfeedback.data);
            displayview();
            return false;
        }
        else {
            em.innerHTML = signinfeedback.message;
            return false;
        }
    }

    else {
        em.innerHTML = "Enter a valid email address";
        return false;
    }
}

function signupcheck() {

    let email = document.getElementById("signupemail").value;
    let pw = document.getElementById("signuppassword").value;
    let em = document.getElementById("signupem");
    let repeatpw = document.getElementById("repeatpassword").value;
    let firstname = document.getElementById("firstname").value;
    let familyname = document.getElementById("familyname").value;
    let gender = document.getElementById("gender").value;
    let city = document.getElementById("city").value;
    let country = document.getElementById("country").value;
    
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
    // Lets create the object
    const dataObject = {
        email: email,
        password: pw,
        firstname: firstname,
        familyname: familyname,
        gender: gender,
        city: city,
        country: country
    };

    const signupfeedback = serverstub.signUp(dataObject);

    if (!signupfeedback.success) {
        em.innerHTML = signupfeedback.message;
    }
    else {
        em.innerHTML = signupfeedback.message;
    }
    return false;
}

function settab() {



}

function showtab(specifictab) {

    let chosentab = document.getElementById(specifictab);
    let tabs = document.querySelectorAll(".tab");
    let tabcontents = document.querySelectorAll(".tabcontent");

    for (let tab of tabs) {
        tab.classList.remove("active");
    }

    for (let tabcontent of tabcontents) {

        tabcontent.style.display = "none";

    }
    
    if (chosentab) {

        chosentab.style.display = "block";

        chosentab.classList.add("active");

        localStorage.setItem(chosentab, specifictab);
    }

    


}