//game variables
//words to choose from
var wordListing = ["holly", "moonriver", "audrey", "capote", "lulamae", "paul"]

//counters
var winsCounter = 0;
var guessesCounter = 20;

var wordSelected = "";
var lettersOfSelectedWord = [];
var numberOfBlanks = 0;
var blankLines = [];
var wrongLetters = [];


//run a function to start the game and select a word from the var wordListing
//word turned into letters and blank spaces created using a for loop
//player has 20 guesses to attempt to solve the word before the game ends

function gameStart(){

    wrongLetters = [];
    guessesCounter = 20;
    blankLines = [];

    wordSelected = wordListing[Math.floor(Math.random() * wordListing.length)];
    lettersOfSelectedWord = wordSelected.split(""); 
    numberOfBlanks = lettersOfSelectedWord.length;
    console.log(wordSelected);
    console.log(numberOfBlanks);

    for(var i=0; i < numberOfBlanks; i++){
        blankLines.push("_");
    }
    console.log(blankLines);
    document.getElementById("blank-line").innerText = blankLines.join(" ");
    document.getElementById("guesses-remain").innerText =guessesCounter;


}



//running a for loop with an if/else conditional to iterate through the 
//letters in the array.  
function letterMatch(selected){

    var letterSuccess = false;

    for(var j=0; j < numberOfBlanks; j++){
        if(wordSelected[j] === selected){
            letterSuccess = true;
        }
        
    }

    if(letterSuccess){
        for(k=0; k < numberOfBlanks; k++){
            if(wordSelected[k] === wordSelected[wordSelected.indexOf(selected)]){
                blankLines[k] = selected;
            }
        }
    
    }

    else{
        guessesCounter --;
        wrongLetters.push(selected);
        document.getElementById("incorrect-guess").innerText= wrongLetters.join(", ");

    }
}

//complete the round and switch the word 
function switchWord(){
    document.getElementById("blank-line").innerText = blankLines.join(" ");
    document.getElementById("guesses-remain").innerText = guessesCounter;
    // document.getElementByIdi("incorrect-guess").innerText = wrongLetters.join(" ");

    if(lettersOfSelectedWord.join(" ") === blankLines.join(" ")){
        winsCounter++;
        setTimeout(function() {
            gameStart();
            alert("Didn't I tell you that this was a wonderful place!");
        }, 200);
        document.getElementById("counter").innerText = winsCounter;
        
    }
    else if (guessesCounter === 0) {
        alert("If we're going to be friends let's get one thing straight right now.  I hate snoops!");
        gameStart();
    }
}


gameStart();
document.onkeyup = function(event){
    var letterTyped = String.fromCharCode(event.keyCode).toLowerCase();
    letterMatch(letterTyped);
    switchWord();
}

