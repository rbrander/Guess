// javascript.js

var Game = {
	Answer: 0,
	Guess: 0,
	Range: {
		Min: 1,
		Max: 5
	}
};

Game.NewGame = function() {
	Game.PickAnswer();
};
	
Game.PickAnswer = function() {
	// Math.random() provides a number between 0 and up to but not including 1
	var diff = (Game.Range.Max + 1) - Game.Range.Min;
	Game.Answer = Math.floor(Game.Range.Min + (Math.random() * diff));
console.log("Game.Answer = " + Game.Answer);
};

Game.GuessAnswer = function(guess) {
	Game.Guess = guess;
	if (Game.Guess === Game.Answer)
		Game.FoundAnswer();
	else
		Game.IncorrectGuess();
};

Game.FoundAnswer = function() {
	alert('you found the answer!');
	if (confirm('want to play again?'))
		Game.NewGame();
	else
		Game.Over();
};

Game.IncorrectGuess = function() {
	alert('incorrect guess: ' + Game.Guess);
};

Game.Over = function() {
	$j('#divGameContents').hide();
};

$j(function() {
	Game.NewGame();
});