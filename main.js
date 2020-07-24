/*Check for localStorage*/
if(localStorage.getItem('name') !== null){
    document.getElementById('name').textContent = localStorage.getItem('name');
    document.querySelector('.start').remove();
}
else{
    document.getElementById('start').onclick = function(){
        var name = prompt('Enter Your Name');
        if( name== null || name.trim() == ""){
            name = "Player";
        }
        document.getElementById('name').textContent = name;
        localStorage.setItem('name',name);
        document.querySelector('.start').remove();
    };
}

/* START GAME*/

var cards = document.querySelectorAll('.memory-container > .group'), tries = document.getElementById('tries'), selectedCards = [], matchedCards = [],cardOrders = shuffle(cards.length), j = 0,triescounter = 0;

window.onload = function(){

for(kard of cards){
  kard.classList.add('flipped');
  pointerEvent(cards,true);
}

setTimeout(function(){
  for(kard of cards){
    kard.classList.remove('flipped');
    pointerEvent(cards,false);
  }
},1000);
};

for(card of cards){
    card.style.order = cardOrders[j];
    card.onclick = function(){
      this.classList.add('flipped');
      selectedCards.push(this);
      //we have  two flipped Card
      if(selectedCards.length === 2){
            pointerEvent(cards,true);
            if(selectedCards[0].getAttribute('data-tech') === selectedCards[1].getAttribute('data-tech') ){
              matchedCards.push(selectedCards[0]);
              matchedCards.push(selectedCards[1]);
              if(matchedCards.length === cards.length){
                  setTimeout(function(){
                    gameFinished();
                  },500);
              }
            }else{
              setTimeout(function(){
                selectedCards[0].classList.remove('flipped');
                selectedCards[1].classList.remove('flipped');
              },700);
              triescounter++;
              tries.textContent = triescounter;
            }
            setTimeout(function(){
                pointerEvent(cards,false);
                pointerEvent(matchedCards,true);
                selectedCards.length = 0;
            },700);
      }
    };
    j++;
}
function shuffle(length){
    var cpt = 0,arr = [],rdm;
    while(cpt < length){
        rdm = Math.floor(Math.random()*length);
        if(arr.indexOf(rdm) === -1){
            arr.push(rdm);
            cpt++;
        }
    }
    return arr;
}
function pointerEvent(arr,bool){
    if(bool === true){
        for(el of arr){
            el.style.pointerEvents = 'none';
        }
    }else{
        for(el of arr){
            el.style.pointerEvents = 'all';
        }
    }
}
function gameFinished(){
  var finished = document.createElement('div');
      finished.classList.add('game-finished');
  var restart = document.createElement('button');
      restart.appendChild(document.createTextNode('Restart'));
      restart.onclick = function(){
        window.location.reload();
      };
      finished.appendChild(restart);
      document.body.appendChild(finished);
}
