/*
start of game- scores should be 0 for each player

Game play-
Player chooses a dice and rolls for a score
Next player can see that score and chooses a die to counter the first players die
Highest die wins that round- show all die and score to a history table with what round it is

Die can only used once per game or if total game score is higher than die numbers, dice will reset once all die has been used.

*/


let score = [0, 0];
let roundValue = 0;
let activePlayer = 0;
let diceValue;

let dice;


$('.dice').click(function() {
    //Get dice highest value for the roll of the dice
    var diceValue = $(this).val();
    console.log(diceValue);

    //Dice roll
    dice = Math.floor(Math.random() * diceValue + 1);
    console.log(dice);

});


//Mondal Options

//Mondal open on page ready
$(document).ready(function() {
    $("#introMondal").modal('show')
});

//close mondal
function closeMondal() {
    $("#introMondal").modal('hide');
};




//Get Local players Name from Mondal 

let player1;
let player2;
let player1Name;
let player2Name;

function getPlayerData() {
    //Get local player names from form input
    let player1 = document.getElementById("userId").elements.namedItem("player1").value;
    let player2 = document.getElementById("userId").elements.namedItem("player2").value;

    //Set default Name if no input for player names
    if (player1 == 0) {
        player1 = "Player 1"
    };

    if (player2 == 0) {
        player2 = "Player 2"
    };

    //Change the name from HTML
    let player1Name = document.getElementsByClassName("player-1-name");
    let player2Name = document.getElementsByClassName("player-2-name");

    for (var i = 0; i < player1Name.length; i++) {
        player1Name[i].innerHTML = player1;
        player2Name[i].innerHTML = player2;

    }

    console.log(player1);
    console.log(player2);

};


//Clear history and set score
function reset() {

    //Clear history
    const clearHistory = (elms) => elms.forEach(el => el.remove());
    clearHistory(document.querySelectorAll(".histroy-row"));

    //add default line for history
    let starterLine = document.createElement('div');
    starterLine.innerHTML = '<div class="row histroy-row"><!--Round counter--><div class="col-3 round-counter"><h4>1:</h4></div><!--Player 1 score and used dice--><div class="col dice-history"><h3>-</h3></div><!--Player 2 score and used dice--><div class="col dice-history"><h3>-</h3></div></div>';
    document.getElementById("history").appendChild(starterLine);



    //Reset score to 0-0
    document.getElementById('player-1-score').textContent = '0';
    document.getElementById('player-2-score').textContent = '0';


};

//Random player to start the game
let randomPlayer;
let winner;

function randomStarter() {
    randomPlayer = Math.floor(Math.random() * 2 + 1);

    winner = 'player' + randomPlayer;



    console.log(winner);

    if (randomPlayer === 1) {
        console.log(player1)
    } else {
        console.log(player2)
    };



    document.querySelector('.player-' + randomPlayer + '-play-area').classList.add('active');
}












/*
Start btn
- save all the players data to storage
- check to see if its player V player or against computer
- clear history from previse game
- set score to 0 - 0
- random player goes first
- close mondal to see game

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
    closeMondal();
});