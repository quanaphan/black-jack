$(document).ready(function(){
	var socket = io('/lobby');

	$('#createRoom').click(function(event){
		event.preventDefault();
		console.log("creating event");
		host();
	});

	function host(){
		console.log("creating room");
		socket.emit('create room', "New Room");
	}

	var gameSessions = {};
	socket.on('lobby update', function(game_sessions){
		console.log("lobby updated");
		gameSessions = JSON.parse(game_sessions);
		console.log(gameSessions);

	});


	socket.on('redirect to login', function(){
		console.log("redirecting to login");
		document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
		document.cookie = "authorized= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
		window.location.href = "/";
	});

	socket.on('join fail', function(){
		console.log("join failed");
	});

	$('#logout').click(function(event){
		event.preventDefault();
		logout();
	});

	function logout(){
		console.log("logging out");
		document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
		document.cookie = "authorized= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
		window.location.href = "/";
	}

	$('#refresh').click(function(event){
		event.preventDefault();
		refresh();
	});

	function refresh(){
		console.log("refresh");
		socket.emit('refresh');
	}

	$('#account').click(function(event){
		event.preventDefault();
		account();
	});

	function account(){
		window.location.href = "/account";
	}
	
});
