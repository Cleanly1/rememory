let memoryPieces = [
  
]


const makeArray = function() {
  for (var i = 1; i < 9; i++) {
    
    memoryPieces.push({numbers: i})
  }
}

makeArray();

console.log(memoryPieces);





const divs = document.createElement("button");
const image = document.createElement("img");
const title =  document.createElement("p");
title.innerHTML = ingredient.name;
image.setAttribute('src', ingredient.image);
divs.setAttribute('class', 'fruitDivs');
divs.setAttribute('data-color', ingredient.color);
document.body.getElementsByClassName('ingredients')[0].appendChild(divs);
document.body.getElementsByClassName('fruitDivs')[i].appendChild(image);
document.body.getElementsByClassName('fruitDivs')[i].appendChild(title);