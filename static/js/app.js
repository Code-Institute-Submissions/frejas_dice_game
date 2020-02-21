/*
start of game- scores should be 0 for each player

Game play-
Player chooses a dice and rolls for a score
Next player can see that score and chooses a die to counter the first players die
Highest die wins that round- show all die and score to a history table with what round it is

Die can only used once per game or if total game score is higher than die numbers, dice will reset once all die has been used.

*/

//score of each player/computer
let player1Score = 0;
let player2Score = 0;

let player1Total = 0;
let player2Total = 0;

//round counter
let roundValue = 1;

//which player turn
let activePlayer = 0;
let diceValue = 0;
let activeDice;

//avaible dice to use
let diceOptionsPlayer1 = [4, 6, 8, 12, 20];
let diceOptionsPlayer2 = [4, 6, 8, 12, 20];

//random dice on start of turn thats playable
let randomStartDice1;
let randomStartDice2;

let player1Dice;
let player2Dice;

let dice;

//for a catch loop to insure to stop a double win bug
let player1PointCounter = 0;
let player2PointCounter = 0;


//Game function
function gamePlay() {

    //get new dice on starting area
    newDice();

    //If a die has been clicked
    $('.dice').click(function() {
        //Get dice highest value for the roll of the dice
        diceValue = $(this).val();
        //show new dice
        activeDice.src = "static/dice_img/d-" + diceValue + ".jpg";

        //add block once the dice has been selected to stop further use
        $(this).addClass('disabled');

        //roll the dice if clicked
        rollDice();
    });

    //change dice on mouse enter
    $('.dice').on('mouseenter', function() {
        diceValue = $(this).val();
        activeDice.src = "static/dice_img/d-" + diceValue + ".jpg";
        activeDice.setAttribute("value", diceValue);
    });

    //roll the dice on btn
    $('.roll').click(function() {
        //get a value from starting dice if btn clicked
        diceValue = activeDice.getAttribute("value");
        rollDice();
    });
};

//start with random dice (thats not been used) on start
function newDice() {
    //Player 1 new dice on start of turn
    randomStartDice1 = diceOptionsPlayer1[Math.floor(Math.random() * diceOptionsPlayer1.length)];
    //If the array is empty, 'if statement' to stop blank img
    if (diceOptionsPlayer1.length > 0) {
        startDice1.src = "static/dice_img/d-" + randomStartDice1 + ".jpg";
    };
    //set dice value from random starting dice
    startDice1.setAttribute("value", randomStartDice1);
    diceValue = randomStartDice1;

    //Player 2/computer new dice on start of turn
    randomStartDice2 = diceOptionsPlayer2[Math.floor(Math.random() * diceOptionsPlayer2.length)];
    //If the array is empty, if statement to stop blank img
    if (diceOptionsPlayer2.length > 0) {
        startDice2.src = "static/dice_img/d-" + randomStartDice2 + ".jpg";
    };
    //set dice value from random starting dice
    startDice2.setAttribute("value", randomStartDice2);
    diceValue = randomStartDice2;

};

//Function to roll the dice on Roll btn or clicked on the dice
function rollDice() {

    //Dice roll
    dice = Math.floor(Math.random() * diceValue + 1);

    if (diceValue > 0) {
        $(".rollResult").html("You rolled a value of " + dice);
    };

    //change player
    //Player 1- set dice and roll to variable
    if (document.getElementById("player1PlayArea").classList.contains("activePlayer")) {
        player1Score = dice;
        player1Dice = diceValue;

        //change Player
        change1();
        change1Extra();

        //disable dice from btn click instead of dice click
        $('#player1-d' + diceValue).addClass('disabled');

        //remove players choice from their array- Used for computer selecting and also starting dice
        for (var i = diceOptionsPlayer1.length - 1; i >= 0; --i) {
            if (diceOptionsPlayer1[i] == diceValue) {
                diceOptionsPlayer1.splice(i, 1);

            };
            //when the array for Player1 is empty, stop btns
            if (diceOptionsPlayer1.length == 0) {
                $('#shownDice1').addClass('disabled');
                $('#player1Btn').addClass('disabled');
                $('#player1Btn').removeClass('active');
            }
        }

    } else {
        //Player 2 or computer- set dice and roll to variable
        player2Score = dice;
        player2Dice = diceValue;

        //change Player
        change2();
        change2Extra();

        //disable dice from btn click instead of dice click
        $('#player2-d' + diceValue).addClass('disabled');

        //remove players choice from their array- Used for computer selecting and also starting dice
        for (var i = diceOptionsPlayer2.length - 1; i >= 0; --i) {
            if (diceOptionsPlayer2[i] == diceValue) {
                diceOptionsPlayer2.splice(i, 1);
                console.log(diceOptionsPlayer2);
            };

            //when the array for Player1 is empty, stop btns
            if (diceOptionsPlayer2.length == 0) {
                $('#shownDice2').addClass('disabled');
                $('#player2Btn').addClass('disabled');
                $('#player2Btn').removeClass('active');
            }
        }
    };



    //If both players have played a dice on the same turn
    //Update History
    if (player2Score > 0 && player1Score > 0) {

        // show history of score and dice
        let newHistory = document.createElement('div');
        newHistory.innerHTML = '<div class="row histroyRow" id="histroyRow"><!--Round counter--><div class="col-3 roundCounter" id="roundCounter"><h4>' + roundValue + ':</h4></div><!--Player 1 score and used dice--><div class="col diceHistory"><button class="diceHistory" id="' + player1Dice + '"value="' + player1Dice + '"><img src="static/dice_img/d-' + player1Dice + '.jpg"/></button><div id="player1Score' + roundValue + '"> ' + player1Score + '</div></div><!--Player 2 score and used dice--><div class="col diceHistory"><button class="diceHistory" id="' + player2Dice + ' value="' + player2Dice + '><img src="static/dice_img/d-' + player2Dice + '.jpg"/></button><div id="player2Score' + roundValue + '"> ' + player2Score + '</div></div></div>'

        document.getElementById("history").appendChild(newHistory);
        //New dice on 
        newDice();

        //Update score player 1
        if (player1Score > player2Score) {
            player1Total += 1;
            document.getElementById('player1Score').innerText = player1Total;

            //Show player 1 dice won on a turn
            let changeOne = document.getElementById('player1Score' + roundValue);
            changeOne.classList.add("winner");

            //to stop changes if won twice
            //function to stop winning twice bug, stops changes
            if (player1PointCounter === 0) {
                change1();
                change1Extra();
                player1PointCounter = 1;
                player2PointCounter = 0;
                activeDice = document.getElementById('shownDice1');
            } else {
                activeDice = document.getElementById('shownDice1');
                player2PointCounter = 0;
            }
        } else if (player1Score < player2Score) {
            //Update score player 2 or computer
            player2Total += 1;
            document.getElementById('player2Score').innerText = player2Total;

            //Show player 2 or computure dice won on a turn
            let changeTwo = document.getElementById('player2Score' + roundValue);
            changeTwo.classList.add("winner");

            //to stop changes if won twice
            //function to stop winning twice bug, stops changes
            if (player2PointCounter === 0) {
                change2();
                change2Extra();
                player2PointCounter = 1;
                player1PointCounter = 0;
                activeDice = document.getElementById('shownDice2');
            } else {
                activeDice = document.getElementById('shownDice2');
                player1PointCounter = 0;
            };
        }

        player2Score = 0;
        player1Dice = 0;
        player1Score = 0;
        player2Dice = 0;
        roundValue += 1;
    }
}

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
    player1Name = document.getElementsByClassName("player1Name");
    player2Name = document.getElementsByClassName("player2Name");
    for (var i = 0; i < player1Name.length; i++) {
        player1Name[i].innerHTML = player1;
        player2Name[i].innerHTML = player2;

    }
};



//End game
function finishedGame() {
    if (diceOptionsPlayer1.length == 0 && diceOptionsPlayer2.length == 0) {
        console.log("both have empty arrays");
    }
}

//Get and apply percentages
function percentages() {
    if (player1Score > 0) {

    }
}






//Clear history and set score on new Game
let player1Info;
let player2Info;

function reset() {
    //Clear html for new start
    //clear Histroy
    const clearHistory = (elms) => elms.forEach(el => el.remove());
    clearHistory(document.querySelectorAll("#histroyRow"));

    //clear player info row
    player1Info = (document.querySelectorAll(".player1Info"));
    player2Info = (document.querySelectorAll(".player2Info"));

    //add default line for history
    let starterLine = document.createElement('div');
    starterLine.innerHTML = '';
    document.getElementById("history").appendChild(starterLine);

    //Reset score to 0-0
    document.getElementById('player1Score').textContent = '0';
    document.getElementById('player2Score').textContent = '0';
    player1Score = 0;
    player2Score = 0;

};


//Random player to start the game
//Change settings on players turn
let randomPlayer;
let winner;

let player1Area = document.getElementById("player1PlayArea");
let player2Area = document.getElementById("player2PlayArea");

let showDice1 = document.getElementById("showPlayer1Dice");
let showDice2 = document.getElementById("showPlayer2Dice");

let activeRollBtn1 = document.getElementById("player1Btn");
let activeRollBtn2 = document.getElementById("player2Btn");

let rollResult1 = document.getElementById("player1Info");
let rollResult2 = document.getElementById("player2Info");

let startDice1 = document.getElementById("shownDice1");
let startDice2 = document.getElementById("shownDice2");

//deactive player 2 div
function change1() {
    //active player board and disable other player
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
    activeDice = document.getElementById('shownDice1');
    playerDiceScore = player1Score;
};

//extra for switching while playing not needed on setup

function change1Extra() {
    player2Area.classList.toggle("disabled");
    player1Area.classList.toggle("activePlayer");
    //active roll btn
    activeRollBtn1.classList.toggle("active");
    rollResult1.classList.toggle("rollResult");
    activeDice = document.getElementById('shownDice2');

    console.log("change 1 extra");
};

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
    activeDice = document.getElementById('shownDice2');
    playerDiceScore = player2Score;
};

//extra for switching while playing not needed on setup
function change2Extra() {
    player1Area.classList.toggle("disabled");
    player2Area.classList.toggle("activePlayer");
    //active roll btn
    activeRollBtn2.classList.toggle("active");
    rollResult2.classList.toggle("rollResult");
    activeDice = document.getElementById('shownDice1');

    console.log("change 2 extra");
};

//function to see who goes first on new game
function randomStarter() {
    randomPlayer = Math.floor(Math.random() * 2 + 1);
    winner = 'player-' + randomPlayer;
    if (randomPlayer === 1) {
        //Test for which player turn in console.log
        playerOneInfo = (player1 + ' Turn!');

        //Change inner html to show player-1 turn
        player1Info.innerHTML = "changed";
        player1PointCounter = 1;
        player2PointCounter = 0;
        change1();
    } else {
        //Change inner html to show player-2 turn
        playerTwoInfo = (player2 + ' Turn!');

        //Change inner html to show player-1 turn
        player2Info.innerHTML = "playerTwoInfo";
        player1PointCounter = 0;
        player2PointCounter = 1;
        change2();
    };
}

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

    //computer as player 2

    //reset score and history
    reset();

    //random player start
    randomStarter();

    //close modal
    closeModal();

    //helper percentage colours

    //game play
    gamePlay();

    //end of game
    finishedGame();

});