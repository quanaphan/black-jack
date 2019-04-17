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

		var percentage = 0;
		if((player['wins'] + player['loses']) !== 0){
			percentage = player['wins']/(player['wins'] + player['loses']);
		}
		//console.log(percentage.toFixed(2));
		$('#user_name').text(player['nickname']);
		$('#cash').text("Balance: $" + player['balance']);
		$('#wins').text("Wins: " + player['wins']);
		$('#loses').text("Loses: " + player['loses']);
		$('#winp').text("Win %: " + percentage.toFixed(2) + "%");
	});

	var leaderboard = {};
	socket.on('rankings', function(list){
		leaderboard = JSON.parse(list);
		var i;
		var length = leaderboard.length;	//if we want more than 3 to show
		for(i = 0; i < length; i++){
			if(leaderboard[i].nickname === player['nickname']){
				$('#rank').text("Rank: " + (i+1));
			}
		}
	});



});