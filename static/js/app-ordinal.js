/*
Game play:
Player chooses a dice and rolls for a score
Next player can see that score and chooses a die to counter the first players die
Highest die wins that round- show all die and score to a history table with what round it is


Order:
-Clear History
-Get player Info
-Game SetUp
    -Random Starter
    -Setup Board for winner of random starter
-Game Play
    -New dice on starting row
    -if dice are clicked (function)
    -if mouse enters on dice: change settings and dice on starter
    -if Roll btn clicked (function)
-Changing Player turn
-Both Player have played a round
    -If player 1 wins
    -If player 2 wins
-Stop double win bug
-Remove dice from selection or played twice

-Overall control of javascript functions
*/


//Clear history and set score on new Game
function reset() {
    //clear Histroy
    const clearHistory = (elms) => elms.forEach(el => el.remove());
    clearHistory(document.querySelectorAll("#histroyRow"));

    //add default line for history
    let starterLine = document.createElement('div');
    starterLine.innerHTML = '';
    document.getElementById("history").appendChild(starterLine);

    //Reset score to 0-0
    document.getElementById('player1Score').textContent = '0';
    document.getElementById('player2Score').textContent = '0';
    player1Score = 0;
    player2Score = 0;
    player1Total = 0;
    player2Total = 0;
};

//Start Mondal and get player info
//Get Local players Name from Modal 
let player1, player2, player1Name, player2Name, player1Area, player2Area;

//Modal open on page ready
$(window).on('load', function() {
    $("#introModal").modal('show')
});

//close modal
function closeModal() {
    $("#introModal").modal('hide');
};

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

//Game Play

let dice, activeDice, player1Total, player2Total, roundValue, player1Score, player2Score, randomPlayer, showDice1, rollResult1, rollResult2, showDice2, startDice, diceValue, randomStartDice1, randomStartDice2, startDice1, startDice2, activeRollBtn1, activeRollBtn2;

//avaible dice to use in array
let diceOptionsPlayer1 = [4, 6, 8, 12, 20];
let diceOptionsPlayer2 = [4, 6, 8, 12, 20];

//Function for which player goes first
function randomStarter() {
    randomPlayer = Math.floor(Math.random() * 2 + 1);
    if (randomPlayer === 1) {
        setUpPlayer1();
    } else {
        setUpPlayer2();
    };
}

//DOM
player1Area = document.getElementById("player1PlayArea");
player2Area = document.getElementById("player2PlayArea");

startDice1 = document.getElementById("shownDice1");
startDice2 = document.getElementById("shownDice2");

activeRollBtn1 = document.getElementById("player1Btn");
activeRollBtn2 = document.getElementById("player2Btn");

showDice1 = document.getElementById("showPlayer1Dice");
showDice2 = document.getElementById("showPlayer2Dice");

rollResult1 = document.getElementById("player1Info");
rollResult2 = document.getElementById("player2Info");

//deactive player 2 div
function setUpPlayer1() {
    //active player board and disable other player
    player2Area.classList.toggle("activePlayer");
    //deactive dice area player 2
    showDice2.classList.toggle("diceRowValue");
    //active roll btn
    activeRollBtn2.classList.toggle("active");
    //active roll result
    rollResult2.classList.toggle("rollResult");

    activeDice = document.getElementById('shownDice1');
};

//deactive player 1 div
function setUpPlayer2() {
    player1Area.classList.toggle("activePlayer");
    //deactive dice area player 1
    showDice1.classList.toggle("diceRowValue");
    //active roll btn
    activeRollBtn1.classList.toggle("active");
    //active roll result
    rollResult1.classList.toggle("rollResult");

    activeDice = document.getElementById('shownDice2');

};



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
    randomStartDice1 = diceOptionsPlayer1[Math.floor(Math.random() * diceOptionsPlayer1.length)];
    //If the array is empty, if statement to stop blank img
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
    //error protection on player not selecting a dice
    if (diceValue > 0) {
        $(".rollResult").html("You rolled a value of " + dice);
    };

    //Set score to player
    if (player1Area.classList.contains("activePlayer")) {
        player1Score = dice;
    } else {
        player2Score = dice;
    };

    //Change Players if one has a score and the other player has not
    if (player1Score == 0 || player2Score == 0) {
        //Change Player after roll
        changePlayer();
        console.log("testing");
        //Clear text of result
        $(".rollResult").html("");
    };

    //If both players have played- Set the winner for next turn
    if (player1Score !== 0 && player2Score !== 0) {
        console.log("both players have a score")
        if (player1Area.classList.contains("activePlayer") && player2Score > player1Score) {
            changePlayer();
            console.log("testing change player A")
        }
        if (player2Area.classList.contains("activePlayer") && player1Score > player2Score) {
            changePlayer();
            console.log("testing change player B")
        }
        //Update score
        if (player1Score > player2Score) {
            player1Total += 1;
        } else {
            player2Total += 1;
        }

        //Reset score
        player1Score = 0;
        player2Score = 0;
        console.log("player 2 total " + player2Total);
        console.log("player 1 total " + player1Total);
    }


}

function changePlayer() {
    //Change active player
    player1Area.classList.toggle("activePlayer");
    player2Area.classList.toggle("activePlayer");

    //Change dice area
    showDice1.classList.toggle("diceRowValue");
    showDice2.classList.toggle("diceRowValue");

    //Change active Roll btn
    activeRollBtn1.classList.toggle("active");
    activeRollBtn2.classList.toggle("active");

    //Change Roll Result
    rollResult1.classList.toggle("rollResult");
    rollResult2.classList.toggle("rollResult");
};






















/*


    if (player1Score > 0 && player2Score == 0) {
        player2Score = dice;

        player2Dice = diceValue;
        console.log("change player2");
        activeDice = document.getElementById('shownDice2');

    } else if (player2Score > 0 && player1Score == 0) {

        player1Score = dice;

        player1Dice = diceValue;
        console.log("change player1");
        activeDice = document.getElementById('shownDice1');
    }

    //If both players have played a dice on the same turn
    //Update History
    else if (player2Score > 0 && player1Score > 0) {
        // show history of score and dice
        let newHistory = document.createElement('div');
        newHistory.innerHTML = '<div class="row" id="histroyRow"><!--Round counter--><div class="col-2 diceHistory roundCounter"><h4>' + roundValue + ':</h4></div><!--Player 1 score and used dice--><div class="col-4 diceHistory id="player1History"><button class="dice" id="d' + player1Dice + '"value="' + player1Dice + '"><img src="static/dice_img/d-' + player1Dice + '.jpg"/></button><div id="player1Score' + roundValue + '"> ' + player1Score + '</div></div><!--Player 2 score and used dice--><div class="col-4 diceHistory id="player2History"><button class="dice" id="d' + player2Dice + ' value="' + player2Dice + '><img src="static/dice_img/d-' + player2Dice + '.jpg"/></button><div id="player2Score' + roundValue + '"> ' + player2Score + '</div></div></div>'
        document.getElementById("history").appendChild(newHistory);
        //New dice on 
        newdice();

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
                setUpPlayer1();
                changePlayer();
                player1PointCounter = 1;
                player2PointCounter = 0;
                activeDice = document.getElementById('shownDice1');
                console.log("player 1 change a")
            } else {
                activeDice = document.getElementById('shownDice1');
                player1PointCounter = 0;
                console.log("player 1 change b")
            }

            //Update score player 2
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
                setUpPlayer2();
                changePlayer();
                player2PointCounter = 1;
                player1PointCounter = 0;
                activeDice = document.getElementById('shownDice2');

            } else {
                activeDice = document.getElementById('shownDice2');
                player2PointCounter = 0;
            };
        }

        player1Dice = 0;

        player2Dice = 0;
        roundValue += 1;
    }
    roundValue = 1;
    let player1PointCounter, player2PointCounter;

    //Change player

    

};





    activeDice = document.getElementById('shownDice1');
    player1Score = dice;
    randomStartDice = randomStartDice1;

    //remove players choice from their array- Used for computer selecting and also starting dice
    diceOptions = diceOptionsPlayer1;

    //Function to remove choice from Array
    for (var i = diceOptionsPlayer1.length - 1; i >= 0; --i) {
        if (diceOptionsPlayer1[i] == diceValue) {
            diceOptionsPlayer1.splice(i, 1);
        }
    };

    //when the array for Player1 is empty, stop btns
    if (diceOptionsPlayer1.length == 0) {
        $('#shownDice1').addClass('disabled');
        $('#player1Btn').addClass('disabled');
        $('#player1Btn').removeClass('active');
    };




     //remove players choice from their array- Used for computer selecting and also starting dice
    diceOptions = diceOptionsPlayer2;

    //Function to remove choice from Array
    for (var i = diceOptionsPlayer2.length - 1; i >= 0; --i) {
        if (diceOptionsPlayer2[i] == diceValue) {
            diceOptionsPlayer2.splice(i, 1);
        }
    };

    //when the array for Player1 is empty, stop btns
    if (diceOptionsPlayer2.length == 0) {
        $('#shownDice2').addClass('disabled');
        $('#player2Btn').addClass('disabled');
        $('#player2Btn').removeClass('active');
    };




*/


document.getElementById("start-btn").addEventListener("click", function() {

    //reset score and history
    reset();

    //Get player player and change to their name in HTML
    getPlayerData();

    //computer as player 2


    //random player start
    randomStarter();

    //close modal
    closeModal();

    //helper percentage colours

    //game play
    gamePlay();

    //end of game
    //finishedGame();

});