var buttonColors = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []

var gameStarted = false
var level = 0

function nextSequence() {
  userClickedPattern = []
  gameStarted = true
  var randNum = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randNum];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColor)
  level++;
  $("#level-title").text("Level " + level)

}


$(".btn").click(function(event) {
  // console.log(this.id)
  var userChosenColor = this.id
  userClickedPattern.push(userChosenColor)
  animatePress(userChosenColor)
  makeSound(userChosenColor)
  checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("Correct")

      if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function() {
          nextSequence();

        }, 1000);
        }
      }

    else {
      $("body").addClass("game-over");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 100);
      makeSound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver()
      console.log("Wrong")


    }

}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = False;
}


function animatePress(currentColor) {
  console.log(currentColor)
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)

}

$(document).keydown(function(event) {
  if (level === 0) {
    gameStarted = true
    nextSequence()
  }


})

function makeSound(key) {
  var audio = new Audio("sounds/"+key+".mp3")
  audio.play()

}
