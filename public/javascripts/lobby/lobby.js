$(document).ready(function(){
	var socket = io('/lobby');

	$('#login').click(function(event){
		event.preventDefault();
    	login($('#username').val(), $('#password').val());
  	});

	function login(username, password){
		console.log("sending " + username + " " + password);
		socket.emit('login', username, password);
	}

	$('#creatRoom').click(function(even){
		event.preventDefault();
		host();
	});

	function host(){
		console.log("creating room");
		socket.emit('create room', "New Room");
	}

	socket.on('refresh', function(){

		console.log("success");
	});

	socket.on('lobby update', function(){
		console.log("failed");
	});



	
});
