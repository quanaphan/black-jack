// socket io logics for game
// update session details whenever received.

// 'init' event, receive own's player details, session details

// emit 'ready' when lock-in bet

// 'lock in' event, somebody locked in, param: username -> change graphics for that username (including self)

// emit 'card distribution request' when everyone in room is ready (only host needed to do this, everyone can just spam this though)

// receive 'init card distribution', session details <- use this to create initial dealing animation, containing 2 hands ea, 
// order of players can be found with ['p1'], ['p2'], ['p3'], dealer go last

// actual game memes now

// emit 'card deal' to deal card to self, everyone should be locked out of this action
// only the one w/ matching username to current turn's p's username ( turn can be p1 p2 p3 & session['p#'] will return the username)
// basically: turn = session['p#'] ; if(username === session[turn]);

// 'card dealt' event, username, session details. A card has been dealt to username and new session details, use that to execute animation

// emit 'pass' to pass their turn (on button press or something), same lock out condition as card deal

// 'next player' event, session details. A pass triggered, new player -> refresh lockout so that next player can interact (check session['turn'])

// emit 'split', split event, dunno yet

// emit 'chicken dinner', black jack doh, dunno yet

// emit 'tally score', calculate everyone's score when turn = dealer. Everyone can call but only host's call will be effective.

// 'win' event, username. username won, change their graphic accordingly. Will receive other players'

// 'lose' event, username. username lost, change their graphic accordingly. Will receive other players'

// 'draw' maibe?