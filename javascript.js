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
	Game.PickRandomMaxRange()
	Game.PickAnswer();
	Game.CreateButtons();
};

Game.PickRandomMaxRange = function() {
	// Pick an upper range between 5 and 10
	Game.Range.Max = 5 + Math.floor(Math.random() * 6);	// random() returns between 0 and 0.99 (never 1)
};

Game.CreateButtons = function() {
	var div = $j('div#buttonSelectors');
	var html = '<button class="btnGuess" type="button" onclick="Game.GuessAnswer(1)">1</button>';
	for (var num = Game.Range.Min; num <= Game.Range.Max; num++)
		div.append(html.replace(/1/g, num.toString()));
};
	
Game.PickAnswer = function() {
	// Math.random() provides a number between 0 and up to but not including 1
	var diff = (Game.Range.Max + 1) - Game.Range.Min;
	Game.Answer = Math.floor(Game.Range.Min + (Math.random() * diff));
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