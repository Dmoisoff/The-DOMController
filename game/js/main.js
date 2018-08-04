const View = require("./ttt-view.js");
const Game = require("./game.js");

$l( () => {
  const game = new Game();
  const view = new View(game, $l('.ttt'));
});
