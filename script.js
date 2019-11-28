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

const makeArray = function() {
  let memoryPieces = []
  for (var i = 1; i < 9; i++) {
    memoryPieces.push({number: i, })
  }
  
  original = memoryPieces; 
  duplicate = original.slice();
  fullMemoryPieces = original.concat(duplicate);
  
  return shuffle(fullMemoryPieces);
}


const play = function(){
  // setTimeout(function(){
  //   for (var i = 0; i < document.body.querySelectorAll('.memoryPiece').length; i++) {
  //     document.body.querySelectorAll('.memoryPiece')[i].classList.add('memoryPieceShow');
  //   }  
  // },1000)
  let prevCard = "";
  let prevCardTargetInfo = "";
  let score = [];
  var index = 0;
  let theScoreCounter = window.document.getElementById('score').textContent; 
  window.document.getElementsByClassName('displayScore')[0].style.display = 'initial';
  window.document.querySelector('.memoryContainer').classList.add('memoryContainerShow');
  window.document.querySelector('.menu').classList.add('menuAfterStart');
  window.document.getElementsByClassName('buttons')['start'].style.display = 'none';
  window.document.getElementsByClassName('buttons')['restart'].disabled = false;
  
    const memoryPieces = makeArray();
    memoryPieces.forEach(function(memoryPiece){
    const btns = document.createElement("button");
    btns.innerHTML = memoryPiece.number;
    btns.setAttribute('class', 'memoryPiece');
    // number.setAttribute('class', 'hej');
    btns.setAttribute('data-number', memoryPiece.number);
    document.body.getElementsByClassName('memoryContainer')[0].appendChild(btns);
    // document.body.getElementsByClassName('memoryPiece')[index].appendChild(number);
    index++;
  })
  
  const numberOfMemoryPieces = window.document.querySelectorAll('.memoryPiece');

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
            console.log(prevCardTargetInfo)
            prevCard = "";
            prevCardTargetInfo = "";
            score.push(1);
            window.document.getElementById('score').textContent = score.length;
            window.document.querySelectorAll('.memoryPiece').forEach(function(onePiece){
              if (onePiece.dataset.number === theEventTarget.dataset.number) {
                onePiece.disabled = true;
              }
            })
            
            if (score.length === 8) {
              window.document.querySelector('.gameCompleteMessage').classList.add('gameCompleteMessageShow');
            }
            
          }else if (prevCard !== currentCard) {
            console.log(currentCard) 
            setTimeout(function(){
              theEventTarget.classList.remove('memoryPieceText');
              prevCardTargetInfo.classList.remove('memoryPieceText');
              prevCardTargetInfo = "";
              prevCard = "";
            }, 800)
          }
      } 
      console.log(prevCard)
       
    })
  }
}

const replay = function(){
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
    play();
    window.document.getElementById('score').textContent = '0';
  }, 2500)
}

window.document.getElementsByClassName('buttons')['start'].addEventListener('click', function(){ 
  play();
})

window.document.getElementsByClassName('buttons')['restart'].addEventListener('click', function(){
  replay();
})