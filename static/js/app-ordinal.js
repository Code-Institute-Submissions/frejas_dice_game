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
    roundValue = 1;
}

//Start Mondal and get player info
//Get Local players Name from Modal 
let player1, player2, player1Name, player2Name, player1Area, player2Area;

//Modal open on page ready
$(window).on('load', function() {
    $("#introModal").modal('show');
});

//close modal
function closeModal() {
    $("#introModal").modal('hide');
}

function getPlayerData() {
    //Get local player names from form input
    player1 = document.getElementById("userId").elements.namedItem("player1").value;
    player2 = document.getElementById("userId").elements.namedItem("player2").value;

    //Set default Name if no input for player names
    if (player1 == 0) {
        player1 = "Player 1";
    }
    if (player2 == 0) {
        player2 = "Player 2";
    }

    //Change the name from HTML
    player1Name = document.getElementsByClassName("player1Name");
    player2Name = document.getElementsByClassName("player2Name");
    for (var i = 0; i < player1Name.length; i++) {
        player1Name[i].innerHTML = player1;
        player2Name[i].innerHTML = player2;
    }
}

//Game Play
let dice, player1Help, player2Help, activeDice, player1Total, player2Total, roundValue, player1Score, player2Score, randomPlayer, showDice1, rollResult1, rollResult2, showDice2, diceValue, randomStartDice1, randomStartDice2, startDice1, startDice2, activeRollBtn1, activeRollBtn2;

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
    }
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

player1Help = document.getElementById("helpSwitchPlayer2");
player2Help = document.getElementById("helpSwitchPlayer1");

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
}

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
}

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

        //roll the dice if clicked
        rollDice();
        showPercentage();
        diceValue = 0;
    });

    //change dice on mouse enter
    $('.dice').on('mouseenter', function() {
        diceValue = $(this).val();
        activeDice.src = "static/dice_img/d-" + diceValue + ".jpg";
        activeDice.setAttribute("value", diceValue);

        if (player1Help.checked && player2Score > 0) {
            showPercentage();
            if (diceValue != 0) {
                $(".rollResult").html("D" + diceValue + " has a " + $(this).attr("percentage") + "% chance to win!");
            }
        }
        if (player2Help.checked && player1Score > 0) {
            showPercentage();
            if (diceValue != 0) {
                $(".rollResult").html("D" + diceValue + " has a " + $(this).attr("percentage") + "% chance to win!");
            }
        }
    });

    //roll the dice on btn
    $('.roll').click(function() {
        //get a value from starting dice if btn clicked
        diceValue = activeDice.getAttribute("value");
        rollDice();
        showPercentage();
        diceValue = 0;
    });
}

function showPercentage() {
    if (player1Help.checked && player2Score > 0) {
        diceOptions = diceOptionsPlayer1;
        score = player2Score;
        display = '#player1-d';
        percentage();
        computerSecondMove();
    }
    if (player2Help.checked && player1Score > 0) {
        diceOptions = diceOptionsPlayer2;
        score = player1Score;
        display = '#player2-d';
        percentage();
        computerSecondMove();
    }
}

//start with random dice (thats not been used) on start
function newdice() {
    //Player 1 new dice on start of turn
    randomStartDice1 = diceOptionsPlayer1[Math.floor(Math.random() * diceOptionsPlayer1.length)];
    //If the array is empty, 'if' statement to stop blank img
    if (diceOptionsPlayer1.length > 0) {
        startDice1.src = "static/dice_img/d-" + randomStartDice1 + ".jpg";
    }
    //set dice value from random starting dice
    startDice1.setAttribute("value", randomStartDice1);
    diceValue = randomStartDice1;

    //Player 2/computer new dice on start of turn
    randomStartDice2 = diceOptionsPlayer2[Math.floor(Math.random() * diceOptionsPlayer2.length)];
    //If the array is empty, if statement to stop blank img
    if (diceOptionsPlayer2.length > 0) {
        startDice2.src = "static/dice_img/d-" + randomStartDice2 + ".jpg";
    }
    //set dice value from random starting dice
    startDice2.setAttribute("value", randomStartDice2);
    diceValue = randomStartDice2;
}

//Function to roll the dice on Roll btn or clicked on the dice
function rollDice() {
    //Dice roll
    dice = Math.floor(Math.random() * diceValue + 1);
    //error protection on player not selecting a dice
    if (diceValue > 0) {
        $(".rollResult").html("<h3>You rolled a value of " + dice + "</h3>");
    }
    //Set score to player
    if (player1Area.classList.contains("activePlayer")) {
        player1Score = dice;
        player1Dice = diceValue;
        //disable dice from btn click instead of dice click
        $('#player1-d' + diceValue).addClass('disabled');
        for (let i = diceOptionsPlayer1.length - 1; i >= 0; --i) {
            if (diceOptionsPlayer1[i] == diceValue) {
                diceOptionsPlayer1.splice(i, 1);
            }
        }
        //when the array for Player1 is empty, stop btns
        if (diceOptionsPlayer1.length == 0) {
            $('#shownDice1').addClass('disabled');
            $('#player1Btn').addClass('disabled');
            $('#player1Btn').removeClass('active');
        }
    } else {
        player2Score = dice;
        player2Dice = diceValue;
        //disable dice from btn click instead of dice click
        $('#player2-d' + diceValue).addClass('disabled');
        for (let b = diceOptionsPlayer2.length - 1; b >= 0; --b) {
            if (diceOptionsPlayer2[b] == diceValue) {
                diceOptionsPlayer2.splice(b, 1);
                console.log("pl2 " + diceOptionsPlayer2);
            }
        }
        //when the array for Player1 is empty, stop btns
        if (diceOptionsPlayer2.length == 0) {
            $('#shownDice2').addClass('disabled');
            $('#player2Btn').addClass('disabled');
            $('#player2Btn').removeClass('active');
        }
    }
    //Change Players if one has a score and the other player has not
    if (player1Score == 0 || player2Score == 0) {
        //Change Player after roll
        changePlayer();
        //Clear text of result
        $(".rollResult").html("Please select a die");
    }
    //If both players have played- Set the winner for next turn
    if (player1Score !== 0 && player2Score !== 0) {
        removePercentage();
        newdice();
        //Change player: stop double win bug
        if (player1Area.classList.contains("activePlayer") && player2Score > player1Score) {
            changePlayer();
        }
        if (player2Area.classList.contains("activePlayer") && player1Score > player2Score) {
            changePlayer();
        }
        //Update score
        if (player1Score > player2Score) {
            player1Total += 1;
            document.getElementById('player1Score').innerText = player1Total;
            history();
            let changeOne = document.getElementById('player1Score' + roundValue);
            changeOne.classList.add("winner");
        } else if (player1Score < player2Score) {
            player2Total += 1;
            document.getElementById('player2Score').innerText = player2Total;
            history();
            //Show player 2 or computure dice won on a turn
            let changeTwo = document.getElementById('player2Score' + roundValue);
            changeTwo.classList.add("winner");
        } else {
            roundValue -= 1;
        }

        //Reset score for round
        player1Score = 0;
        player2Score = 0;
        roundValue += 1;
    }
}

//Update history
function history() {
    let newHistory = document.createElement('div');
    newHistory.classList.add("histroy");
    newHistory.innerHTML = '<div class="row histroyRow" id="histroyRow"><!--Round counter--><div class="col-2 diceHistory roundCounter"><h4>' + roundValue + ':</h4></div><!--Player 1 score and used dice--><div class="col-4 diceHistory id="player1History"><button class="dice" id="d' + player1Dice + '"value="' + player1Dice + '"><img src="static/dice_img/d-' + player1Dice + '.jpg"/></button><div id="player1Score' + roundValue + '"> ' + player1Score + '</div></div><!--Player 2 score and used dice--><div class="col-4 diceHistory id="player2History"><button class="dice" id="d' + player2Dice + ' value="' + player2Dice + '><img src="static/dice_img/d-' + player2Dice + '.jpg"/></button><div id="player2Score' + roundValue + '"> ' + player2Score + '</div></div></div><br>';
    document.getElementById("history").appendChild(newHistory);
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
    //active dice to right player
    if (player1Area.classList.contains("activePlayer")) {
        activeDice = document.getElementById('shownDice1');
    }
    if (player2Area.classList.contains("activePlayer")) {
        activeDice = document.getElementById('shownDice2');
    }
}




//Function to add classNames to diceRow to show percentage to win
function percentage() {
    for (var i = diceOptions.length - 1; i >= 0; --i) {
        //Working out percentage to win
        let per = (diceOptions[i] - score) * (100 / diceOptions[i]);
        let code = per.toFixed(0);
        //Stop percentage under 0
        if (code < 0) {
            code = 0;
        }
        //Reusable code to set percentage
        let set = $(display + diceOptions[i])[0].setAttribute("percentage", code);

        for (var j = diceOptions.length - 1; j >= 0; --j) {
            switch (true) {
                //great className with colour green
                case code >= 90:
                    $(display + diceOptions[i]).addClass('great');
                    set;
                    break;
                    //good className with colour light green
                case code >= 70 && code <= 89:
                    $(display + diceOptions[i]).addClass('good');
                    set;
                    break;
                    //ok className with colour yellow
                case code >= 50 && code <= 69:
                    $(display + diceOptions[i]).addClass('ok');
                    set;
                    break;

                    //bad className with colour light pink
                case code < 50 && code > 10:
                    $(display + diceOptions[i]).addClass('bad');
                    set;
                    break;
                    //worst className with colour dark grey
                default:
                    $(display + diceOptions[i]).addClass('worst');
                    set;
                    break;

            }

        }
    }
}

//Remove percentage classes after both players have gone
function removePercentage() {
    for (var i = diceOptions.length - 1; i >= 0; --i) {
        $(display + diceOptions[i]).removeClass('great');
        $(display + diceOptions[i]).removeClass('good');
        $(display + diceOptions[i]).removeClass('ok');
        $(display + diceOptions[i]).removeClass('bad');
        $(display + diceOptions[i]).removeClass('worst');
        //remove computer selection
        $(display + diceOptions[i]).removeClass('computer');
    }
};


function computerSecondMove() {
    for (var i = 0; i < diceOptionsPlayer2.length; ++i) {

        //Working out percentage to win
        let per = (diceOptions[i] - score) * (100 / diceOptions[i]);
        let code = per.toFixed(0);
        //Stop percentage under 0
        if (code < 0) {
            code = 0;
        }

        let set = $(display + diceOptionsPlayer2[i])[0].setAttribute("percentage", code);

        for (var z = 0; z < diceOptionsPlayer2.length; ++z) {
            switch (true) {
                case code >= 40:
                    return $(display + diceOptionsPlayer2[i]).addClass('computer');
                    set;
                    break;
                case code = 0:
                    return $(display + diceOptionsPlayer2[i]).addClass('computer');
                    set;
                default:


            }
        }
    }
}

function computerFirstMove() {
    const randomComputerMove = diceOptionsPlayer2[Math.floor(Math.random() * diceOptionsPlayer2.length)];

}







//Javscript control of functions
document.getElementById("start-btn").addEventListener("click", function() {
    //reset score and history
    reset();
    //Get player player and change to their name in HTML
    getPlayerData();
    //computer as player 2

    computerFirstMove();
    //random player start
    randomStarter();
    //close modal
    closeModal();
    //game play
    gamePlay();

    //end of game
    //finishedGame();

});