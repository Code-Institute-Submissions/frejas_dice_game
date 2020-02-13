/*
start of game- scores should be 0 for each player

Game play-
Player chooses a dice and rolls for a score
Next player can see that score and chooses a die to counter the first players die
Highest die wins that round- show all die and score to a history table with what round it is

Die can only used once per game or if total game score is higher than die numbers, dice will reset once all die has been used.

*/


let score = [0, 0];
let roundValue = 1;
let activePlayer = 0;
let diceValue = 0;
let activeDice;
let diceOptionsplayer1 = [4, 6, 8, 12, 20];
let diceOptionsplayer2 = [4, 6, 8, 12, 20];
let randomStartDice1;
let randomStartDice2;




let player1dice;
let player2dice;

let dice;

let html;
let history;





function gamePlay() {

    //get new dice on starting area
    newdice();

    //If a die has been clicked
    $('.dice').click(function() {
        //Get dice highest value for the roll of the dice
        diceValue = $(this).val();
        //show new dice
        activeDice.src = "static/dice_img/d-" + diceValue + ".jpg";
        rollDice();

    });

    $('.dice').on('mouseenter', function() {
        diceValue = $(this).val();
        activeDice.src = "static/dice_img/d-" + diceValue + ".jpg";
    });

    //roll the dice on btn
    $('.roll').click(function() {
        //Dice roll
        dice = Math.floor(Math.random() * diceValue + 1);

        console.log(dice);

        //set the dice roll to the player playing
        let playerDiceScore = dice;

        //error protection on player not selecting a dice
        if (diceValue > 0) {
            $(".rollResult").html("You rolled a value of " + dice);

        } else {
            $(".rollResult").html("Please select a dice");
        };

        //change player

        /*
        Notes
        somewhere here is a problem with classname
        */

        if (document.getElementById("player1playarea").classList.contains("activePlayer")) {
            player1score = this.dice;
            player1dice = this.diceValue;

            if (player1score > 0) {
                console.log(player1score + " this works");
            };

            change1();
            change1extra();

        } else {
            player2score = this.dice;
            player2dice = this.diceValue;

            if (player2score > 0) {
                console.log(player2score + " this works");
            };


            change2();
            change2extra();
        };

        if (player2score > 0 && player1score > 0) {
            console.log("both scored");


            // show history of score and dice


            insert = '<div class="row histroy-row" id="histroy-row"><!--Round counter--><div class="col-3 round-counter" id="roundcounter"><h4>' + roundValue + ':</h4></div><!--Player 1 score and used dice--><div class="col dice-history"><button class="diceHistory" id="' + player1dice + '"value="' + player1dice + '"><img src="static/dice_img/d-' + player1dice + '.jpg"/></button> ' + player1score + '</div><!--Player 2 score and used dice--><div class="col dice-history"><button class="diceHistory" id="' + player2dice + ' value="' + player2dice + '><img src="static/dice_img/d-' + player2dice + '.jpg"/></button>' + player2score + '</div></div>'


            console.log(roundValue + ' roundValue');
            console.log(player1dice + ' player1dice');
            console.log(player2dice + ' player2dice');
            console.log(player1score + ' player1score');
            console.log(player2score + ' player2score');



            console.log(insert);

            let testing = document.getElementById("histroyrow");
            testing.innerHTML = insert;




        }



    });

    //hard code for history on players dice and score



};


//both players have a score






//start with random dice (thats not been used) on start
function newdice() {

    var randomStartDice1 = diceOptionsplayer1[Math.floor(Math.random() * diceOptionsplayer1.length)];
    startdice1.src = "static/dice_img/d-" + randomStartDice1 + ".jpg"
    diceValue = randomStartDice1;

    var randomStartDice2 = diceOptionsplayer2[Math.floor(Math.random() * diceOptionsplayer2.length)];
    startdice2.src = "static/dice_img/d-" + randomStartDice2 + ".jpg"
    diceValue = randomStartDice2;
};









///////////////////////////////////
//Modal Options

//Modal open on page ready
$(window).on('load', function() {
    $("#introModal").modal('show')
});

//close modal
function closeModal() {
    $("#introModal").modal('hide');
};




//Get Local players Name from Modal 
let player1;
let player2;
let player1Name;
let player2Name;

function getPlayerData() {
    //Get local player names from form input
    player1 = document.getElementById("userId").elements.namedItem("player1").value;
    player2 = document.getElementById("userId").elements.namedItem("player2").value;

    //Set default Name if no input for player names
    if (player1 == 0) {
        player1 = "Player 1"
    };

    if (player2 == 0) {
        player2 = "Player 2"
    };

    //Change the name from HTML
    player1Name = document.getElementsByClassName("player-1-name");
    player2Name = document.getElementsByClassName("player-2-name");

    for (var i = 0; i < player1Name.length; i++) {
        player1Name[i].innerHTML = player1;
        player2Name[i].innerHTML = player2;

    }

    console.log(player1);
    console.log(player2);

};

///////////////////////////////////
//Clear history and set score
let player1Info;
let player2Info;

function reset() {

    //Clear html for new start
    //clear Histroy

    const clearHistory = (elms) => elms.forEach(el => el.remove());

    clearHistory(document.querySelectorAll(".histroy-row"));

    //clear player info row
    player1Info = (document.querySelectorAll(".player-1-info"));
    player2Info = (document.querySelectorAll(".player-2-info"));

    //clearHistory(player1Info);
    //clearHistory(player2Info);


    //add default line for history
    let starterLine = document.createElement('div');
    starterLine.innerHTML = '<div class="row histroy-row"><!--Round counter--><div class="col-3 round-counter"><h4>1:</h4></div><!--Player 1 score and used dice--><div class="col dice-history"><h3>-</h3></div><!--Player 2 score and used dice--><div class="col dice-history"><h3>-</h3></div></div>';
    document.getElementById("history").appendChild(starterLine);



    //Reset score to 0-0
    document.getElementById('player-1-score').textContent = '0';
    document.getElementById('player-2-score').textContent = '0';


};

///////////////////////////////////
//Random player to start the game
let randomPlayer;
let winner;
let player1score;
let player2score;

let player1Area = document.getElementById("player1playarea");
let player2Area = document.getElementById("player2playarea");

let showDice1 = document.getElementById("showPlayer1Dice");
let showDice2 = document.getElementById("showPlayer2Dice");

let activeRollBtn1 = document.getElementById("player1btn");
let activeRollBtn2 = document.getElementById("player2btn");

let rollResult1 = document.getElementById("player-1-info");
let rollResult2 = document.getElementById("player-2-info");

let startdice1 = document.getElementById("showndice1");
let startdice2 = document.getElementById("showndice2");



//deactive player 2 div
function change1() {
    player1Area.classList.toggle("disabled");
    player2Area.classList.toggle("activePlayer");

    //deactive dice area player 2
    showDice2.classList.toggle("diceRowValue");

    //active roll btn
    activeRollBtn2.classList.toggle("active");
    //active roll result

    rollResult2.classList.toggle("rollResult");
    //get options from dice

    //active dice area
    activeDice = document.getElementById('showndice1');
    deactiveDice = document.getElementById('showndice2');

    playerDiceScore = player1score;

};

//extra for switching while playing
function change1extra() {
    player2Area.classList.toggle("disabled");
    player1Area.classList.toggle("activePlayer");
    //active roll btn
    activeRollBtn1.classList.toggle("active");
}

//deactive player 1 div
function change2() {
    player2Area.classList.toggle("disabled");
    player1Area.classList.toggle("activePlayer");

    //deactive dice area player 1
    showDice1.classList.toggle("diceRowValue");

    //active roll btn
    activeRollBtn1.classList.toggle("active");

    //active roll result
    rollResult1.classList.toggle("rollResult");
    //get options from dice

    //active dice area
    activeDice = document.getElementById('showndice2');
    deactiveDice = document.getElementById('showndice1');
    playerDiceScore = player2score;

};

function change2extra() {
    player1Area.classList.toggle("disabled");
    player2Area.classList.toggle("activePlayer");
    //active roll btn
    activeRollBtn2.classList.toggle("active");
}

//function to see who goes first
function randomStarter() {
    randomPlayer = Math.floor(Math.random() * 2 + 1);

    winner = 'player-' + randomPlayer;
    console.log(winner);

    if (randomPlayer === 1) {
        //Test for which player turn in console.log
        playerOneInfo = (player1 + ' Turn!');
        console.log(playerOneInfo);

        //Change inner html to show player-1 turn
        player1Info.innerHTML = "changed";






        change1();

    } else {
        //Change inner html to show player-2 turn
        playerTwoInfo = (player2 + ' Turn!');
        console.log(playerTwoInfo);

        //Change inner html to show player-1 turn
        player2Info.innerHTML = "playerTwoInfo";



        change2();

    };
}











///////////////////////////////////

/*
Start btn
- save all the players data to storage
- check to see if its player V player or against computer
- clear history from previse game
- set score to 0 - 0
- on second players turn, set different colour borders on percentage as a helper
- random player goes first
- close modal to see game

*/
document.getElementById("start-btn").addEventListener("click", function() {

    //Get player player and change to their name in HTML
    getPlayerData();

    //computer as player check


    //reset score and history
    reset();

    //random player start
    randomStarter();

    //close modal
    closeModal();

    //helper percentage colours

    //game play
    gamePlay();
});