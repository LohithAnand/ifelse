IE.GameOver = function(game){};
IE.GameOver.prototype = {
    init: function(score) {
      this._score = score;
    },
  	create: function(){
  		this.add.sprite(0, 0, 'background');
  		this.add.sprite(10, 5, 'score-bg');
      this.add.sprite(30, 250, 'game-over');

      this.add.button(150, 550, 'button-pause', this.startGame, this);
      this.add.button(150, 700, 'button-pause', this.exitGame, this);

  		var fontStyle = { font: "35px Arial", fill: "#ffffff", stroke: "#333", strokeThickness: 3, align: "center" };
  		this.add.text(120, 22, this._score, fontStyle);
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
