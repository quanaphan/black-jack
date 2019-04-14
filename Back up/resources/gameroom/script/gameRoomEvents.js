let playerTurn;
let currentTurn = 1;


let mainPlayerHand = [];
let dealerHand = [];
let player1Hand = [];
let player2Hand = [];

let dealerTotal = 0;
let mainPlayerTotal = 0;
let player1Total = 0;
let player2Total = 0;


/**
 * Name: dealCard
 * deals a single card to a specified location, it its the dealer second card then it is dealt face down
 * @param hand: the array that the player that will receive the card has there other cards stored in
 * @param location: The location on the board to deal the card, "#dealer" is the dealer on top, #main-user is the user at the center of the screen,#player1 is the user on the left
 *                  #player2 is the user on the right
 */
function dealCard(hand, location) {
    let dealerPlayerArea = $("#dealer");
    let cardDrawn = cards.pop();
    hand.push(cardDrawn);
    let index = hand.length - 1;


    if (currentTurn === 1) {
        playerTurn = "dealer";
    } else if (currentTurn === 2) {
        playerTurn = "main-user";
    } else if (currentTurn === 3) {
        playerTurn = "player1";
    } else if (currentTurn === 4) {
        playerTurn = "player2";
    }

    // Create card image for card, hide initially so it doesn't impact transition
    let cardImage = $("<img>").attr("class", "card").attr("src", "img/" + hand[index].src).hide();
    cardImage.attr("id", playerTurn + "-card-" + index);


    // To create stacked card effect
    if (index === 0) {
        cardImage.appendTo($(location)).show();

    } else if (index > 0) {


        if (location.is(dealerPlayerArea) && index === 1) {
            cardImage.attr("src", "img/card_back.png");

        }
        let screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

        if (screenWidth < 360) {
            cardImage.appendTo($(location)).offset({left: -35}).css("margin-right", -60).show();
        } else if (screenWidth < 350) {

            cardImage.appendTo($(location)).offset({left: -45}).css("margin-right", -60).show();
        } else {
            cardImage.appendTo($(location)).offset({left: -60}).css("margin-right", -60).show();
        }
    }

}

/**
 * Name: initialDeal
 * Deals all the cards at the beginning of each turn including delays. May need to be modified based on how the current turn is implemented in final version
 * @param numPlayers: The number of players in the game not including dealer
 */
function initialDeal(numPlayers) {

    let mainPlayerArea = $("#main-user");
    let dealerPlayerArea = $("#dealer");
    let player1Area = $("#player1");
    let player2Area = $("#player2");


    if (numPlayers === 1) {
        setTimeout(function () {

            dealCard(dealerHand, dealerPlayerArea);
            currentTurn++;
        }, 500);
        setTimeout(function () {
            $("#main-user-placeholder").remove();
            dealCard(mainPlayerHand, mainPlayerArea);
            currentTurn++;
        }, 1000);
        setTimeout(function () {
            dealCard(dealerHand, dealerPlayerArea);
            currentTurn++;
        }, 1500);
        setTimeout(function () {
            dealCard(mainPlayerHand, mainPlayerArea);
            currentTurn++;
        }, 2000);

    } else if (numPlayers === 2) {
        setTimeout(function () {

            dealCard(dealerHand, dealerPlayerArea);
            currentTurn++;
        }, 500);
        setTimeout(function () {
            $("#main-user-placeholder").remove();
            dealCard(mainPlayerHand, mainPlayerArea);
            currentTurn++;
        }, 1000);
        setTimeout(function () {
            $("#player1-placeholder").remove();
            dealCard(player1Hand, player1Area);
            currentTurn1;
        }, 1500);
        setTimeout(function () {
            dealCard(dealerHand, dealerPlayerArea);
            currentTurn++;
        }, 2000);
        setTimeout(function () {
            dealCard(mainPlayerHand, mainPlayerArea);
            currentTurn++;
        }, 2500);
        setTimeout(function () {
            dealCard(player1Hand, player1Area);
            currentTurn = 2;
        }, 3000);

    } else if (numPlayers === 3) {
        setTimeout(function () {
            dealCard(dealerHand, dealerPlayerArea);
            currentTurn++;
        }, 500);
        setTimeout(function () {
            $("#player1-placeholder").remove();
            dealCard(player1Hand, player1Area);
            currentTurn++;
        }, 1500);
        setTimeout(function () {
            $("#main-user-placeholder").remove();
            dealCard(mainPlayerHand, mainPlayerArea);
            currentTurn++;
        }, 2000);
        setTimeout(function () {
            $("#player2-placeholder").remove();
            dealCard(player2Hand, player2Area);
            currentTurn = 1;
        }, 2500);
        setTimeout(function () {
            dealCard(dealerHand, dealerPlayerArea);
            currentTurn++;
        }, 3000);
        setTimeout(function () {
            dealCard(player1Hand, player1Area);
            currentTurn++;
        }, 3500);
        setTimeout(function () {
            dealCard(mainPlayerHand, mainPlayerArea);
            currentTurn++;
        }, 4000);
        setTimeout(function () {
            dealCard(player2Hand, player2Area);
            currentTurn = 1;
        }, 4500);
    }
}


/**
 * calculateHandTotals
 *
 * calculates the the total value fo a hand: need ace logic
 *
 * */

function calculateHandTotals(hand) {
    let sum = 0;

    for (let i = 0; i < hand.length; i++) {
        sum += hand[i].value;
    }
    return sum;
}

/**
 * displayHandTotals
 *
 * displays each hand total for each user. Needs logic for less than 3 players.
 * Displays both popover and html element will remove the one that looks worse.
 *
 * */

function displayHandTotals() {
    dealerTotal = calculateHandTotals(dealerHand);
    mainPlayerTotal = calculateHandTotals(mainPlayerHand);
    player1Total = calculateHandTotals(player1Hand);
    player2Total = calculateHandTotals(player2Hand);
    console.log(player2Hand);
    console.log(dealerTotal);
    console.log(mainPlayerTotal);
    console.log(player1Total);
    console.log(player2Total);
    $("#dealer-total").text(dealerTotal);
    $("#player1-total").text(player1Total);
    $("#main-user-total").text(mainPlayerTotal);
    $("#player2-total").text(player2Total);
    /*
            dealerPlayerArea.popover({
                title: "Dealer Total",
                content: dealerTotal,
                trigger: "hover",
                placement: "bottom",
                animation: true
            }).popover('show');;
            mainPlayerArea.popover({
                title: "Player Total",
                content: mainPlayerTotal,
                trigger: "hover",
                placement: "bottom",
                animation: true
            }).popover('show');;
            player1Area.popover({
                title: "Player1 Total",
                content: player1Total,
                trigger: "hover",
                placement: "bottom",
                animation: true
            }).popover('show');;
            player2Area.popover({
                title: "Player2 Total",
                content: player2Total,
                trigger: "hover",
                placement: "bottom",
                animation: true
            }).popover('show');
            */
}

/**
 * flipHiddenCard
 * Flips the dealer second card. Will need to be modified to flip when all player have either hit 21, busted or all selected stand, currently its based on timing.
 *
 */
function flipHiddenCard() {
    setTimeout(function () {
        if (dealerHand.length === 2) {
            $("#dealer-card-1").addClass("flipped");
            $("#dealer-card-1").attr("src", "img/" + dealerHand[1].src);
        }
    }, 5000);
}

function enableButton(buttonName) {

    $(buttonName).removeClass("disabled-button");
}

function disableButton(buttonName) {
    $(buttonName).off();
    $(buttonName).addClass("disabled-button");
}

/**
 * Returns boolean value if the hand contains an ace
 * @param hand
 * @returns {boolean}
 */

function hasAce(hand) {

    for (let i = 0; i < hand.length; i++) {
        if (hand[i].name === "ace") {
            return true;
        } else {
            return false;
        }
    }
}

/**
 * finds the aces in the hand that has not already been reduced and sets its value to 1
 *
 * @param hand
 *
 */
function reduceAceValue(hand) {
    let total = calculateHandTotals(hand);

    if (hasAce(hand) && total > 21) {
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].name === "ace" && hand[i].value === 11) {
                hand[i].value = 1;

               break;
            }
        }

    }
}


