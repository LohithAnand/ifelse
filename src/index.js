(function() {
	// initialize the framework
	var game = new Phaser.Game(640, 960, Phaser.AUTO, 'game');
	// add game states
	game.state.add('Boot', IE.Boot);
	game.state.add('Preloader', IE.Preloader);
	game.state.add('MainMenu', IE.MainMenu);
	game.state.add('Game', IE.Game);
	game.state.add('GameOver', IE.GameOver);
	// start the Boot state
	game.state.start('Boot');
})();
