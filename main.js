var // variables declaration
    container  = document.querySelector(".container"),
    images = [
    "bootstrap.png",
    "html5.png",
    "js.png",
    "mysql.png",
    "php.png",
    "vuejs.png",
    "bootstrap.png",
    "html5.png",
    "js.png",
    "mysql.png",
    "php.png",
    "vuejs.png"
    ],
    i,
    div,
    div2,
    MainDiv,
    img,
    start = true,
    selected = [],
    cpt = 0;

// functions implementation
function createGame(images){
    for(i = 0;i<images.length;i++){
        //div that group the subdivs
        MainDiv = document.createElement("div");
        MainDiv.classList.add('group-div');
        // div that contains the image
       div = document.createElement("div");
       div.classList.add('back-img');
        //the image
        img = document.createElement("img");
        img.setAttribute('src','./images/' + images[i]);
        //apend the image to div
        div.appendChild(img);
       // div that user will see
       div2 = document.createElement("div");
       div2.classList.add('front-img');
       div2.setAttribute('data-name',img.getAttribute('src').replace(".png","").replace("./images/",""));
       //firing an event
       div2.onclick = function(e){
           if(start == true){
             selected.push(this.getAttribute('data-name'));
             this.classList.add('hide');
             this.style.pointerEvents = "none";
             start = false
           }else{
               if(selected.indexOf(this.getAttribute('data-name'))> -1){
                   this.classList.add('hide');
                   this.style.pointerEvents = "none";
                   cpt = 0;
                   start = true;
               }else{
                    cpt++;
                    this.classList.add('hide');
                    var x = this.classList;
                    setTimeout(function(){
                      x.remove('hide');      
                    },1000);
                    if(cpt === 3){
                        alert("you have lost");
                        window.location.reload();
                        selected = [];
                        start = true;
                        cpt = 0 ;
                    }
               }
          }
       }
       //appending the divs to the maindiv
       MainDiv.appendChild(div);
       MainDiv.appendChild(div2);
       //appending the main div to the container
       container.appendChild(MainDiv);
    }
}
  // shuffle the images again
function shuffle(){
  var 
      i,
      indexed = [],
      newImage = [],
      stop = false;
    while(!stop){
         i = Math.floor(Math.random()*12) ;
         if(indexed.indexOf(i) === -1){
            indexed.push(i);
            newImage.push(images[i]);  
         }
         if(indexed.length === 12){
             stop = true;
         }
    }
    return newImage;  
}
// create the game
images = shuffle();
createGame(images);