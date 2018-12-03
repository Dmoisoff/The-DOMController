require("./moveError.js");

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $l("li").on("click", e => {
      const $square = $l(e.currentTarget);
      this.makeMove($square);
    });
  }

  makeMove($square) {
    if (!this.game.isOver()) {
      try {
        const currentPlayer = this.game.currentPlayer;
        this.game.playMove($square.data("pos"));
        $square.addClass(currentPlayer);
        $square.append(currentPlayer);
        $l("div.errorMessage").empty();
      } catch (err) {
        $l("div.errorMessage").empty();
        $l("div.errorMessage").append(err.msg);
      }
    }
    if (this.game.isOver()) {
      this.displayWin();
    }
  }

  displayWin() {
    $l("li").attr("style", "background-color: white; color: red");
    const winner = this.game.winner();
    $l("span").empty();
    if (winner) {
      $l(`li.${winner}`).attr("style", "background-color: green; color: white");
      $l("span").append(`<h2>You win, ${winner}!</h2>`);
    } else {
      $l("span").append(`<h2>It's a draw!</h2>`);
    }
    $l("span").append('<input type="submit" name="" value="Restart Game"');
    $l("span").append(
      `<h2 class='restart'>Click here to play again <i class="far fa-smile-beam"></i></h2>`
    );
    $l(".restart").on("click", () => {
      document.location.reload();
    });
  }

  setupBoard() {
    const board = this.game.board;
    this.$el.append('<ul class="board"></ul>');
    for (let i = 0; i < 9; i++) {
      $l(".board").append(`<li class="square${i}"></li>`);
      const $square = $l(`.square${i}`);
      $square.data("pos", [i % 3, Math.floor(i / 3)]);
      $l(".board").append($square);
    }
  }
}

module.exports = View;
