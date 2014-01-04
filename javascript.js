// javascript.js

var Game = {
	Answer: 0,
	Guess: 0,
	Round: 0,
	Range: {
		Min: 1,
		Max: 5
	}
};

Game.NewGame = function() {
	// Set defaults;
	Game.Answer = 0;
	Game.Guess = 0;
	Game.Round = 0;
	Game.Range.Min = 1;
	Game.Range.Max = 5;
	// Start the first round
	Game.NewRound();
};

Game.NewRound = function() {
	Game.Round++;
	Game.HideMainMenu();
	Game.ShowGame();
	Game.PickRandomMaxRange();
	Game.PickAnswer();
	Game.CreateButtons();
	Game.UpdateRoundText();
};

Game.HideMainMenu = function() {
	$j('#divMainMenu').addClass('hidden');
};

Game.ShowGame = function() {
	$j('#divGameContents').removeClass('hidden');
};

Game.PickRandomMaxRange = function() {
	// Pick an upper range between 5 and 10
	Game.Range.Max = 5 + Math.floor(Math.random() * 6);	// random() returns between 0 and 0.99 (never 1)
};

Game.CreateButtons = function() {
	var div = $j('div#buttonSelectors');
	var html = '<button id="btnGuess1" class="btnGuess" type="button" onclick="Game.GuessAnswer(1)">1</button>';
	div.addClass('hidden');
	var divHTML = '';
	for (var num = Game.Range.Min; num <= Game.Range.Max; num++)
		divHTML += html.replace(/1/g, num.toString());
	div.html(divHTML);
	div.removeClass('hidden');
};

Game.UpdateRoundText = function() {
	Game.divGameMsg = $j('#divGameMessage');
	$j('#spanRoundNum').text(Game.Round.toString());
	$j('#spanMinRange').text(Game.Range.Min.toString());
	$j('#spanMaxRange').text(Game.Range.Max.toString());
	$j('#divGameMessage').text('').addClass('hidden');
};
	
Game.PickAnswer = function() {
	// Math.random() provides a number between 0 and up to but not including 1
	var diff = (Game.Range.Max + 1) - Game.Range.Min;
	Game.Answer = Math.floor(Game.Range.Min + (Math.random() * diff));
};

Game.GuessAnswer = function(guess) {
	Game.Guess = guess;
	
	// hide button
	var btn = $j('#btnGuess'+guess.toString());
	btn.attr('onclick', '');
	btn.fadeOut(900, function() {
		btn
			.css ('display','')
			.css ('visibility','hidden');
	});
	
	if (Game.Guess === Game.Answer)
		Game.FoundAnswer();
	else
		Game.IncorrectGuess();
};


Game.ShowMessage = function(msg, style) {
	var fadeDuration = 900;	// milliseconds
	Game.divGameMsg
		.attr('class', '')
		.addClass('hidden')
		.addClass(style)
		.text(msg)
		.fadeIn(fadeDuration, function() {
			setTimeout(function() {
				Game.divGameMsg.fadeOut(fadeDuration, function() {
					Game.divGameMsg.addClass('hidden');
				});
			}, fadeDuration);
		});
};

Game.FoundAnswer = function() {
	Game.ShowMessage('You found the answer!', 'good');
	if (confirm('want to play again?'))
		Game.NewRound();
	else
		Game.Over();
};

Game.IncorrectGuess = function() {
	Game.ShowMessage('Incorrect, try again', 'bad');
};

Game.Over = function() {
	$j('#divGameContents').addClass('hidden');
	$j('#divMainMenu').removeClass('hidden');
};
