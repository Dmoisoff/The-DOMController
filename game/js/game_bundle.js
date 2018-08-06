/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/board.js":
/*!*********************!*\
  !*** ./js/board.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MoveError = __webpack_require__(/*! ./moveError */ "./js/moveError.js");

var Board = function () {
  function Board() {
    _classCallCheck(this, Board);

    this.grid = Board.makeGrid();
  }

  _createClass(Board, [{
    key: 'isEmptyPos',
    value: function isEmptyPos(pos) {
      if (!Board.isValidPos(pos)) {
        throw new MoveError('You have selected an invalid position, please close the alert to continue');
      }

      return this.grid[pos[0]][pos[1]] === null;
    }
  }, {
    key: 'isOver',
    value: function isOver() {
      if (this.winner() != null) {
        return true;
      }

      for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
        for (var colIdx = 0; colIdx < 3; colIdx++) {
          if (this.isEmptyPos([rowIdx, colIdx])) {
            return false;
          }
        }
      }

      return true;
    }
  }, {
    key: 'placeMark',
    value: function placeMark(pos, mark) {
      if (!this.isEmptyPos(pos)) {
        throw new MoveError('The square you have selected has already been taken. Please close the alert to continue');
      }

      this.grid[pos[0]][pos[1]] = mark;
    }
  }, {
    key: 'print',
    value: function print() {
      var strs = [];
      for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
        var marks = [];
        for (var colIdx = 0; colIdx < 3; colIdx++) {
          marks.push(this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : " ");
        }
        strs.push(marks.join('|') + '\n');
      }

      console.log(strs.join('-----\n'));
    }
  }, {
    key: 'winner',
    value: function winner() {
      var posSeqs = [[[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]], [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]], [[0, 0], [1, 1], [2, 2]], [[2, 0], [1, 1], [0, 2]]];

      for (var i = 0; i < posSeqs.length; i++) {
        var winner = this.winnerHelper(posSeqs[i]);
        if (winner != null) {
          return winner;
        }
      }

      return null;
    }
  }, {
    key: 'winnerHelper',
    value: function winnerHelper(posSeq) {
      for (var markIdx = 0; markIdx < Board.marks.length; markIdx++) {
        var targetMark = Board.marks[markIdx];
        var winner = true;
        for (var posIdx = 0; posIdx < 3; posIdx++) {
          var pos = posSeq[posIdx];
          var mark = this.grid[pos[0]][pos[1]];

          if (mark != targetMark) {
            winner = false;
          }
        }

        if (winner) {
          return targetMark;
        }
      }

      return null;
    }
  }], [{
    key: 'isValidPos',
    value: function isValidPos(pos) {
      return 0 <= pos[0] && pos[0] < 3 && 0 <= pos[1] && pos[1] < 3;
    }
  }, {
    key: 'makeGrid',
    value: function makeGrid() {
      var grid = [];

      for (var i = 0; i < 3; i++) {
        grid.push([]);
        for (var j = 0; j < 3; j++) {
          grid[i].push(null);
        }
      }

      return grid;
    }
  }]);

  return Board;
}();

Board.marks = ['x', 'o'];

module.exports = Board;

/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = __webpack_require__(/*! ./board */ "./js/board.js");
var MoveError = __webpack_require__(/*! ./moveError */ "./js/moveError.js");

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.board = new Board();
    this.currentPlayer = Board.marks[0];
  }

  _createClass(Game, [{
    key: "isOver",
    value: function isOver() {
      return this.board.isOver();
    }
  }, {
    key: "playMove",
    value: function playMove(pos) {
      if (typeof pos === 'string') {
        pos = pos.split(',');
      }
      this.board.placeMark(pos, this.currentPlayer);
      this.swapTurn();
    }
  }, {
    key: "promptMove",
    value: function promptMove(reader, callback) {
      var game = this;

      this.board.print();
      console.log("Current Turn: " + this.currentPlayer);

      reader.question('Enter rowIdx: ', function (rowIdxStr) {
        var rowIdx = parseInt(rowIdxStr);
        reader.question('Enter colIdx: ', function (colIdxStr) {
          var colIdx = parseInt(colIdxStr);
          callback([rowIdx, colIdx]);
        });
      });
    }
  }, {
    key: "run",
    value: function run(reader, gameCompletionCallback) {
      var _this = this;

      this.promptMove(reader, function (move) {
        try {
          _this.playMove(move);
        } catch (e) {
          if (e instanceof MoveError) {
            console.log(e.msg);
          } else {
            throw e;
          }
        }

        if (_this.isOver()) {
          _this.board.print();
          if (_this.winner()) {
            console.log(_this.winner() + " has won!");
          } else {
            console.log('NO ONE WINS!');
          }
          gameCompletionCallback();
        } else {
          _this.run(reader, gameCompletionCallback);
        }
      });
    }
  }, {
    key: "swapTurn",
    value: function swapTurn() {
      if (this.currentPlayer === Board.marks[0]) {
        this.currentPlayer = Board.marks[1];
      } else {
        this.currentPlayer = Board.marks[0];
      }
    }
  }, {
    key: "winner",
    value: function winner() {
      return this.board.winner();
    }
  }]);

  return Game;
}();

module.exports = Game;

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var View = __webpack_require__(/*! ./ttt-view.js */ "./js/ttt-view.js");
var Game = __webpack_require__(/*! ./game.js */ "./js/game.js");

$l(function () {
  var game = new Game();
  var view = new View(game, $l('.ttt'));
});

/***/ }),

/***/ "./js/moveError.js":
/*!*************************!*\
  !*** ./js/moveError.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MoveError = function MoveError(msg) {
  this.msg = msg;
};
module.exports = MoveError;

/***/ }),

/***/ "./js/ttt-view.js":
/*!************************!*\
  !*** ./js/ttt-view.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(/*! ./moveError.js */ "./js/moveError.js");

var View = function () {
  function View(game, $el) {
    _classCallCheck(this, View);

    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  _createClass(View, [{
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      if (this.game.isOver()) {
        $l('ul').off('click', 'li');
        $l('body').append('<input type="submit" name="" value="Restart Game"');
        $l('body').append('<h2 class=\'restart\'>Click here to play again <i class="far fa-smile-beam"></i></h2>');$l('.restart').on('click', function () {
          document.location.reload();
        });
      } else {
        $l('li').on('click', function (e) {
          var $square = $l(e.currentTarget);
          _this.makeMove($square);
        });
      }
    }
  }, {
    key: 'makeMove',
    value: function makeMove($square) {
      try {
        var currentPlayer = this.game.currentPlayer;
        this.game.playMove($square.data('pos'));
        $square.addClass(currentPlayer);
        $square.append(currentPlayer);
      } catch (err) {
        alert(err.msg);
      }
      if (this.game.isOver()) {
        $l('li').attr("style", "background-color: white; color: red");
        var winner = this.game.winner();
        if (winner) {
          $l('li.' + winner).attr("style", "background-color: green; color: white");
          $l('body').append('<h2>You win, ' + winner + '!</h2>');
        } else {
          $l('body').append('<h2>It\'s a draw!</h2>');
        }
        this.bindEvents();
      }
    }
  }, {
    key: 'setupBoard',
    value: function setupBoard() {
      var board = this.game.board;
      this.$el.append('<ul class="board"></ul>');
      for (var i = 0; i < 9; i++) {
        $l(".board").append('<li class="square' + i + '"></li>');
        var $square = $l('.square' + i);
        $square.data('pos', [i % 3, Math.floor(i / 3)]);
        $l(".board").append($square);
      }
    }
  }]);

  return View;
}();

module.exports = View;

/***/ })

/******/ });
//# sourceMappingURL=game_bundle.js.map