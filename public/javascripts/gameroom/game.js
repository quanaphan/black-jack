// socket io logics for game
$(document).ready(function () {
    var socket = io('/game');
    // global vars go here
    var player; // you
    var session; // the game session

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
        let player1 = session['p1'];
        let player2 = session['p2'];
        let player3 = session['p3'];
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

    // emit 'ready' when lock-in bet
    // trigger this if the player (you) place bet
    //socket.emit('ready', betAmount)

    // 'lock in' event, somebody locked in, param: username -> change graphics for that username (including self)

    socket.on('lock in', function (username) {

        let betAmount = getWager();
        socket.emit('ready', betAmount);

    });


    // emit 'card distribution request' when everyone in room is ready (only host needed to do this, everyone can just spam this though)
    //socket.emit('card distribution request')

    // receive 'init card distribution', session details <- use this to create initial dealing animation, containing 2 hands ea,
    // order of players can be found with ['p1'], ['p2'], ['p3'], dealer go last
    socket.on('init card distribution', function (session_info) {
        session = JSON.parse(session_info);

        let mainPlayer = session['p1'];
        let player1 = session['p2'];
        let player2 = session['p3'];

        mainPlayerHand = session['players'][mainPlayer]['hand'];
        dealerHand = session['dealer']['hand'];
        player1Hand = session['players'][player1]['hand'];
        player2Hand = session['players'][player2]['hand'];

        initialDeal(session);

        //session updated with initial hand
        // initial animations go here

    });

    // actual game memes now

    // emit 'card deal' to deal card to self, everyone should be locked out of this action
    // only the one w/ matching username to current turn's p's username ( turn can be p1 p2 p3 & session['p#'] will return the username)
    // basically: turn = session['p#'] ; if(username === session[turn]);
    //socket.emit('card deal')

    // 'card dealt' event, username, session details. A card has been dealt to username and new session details, use that to execute animation
    socket.on('card dealt', function (username, session_info) {

        //username = the one that got a card dealt to them
        session = JSON.parse(session_info);
        //session updated with the new card
        // this is the new card dealt to <username>
        var new_card = session['players'][username]['hand'];
        // do some animation
    });
    // emit 'pass' to pass their turn (on button press or something), same lock out condition as card deal
    //socket.emit('pass');

    // 'next player' event, session details. A pass triggered, new player -> refresh lockout so that next player can interact (check session['turn'])
    socket.on('next player', function (session) {
        session = JSON.parse(session_info);
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
        // username won, do animation for <username>
    });
    // 'lose' event, username. username lost, change their graphic accordingly. Will receive other players'
    socket.on('lose', function (username) {
        // username lost, do animation for <username>
    });
    // 'draw' maibe?
    socket.on('draw', function (username) {
        // username draw, do animation for <username>
    });


    function getWager() {
        $('#lock-bet').click(function () {
            let wager = $('#wager-input').val();
            $('#wager-input').val("");

            disableButton('#lock-bet');
            console.log(wager);
            return wager;
        });


    };

    function startLockInTimer() {
        //$('#bet-place-toast').toast('show');
        let time = 15;
        let clock = setInterval(function () {
            $("#timer").text(time);
            time -= 1;
            if (time <= 0) {
                clearInterval(clock);

            }
        }, 1000);

    }


});



