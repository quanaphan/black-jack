/*
let playerTurn;
let currentTurn = 1;
*/

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
function dealCardAnimationSingle(hand, location, card, session){
    dealerHand = session['dealer']['hand'];
    var mainPlayer = session['p1'];
    mainPlayerHand = session['players'][mainPlayer]['hand'];
    if(session['capacity'] < 3){
        var p1 = session['p2'];
        player1Hand = session['players'][p1]['hand'];
    }else{
        var p1 = session['p2'];
        var p2 = session['p3'];
        player1Hand = session['players'][p1]['hand'];
        player1Hand = session['players'][p2]['hand'];
    }

    let cardImage = $("<img>").attr("class", "card").attr("src", "images/" + card.src).hide();
    cardImage.attr("id", session['turn'] + "-card-" + hand.length);
    var index = hand.length;

    if (index === 0) {
        cardImage.appendTo($(location)).show();

    } else if (index > 0) {


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

function dealCardAnimation(hand, location, index, session) {
    let dealerPlayerArea = $("#dealer");


    // Create card image for card, hide initially so it doesn't impact transition
    let cardImage = $("<img>").attr("class", "card").attr("src", "images/" + hand[index].src).hide();
    cardImage.attr("id", session['turn'] + "-card-" + index);
    var index = hand.length;

    // To create stacked card effect
    if (index === 0) {
        cardImage.appendTo($(location)).show();

    } else if (index > 0) {


        if (location.is(dealerPlayerArea) && index === 1) {
            cardImage.attr("src", "images/card_back.png");

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
 * @param sesion
 */
function initialDeal(session) {

    let mainPlayerArea = $("#main-user");
    let dealerPlayerArea = $("#dealer");
    let player1Area = $("#player1");
    let player2Area = $("#player2");

    dealerHand = session['dealer']['hand'];
    if (session['capacity'] === 1) {
        var mainPlayer = session['p1'];
        mainPlayerHand = session['players'][mainPlayer]['hand'];
        setTimeout(function () {
            $("#main-user-placeholder").remove();
            dealCardAnimation(mainPlayerHand, mainPlayerArea, 0, session);
        }, 500);
        setTimeout(function () {
            dealCardAnimation(dealerHand, dealerPlayerArea, 0, session);
        }, 1000);
        setTimeout(function () {
            dealCardAnimation(mainPlayerHand, mainPlayerArea, 1, session);
        }, 1500);
        setTimeout(function () {
            dealCardAnimation(dealerHand, dealerPlayerArea, 1, session);
        }, 2000);

    } else if (session['capacity'] === 2) {
        var mainPlayer = session['p1'];
        var p1 = session['p2'];
        mainPlayerHand = session['players'][mainPlayer]['hand'];
        player1Hand = session['players'][p1]['hand'];
        setTimeout(function () {
            $("#player1-placeholder").remove();
            dealCardAnimation(player1Hand, player1Area, 0, session);
        }, 500);
        setTimeout(function () {
            $("#main-user-placeholder").remove();
            dealCardAnimation(mainPlayerHand, mainPlayerArea, 0, session);
        }, 1000);
        setTimeout(function () {
            dealCardAnimation(dealerHand, dealerPlayerArea, 0, session);
        }, 1500);
        setTimeout(function () {
            dealCardAnimation(player1Hand, player1Area, 1, session);
        }, 2000);
        setTimeout(function () {
            dealCardAnimation(mainPlayerHand, mainPlayerArea, 1, session);
        }, 2500);
        setTimeout(function () {
            dealCardAnimation(dealerHand, dealerPlayerArea, 1, session);
        }, 3000);

    } else if (session['capacity'] === 3) {
        var mainPlayer = session['p1'];
        var p1 = session['p2'];
        var p2 = session['p3'];
        mainPlayerHand = session['players'][mainPlayer]['hand'];
        player1Hand = session['players'][p2]['hand'];
        setTimeout(function () {
            $("#player1-placeholder").remove();
            dealCardAnimation(player1Hand, player1Area, 0,session);
        }, 500);

        setTimeout(function () {
            $("#main-user-placeholder").remove();
            dealCardAnimation(mainPlayerHand, mainPlayerArea, 0, session);
        }, 1500);

        setTimeout(function () {
            $("#player2-placeholder").remove();
            dealCardAnimation(player2Hand, player2Area, 0, session);
        }, 2000);
        setTimeout(function () {
            dealCardAnimation(dealerHand, dealerPlayerArea, 0, session);
        }, 2500);
        setTimeout(function () {
            dealCardAnimation(player1Hand, player1Area, 0, session);
        }, 3000);
        setTimeout(function () {
            dealCardAnimation(mainPlayerHand, mainPlayerArea, 0, session);
        }, 3500);
        setTimeout(function () {
            dealCardAnimation(player2Hand, player2Area, 0, session);
        }, 4000);
        setTimeout(function () {
            dealCardAnimation(dealerHand, dealerPlayerArea, 0, session);
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
    console.log("in diplay totals");
    dealerTotal = calculateHandTotals(dealerHand);
    mainPlayerTotal = calculateHandTotals(mainPlayerHand);
    player1Total = calculateHandTotals(player1Hand);
    player2Total = calculateHandTotals(player2Hand);

    $("#dealer-total").text(dealerTotal);
    $("#player1-total").text(player1Total);
    $("#main-user-total").text(mainPlayerTotal);
    $("#player2-total").text(player2Total);

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
            $("#dealer-card-1").attr("src", "images/" + dealerHand[1].src);
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


