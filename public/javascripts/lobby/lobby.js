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

	socket.on('refresh', function(){

		console.log("success");
	});

	socket.on('lobby update', function(){
		//console.log("failed");
	});



	
});
