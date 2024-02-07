displayview = function() {
    let welcomeview = document.getElementById("welcomeview");
    let profileview = document.getElementById("profileview");
    let contentdisplayer = document.getElementById("content");
    const savedtoken = localStorage.getItem("token");
    
    
    if (savedtoken) {
        contentdisplayer.innerHTML = profileview.innerHTML;
        showtab("homearea");
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

    if (pw !== repeatpw) {
         em.innerHTML = "Passwords don't match";
         return false;
    }

    if (pw.length < 10) {
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


function showtab(specifictab) {

    let chosentab = document.getElementById(specifictab);
    let tabs = document.querySelectorAll(".tab");
    let tabcontents = document.querySelectorAll(".tabcontent");

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
        tabcontents[i].style.display = "none";
    }

    if (chosentab) {
        chosentab.style.display = "block";
    }

    for (let i = 0; i < tabcontents.length; i++) {
        if(tabcontents[i].id === specifictab) {
            tabs[i].classList.add("active");
            break;
        }
    }

    if(specifictab === "homearea") {
        const token = localStorage.getItem("token");
        const userinfo = serverstub.getUserDataByToken(token);

        if(userinfo.success) {
            printuserinfo(userinfo.data, "userinfo");
        }
        else {
            console.log("Failed to load data for some reason");
        }
        loadwalloftext();
    }
    
}

function logout() {
    const token = localStorage.getItem("token");
    const serverfeedback = serverstub.signOut(token);
    if (serverfeedback.success) {
        localStorage.removeItem("token");
        displayview();
    }
    else {
        serverfeedback.message;
    }
}

function changepassword() {
    let opw = document.getElementById("oldpassword").value;
    let npw = document.getElementById("newpassword").value;
    let rnpw = document.getElementById("repeatnewpassword").value;
    const token = localStorage.getItem("token");
    let message = document.getElementById("accountmessage");

    if (npw !== rnpw) {
        message.innerHTML = "Passwords don't match";
        return;
    }

    if (npw.length < 10) {
        message.innerHTML = "New password needs to be atleast 10 characters";
        return;
    }

    let serverfeedback = serverstub.changePassword(token, opw, npw);
    message.innerHTML = serverfeedback.message;

    document.getElementById("oldpassword").value = "";
    document.getElementById("newpassword").value = "";
    document.getElementById("repeatnewpassword").value = "";

    setTimeout(function(){message.innerHTML = "";}, 5000);
    
}

function printuserinfo(userinfo, cid) {

let htmlcontent = 
    `<h2>Profile information</h2>
    <p>Email: <span>${userinfo.email}</span></p>
    <p>Name: <span>${userinfo.firstname} ${userinfo.familyname}</span></p>
    <p>Gender: <span>${userinfo.gender}</span></p>
    <p>City: <span>${userinfo.city}</span></p>
    <p>Country: <span>${userinfo.country}</span></p>`
    ;

    document.getElementById(cid).innerHTML = htmlcontent;

}

function printusermessages(messages, cid) {

    let htmlcontent = "<h2>User messages</h2>";

    messages.forEach(message => {
        htmlcontent += `<p>${message.writer}: ${message.content}</p>`;
    });

    document.getElementById(cid).innerHTML = htmlcontent;

}

function postmessage(frombrowse = false) {

    const messageid = frombrowse ? "browsepostmessage" : "postmessage";
    const message = document.getElementById(messageid).value.trim();
    const emid = frombrowse ? "browsepostem" : "postem";
    const em = document.getElementById(emid);

    if(message === "") {
        em.innerText = "You need to write something before posting";
        return;
    }
    else {
        em.innerText = "";
    }

    const token = localStorage.getItem("token");
    const useremail = frombrowse ? document.getElementById("browseemail").value.trim() : null;
    const postedmessage = serverstub.postMessage(token, message, useremail);

    if (postedmessage.success) {
        document.getElementById(messageid).value = "";

        if(frombrowse) {
            loadwalloftext(useremail, "browsewalloftext");
        }
        else {
            loadwalloftext(null, "walloftext");
        }
    }
    else {
        em.innerText = "Fail: " + postedmessage.message;
    }


}

function loadwalloftext(email = null, cid = "walloftext") {
    const token = localStorage.getItem("token");
    let serverfeedback = email ? serverstub.getUserMessagesByEmail(token, email) : serverstub.getUserMessagesByToken(token);

    if (serverfeedback.success) {
        printusermessages(serverfeedback.data, cid);
    }
    else {
        document.getElementById(cid).innerText = "Failed to print messages";
    }
}

function searchuser () {
    token = localStorage.getItem("token");
    const email = document.getElementById("browseemail").value.trim();
    
    if(email && emailcheck(email)) {
        const userinfo = serverstub.getUserDataByEmail(token, email);

        if(userinfo.success) {
            document.getElementById("browseuserinfo").style.display = "block";
            document.getElementById("browsepostarea").style.display = "block";
            printuserinfo(userinfo.data, "browseuserinfo");
            loadwalloftext(email, "browsewalloftext");
        }
        else {
            document.getElementById("browseuserinfo").style.display = "block";
            document.getElementById("browsepostarea").style.display = "none";
            document.getElementById("browseuserinfo").innerText = "User not found";
        }

    }
    else {
        document.getElementById("browseuserinfo").style.display = "block";
        document.getElementById("browseuserinfo").innerText = "Enter a valid email address";
        document.getElementById("browsepostarea").style.display = "none";
    }
}

function refreshbrowsewall() {
    const email = document.getElementById("browseemail").value.trim();
    
    if(email) {
        loadwalloftext(email, "browsewalloftext");
    }
    else {
        console.log("Something went wrong in refreshbrowsewall");
    }
}