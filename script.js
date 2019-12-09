// Declaring of varibales for global use
let mode;
let time; 
let insaneInterval;
let animationInterval;
let colorShiftInterval;
const startButtons = window.document.getElementsByClassName('buttons');
const memoryContainer = window.document.querySelector('.memoryContainer');

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  animationBackground = 0;
}

// Shuffles the full array
const shuffle = function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
// random function for insane mode
const getRandomInteger = function(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
// Mode decides how many numbers the array will make
const makeShuffledArray = function(mode) {
  let memoryPieces = []
  
  for (let i = 1; i <= mode; i++) {
    memoryPieces.push({number: i, })
  }
  
  original = memoryPieces; 
  duplicate = original.slice();
  fullMemoryPieces = original.concat(duplicate); 
  return shuffle(fullMemoryPieces);
}

// For insane mode gets a random color
function getRandomColor() {
  let letters = '0123456789ABCDE';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 15)];
  }
  return color;
}

// the main play function. It takes in mode for number of memory pieces
const play = function(mode){ 
  let prevCard = "";
  let prevCardTargetInfo = "";
  let score = 0;
  let seconds = 0;
  let clicks = 0;
  let minutes = 0;
  let displayTime = window.document.querySelector('.title');
  const elementMemoryPieces = window.document.getElementsByClassName('memoryPiece');
  // startButtons = window.document.getElementsByClassName('buttons');
  window.document.querySelector('.clicks').textContent = clicks;
  window.document.getElementById('maxScore').textContent = mode;
  window.document.getElementsByClassName('displayScore')[0].style.display = 'initial';
  window.document.querySelector('.memoryContainer').classList.add('memoryContainerShow');
  window.document.querySelector('.clickCounter').classList.add('clickCounterShow');
  window.document.querySelector('.menu').classList.add('menuAfterStart');
  startButtons['mainMenu'].style.display = 'inherit';
  startButtons['mainMenu'].disabled = false;
  startButtons['restart'].disabled = false;
  displayTime.classList.add('titleAfterStart');
  time = setInterval(function(){
    if (seconds < 59) {
      ++seconds;
    }else if (seconds >= 59) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 0) {
      displayTime.textContent = `${seconds} s`;
    }else{
      displayTime.textContent = `${minutes} m ${seconds} s`;
    }
  }, 1000)
  
  for (let i = 0; i < startButtons.length-2; i++) {
    startButtons[i].style.display = 'none';
  }
  startButtons['restart'].disabled = false;
  
  
  
  const memoryPieces = makeShuffledArray(mode);
  memoryPieces.forEach(function(memoryPiece){
    const btns = document.createElement("button"); 
    btns.innerHTML = memoryPiece.number;
    btns.setAttribute('class', 'memoryPiece'); 
    btns.setAttribute('data-number', memoryPiece.number);
    document.body.querySelector('.memoryContainer').appendChild(btns);
  })
  
if (mode >= 16 && window.innerWidth >= 1024) {
  window.document.querySelector('.memoryContainer').classList.add('mode16');
    for (let i = 0; i < elementMemoryPieces.length; i++) {
      elementMemoryPieces[i].style.margin = '0 1%';
    }
}
  const numberOfMemoryPieces = window.document.querySelectorAll('.memoryPiece');
  // for insane mode
  if (mode == 20) {
  insaneInterval = setInterval(function(){
    for (let i = 0; i < elementMemoryPieces.length; i++) {
      elementMemoryPieces[i].style.order = getRandomInteger(0 , (mode*2));
    }
  
  },10*1000);
  animationInterval = setInterval(function(){
    animationColor = getRandomColor();
  },1000);
}
 
 // Where all the magic happens:
  for (let i = 0; i < numberOfMemoryPieces.length; i++) {
    numberOfMemoryPieces[i].addEventListener('click', function(){
      
      let theEventTarget = event.target; 
       
      if (theEventTarget.classList[1] !== 'memoryPieceShow') {
      
        document.querySelector('.clicks').textContent = ++clicks;
      }
      
      if (theEventTarget.className === 'memoryPiece') {
        
        theEventTarget.classList.add('memoryPieceShow');
        
      }
      
      const currentCard = theEventTarget.dataset.number;
      
      if (prevCard === "") {
        prevCardTargetInfo = theEventTarget;
        prevCard = currentCard;
      }else if (prevCard !== "") {
        
          if (prevCard === currentCard && prevCardTargetInfo != theEventTarget) {
            prevCard = ""; 
            prevCardTargetInfo = "";
            score++;
            duration = 4;
            window.document.getElementById('score').textContent = score;
            window.document.querySelectorAll('.memoryPiece').forEach(function(onePiece){
              if (onePiece.dataset.number === theEventTarget.dataset.number) {
                onePiece.disabled = true;
              }
            })
            
            if (score === 4 && mode == 20) {
            
              colorShiftInterval = setInterval(function(){
                // document.documentElement.style.setProperty('--accent-color', getRandomColor());
                document.documentElement.style.setProperty('--bg-color', getRandomColor());
              },1000)
              
            
            
            }
            if (mode == score) {
              window.document.querySelector('.gameCompleteMessage').classList.add('gameCompleteMessageShow');
              document.querySelector('.clicksDisplayFinish').textContent = clicks;
              clearInterval(time);
              
              if (minutes === 0) {
                document.querySelector('.timeDisplayFinish').textContent = seconds;
              }else {
                document.querySelector('.timeDisplayFinish').textContent = `${minutes} m ${seconds}`;
              }
              
              if (mode == 20) {
                clearInterval(insaneInterval);
                clearInterval(animationInterval);
                
              }
            }
            
          }else if (prevCard !== currentCard) {
            setTimeout(function(){ 
              duration = 4; 
              theEventTarget.classList.remove('memoryPieceShow');
              prevCardTargetInfo.classList.remove('memoryPieceShow');
              prevCardTargetInfo = "";
              prevCard = "";
            }, 500)
          }
      } 
        
    })
  }
  
} 

const removeMemoryPieces = function(){
  clearInterval(time);
  
  while (memoryContainer.firstChild) {
    memoryContainer.removeChild(memoryContainer.firstChild);
  }
  
  memoryContainer.classList.remove('memoryContainerShow')
  
  if (mode >= 16) {
    
    memoryContainer.classList.remove('mode16');
    
    }
}

const replay = function(mode){
  startButtons['mainMenu'].disabled = 'true';
  startButtons['restart'].disabled = 'true';
  removeMemoryPieces();
  window.document.querySelector('.gameCompleteMessage').classList.remove('gameCompleteMessageShow');
  for (let i = 0; i < document.body.getElementsByClassName('memoryPiece').length; i++) {
    document.body.getElementsByClassName('memoryPiece')[i].disabled = false;
  }

  setTimeout(function(){
    play(mode);
    window.document.getElementById('score').textContent = '0';
  }, 2500)
}

const menu = function(){
  removeMemoryPieces();
  window.document.querySelector('.clickCounter').classList.remove('clickCounterShow');
  window.document.querySelector('.title').classList.remove('titleAfterStart');
  window.document.getElementById('score').textContent = '0';
  setTimeout(function(){
    for (let i = 0; i < window.document.getElementsByClassName('buttons').length-2; i++) {
      window.document.getElementsByClassName('buttons')[i].style.display = 'inherit';
    }
    if (window.innerWidth <= 1024) {
      window.document.getElementsByClassName('buttons')['startInsane'].style.display = 'none';
    }
    if (window.innerWidth <= 320) {
      window.document.getElementsByClassName('buttons')['startHard'].style.display = 'none';
    }
    window.document.querySelector('.menu').classList.remove('menuAfterStart');
    window.document.querySelector('.title').textContent = 'Rememory';
  },3000)
  window.document.getElementsByClassName('buttons')['mainMenu'].style.display = 'none';
  window.document.getElementsByClassName('buttons')['restart'].disabled = 'true';
  window.document.querySelector('.title').textContent = 'Loading...';
  if (mode == 20) {
    animationColor = '#3399ff';
    clearInterval(insaneInterval);
    clearInterval(animationInterval);
    clearInterval(colorShiftInterval);
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.style.setProperty('--bg-color', 'black');
      animationBackground = 0;
    } else {
      document.documentElement.style.setProperty('--bg-color', 'white');
      animationBackground = 255;
      
    }
  }
  if (window.document.querySelector('.gameCompleteMessage').classList.contains('gameCompleteMessageShow') === true) {
    window.document.querySelector('.gameCompleteMessage').classList.remove('gameCompleteMessageShow');
  }
}

for (let i = 0; i < window.document.querySelectorAll('.buttons').length-2; i++) {
  window.document.getElementsByClassName('buttons')[i].addEventListener('click', function(){ 
    mode = event.target.dataset.mode;
    play(mode);
  })
}

window.document.getElementsByClassName('buttons')['mainMenu'].addEventListener('click', function(){
  menu();
});

window.document.getElementsByClassName('buttons')['restart'].addEventListener('click', function(){
  replay(mode, time);
});

window.document.getElementsByClassName('yesButton')[0].addEventListener('click', function(){
  replay(mode, time);
});
