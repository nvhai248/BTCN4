let loginInterface = document.getElementById("login");
let registerInterface = document.getElementById("register");

$('#goToRegisterBtn').click(function (e) {
    e.preventDefault();
    $('#loginInterface').addClass('noneDisplay');
    $('#registerInterface').removeClass('noneDisplay');
});

$('#goToLoginBtn').click(function (e) {
    e.preventDefault();
    $('#loginInterface').removeClass('noneDisplay');
    $('#registerInterface').addClass('noneDisplay');
});

$('#reg').click(function (e) {
    e.preventDefault();
    const user = document.getElementById("usernameR").value;
    const pass = document.getElementById("passwordR").value;
    const conf = document.getElementById("confirm").value;
    const fullName = $('#fullName').val();
    const address = $('#address').val();
    let notification = document.getElementById("notificationR");
    if (user == "") {
        notification.innerHTML = "Please enter username!"
    }
    else if (pass == "") {
        notification.innerHTML = "Please enter password!"
    }
    else if (conf == "") {
        notification.innerHTML = "Please enter confirm password!"
    }
    else if (pass != conf) {
        notification.innerHTML = "Confirm password is incorrect!"
    }
    else if (address == "") {
        notification.innerHTML = "Please enter your address!"
    }
    else if (fullName == "") {
        notification.innerHTML = "Please enter your full name!"
    }
    else {
        const form = document.getElementById("registerForm");
        form.action = "/register";
        form.submit();
    }
});

$('#loginBtn').click(function (e) {
    e.preventDefault();
    const user = document.getElementById("usernameL").value;
    const pass = document.getElementById("passwordL").value;
    let notification = document.getElementById("notificationL");
    if (user == "") {
        notification.innerHTML = "Please enter username!"
    }
    else if (pass == "") {
        notification.innerHTML = "Please enter password!"
    }
    else {
        const form = document.getElementById("loginForm");
        form.action = "/login";
        form.submit();
    }
});