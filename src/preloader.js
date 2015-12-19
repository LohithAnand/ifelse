IE.Preloader = function(game){
	// define width and height of the game
	IE.GAME_WIDTH = 640;
	IE.GAME_HEIGHT = 960;
};
IE.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite((IE.GAME_WIDTH-311)/2, (IE.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		// load images
		this.load.image('background', 'img/background.png');
		this.load.image('floor', 'img/floor.png');
		this.load.image('monster-cover', 'img/monster-cover.png');
		this.load.image('title', 'img/title.png');
		this.load.image('game-over', 'img/gameover.png');
		this.load.image('score-bg', 'img/score-bg.png');
		this.load.image('button-pause', 'img/button-pause.png');
		this.load.image('yes', 'img/yes.png');
		this.load.image('no', 'img/no.png');
		// load spritesheets
		this.load.spritesheet('candy', 'img/candy.png', 82, 98);
		this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);
		this.load.image('button-start', 'img/button-start.png');
	},
	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
};
