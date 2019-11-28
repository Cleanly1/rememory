
for (var i = 0; i < window.document.querySelectorAll('.buttons').length-1; i++) {
  window.document.getElementsByClassName('buttons')[i].addEventListener('click', function(){ 
    mode = event.target.dataset.mode;
    play(mode);
  })
}



const shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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

const getRndInteger = function(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const makeArray = function(mode) {
  let memoryPieces = []
  
  for (var i = 1; i <= mode; i++) {
    memoryPieces.push({number: i, })
  }
  
  original = memoryPieces; 
  duplicate = original.slice();
  fullMemoryPieces = original.concat(duplicate);
  console.log(fullMemoryPieces)
  return shuffle(fullMemoryPieces);
}

// function getRandomColor() {
//   var letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }


const play = function(mode){ 
  let prevCard = "";
  let prevCardTargetInfo = "";
  let score = [];
  var index = 0;
  let theScoreCounter = window.document.getElementById('score').textContent; 
  window.document.getElementById('maxScore').textContent = mode;
  window.document.getElementsByClassName('displayScore')[0].style.display = 'initial';
  window.document.querySelector('.memoryContainer').classList.add('memoryContainerShow');
  window.document.querySelector('.menu').classList.add('menuAfterStart');
  const startButtons = window.document.getElementsByClassName('buttons')
  for (var i = 0; i < startButtons.length-1; i++) {
    startButtons[i].style.display = 'none';
  }
  window.document.getElementsByClassName('buttons')['restart'].disabled = false;
  
  
  
    const memoryPieces = makeArray(mode);
    memoryPieces.forEach(function(memoryPiece){
      const btns = document.createElement("button");
      btns.innerHTML = memoryPiece.number;
      btns.setAttribute('class', 'memoryPiece');
      // number.setAttribute('class', 'hej');
      btns.setAttribute('data-number', memoryPiece.number);
      btns.style.order = getRndInteger(0 , mode*2);
      document.body.getElementsByClassName('memoryContainer')[0].appendChild(btns);
      // document.body.getElementsByClassName('memoryPiece')[index].appendChild(number);
      index++;
  })
  if (mode == 16) {
    window.document.getElementsByClassName('memoryContainerShow')[0].style.width = '110vh';
    for (var i = 0; i < window.document.getElementsByClassName('memoryPiece').length; i++) {
      window.document.getElementsByClassName('memoryPiece')[i].style = 'margin:0 1%;'
      console.log()
    }
  }
  const numberOfMemoryPieces = window.document.querySelectorAll('.memoryPiece');

  console.log(numberOfMemoryPieces);
  for (var i = 0; i < numberOfMemoryPieces.length; i++) {
    numberOfMemoryPieces[i].addEventListener('click', function(){
      
      let theEventTarget = event.target; 
       
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
            score.push(1);
            window.document.getElementById('score').textContent = score.length;
            window.document.querySelectorAll('.memoryPiece').forEach(function(onePiece){
              if (onePiece.dataset.number === theEventTarget.dataset.number) {
                onePiece.disabled = true;
              }
            })
            
            if (score.length === mode) {
              window.document.querySelector('.gameCompleteMessage').classList.add('gameCompleteMessageShow');
            }
            // if (score.length > 3) {
            //   setInterval(function(){
            //     document.documentElement.style.setProperty('--accent-color', getRandomColor());
            //     document.documentElement.style.setProperty('--bg-color', getRandomColor());
            //   },400)
            // 
            // }
            
          }else if (prevCard !== currentCard) {
            setTimeout(function(){ 
              theEventTarget.classList.remove('memoryPieceText');
              prevCardTargetInfo.classList.remove('memoryPieceText');
              prevCardTargetInfo = "";
              prevCard = "";
            }, 800)
          }
      } 
        
    })
  }
  
} 



const replay = function(mode){
  const myNode = window.document.getElementsByClassName("memoryContainer")[0];
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  
  myNode.classList.remove('memoryContainerShow')
  window.document.querySelector('.gameCompleteMessage').classList.remove('gameCompleteMessageShow');
  for (var i = 0; i < document.body.getElementsByClassName('memoryPiece').length; i++) {
    document.body.getElementsByClassName('memoryPiece')[i].disabled = false;
  }
  
  setTimeout(function(){
    play(mode);
    window.document.getElementById('score').textContent = '0';
  }, 2500)
}
 

window.document.getElementsByClassName('buttons')['restart'].addEventListener('click', function(){
  replay(window.mode);
});
