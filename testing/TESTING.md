## TESTING ##

As reusable functions are used throught out the project. Testing has been a major proiatly!

Testing follows a players first interaction with the project and test major stages of the project.

1. Player Vs Player or Player Vs Computer
    
    1. Case: Both player vs player and player vs computer are both in enabled
    * Effect: Player two's turn would be automatic therefore second player doesnt have control.
    * Solve: If player vs player has a value, player vs computer = 0. If player vs computer has value, player vs player = 0

1. Players Input of Name
    
    1. Case 1 
    *  As the input for a players name could be unlimited. 
    * Effect: DOM for name could effect the position and size of the game.
    * Solve: Limit  the characters of name to just 8 characters.
    maxlength has been added into html in form input.

    1. Case 2
    * The input was for the wrong player board.
    * Effect: First player name was used in players 2 board.
    * Solve: Correct usage of id and using Jquery to insure ease of DOM manipulation.

    1. Case 3
    * The input was left empty.
    * This would not help the players identify their playing board, score or turn.
    * Have a default name as Player 1 or Player 2


1. Help tool
    1. Case: Help tool has been brooken or effects different area.
    
    * Effect 
    1. Brooken: If the function has been brooken, the percentage area becomes 'example = %unidentified' or NAN.
        * Testing: Percentage values were not correct.
        * Solve: Correct values were entered into formula. Using console.log and alert to find the problem and correctly applying the right values and ensuring that the values came from the right player.

    1. Wrong value: The dice choosen has the wrong value.
        * Testing: This problem became apparent for the percentages values were wrong for the dice selection. 
        * Solve: Insuring the correct this.value for clicked dice or mouseover.


    1. Wrong Array: The other players array has been selected.  
        * First i had let player1Array = player2Array = [4,6,8,12,20]
        * This created problems for when player 1 choose a die, this selection was removed for player 2.
        * Solve: Insure both players have different arrays to select from. The correct array was called from changePlayer function.

    1. Percentage function: Wrong calculations
        * The percentage function is for WIN only not tired.
        * Changing the formula
        * Solve: Using a calculator to insure the correct answer from the function is correct.

1. Reset
    * Case: The board hasnt been cleared from the last game and setting not set back to 0.

    * Effect- Dice still 'disabled', History from last board can still be seen. Players score and array has wrong fugures. 

    * Solve- Insure the game starts with the rest. Using console.log to insure the arrays, players score and turn is back to normal. Mouse over effect shows if the 'disabled' has been removed. On endGame modal, a click function calls the reset function for the next round.

1. Modal
    * Case: The modal has not poped up when the site has started, or removed and allow the game to start.

    * Solve: Using Jquery on 'load' and hide to remove the modal.

1. Random Player start  
    * Case: Random Player board has not been correctly setup

    * Effect: As both players boards are set to disable and once the active player has the active classname. This would create the board unplayable.

    * Solve: This issue was solved by correct Jquery function or DOM manipulation. To insure a DRY option for javascript instead of Add or Remove className, I use toggle className. By having less functions insured less options to go wrong. A major issue was activeDice was correct for the player (see change player).

1. gamePlay function
    1. newDice: As the game is based on using the dice once per round. New dice on you selection was quite importand.
        1. Case: The dice on your quick selection has been already used but showing as avaible.
            * Effect: This would destroy the fundamentals of the game play.
            * Solve: Insuring the correct array was for the right player (see wrong array above).
        1. Case: Random feature was active every time a player choose a die.
            * Effect: This destroy the feel of the game. While changing for the new players go, having the other players dice to change, the game play wasnt focus on **That** players turn. It was also harder to see what the first player choose to play and therefore effected the second players choice.
            * Solve: Use a 'for if' function stopped the first players dice choice to change allowing the second player to make a better game choice.

    1. dice clicked function: To allow the player to choose the dice they want by selecting 'this' dice. It allowed the player to choose that dice and then not to select the roll button.
        1. Case: If the player selected a dice thats been played before.
            * See 'Disable dice'.
        1. Case: Selecting the die and the wrong value of the dice is passed though the reusable function.
            * See 'Wrong values'.

    1. mouseenter function: While thinking about which dice to choose, the player can hoverover their dice.
        1. Case: If the player selected a dice thats been played before.
            * See 'Disable dice'.
        1. Case: Selecting the die and the wrong value of the dice is passed though the reusable function.
            * See 'Wrong values'.
        1. Case: While hovering over the dice, to help the feel of the game. The dice on the quick option should change.
            * Effect: Every time the player switches over their dice row, the quick select dice should change but only if the dice has not be played before. Also the dice should only change while over their dice row and not the other players.
            * Solve: As a dice has been played, the value has been removed from an array. If the value is not included on the players array, the dice is not visable to the function to switch the dice. 
        1. Case: percentage values are incorrect while hovering over the dice.
            * Effect: This would question the game as a whole, if the player notice the percentages were incorrect for the dice selected.
            * Solve: Insuring the right values are passed though the reuseable functions as well as testing the outcome values.

    1. roll button function: This takes the value of the dice (always the max that dice could roll), pass it thought a random function for the dice roll result. 
        1. Case: If the player selected a dice thats been played before.
            * See 'Disable dice'.
        1. Case: Selecting the die and the wrong value of the dice is passed though the reusable function.
            * See 'Wrong values'.
        1. Case: Reset the diceValue to 0, or the second player dice value would be the players 1 value if that player decides to use the roll button.  

    1. Disabled dice: Once a dice has been selected, it cannot be played again in the same round.
        1. Case: Dice has been selected on the dice row but has not been removed from the options.
        1. Case: The dice has been used from the random start selecting. That dice value needs to be passed.
        1. Case: Hovering over the dice button. This dice value needs to be passed
            * Effect: Allows the player to select the dice more than once per round and therefor destroy the game fundementals.
            * Solve: The dice value is removed from that players array which then will stop that dice from a random start. Also the dice button would be disable which would stop that dice from being selected. A CSS effect would show the player that this dice is un-selectable.

    1. Wrong Values: Once the player chooses their dice, the value will be passed in to a random function to get the dice score. 
        1. Case: For example a player chooses a d6 die. That dice value is a 6 and is then passed into a random function to get a dice score. If a player choose a d6 but the value is a 12. 
            * Effect: The game does not work as if you choose a dice but a score higher than the dice value, the game is broken.  
            * Solve: Using Jquery and 'this' value on each indival dice, pass the value as a changing variable throughout reusable functions. By using console.log to see each change of value and score to insure the game is not broken and the right varaible values are correct.

    1. Changing Players: Passing the turn of the active player to the other player.
        1. Case: Once the player has played a dice, the board does not change.
            * Effect: Breaking the game.
            * Solve: By using less code and using toggle className done in one function.
        1. Case: Player board has changed but selecting a dice effects the other players board.
            * Effect: Confusing the players and breaking the game.
            * Solve: By have a consent variable name applied in different functions, but changing that value by the active player.            

    1. Double win bug: As to use less code, I used toggle className to change players once they have had a turn. A major bug was, if player 1 had a turn first then won that round. The toggles would activate twice which would make player 2 go first on the second turn.
        1. Case: As above.
            * Effect: The game would be confusing. While the CSS would help show whos turn it would be, the game play would not be intuitive.
            * Solve: Using a if statement on which players board has the className "activePlayer" and who has the higher score, would then evoke a changePlayer function which would toggle all needed classes.
            If activePlayer had a higher score, the function is not nessacary and game continues.              





