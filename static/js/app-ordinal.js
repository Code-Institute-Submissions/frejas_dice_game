/*
start of game- scores should be 0 for each player

Game play-
Player chooses a dice and rolls for a score
Next player can see that score and chooses a die to counter the first players die
Highest die wins that round- show all die and score to a history table with what round it is

Die can only used once per game or if total game score is higher than die numbers, dice will reset once all die has been used.

*/

//score of each player/computer
let player1score = 0;
let player2score = 0;

let player1Total = 0;
let player2Total = 0;
//round counter
let roundValue = 1;
//which player turn
let activePlayer = 0;
let diceValue = 0;
let activeDice;
//avaible dice to use
let diceOptionsplayer1 = [4, 6, 8, 12, 20];
let diceOptionsplayer2 = [4, 6, 8, 12, 20];
//random dice on start of turn thats playable
let randomStartDice1;
let randomStartDice2;

let player1dice;
let player2dice;

let dice;
//for a catch loop to insure to stop a double win change
let player1PointCounter = 0;
let player2PointCounter = 0;


//Game function
function gamePlay() {

    //get new dice on starting area
    newdice();

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
function newdice() {
    //Player 1 new dice on start of turn
    randomStartDice1 = diceOptionsplayer1[Math.floor(Math.random() * diceOptionsplayer1.length)];
    //If the array is empty, if statement to stop blank img
    if (diceOptionsplayer1.length > 0) {
        startdice1.src = "static/dice_img/d-" + randomStartDice1 + ".jpg";
    };
    //set dice value from random starting dice
    startdice1.setAttribute("value", randomStartDice1);

    diceValue = randomStartDice1;

    //Player 2/computer new dice on start of turn
    randomStartDice2 = diceOptionsplayer2[Math.floor(Math.random() * diceOptionsplayer2.length)];
    //If the array is empty, if statement to stop blank img
    if (diceOptionsplayer2.length > 0) {
        startdice2.src = "static/dice_img/d-" + randomStartDice2 + ".jpg";
    };
    //set dice value from random starting dice
    startdice2.setAttribute("value", randomStartDice2);

    diceValue = randomStartDice2;

};

//Function to roll the dice on Roll btn or clicked on the dice
function rollDice() {

    //Dice roll
    dice = Math.floor(Math.random() * diceValue + 1);

    //error protection on player not selecting a dice
    if (diceValue > 0) {
        $(".rollResult").html("You rolled a value of " + dice);

    } else {
        $(".rollResult").html("Please select a dice");
    };

    //change player
    //Player 1- set dice and roll to variable
    if (document.getElementById("player1playarea").classList.contains("activePlayer")) {
        player1score = dice;
        player1dice = diceValue;

        //change Player
        change1();
        change1extra();

        //disable dice from btn click instead of dice click
        $('#player1-d' + diceValue).addClass('disabled');

        //remove players choice from their array- Used for computer selecting and also starting dice

        for (var i = diceOptionsplayer1.length - 1; i >= 0; --i) {
            if (diceOptionsplayer1[i] == diceValue) {
                diceOptionsplayer1.splice(i, 1);
                console.log(diceOptionsplayer1);
            };
            //when the array for Player1 is empty, stop btns
            if (diceOptionsplayer1.length == 0) {
                $('#showndice1').hide();
                $('#player1btn').addClass('disabled');
                $('#player1btn').removeClass('active');
            }
        }


        //add className of percentages
        let player1diceRow = document.getElementsByClassName('player-1-dice');

        if (player2score > 0) {
            for (var i = 0; i < diceOptionsplayer1.length; i++) {
                if (diceOptionsplayer1[i].value > player1score)
                    $(this).addClass("testing");
                console.log("testing player 1 row");
            }
        };


        //Player 2 or computer- set dice and roll to variable
    } else {
        player2score = dice;
        player2dice = diceValue;

        //change Player
        change2();
        change2extra();

        //disable dice from btn click instead of dice click
        $('#player2-d' + diceValue).addClass('disabled');

        //remove players choice from their array- Used for computer selecting and also starting dice
        for (var i = diceOptionsplayer2.length - 1; i >= 0; --i) {
            if (diceOptionsplayer2[i] == diceValue) {
                diceOptionsplayer2.splice(i, 1);
                console.log(diceOptionsplayer2);
            };

            //when the array for Player1 is empty, stop btns
            if (diceOptionsplayer2.length == 0) {
                $('#showndice2').hide();
                $('#player2btn').addClass('disabled');
                $('#player2btn').removeClass('active');
            }
        }
    };



    //If both players have played a dice on the same turn
    //Update History
    if (player2score > 0 && player1score > 0) {

        // show history of score and dice
        let newHistory = document.createElement('div');
        newHistory.innerHTML = '<div class="row histroy-row" id="histroy-row"><!--Round counter--><div class="col-3 round-counter" id="roundcounter"><h4>' + roundValue + ':</h4></div><!--Player 1 score and used dice--><div class="col dice-history"><button class="diceHistory" id="' + player1dice + '"value="' + player1dice + '"><img src="static/dice_img/d-' + player1dice + '.jpg"/></button><div id="player1score-' + roundValue + '"> ' + player1score + '</div></div><!--Player 2 score and used dice--><div class="col dice-history"><button class="diceHistory" id="' + player2dice + ' value="' + player2dice + '><img src="static/dice_img/d-' + player2dice + '.jpg"/></button><div id="player2score-' + roundValue + '"> ' + player2score + '</div></div></div>'

        document.getElementById("history").appendChild(newHistory);
        //New dice on 
        newdice();

        //Update score player 1
        if (player1score > player2score) {
            player1Total += 1;
            document.getElementById('player-1-score').innerText = player1Total;

            //Show player 1 dice won on a turn
            let changeOne = document.getElementById('player1score-' + roundValue);
            changeOne.classList.add("winner");

            //to stop changes if won twice
            //function to stop winning twice bug, stops changes
            if (player1PointCounter === 0) {
                change1();
                change1extra();
                player1PointCounter = 1;
                player2PointCounter = 0;
                activeDice = document.getElementById('showndice1');
            } else {
                activeDice = document.getElementById('showndice1');
                player2PointCounter = 0;
            }
        } else if (player1score < player2score) {
            //Update score player 2 or computer
            player2Total += 1;
            document.getElementById('player-2-score').innerText = player2Total;

            //Show player 2 or computure dice won on a turn
            let changeTwo = document.getElementById('player2score-' + roundValue);
            changeTwo.classList.add("winner");

            //to stop changes if won twice
            //function to stop winning twice bug, stops changes
            if (player2PointCounter === 0) {
                change2();
                change2extra();
                player2PointCounter = 1;
                player1PointCounter = 0;
                activeDice = document.getElementById('showndice2');
            } else {
                activeDice = document.getElementById('showndice2');
                player1PointCounter = 0;
            };
        }

        player2score = 0;
        player1dice = 0;
        player1score = 0;
        player2dice = 0;
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
    player1Name = document.getElementsByClassName("player-1-name");
    player2Name = document.getElementsByClassName("player-2-name");
    for (var i = 0; i < player1Name.length; i++) {
        player1Name[i].innerHTML = player1;
        player2Name[i].innerHTML = player2;

    }
};



//End game
function finishedGame() {
    if (diceOptionsplayer1.length == 0 && diceOptionsplayer2.length == 0) {
        console.log("both have empty arrays");
    }
}

//Get and apply percentages
function percentages() {
    if (player1score > 0) {

    }
}






//Clear history and set score on new Game
let player1Info;
let player2Info;

function reset() {
    //Clear html for new start
    //clear Histroy
    const clearHistory = (elms) => elms.forEach(el => el.remove());
    clearHistory(document.querySelectorAll(".histroyrow"));

    //clear player info row
    player1Info = (document.querySelectorAll(".player-1-info"));
    player2Info = (document.querySelectorAll(".player-2-info"));

    //clearHistory(player1Info);
    //clearHistory(player2Info);

    //add default line for history
    let starterLine = document.createElement('div');
    starterLine.innerHTML = '';
    document.getElementById("history").appendChild(starterLine);

    //Reset score to 0-0
    document.getElementById('player-1-score').textContent = '0';
    document.getElementById('player-2-score').textContent = '0';
    player1score = 0;
    player2score = 0;

};


//Random player to start the game
//Change settings on players turn
let randomPlayer;
let winner;

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
    activeDice = document.getElementById('showndice1');
    playerDiceScore = player1score;
};

//extra for switching while playing not needed on setup

function change1extra() {
    player2Area.classList.toggle("disabled");
    player1Area.classList.toggle("activePlayer");
    //active roll btn
    activeRollBtn1.classList.toggle("active");
    rollResult1.classList.toggle("rollResult");
    activeDice = document.getElementById('showndice2');

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
    activeDice = document.getElementById('showndice2');
    playerDiceScore = player2score;
};

//extra for switching while playing not needed on setup
function change2extra() {
    player1Area.classList.toggle("disabled");
    player2Area.classList.toggle("activePlayer");
    //active roll btn
    activeRollBtn2.classList.toggle("active");
    rollResult2.classList.toggle("rollResult");
    activeDice = document.getElementById('showndice1');

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