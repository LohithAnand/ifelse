IE.GameOver = function(game){};
IE.GameOver.prototype = {
    init: function(score) {
      this._score = score;
    },
  	create: function(){
  		this.add.sprite(0, 0, 'background');
  		this.add.sprite(20, 20, 'score-bg');
      this.add.sprite(150, 250, 'game-over');

      this.add.button(230, 550, 'reload', this.startGame, this);
      this.add.button(230, 720, 'exit', this.exitGame, this);

  		var fontStyle = { font: "35px Arial", fill: "#FF0000", stroke: "#333", strokeThickness: 3, align: "center" };
  		this.add.text(60, 25, this._score, fontStyle);
  	},
  	startGame: function() {
  		// start the Game state with scores cleared
		  this.state.start('Game',true,false,true);
  	},
    exitGame: function() {
      // redirect to main menu
      this.state.start('MainMenu',true,false);
    }
};
