# [Welcome to Freja's Dice Game](https://brendanoshea84.github.io/frejas_dice_game/) #

This project was made for an assignment for Code Institue Interactive Frontend Development Milestone Project.
The aim was to make a fun game in Javascript and completing the recommanded tasks.

This game is aimed at younger children with the intent of the whole family to play. Freja's Dice Game is a simple dice game where two players compete against each other. Each player has 5 different dices which they can choose from and strategically roll to ensure the higher point.  Once a die has been used it cannot be played again in that round meaning that the contestant needs to strategise for both the immediate round as well as the next ones. In short the game is about ensuring enough points while using the right die at the right time.




## UX ##
This milestone project gave me the opportunity to create a game that is meant for the whole family. The website as such is hence designed to be userfriendly for adults as well as children. Even thou the game itself is fairly straight forward it allows the contestant to challenge themselves and further develop their strategic analysis skills. And of course also being a fun game to play with kids all ages!

### As a Player ### 

* I wanted a fun game for the family.
    * A rewarding game that ensures the player **wants** to come back and try again.
* A beautiful back drop with intuition gameplay for all ages.
    * The theme of the game is bright and pleaseing to look at while the actucal game play stands out. While there are lots of buttons on screen, the game ensures that the player can only use their buttons while it's their turn. 
* Large buttons and ease of play.
    * A clear understand on who's playerboard is which players. 
    * Highlights who's turn it is.
* Help function to understand the probability on which dice is the better option.
    * The game is based on a strategy on which die to use at what time. The help function enables the player to make better choices.
    * For children: A simple boarder change of the dices allows the player to see which die gives you a better chance.
    For Adults: The probability for each die choice is shown.
    

### As the programmer ### 
As the programmer, I wanted to showcase a wide variety of skills I have learnt through Interactive Frontend Development.

* Taking new inputs and applying them through out the DOM manipulation.
* Control of random function and applying functions to an Array.
* Using DRY approach and reusing functions to many aspects throughout the game.
* Applying mouse over and click functions for DOM manipulation, applying functions when needed.
* Show case 'for loops' , 'if functions' and 'case functions' as well as creating a unique percentage function.

### [Link to MockUps](https://github.com/brendanoshea84/frejas_dice_game/tree/master/testing/Mockups) ###
## Features ##
As this is for a 'Milestone Project' I wanted to show case a variety of new skills and apply them in different scenarios.

- Taking input and applying them throughtout the project:

    By taking new input from the player and changing DOM to show player play areas and show who is who.
    
    -Case: What happens if a player leaves their name blank?

    If a player leaves their name blank, a predetermanined 'Player 1' or 'Player 2' name will be the default. 

    -Demonstrates: This shows the programmer has the skills of manipulating DOM by adding innerHtml through javascript and Jquery, correct id and class names though HTML and CSS.  

- Applying a 'Help' option

    This project is based on a game of chance and which situation you should play which die. 
    Borders around the die change based on their percentage on winning and information of the probablity is displayed.
    Case function and for loops were used in combination to achieve this.
    
    -case: If player one rolled a d8 and has a score of 4. Player 2 dice's boarders change to show which dice can beat that score and what probablity it has to win.

    -Demonstrates: By using 'this' values and giving it a variable name. Allows the programmer to pass it through multiply functions to give percentages and scores. While 'this' value can change instantly, the functions will adapt and different results can be observed throughout the game play.

## Future Implement ##
- A simple AI to play against
    With the use of 'random' functions, a simple computer player was applied to the project so that the game could be played as a 1 player game.
    
    - case: While the computers first go can be completely random, the computers second go against a player needed to be more complex. While using a probality function, the computer could play a die to actually compete to the players value. But if the computer options were not satisfatory, using of a low value die would have a strategic gameplay.

- Change the difficulty of the computer.
    - Enable an easy, medium or hard mode by changing the computers probability choice.

- Add more dice.
    - Adding more options for the dice.
   
## Technologies Used ##    
- HTML and css: Building the base of the visual game and changing style of indivual site taste.

- [Bootstrap](https://getbootstrap.com/) and [Bootwatch](https://bootswatch.com/): Allowing ease use of row and columes to allow the game to feel more structured.

- Javascript and [Jquery](https://jquery.com/): Applying functions and DOM manipulation.

- [Github](https://github.com/): Saving and deploying the site.

- [Visual Studio](https://visualstudio.microsoft.com/): To write the program.

- Microsoft photos was used to crop this imagines and background for this project.

## Testing ## 
 - [TESTING.MD](https://github.com/brendanoshea84/frejas_dice_game/blob/master/testing/TESTING.md) Can be observed here.

 - [CSS Validation](https://jigsaw.w3.org/css-validator/) from jigsaw.

 - [HTML Validation](https://validator.w3.org/) from W3C.

 - [Javascrip Validation](https://jshint.com/) from js hint.

## Deployment ##
- To deploy your project from GitHub
    [Deployment Help site](https://www.codecademy.com/articles/f1-u3-github-pages)
    1. log into your Github page
    1. Click your project that you wish to deploy.
    1. Click settings.
    1. Scroll to GitHub Pages (about half way).
    1. Under Source click the drop-down menu labelled None and select Master Branch.
    1. Refresh and your page address should be here and ready!

- To clone your project from Github
    [Cloning Help Site](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
    1. Follow the first 2 steps from deployment (As above).
    1. Under the repository name, click Clone or download. 
    1. Copy the SSH key and copy the address.
    1. Go to your favourite code creator (example: Visual Studio).
    1. Open Git Bash and go to the directory where you wish to clone this site.
    1. Type `git clone https://github.com/brendanoshea84/frejas_dice_game´ and enter!  


## Credits ## 
#### Media ####

- dice images : https://www.netclipart.com/isee/mRoJhb_drawn-dice-polyhedral-dice-rpg-dice-png/

- background: https://www.vectorstock.com/royalty-free-vector/cute-game-background-of-mountains-and-grass-vector-9827642

#### Acknowledgements ####
- To freja! Who taught me the game!
- Jonas Schmedtmann and his course on udemy.

