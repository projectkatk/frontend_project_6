const startGame = document.querySelector('.btn__reset');

const overlay = document.querySelector('.start');
const overlayA = overlay.lastElementChild;

const phrase = document.querySelector('#phrase');
const ul = phrase.querySelector('ul');
const lis = ul.children;

const qwerty = document.querySelector('#qwerty');
const keyrows = qwerty.children;
const buttons = qwerty.querySelectorAll('button');

const scoreboard = document.querySelector('#scoreboard');
const ol = scoreboard.querySelector('ol');

let missed = 0;

const phrases = [
  'today is a good day',
  'my dog ate my homework',
  'show me the money',
  'listen to your heart',
  'life is too short'
];

const phraseArray = getRandomPhraseAsArray(phrases);

// styling the start button
overlayA.style.fontFamily = 'Open Sans, sans-serif';
overlayA.style.fontWeight = 'bold';


// add an event where the 'start game' is clicked
startGame.addEventListener('click', (e) => {
  const start = e.target;
  if(start.className === 'btn__reset') {
    addPhraseToDisplay(phraseArray);
    start.parentNode.style.display = 'none';    
  }  
});

// create an event for matching the button clicked
qwerty.addEventListener('click', (e) => {
  let btn = e.target;
  if(btn.tagName === 'BUTTON') {
    btn.className = 'chosen';
    btn.style.backgroundColor = 'var(--color-neutral)';
    btn.setAttribute('disabled', true);
    // assign a variable to checkLetter(btn) function
    let letterCheck = checkLetter(btn);
    if(letterCheck === null) {
      btn.style.backgroundColor = 'var(--color-lose)'; 
      ol.removeChild(ol.firstElementChild);                       
      missed++;                      
    }
    checkWin();
  }
});

// function to get random phrases and split into each character
function getRandomPhraseAsArray(arr) {
  let randomIndex = Math.floor(Math.random()*5);
  let randPhrase = arr[randomIndex];
  let splitPhrase = randPhrase.split('');  
  return splitPhrase;
}

// function that loops through an array for an individual character per list
// create a  list and insert one character per list, then assign the right classes for letter & space
function addPhraseToDisplay(arr) {  
  for (let i = 0; i < arr.length; i++) {
    let li = document.createElement('li');
    let character = arr[i];
    li.textContent = character;
    if(li.textContent === ' ') {
      li.className = 'space';
    } else {
      li.className = 'letter';
    } 
    ul.appendChild(li);
  }
  return ul;    
}

// function to check if the letter is in the phrase
function checkLetter(btn) { 
  let letterFound = null;
  for (let i = 0; i < lis.length; i++) {
    let list = lis[i];
    let listText = list.textContent;
    let btnText = btn.textContent;  
    if (list.className === 'letter') {                
      if (listText.includes(btnText)) { 
        list.className += ' show';
        list.style.transition = '0.5s ease-in-out'
        list.style.fontFamily = 'Open Sans, sans-serif';
        list.style.fontWeight = 'bold';
        letterFound = listText;
      }
    }
  }
  return letterFound;
}

// function to check if the game is won or lost
// this function contains winGame(), loseGame() & reset() functions inside
function checkWin() {   
  let letterClass = 0; // counting of the class named 'letter' starts with zero
  let showClass = 0; // counting of the class named 'show' starts with zero
  // modular functions to style the elements
  function styleSet (element, className, display, finalPhrase) {
    element.className = className;
    element.style.display = display;
    element.firstElementChild.textContent = finalPhrase;
  }

  if (missed >= 5) {
    loseGame();    // call loseGame function
  } else {
    winGame(); // call winGame function
  }
  reset(); // call reset function  

  // winGame function => if the class name of the list is 'letter' or 'show', each case add 1 to letterClass & showClass 
  function winGame() {   
    for(let i = 0; i < lis.length; i++) {
      let list = lis[i];
      if(list.className === 'letter') {
        letterClass++;
      } else if(list.className === 'show') {
        showClass++;
      }
    }
    // if the counted numbers for letterClass & showClass are the same, it is the 'win' case
    // setTimeout by 2 seconds so there is a bit of time gap between the game and the results    
    setTimeout (function () {
      if (letterClass === showClass) {
        styleSet (overlay, 'win','flex','You Won!!!! Great Job!');           
        overlayA.textContent = 'Play one more time?';
      }
    }, 1000);   
  }
  
  // loseGame function => if missed number is more than 5, the player lost the game
  function loseGame() {
    // setTimeout by 2 seconds so there is a bit of time gap between the game and the results
    setTimeout (function() {
      styleSet (overlay, 'lose', 'flex', 'Oh No...You LOST!');      
      overlayA.textContent = 'Try Again!';     
    }, 1000);    
  }
  // reset function => this resets all the changes made during the game, setting the starting environment
  function reset() {
    // if the button such as 'try again' or 'play one more time' is click, event listener will run to reset the game
    setTimeout (function() {
      overlayA.addEventListener('click', () => {
        missed = 0;
        letterClass = 0;
        showClass = 0;  
        ul.innerHTML = '';
        
        checkLetter();
        addPhraseToDisplay(phraseArray);
          
        for(let i = 0; i < buttons.length; i++) {
          buttons[i].className = '';
          buttons[i].style.backgroundColor = 'var(--color-keys-light)';
          buttons[i].removeAttribute('disabled');
        }
            
        ol.innerHTML = `
              <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
              <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
              <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
              <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>
              <li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>`;    
      });
    }, 2000); 
  }    
}








 
  


  


  







