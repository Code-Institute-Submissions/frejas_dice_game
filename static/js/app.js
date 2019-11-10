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