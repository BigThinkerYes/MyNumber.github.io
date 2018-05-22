/**
 *  Game Function
 * player must quess a number between a min and max
 * player gets a certain amount of guesses
 * notify player of guesses remaining
 * notify the player of the correct answer if lose
 * let  player have the option of playing agin
 * 
 */

 //game values
 let min = 1,
     max = 10,
     winningNum = getRandomNum(min, max),//get random number
     guessesLeft = 3;

//UI Elements
const gameWrapper = document.querySelector('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//assign UI min an max
minNum.textContent = min;
maxNum.textContent = max;

//play again -- event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    //reload the page
    window.location.reload();
  }
});


//listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  //validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }



      //see if user won
    if(guess === winningNum){
     //game over - won
     gameOver(true, `${winningNum} is correct, YOU WIN!`);
    
    }else{
      
      //subtract number of times to play
      guessesLeft -= 1;
      
      if(guessesLeft === 0){
        //game over you lose
         gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);

      }else{
        //continue game -your answer was wrong

        guessInput.style.borderColor ='red';

        //clear Input
        guessInput.value = '';

        //tell user its the wrong number
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
      }
    }
});

//game over
function gameOver(won, msg){

  let color;
  won === true ? color = 'green' : color = 'red';
   //disable input
   guessInput.disabled = true;
   //change border color
   guessInput.style.borderColor = color;
   //set text color
   message.style.color = color;
   //set message
   setMessage(msg);

   //play again?
   guessBtn.value = 'Play Again';//rename the button
   guessBtn.className += 'play-again';//add class name here

}

//get winning number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
  //console.log(Math.floor(Math.random()*(max-min+1)+min));
  //10(max#) - 1(min#) = 9 + 1 = 10(total of all numbers from 1 to 10)+min --makes it go to 10  --use Math.floor to round down and get rid of the decimal
}

//set message function
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}