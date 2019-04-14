var dealer = new Player(), player1 = new Player(), player2 = new Player(),
	player3 = new Player(), player4 = new Player();
	
var deck = new Deck();
var players = [dealer, player1, player2, player3, player4];

var values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var suits = ['H', 'C', 'S', 'D'];

var wager = document.getElementById('wageramt').value;

function Player() {
	var hand = [], money = 1000, handValue = 0, aces = 0;
	
	this.addCard = function(card) {
		hand.push(card);
		if (card.getValue === 'A') {
			aces += 1;
		}
		handValue += card.getNumValue();
		if (handValue > 21) {
			while ((handValue > 21) && (aces > 0)) {
				handValue -= 10;
				aces -= 1;
			}
		}
	}
	
	this.getMoney = function() {
		return money;
	}
	
	this.addMoney = function(amount) {
		money += amount;
	}
	
	this.takeMoney = function(amount) {
		money -= amount;
	}
	
	this.setMoney = function(amount) {
		money = amount;
	}
	
	this.getHand = function() {
		return hand;
	}
	
	this.resetHand = function() {
		hand = [];
		handValue = 0;
		aces = 0;
	}
	
	this.getHandValue = function() {
		return handValue;
	}
	
	this.getHandStr = function() {
		var line = "";
		for (let c of hand) {
			line += c.getCard() + ", ";
		}
		line = line.substring(0, line.length - 2);
		return line;
	}
}

function Card() {
	var value, numValue, suit;
	this.setValue = function(newValue) {
		this.value = newValue;
		if (newValue === 'A') {
			numValue = 11;
		}else if ((newValue === 'K') || (newValue === 'Q') || (newValue === 'J')) {
			numValue = 10;
		}else {
			numValue = parseInt(newValue, 10);
		}
	}
	this.getValue = function() {
		return this.value;
	}
	this.getNumValue = function() {
		return numValue;
	}
	this.getSuit = function() {
		return this.suit;
	}
	this.getCard = function() {
		return (this.value + ' of ' + this.suit);
	}
}

/** Fisher-Yates shuffle algorithm
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function Deck() {
	var cards = []
	this.initDeck = function() {
		for (let v of values) {
			for (let s of suits) {
				tempCard = new Card();
				tempCard.setValue(v);
				tempCard.suit = s;
				cards.push(tempCard);
			}
		}
		cards = shuffle(cards);
	}
	
	this.getCard = function() {
		return cards.pop();
	}
}

function dealerFinish() {
	while (dealer.getHandValue() < 17) {
		dealer.addCard(deck.getCard());
		document.getElementById('dealer').innerHTML = 'dealer hand: ' + dealer.getHandStr() + ' value: ' + dealer.getHandValue();
	}
}
function hit() {
	player1.addCard(deck.getCard());
	var sum = player1.getHandValue();
	if (sum === 21) {
		document.getElementById('hit').disabled = true;
		document.getElementById('stand').disabled = true;
		stand();
	}else if (sum > 21) {
		document.getElementById('message').innerHTML = 'Bust!';
		document.getElementById('hit').disabled = true;
		document.getElementById('stand').disabled = true;
	}
	document.getElementById('player1').innerHTML = 'your hand: ' + player1.getHandStr() + ' value: ' + player1.getHandValue();
}

function stand() {
	document.getElementById('hit').disabled = true;
	document.getElementById('stand').disabled = true;
	dealerFinish();
	dealerScore = dealer.getHandValue();
	playerScore = player1.getHandValue();
	if (dealerScore > 21) {
		document.getElementById('message').innerHTML = 'Dealer Bust! You win!';
		player1.addMoney(wager*2);
		document.getElementById('money').innerHTML = 'money: $' + player1.getMoney();
	}else if (dealerScore > playerScore) {
		document.getElementById('message').innerHTML = 'Dealer Wins.';
	}else if (playerScore > dealerScore) {
		if (playerScore === 21) {
			document.getElementById('message').innerHTML = 'Blackjack!';
		} else {
			document.getElementById('message').innerHTML = 'You Win!';
		}
		player1.addMoney(wager*2);
		document.getElementById('money').innerHTML = 'money: $' + player1.getMoney();
	}else if (playerScore === dealerScore) {
		player1.addMoney(wager);
		document.getElementById('money').innerHTML = 'money: $' + player1.getMoney();
		document.getElementById('message').innerHTML = 'Push.';
	}
}

function deal() {
	wager = document.getElementById('wageramt').value;
	if (player1.getMoney() <= 0) {
		document.getElementById('message').innerHTML = 'You Are Broke.';
	}else if (wager > player1.getMoney()) {
		document.getElementById('message').innerHTML = 'Invalid Wager.';
	}else {
		document.getElementById('hit').disabled = false;
		document.getElementById('stand').disabled = false;
		player1.takeMoney(wager);
		document.getElementById('money').innerHTML = 'money: $' + player1.getMoney();
		deck.initDeck();
		for (let p of players) {
			p.resetHand();
		}
		for (var i = 0; i < 2; i++) {
			for (let p of players) {
				p.addCard(deck.getCard());
			}
		}
		document.getElementById('dealer').innerHTML = 'dealer hand: ' + dealer.getHandStr() + ' value: ' + dealer.getHandValue();
		document.getElementById('player1').innerHTML = 'your hand: ' + player1.getHandStr() + ' value: ' + player1.getHandValue();
		document.getElementById('player2').innerHTML = 'player2 hand: ' + player2.getHandStr() + ' value: ' + player2.getHandValue();
		document.getElementById('player3').innerHTML = 'player3 hand: ' + player3.getHandStr() + ' value: ' + player3.getHandValue();
		document.getElementById('player4').innerHTML = 'player4 hand: ' + player4.getHandStr() + ' value: ' + player4.getHandValue();
	}
}

function resetGame() {
	document.getElementById('dealer').innerHTML = 'dealer hand: ';
	document.getElementById('player1').innerHTML = 'your hand: ';
	document.getElementById('player2').innerHTML = 'player2 hand: ';
	document.getElementById('player3').innerHTML = 'player3 hand: ';
	document.getElementById('player4').innerHTML = 'player4 hand: ';
	
	document.getElementById('hit').disabled = false;
	document.getElementById('stand').disabled = false;
	document.getElementById('deal').disabled = false;
	
	player1.setMoney(1000);
	document.getElementById('money').innerHTML = 'money: $' + player1.getMoney();
	document.getElementById('wageramt').value = 100;
	
	document.getElementById('message').innerHTML = 'Reset Complete.';
}

document.getElementById('deal').onclick = deal;
document.getElementById('hit').onclick = hit;
document.getElementById('stand').onclick = stand;
document.getElementById('reset').onclick = resetGame;