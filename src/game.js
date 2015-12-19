IE.Game = function(game){
  this._exprText = '';
  this._score = 0;
  this._expression = {};
  this._fontStyle = { font: "80px Arial", fill: "#FFBC6B", stroke: "#333", strokeThickness: 5, align: "center" };
};
IE.Game.prototype = {
  init: function(clear) {
		if(clear) {
			this._score = 0;
		}
	},
  create: function() {
    this.add.sprite(0, 0, 'background');

    this._expression = this.getRandomExpression();
    this._exprText = this.showExpression(this._expression);

    //if else buttons
    this.add.button(IE.GAME_WIDTH-(IE.GAME_WIDTH - 30), IE.GAME_HEIGHT - 200, 'yes', this.ifHandler, this);
    this.add.button(IE.GAME_WIDTH-(IE.GAME_WIDTH - 330), IE.GAME_HEIGHT - 200, 'no', this.elseHandler, this);
  },

  updateExpression: function(expr) {
    this._exprText.assignmentsText.setText(expr.assignments);
    this._exprText.conditionText.setText(expr.conditionExpr);
  },

  next: function() {
    this._score++;
    this._expression = this.getRandomExpression();
    this.updateExpression(this._expression);
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

  update: function() {

  },
  showExpression: function(expr) {
    var assignmentsText = this.add.text(55, 280, expr.assignments, this._fontStyle);
    var conditionText = this.add.text(220, 380, expr.conditionExpr, this._fontStyle);
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
