## TESTING ##

As reusable functions are used throughtout the project testing has been a major priority!

Testing follows a player's first interaction with the project and test major stages of the project.

1. Players Input of Name
    * Case 1 
        *  As the input for a players name could be unlimited. 
        * Effect: DOM for name could effect the position and size of the game.
        * Solve: Limit  the characters of name to just 8 characters.
        maxlength has been added into html in form input.

    * Case 2
        * The input was for the wrong player board.
        * Effect: First player name was used in players 2 board.
        * Solve: Correct usage of id and using Jquery to insure ease of DOM manipulation.

    * Case 3
        * The input was left empty.
        * This would not help the players identify their playing board, score or turn.
        * Have a default name as Player 1 or Player 2


1. Help tool
    * Case: Help tool has been broken or affects different areas.
        * Effect 
        1. Brooken: If the function has been brooken, the percentage area becomes 'example = %unidentified' or NAN.
            * Testing: Percentage values were not correct.
            * Solve: Correct values were entered into formula. Using console.log and alert to find the problem and correctly applying the right values and ensuring that the values came from the right player.

        1. Wrong value: The dice choosen has the wrong value.
            * Testing: This problem became apparent because the percentage values were wrong for the dice selection. 
            * Solve: Ensuring the correct this.value for clicked dice or mouseover.


        1. Wrong Array: The other players array has been selected.  
            * First I had let player1Array = player2Array = [4,6,8,12,20]
            * This created problems for when player 1 chose a die, resulting in this selection being removed for player 2.
            * Solve: Ensure both players have different arrays to select from. The correct array was called from changePlayer function.

        1. Percentage function: Wrong calculations
            * The percentage function is for WIN only not tied.
            * Changing the formula
            * Solve: Using a calculator to insure the correct answer from the function is correct.

1. Reset
    * Case: The board has not been cleared from the last game and setting does not set back to 0.
        * Effect: Dice still 'disabled', History from last board can still be seen. Players score and array has wrong fugures. 
        * Solve: Ensure the game starts with the reset. Using console.log to ensure the arrays, players score and turn is back to normal. Mouseover effect shows if the 'disabled' has been removed. On endGame modal, a click function calls the reset function for the next round.

1. Modal
    * Case: The modal has not poped up when the site has started, or removed and allow the game to start.
        * Effect: The game starts once this modal has been closed also the players input would not be presented onto the game board.
        * Solve: Using Jquery on 'load' and hide to remove the modal.

1. Random Player start  
    * Case: Random Player board has not been correctly setup
        * Effect: As both players boards are set to disable and the active player has the active classname. This would make the board unplayable.
        * Solve: This issue was solved by correct Jquery function or DOM manipulation. To ensure a DRY option for javascript instead of Add or Remove className, I use toggle className. By having less functions ensured less options to go wrong. A major issue was activeDice was correct for the player (see change player).

1. gamePlay function
    1. newDice: As the game is based on using the dice once per round. New dice on you selection was quite important.
        * Case: The dice on your quick selection has been used already but showing as available.
            * Effect: This would destroy the fundamentals of the game play.
            * Solve: Ensuring the correct array was for the right player (see wrong array above).
            
        * Case: Random feature was active every time a player choose a die.
            * Effect: This destroys the feel of the game. While changing for the new players go, having the other players dice to change, the game play was not focused on **That** players turn. It was also harder to see what the first player choose to play and therefore affected the second players choice.
            * Solve: Use a 'for if' function stopped the first players dice choice to change allowing the second player to make a better game choice.

    1. dice clicked function: To allow the player to choose the die they want by selecting 'this' die. It allowed the player to choose that die and then not to select the roll button.
        1. Case: If the player selected a dice thats been played before.
            * See 'Disable dice'.
        1. Case: Selecting the die and the wrong value of the dice is passed though the reusable function.
            * See 'Wrong values'.

    1. mouseenter function: While thinking about which dice to choose, the player can hover over their dice.
        1. Case: If the player selected a dice thats been played before.
            * See 'Disable dice'.
        1. Case: Selecting the die and the wrong value of the dice is passed through the reusable function.
            * See 'Wrong values'.
        1. Case: While hovering over the dice, to help the feel of the game. The dice on the quick option should change.
            * Effect: Every time the player switches over their dice row, the quick select die should change but only if the die has not be played before. Also the die should only change while over their die row and not the other players.
            * Solve: As a die has been played, the value has been removed from an array. If the value is not included on the players array, the die is not visable to the function to switch the die. 
        1. Case: percentage values are incorrect while hovering over the die.
            * Effect: This would question the game as a whole, if the player notice the percentages were incorrect for the die selected.
            * Solve: Ensuring the right values are passed though the reuseable functions as well as testing the outcome values.

    1. roll button function: This takes the value of the die (always the max that die could roll), pass it thought a random function for the die roll result. 
        1. Case: If the player selected a die thats been played before.
            * See 'Disable dice'.
        1. Case: Selecting the die and the wrong value of the die is passed through the reusable function.
            * See 'Wrong values'.
        1. Case: Reset the diceValue to 0, or the second player die value would be the players 1 value if that player decides to use the roll button.  

    1. Disabled dice: Once a die has been selected, it cannot be played again in the same round.
        1. Case: Die has been selected on the die row but has not been removed from the options.
        1. Case: The die has been used from the random start selecting. That die value needs to be passed.
        1. Case: Hovering over the die button. This die value needs to be passed
            * Effect: Allows the player to select the die more than once per round and therefor destroy the game fundamentals.
            * Solve: The die value is removed from that players array which will then stop that die from a random start. Also the die button would be disable which would stop that die from being selected. A CSS effect would show the player that this die is un-selectable.

    1. Wrong Values: Once the player chooses their die, the value will be passed in to a random function to get the dice score. 
        1. Case: For example a player chooses a d6 die. That die value is a 6 and is then passed into a random function to get a dice score. 
            * Effect: The game does not work as if you choose a die but a score higher than the dice value, the game is broken.  
            * Solve: Using Jquery and 'this' value on each individual die, pass the value as a changing variable throughout reusable functions. By using console.log to see each change of value and score to ensure the game is not broken and the right variable values are correct.

    1. Changing Players: Passing the turn of the active player to the other player.
        1. Case: Once the player has played a die, the board does not change.
            * Effect: Breaking the game.
            * Solve: By using less code and using toggle className done in one function.
        1. Case: Player board has changed but selecting a die affects the other players board.
            * Effect: Confusing the players and breaking the game.
            * Solve: By have a consent variable name applied in different functions, but changing that value by the active player.            

    1. Double win bug: As to use less code, I used toggle className to change players once they have had a turn. A major bug was, if player 1 had a turn first then won that round the toggles would activate twice which would make player 2 go first on the second turn.
        1. Case: As above.
            * Effect: The game would be confusing. While the CSS would help show whose turn it would be, the game play would not be intuitive.
            * Solve: Using a if statement on which players board has the className "activePlayer" and who has the higher score, would then evoke a changePlayer function which would toggle all needed classes.
            If activePlayer had a higher score, the function is not nessacary and game continues.              





