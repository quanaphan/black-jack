$(document).ready(function () {
    var socket = io('/login');
    var usr = ''; //load old cookie

    $('#login').click(function (event) {
        event.preventDefault();
        login($('#username').val(), $('#password').val());
    });

    function login(username, password) {
        console.log("sending " + username + " " + password);
        usr = username;
        socket.emit('login', username, password);
    }

    socket.on('login success', function () {
        console.log("success");
        var now = new Date();
        now.setTime(now.getTime() + (24 * 60 * 60 * 1000)); // valid for 1 day
        cookie_string = 'username=' + usr + '; expires=' + now.toUTCString() + '; path=/';
        document.cookie = cookie_string;
        cookie_string = 'authorized=' + true + '; expires=' + now.toUTCString() + '; path=/';
        document.cookie = cookie_string;
        window.location.href = "/lobby";

    });
    socket.on('login failure', function () {
        console.log("failed");
    });

    $('#create-account').prop('disabled', true);


    $('#new-password, #check-new-password').on('keyup', function () {

        if ($('#new-password').val() == $('#check-new-password').val()) {
            $('#matching-message').html('Matching').css('color', 'green');
            $('#create-account').prop('disabled', false);
        } else {
            $('#matching-message').html('Not Matching').css('color', 'red');
            $('#create-account').prop('disabled', true);
        }
    });


});
