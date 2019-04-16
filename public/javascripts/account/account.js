$(document).ready(function(){
	var socket = io('/account');

	$('#go-back').click(function(event){
		window.location.href = "/lobby";
	})

	var player = {};
	socket.on('init', function(sessionPlayer){
		console.log("inside account init");
		player = JSON.parse(sessionPlayer);
		console.log(player);

		var percentage = player['wins']/(player['wins'] + player['loses']);
		console.log(percentage.toFixed(2));
		$('#user_name').text(player['nickname']);
		$('#cash').text("Balance: $" + player['balance']);
		$('#wins').text("Wins: " + player['wins']);
		$('#loses').text("Loses: " + player['loses']);
		$('#winp').text("Win %: " + percentage.toFixed(2));
		$('#rank').text("Rank: ");
	});




});