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
      $l('ul').off('click','li');
    }else{
      $l('li').on('click', (e) => {
        const $square = $l(e.currentTarget);
        this.makeMove($square);
      });
    }
  }

  makeMove($square) {
    try{
      const currentPlayer = this.game.currentPlayer;
      this.game.playMove($square.data('pos'));
      $square.addClass(currentPlayer);
      $square.append(currentPlayer);
    }
    catch(err){
      alert(err.msg);
    }
    if(this.game.isOver()){
      $l('li').attr("style","background-color: white; color: red");
      const winner = this.game.winner();
      if (winner){
        $l(`li.${winner}`).attr("style", "background-color: green; color: white");
        $l('body').append(`<h2>You win, ${winner}!</h2>`);
      } else {
        $l('body').append(`<h2>It's a draw!</h2>`);
      }
      this.bindEvents();
    }
  }

  setupBoard() {
    const board = this.game.board;
    (this.$el).append('<ul class="board"></ul>');
    for (let i = 0; i < 9; i++) {
      $l(".board").append(`<li class="square${i}"></li>`);
      const $square = $l(`.square${i}`);
      $square.data( 'pos', [ i % 3 , Math.floor(i / 3) ] );
      $l(".board").append($square)
    }

  }


}

module.exports = View;
