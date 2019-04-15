

$(document).ready(function(){
	var socket = io('/login');

	$('#login').click(function(event){
		event.preventDefault();
    	login($('#username').val(), $('#password').val());
  	});

	function login(username, password){
		console.log("sending " + username + " " + password);
		socket.emit('login', username, password);
	}

	socket.on('login success', function(){
		console.log("success");
		window.location.href = "/lobby";

	});
	socket.on('login failure', function(){
		console.log("failed");
	});



	
});
