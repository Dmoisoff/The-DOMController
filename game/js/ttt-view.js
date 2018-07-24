require("./moveError.js");

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    if (this.game.isOver()) {
      $('ul').off('click','li');
    }else{
      $('ul').on('click', 'li', (e) => {
        const $square = $(e.currentTarget);
        this.makeMove($square);
      });
    }
  }

  makeMove($square) {
    try{
      const currentPlayer = this.game.currentPlayer;
      this.game.playMove($square.data('pos'));
      $square.addClass(currentPlayer);
      $square.text(currentPlayer);
    }
    catch(err){
      alert(err.msg);
    }
    if(this.game.isOver()){
      $('li').attr("style","background-color: white; color: red");
      const winner = this.game.winner();
      if (winner){
        $(`li.${winner}`).attr("style", "background-color: green; color: white");
        $('body').append(`<h2>You win, ${winner}!</h2>`);
      } else {
        $('body').append(`<h2>It's a draw!</h2>`);
      }
      this.bindEvents();
    }
  }

  setupBoard() {
    const board = this.game.board;
    (this.$el).append('<ul class="board"></ul>');
    for (let i = 0; i < 9; i++) {
      const $square = $('<li class="square"></li>');
      $square.data( 'pos', [ i % 3 , Math.floor(i / 3) ] );
      $(".board").append($square);
    }

  }


}

module.exports = View;
