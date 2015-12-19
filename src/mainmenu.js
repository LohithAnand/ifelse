IE.MainMenu = function(game){};
IE.MainMenu.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, 0, 'background');
		//this.add.sprite(-130, IE.GAME_HEIGHT-514, 'monster-cover');
		this.add.sprite((IE.GAME_WIDTH-395)/2, 60, 'title');
		// add the button that will start the game
		this.add.button(220, 550, 'button-start', this.startGame, this);
	},
	startGame: function() {
		// start the Game state
		this.state.start('Game');
	}
};
