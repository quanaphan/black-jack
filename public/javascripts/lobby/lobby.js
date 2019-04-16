$(document).ready(function() {
	var socket = io('/lobby');

	var player = {};
	socket.on('init', function (sessionPlayer) {
		console.log("inside init");
		player = JSON.parse(sessionPlayer);
		console.log(player);
		$('#username').text(player['username']);
		$('#money').text("Balance: $" + player['balance']);
	});

	$('#game-create-enter').click(function (event) {
		event.preventDefault();
		host($('#room-name').val());
	});

	function host(roomName) {
		console.log("creating room");
		socket.emit('create room', roomName);
	}

	var gameSessions = {};
	socket.on('lobby update', function (game_sessions) {
		console.log("lobby updated");
		gameSessions = JSON.parse(game_sessions);
		console.log(gameSessions);
		$('#gamerooms').empty();
		var count = Object.keys(gameSessions).length;
		var i;
		for (i = 0; i < count; i++) {
			if (gameSessions[i]['active']) {
				$('#gamerooms').append("<li>" + "Room #" + gameSessions[i]['id'] + " \"" + gameSessions[i]['title'] + "\" " + gameSessions[i]['capacity'] + "/3" + "</li>");
			}
		}

	});


	socket.on('redirect to login', function () {
		console.log("redirecting to login");
		document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
		document.cookie = "authorized= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
		window.location.href = "/";
	});

	socket.on('join fail', function () {
		//TODO logic for when trying to join room that is full
		console.log("join failed");
	});

	$('#logout').click(function (event) {
		event.preventDefault();
		logout();
	});

	function logout() {
		console.log("logging out");
		document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
		document.cookie = "authorized= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
		window.location.href = "/";
	}

	$('#refresh').click(function (event) {
		event.preventDefault();
		refresh();
	});

	function refresh() {
		console.log("refresh");
		socket.emit('refresh');
	}

	$('#account').click(function (event) {
		event.preventDefault();
		account();
	});

	function account() {
		window.location.href = "/account";
	}

	$('#game-create-enter').click(function () {
		let roomName = $('#newRoomModal #room-name').val();
		$('#newRoomModal #room-name').val("");
	});






});

