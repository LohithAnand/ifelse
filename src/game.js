IE.Game = function(game){
  this._exprText = '';
  this._scoreText = null;
	this._score = 0;
  this._expression = {};
  this._timerStart = 0;
  this._fontStyle = { font: "80px Arial", fill: "#FFBC6B", stroke: "#333", strokeThickness: 5, align: "center" };
};
IE.Game.prototype = {
  init: function(clear) {
		if(clear) {
			this._score = 0;
      this._timerStart = 0;
		}
	},
  create: function() {
    this.add.sprite(0, 0, 'background');

    this._expression = this.getRandomExpression();
    this._exprText = this.showExpression(this._expression);

    //if else buttons
    this.add.button(30, 760, 'no', this.elseHandler, this);
    this.add.button(430, 760, 'yes', this.ifHandler, this);

    // initialize score
    this.add.image(20, 20, 'score-bg');
    // initialize the score text with 0
		var fontStyle = { font: "35px Arial", fill: "#FF0000", stroke: "#333", strokeThickness: 3, align: "center" };
		this._scoreText = this.add.text(60, 25, "0", fontStyle);

    this._timer = this.add.sprite(200, 20, 'timer');
		this._timer.maxWidth = this._timer.width;
  },

  update: function() {
    if(this._timerStart) {
			var endTime = getCurrentTime();
			var elapsedTime = Math.abs((endTime - this._timerStart)/1000);
			if(elapsedTime < 5) {
				this._timer.width = this._timer.maxWidth - (elapsedTime/3 * this._timer.maxWidth);
			} else {
				this._timer.width = 0;
				this.state.start('GameOver', true, false, this._score);
			}
		}
		this.updateScore();
	},

	updateScore: function() {
		this._scoreText.setText(this._score);
	},

  updateExpression: function(expr) {
    this._exprText.assignmentsText.setText(expr.assignments);
    this._exprText.conditionText.setText(expr.conditionExpr);
  },

  next: function() {
    this._score++;
    this._expression = this.getRandomExpression();
    this.updateExpression(this._expression);
    this._timerStart = getCurrentTime();
  },

  ifHandler: function() {
    if(this._expression.resolve) {
      this.next();
    } else {
      this.gameOver();
    }
  },

  elseHandler: function() {
    if(this._expression.resolve) {
      this.gameOver();
    } else {
      this.next();
    }
  },

  gameOver: function() {
    this.state.start('GameOver', true, false, this._score);
  },

  showExpression: function(expr) {
    var assignmentsText = this.add.text(50, 280, expr.assignments, this._fontStyle);
    var conditionText = this.add.text(220, 430, expr.conditionExpr, this._fontStyle);
    return {
      'assignmentsText' : assignmentsText,
      'conditionText' : conditionText
    };
  },
  getRandomExpression: function() {
    var operands = ['x', 'y'],
    operators = ['==', '!=', '<', '>', '<=', '>='],
    operandValues = [], operator = '',
    condition = '', assignments = '';

    var min = -999, max = 999; //random numbers range
    function getRandomNumber() {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomOperator() {
        return operators[Math.floor(Math.random()*operators.length)];
    }

    function getZeroOneRandom() {
        return Math.round(Math.random());
    }

    function getRandomFirstVariable() {
        return operands[getZeroOneRandom()];
    }

    //random first and second variables
    var firstVariable = getRandomFirstVariable();
    var secondVariable = 'y';
    if(firstVariable === secondVariable) {
      secondVariable = 'x';
    }

    //random operator
    operator = getRandomOperator();

    //random operand values
    operands.forEach(function(curValue) {
      operandValues[curValue] = getRandomNumber();
    });
    var firstVariableValue = operandValues[firstVariable];
    var secondVariableValue = operandValues[secondVariable];

    //assignment statement
    if(getZeroOneRandom() === 0) {
      assignments += firstVariable + '=' + firstVariableValue  + ', ';
      assignments += secondVariable + '=' + secondVariableValue + ';';
    } else {
      assignments += secondVariable + '=' + secondVariableValue + ', ';
      assignments += firstVariable + '=' + firstVariableValue  + ';';
    }
    //condition statement
    condition += firstVariable + ' ' + operator + ' ' + secondVariable;

    //own perform operation, to avoid use of eval - http://stackoverflow.com/a/86580
    var performOperation = {
      '==' : function(f,s) {
        return f == s;
      },
      '!=' : function(f,s) {
        return f != s;
      },
      '<' : function(f,s) {
        return f < s;
      },
      '>' : function(f,s) {
        return f > s;
      },
      '<=' : function(f,s) {
        return f <= s;
      },
      '>=' : function(f,s) {
        return f >= s;
      }
    };
    return {
      'assignments' : assignments,
      'conditionExpr' : condition,
      'resolve' : performOperation[operator](firstVariableValue,secondVariableValue)
    };
  }
};

function getCurrentTime() {
	var currentDate = new Date();
	return currentDate.getTime();
}
