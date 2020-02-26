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
    * Solve: Limite the characters of name to just 8 characters.
    maxlength has been added into html in form input.

    1. Case 2
    * The input was for the wrong player board.
    * Effect: First player name was used in players 2 board.
    * Solve: Correct usage of id and using Jquery to insure ease of DOM manipulation.


1. Help tool
    1. Case: Help tool has been brooken or effects different area.
    
    * Effect 
    1. Brooken: If the function has been brooken, the percentage area becomes 'example = %unidentified' or NAN.
        * Testing: Percentage values were not correct.
        * Solve: Correct values were entered into formula. Using console.log to find the problem and correctly applying the right values and insuring that the values came from the right player.

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

    * Effect: As both players boards are set to disable and once the active player has the active classname, that players board dice can be pressed.

    * Solve: This issue was solved by correct Jquery function or DOM manipulation. To insure a DRY option for javascript instead of Add or Remove className, I use toggle className. By having less functions insured less options to go wrong. A major issue was activeDice was correct for the player.

