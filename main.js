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

var cards = document.querySelectorAll('.memory-container > .group');
var tries = document.getElementById('tries');
var selectedCards = [],next = true,count = 0;
var cardOrders = shuffle(cards.length);
var cardToken = [];
var j = 0;

for(card of cards){
    card.style.order = cardOrders[j];
    card.onclick = function(){
        var tech = this.getAttribute('data-tech');
        var item = this;
        if(next){
            this.classList.add('flipped');
            cardToken.push(this);
            selectedCards.push(tech);
            console.log(cardToken);
            console.log(selectedCards);
            next = false;
        }else{
            next = true;
            if(selectedCards.indexOf(tech) > -1){
                this.classList.add('flipped');
                cardToken.push(this);
                pointer(cardToken,true);
            }else{
                this.classList.add('flipped');
                pointer(cards,true);
                setTimeout(function(){
                    item.classList.remove('flipped');
                    handleClass(selectedCards[0]);
                    pointer(cards,false);
                },700);
                count ++;
            }
            cardToken.length = 0;
            setTimeout(function(){
                selectedCards.length = 0;
            },700);
        }
        tries.textContent = count;
    };
    j++;
}
function handleClass(it){

    for(c of cards){
        if(c.getAttribute('data-tech') == it){
            c.classList.remove('flipped');
        }
    }
}
function shuffle(length){
    var cpt = 0;
    var arr = [];
    var rdm ;
    while(cpt < length){
        rdm = Math.floor(Math.random()*length);
        if(arr.indexOf(rdm) === -1){
            arr.push(rdm);
            cpt++;
        }
    }
    return arr;
}
function pointer(arr,bool){
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