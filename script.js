// Declaring of varibales for global use
let mode;
let time; 
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

const makeArray = function(mode) {
  let memoryPieces = []
  
  for (let i = 1; i <= mode; i++) {
    memoryPieces.push({number: i, })
  }
  
  original = memoryPieces; 
  duplicate = original.slice();
  fullMemoryPieces = original.concat(duplicate);
  console.log(fullMemoryPieces)
  return shuffle(fullMemoryPieces);
}

// For insane mode
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
  document.querySelector('.clicks').textContent = clicks;
  time = setInterval(function(){
    document.querySelector('h1').textContent = ++seconds;
  }, 1000)
  // let index = 0;
  let theScoreCounter = window.document.getElementById('score').textContent; 
  window.document.getElementById('maxScore').textContent = mode;
  window.document.getElementsByClassName('displayScore')[0].style.display = 'initial';
  window.document.querySelector('.memoryContainer').classList.add('memoryContainerShow');
  window.document.querySelector('.clickCounter').classList.add('clickCounterShow');
  window.document.querySelector('.menu').classList.add('menuAfterStart');
  window.document.querySelector('.title').classList.add('titleAfterStart');
  const startButtons = window.document.getElementsByClassName('buttons')
  for (let i = 0; i < startButtons.length-1; i++) {
    startButtons[i].style.display = 'none';
  }
  window.document.getElementsByClassName('buttons')['restart'].disabled = false;
  
  
  
  const memoryPieces = makeArray(mode);
  memoryPieces.forEach(function(memoryPiece){
    const btns = document.createElement("button");
    // const lis = document.createElement("li");
    btns.innerHTML = memoryPiece.number;
    btns.setAttribute('class', 'memoryPiece'); 
    btns.setAttribute('data-number', memoryPiece.number);
    // btns.style.order = getRndInteger(0 , (mode*2));
    // document.body.getElementsByClassName('memoryContainer')[0].appendChild(lis);
    document.body.getElementsByClassName('memoryContainer')[0].appendChild(btns);
    // document.body.getElementsByClassName('hej')[index].appendChild(btns);
    // index++;
  })
if (mode >= 16 && window.innerWidth >= 1024) {
  window.document.getElementsByClassName('memoryContainer')[0].classList.add('mode16');
    for (let i = 0; i < window.document.getElementsByClassName('memoryPiece').length; i++) {
      window.document.getElementsByClassName('memoryPiece')[i].style.margin = '0 1%';
    }
}
  const numberOfMemoryPieces = window.document.querySelectorAll('.memoryPiece');
  // for insane mode
  if (mode == 20) {
  setInterval(function(){
    for (let i = 0; i < window.document.getElementsByClassName('memoryPiece').length; i++) {
      window.document.getElementsByClassName('memoryPiece')[i].style.order = getRandomInteger(0 , (mode*2));
    }
  
  },10*1000);
}
 
  console.log(numberOfMemoryPieces);
  for (let i = 0; i < numberOfMemoryPieces.length; i++) {
    numberOfMemoryPieces[i].addEventListener('click', function(){
      
      let theEventTarget = event.target; 
       
      if (theEventTarget.classList[1] !== 'memoryPieceText') {
      
        document.querySelector('.clicks').textContent = ++clicks;
      }
      
      if (theEventTarget.className === 'memoryPiece') {
        
        theEventTarget.classList.add('memoryPieceText');
        
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
            window.document.getElementById('score').textContent = score;
            window.document.querySelectorAll('.memoryPiece').forEach(function(onePiece){
              if (onePiece.dataset.number === theEventTarget.dataset.number) {
                onePiece.disabled = true;
              }
            })
            if (mode == score) {
              window.document.querySelector('.gameCompleteMessage').classList.add('gameCompleteMessageShow');
              clearInterval(time);
              document.querySelector('.timeDisplayFinish').textContent = seconds;
            }
            if (score === 4 && mode === 20) {
              setInterval(function(){
                // document.documentElement.style.setProperty('--accent-color', getRandomColor());
                document.documentElement.style.setProperty('--bg-color', getRandomColor());
              },400)
            
            }
            
          }else if (prevCard !== currentCard) {
            setTimeout(function(){ 
              // theEventTarget.removeAttribute("style")
              // prevCardTargetInfo.removeAttribute("style")
              theEventTarget.classList.remove('memoryPieceText');
              prevCardTargetInfo.classList.remove('memoryPieceText');
              prevCardTargetInfo = "";
              prevCard = "";
            }, 500)
          }
      } 
        
    })
  }
  
} 



const replay = function(mode, time){
  clearInterval(time);
  const myNode = window.document.getElementsByClassName("memoryContainer")[0];
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  
  myNode.classList.remove('memoryContainerShow')
  window.document.querySelector('.gameCompleteMessage').classList.remove('gameCompleteMessageShow');
  for (let i = 0; i < document.body.getElementsByClassName('memoryPiece').length; i++) {
    document.body.getElementsByClassName('memoryPiece')[i].disabled = false;
  }
  if (mode == 16) {
    
    window.document.getElementsByClassName('memoryContainer')[0].classList.remove('mode16');
    
  }
  
  setTimeout(function(){
    play(mode);
    window.document.getElementById('score').textContent = '0';
  }, 2500)
}

for (let i = 0; i < window.document.querySelectorAll('.buttons').length-1; i++) {
  window.document.getElementsByClassName('buttons')[i].addEventListener('click', function(){ 
    mode = event.target.dataset.mode;
    play(mode);
  })
}

window.document.getElementsByClassName('buttons')['restart'].addEventListener('click', function(){
  replay(window.mode, time);
});

window.document.getElementsByClassName('yesButton')[0].addEventListener('click', function(){
  replay(window.mode, time);
});
