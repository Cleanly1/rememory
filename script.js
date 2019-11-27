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
  window.document.querySelector('.memoryContainer').classList.add('memoryContainerShow');
  window.document.querySelector('.menu').classList.add('menuAfterStart');
  window.document.getElementsByClassName('buttons')['start'].style.display = 'none';
  window.document.getElementsByClassName('buttons')['restart'].disabled = false;
  var index = 0;
    const memoryPieces = makeArray();
    memoryPieces.forEach(function(memoryPiece){
    const divs = document.createElement("div");
    const title =  document.createElement("p");
    title.innerHTML = memoryPiece.number;
    divs.setAttribute('class', 'memoryPiece');
    title.setAttribute('class', 'hej');
    divs.setAttribute('data-number', memoryPiece.number);
    document.body.getElementsByClassName('memoryContainer')[0].appendChild(divs);
    document.body.getElementsByClassName('memoryPiece')[index].appendChild(title);
    index++;
  })
  let prevCard = "";
  let prevCardTargetInfo = "";
  const numberOfMemoryPieces = window.document.getElementsByClassName('memoryPiece');

  for (var i = 0; i < numberOfMemoryPieces.length; i++) {
    numberOfMemoryPieces[i].addEventListener('click', function(){
      
      let theEventTarget = event.target;
      
      if (theEventTarget.className != 'memoryPiece') {
        
        theEventTarget = event.path[1];
        
      }
      if (theEventTarget.className === 'memoryPiece') {
        // console.log(theEventTarget.getElementsByClassName('hej')[0].classList.add('hej1'))
        theEventTarget.classList.add('hej1');
      }
      
      const currentCard = theEventTarget.dataset.number;
      if (prevCard === "") {
        prevCardTargetInfo = theEventTarget;
        prevCard = currentCard;
      }else if (prevCard !== "") {
          if (prevCard === currentCard) {
            console.log(prevCardTargetInfo)
            prevCard = "";
            prevCardTargetInfo = "";
            
          }else if (prevCard !== currentCard) {
            console.log(currentCard) 
            setTimeout(function(){
              theEventTarget.classList.remove('hej1');
              prevCardTargetInfo.classList.remove('hej1');
              prevCardTargetInfo = "";
              prevCard = "";
            },1000)
          }
      } 
      console.log(prevCard)
      
      // console.log(event)
    })
  }
}

const replay = function(){
  const myNode = window.document.getElementsByClassName("memoryContainer")[0];
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  setTimeout(function(){
    play();
  }, 1000)
}





// console.log(memoryPieces);
window.document.getElementsByClassName('buttons')['start'].addEventListener('click', function(){
  play();
})

window.document.getElementsByClassName('buttons')['restart'].addEventListener('click', function(){
  replay();
})








