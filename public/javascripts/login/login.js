

$(document).ready(function(){
	var socket = io();

	$('#login').click(function(){
    	login($('#username').val(), $('#password').val());
  	});

	function login(username, password){
		console.log("sending " + username + " " + password);
		socket.emit('login', username, password);
		socket.on('login success', function(){

		})
		socket.on('login failure', function(){

		})
	}



	
});
