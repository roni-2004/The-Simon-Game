let randomColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;
function nextSequence(){
    userPattern = [];
    level++;
    $("h1").text("Level " + level);
    let randomNumber = Math.floor((Math.random() * 3));
    let chosenColor = randomColors[randomNumber];
    gamePattern.push(chosenColor);
    $("#" + chosenColor).fadeOut(100).fadeIn(100);
    let sound = new Audio("sounds/" + chosenColor + ".mp3");
    sound.play();
    
}    

$(".btn").click(function(){
    let idOfClicked = $(this).attr("id");
    userPattern.push(idOfClicked);
    playSound(idOfClicked);
    animatePress(idOfClicked);
    checkAnswer(userPattern.length - 1);
})


function playSound(name){
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

$(document).on("keydown",function(){
    if(!started){
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
    }
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userPattern[currentLevel]){
        console.log("success");
       if (userPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();},1000);
        }
        else {
            console.log("wrong");
        }
       }
    else{
        let wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        $("*").addClass("game-over");
        startOver();
        setTimeout(function(){
        $("*").removeClass("game-over");},100);
        }
}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}

