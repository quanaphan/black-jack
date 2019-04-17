// socket io logics for game
$(document).ready(function () {
    var socket = io('/game');
    // global vars go here
    var player; // you
    var session; // the game session
    var playersReady = {};
    playersReady.main = false;
    playersReady.p1 = false;
    playersReady.p2 = false;

    let mainPlayerHand = [];
    let dealerHand = [];
    let player1Hand = [];
    let player2Hand = [];

    // update session details whenever received.

    // 'init' event, receive own's player details, session details
    socket.on('init', function (player_info, session_info) {

        console.log("inside init gameroom");
        // save to local

        player = JSON.parse(player_info);
        /**
         * This is your (the viewer of this current page) stuffs
         * player['nickname'] = nickname
         * player['username'] = username
         * player['balance'] = balance
         */
         console.log("updating session info");
        session = JSON.parse(session_info);
        /**
         * This is the game session's (game room)
         * session['host'] = username of the host
         * session['title'] = title of the session
         * session['players'][username] = access data based one usernames of the players inside the sessions (username is a variable here)
         * session['players'][username]['username'] = username of the username, double redundancy layer for no reason
         * session['players'][username]['nickname'] = nickname of the user
         * session['players'][username]['hand'] = current hand of the user. IMPORTANT, empty at this point
         * session['p1'] = username of player 1 - host's, should always exist
         * session['p2'] = username of player 2 - only exist if player is inside room
         * session['p3'] = username of player 3 - only exist if player is inside room
         * session['dealer']['hand'] =  dealer's hand. IMPORTANT, empty at start
         * session['turn'] = current turn, possible values: p1 p2 p3 dealer
         * session['active'] = irrelevant to client
         * session['capacity'] = # of people inside room atm
         * session['deck'] = cards in deck, irrelevant to client. probably.
         */
        console.log('Received player info:');
        console.log(player);
        console.log('Received session info:');
        console.log(session);
        let player1 = session['p1'];
        //remember to remove the placeholder headings
        enableButton('#lock-bet');
        if (session['capacity'] > 0) {
            $('#main-user-head').text(session['players'][player1]['nickname']);
        }   $('#chip-balance').text(player['balance']);
        disableAllButtons();
    });

    // emit 'ready' when lock-in bet
    // trigger this if the player (you) place bet
    //socket.emit('ready', betAmount)
    $('#lock-bet').click(function(){
        var betVal = $('#wager-input').val();
        if(betVal < player.balance){
            if(betVal < 10){
                alert("You must bet at least $10 to play!");
            }else{
                $('#wager-input').val("");
                disableButton('#lock-bet');
                socket.emit('ready', Number(betVal)); 
            }
        }else{
            alert("You don't have that much in your balance!");
        }
    });

    socket.on('player join', function(session_info){
        session = JSON.parse(session_info);
        /**
         * This is the game session's (game room)
         * session['host'] = username of the host
         * session['title'] = title of the session
         * session['players'][username] = access data based one usernames of the players inside the sessions (username is a variable here)
         * session['players'][username]['username'] = username of the username, double redundancy layer for no reason
         * session['players'][username]['nickname'] = nickname of the user
         * session['players'][username]['hand'] = current hand of the user. IMPORTANT, empty at this point
         * session['p1'] = username of player 1 - host's, should always exist
         * session['p2'] = username of player 2 - only exist if player is inside room
         * session['p3'] = username of player 3 - only exist if player is inside room
         * session['dealer']['hand'] =  dealer's hand. IMPORTANT, empty at start
         * session['turn'] = current turn, possible values: p1 p2 p3 dealer
         * session['active'] = irrelevant to client
         * session['capacity'] = # of people inside room atm
         * session['deck'] = cards in deck, irrelevant to client. probably.
         */
         var player1 = session['p1'];
         var player2;
         var player3;
        console.log(session);
        if(session['capacity'] === 2){
            player2 = session['p2'];
        }else{
            player3 = session['p3'];
        }
        //remember to remove the placeholder headings
        enableButton('#lock-bet');
        if (session['capacity'] > 0) {
            $('#main-user-head').text(session['players'][player1]['nickname']);
        }
        if (session['capacity'] > 1) {
            $('#player1-head').text(session['players'][player2]['nickname']);
        }
        if (session['capacity'] > 2) {
            $('#player2-head').text(session['players'][player3]['nickname']);
        }
    });

    // 'lock in' event, somebody locked in, param: username -> change graphics for that username (including self)

    socket.on('lock in', function (username, betAmount) {
        if(username === session['p1']){
            $('#main-user-bet-total').text("$" + betAmount);
            playersReady.main = true;
        }else if(username === session['p2']){
            $("#player1-bet-total").text("$" + betAmount);
            playersReady.p1 = true;
        }else if(username === session['p3']){
            $("#player2-bet-total").text("$" + betAmount);
            playersReady.p2 = true;
        }

        console.log(session['capacity'])
        if(session['players'].length === 1){
            if(playersReady.main){
                socket.emit('card distribution request');
            }
        }else if(session['capacity'] === 2){
            if(playersReady.main && playersReady.p1){
                socket.emit('card distribution request');
            }
        }else if(session['capacity'] === 3){
            if(playersReady.main && playersReady.p1 && playersReady.p2){
                socket.emit('card distribution request');
            }
        }
    });

    socket.on('update balance', function(balance){
        player['balance'] = balance;
        $('#chip-balance').text(player['balance']);
    });

    // emit 'card distribution request' when everyone in room is ready (only host needed to do this, everyone can just spam this though)
    //socket.emit('card distribution request')

    // receive 'init card distribution', session details <- use this to create initial dealing animation, containing 2 hands ea,
    // order of players can be found with ['p1'], ['p2'], ['p3'], dealer go last
    socket.on('init card distribution', function (session_info) {
        session = JSON.parse(session_info);
        console.log(player['username']);
        let mainPlayer = session['p1'];
        mainPlayerHand = session['players'][mainPlayer]['hand'];
        dealerHand = session['dealer']['hand'];
        var player1;
        var player2;
        if(session['capacity'] < 3){
            player1 = session['p2'];
            player1Hand = session['players'][player1]['hand'];
        }else{
            player1 = session['p2'];
            player1Hand = session['players'][player1]['hand'];
            player2 = session['p3'];
            player2Hand = session['players'][player2]['hand'];
        }


        //session updated with initial hand
        // initial animations go here

        initialDeal(session);

        let turn = session['turn'];
        let username = session[turn];

        console.log(session['turn']);
        console.log(username);
        console.log(player['username']);

        showAlert("Place Your Bets");
        startLockInTimer();
        hideAlert();

        displayHandTotals();

        if (username === player['username']) {
            enableAllButtons();
            turnTimer();
        }
        $("#hit-button").click(function () {
            socket.emit('card deal');
        })

        $("#stand-button").click(function () {
            socket.emit('pass');
            disableAllButtons();
        });

    });

    // $("#hit-button").click(function () {
    //     socket.emit('card deal');
    // })

    // $("#stand-button").click(function () {
    //     socket.emit('pass');
    //     disableAllButtons();
    // });

    // actual game memes now

    // emit 'card deal' to deal card to self, everyone should be locked out of this action
    // only the one w/ matching username to current turn's p's username ( turn can be p1 p2 p3 & session['p#'] will return the username)
    // basically: turn = session['p#'] ; if(username === session[turn]);
    //socket.emit('card deal')

    // 'card dealt' event, username, session details. A card has been dealt to username and new session details, use that to execute animation
    socket.on('card dealt', function (username, session_info) {

        //username = the one that got a card dealt to them
        session = JSON.parse(session_info);
        console.log(session);
        //session updated with the new card
        // this is the new card dealt to <username>
        var hand = session['players'][username]['hand'];
        var new_card = hand[hand.length - 1];
        var turn = session['turn'];
        var location;
        console.log(hand);
        console.log(new_card);
        console.log(username);

        if (turn === 'p1') {
            location = $("#main-user");
        } else if (turn === 'p2') {
            location = $("#player1");
        } else if (turn === 'p3') {
            location = $("#player2");
        } else if (turn === 'dealer') {
            location = $("#dealer");
        }

        // do some animation
        dealCardAnimationSingle(hand, location, new_card, session);

        // $("#hit-button").click(function () {
        //     socket.emit('card deal');
        // })
        displayHandTotals();
        // $("#stand-button").click(function () {
        //     socket.emit('pass');
        // });
    });
//unstable
    // socket.on('dealer drawn', function(session_info){
    //     session = JSON.parse(session_info);
    //     var hand = session['players'][username]['hand'];
    //     var location = $("#dealer");
    //     var new_card;
    //     for(var i = 2; i < hand.length; i++)
        

    //     dealCardAnimationSingle(hand, location, new_card, session);
    // })

    // emit 'pass' to pass their turn (on button press or something), same lock out condition as card deal
    //socket.emit('pass');

    // 'next player' event, session details. A pass triggered, new player -> refresh lockout so that next player can interact (check session['turn'])
    socket.on('next player', function (session_info) {

        session = JSON.parse(session_info);

        let turn = session['turn'];
        let currPlayer = session[turn];
        console.log(turn);
        if (currPlayer === player['username']) {
            enableAllButtons();
        }else if(turn === 'dealer'){
            console.log("im here");
            socket.emit('tally score');
        }
        console.log(turn);
        console.log(currPlayer);
        //session updated with correct turn
        // do something, turn on the GUI if turn = you
    });

    // emit 'split', split event, dunno yet
    //socket.emit('split'); // don't use this

    // emit 'chicken dinner', black jack doh, dunno yet
    //socket.emit('chicken dinner'); // don't use this yet

    // emit 'tally score', calculate everyone's score when turn = dealer. Everyone can call but only host's call will be effective.
    //socket.emit('tally score'); // call when p3 turn is over and ^


    // 'win' event, username. username won, change their graphic accordingly. Will receive other players'
    socket.on('win', function (username) {
        if (username === player['username']) {
            setTimeout(function () {
                showAlert(username + "Won!");
            }, 2000);
            hideAlert();
        }
    });
    // 'lose' event, username. username lost, change their graphic accordingly. Will receive other players'
    socket.on('lose', function (username) {
        // username lost, do animation for <username>
        if (username === player['username']) {
            setTimeout(function () {
                showAlert(username + "Lost");
            }, 2000);
            hideAlert();
        }
    });
    // 'draw' maibe?
    socket.on('draw', function (username) {
        if (username === player['username']) {
            setTimeout(function () {
                showAlert("Draw!");
            }, 2000);
            hideAlert();
        }

    });


    function getWager() {
        $('#lock-bet').click(function () {
            let wager = $('#wager-input').val();
            $('#wager-input').val("");

            disableButton('#lock-bet');
            console.log(wager);
            return wager;
        });


    }

    function startLockInTimer() {

        let time = 15;
        let clock = setInterval(function () {
            $("#timer").text(time);
            time -= 1;
            if (time <= 0) {
                clearInterval(clock);

            }
        }, 1000);

    }

    function turnTimer() {

        let time = 30;
        let clock = setInterval(function () {
            $("#timer").text(time);
            time -= 1;
            if (time <= 0) {
                clearInterval(clock);

            }
        }, 1000);

    }

    function disableAllButtons() {
        
        disableButton('#hit-button');
        disableButton("#stand-button");
        disableButton("#double-down-button");

    }

    function enableAllButtons() {
        enableButton("#hit-button");
        enableButton("#stand-button");
        enableButton("#double-down-button");

    }

    function showAlert(msg) {
        //$('#alert span').toggle(slow);
        $('#alert span').html('<strong>' + msg + '</strong>');
        $('#alert').fadeIn();

    }

    function hideAlert() {
        $('#alert').hide();


    }

});



