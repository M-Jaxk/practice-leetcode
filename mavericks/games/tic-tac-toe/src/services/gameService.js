import { Game } from "../models/game.js";

export class GameService {
  //game logic
  //create new game
  //define winningPairs
  //checkingWinner
  constructor(game = new Game()) {
    this.game = game;

    this.winningPairs = [
      [0, 1, 2], //1st row
      [3, 4, 5], //2nd row
      [6, 7, 8], //last row
      [0, 3, 6], //1 col
      [1, 4, 7], //2nd col
      [2, 5, 8], //last col
      [0, 4, 8], //digonal
      [2, 4, 6], //digonal
    ];
  }

  play(pos) {
    //data validation

    if (!Number.isInteger(pos) || pos < 1 || pos > 9) {
      throw new Error("Position must be a number between 1 and 9.");
    }

    if (this.game.status !== "playing") {
      throw new Error("The game is finished");
    }

    const index = pos - 1;

    if (this.game.board[index] !== null) {
      throw new Error("This position is occupied.");
    }

    this.game.board[index] = this.game.currentPlayer;
    this.game.moves++;

    //checking winner
    if (this.checkWinner()) {
      this.game.status = "won";
      this.game.winner = this.game.currentPlayer;
    } else if (this.game.moves === 9) {
      this.game.status = "draw";
    } else {
      //switching player
      this.game.currentPlayer = this.game.currentPlayer === "X" ? "O" : "X";
    }

    //return the current state data
    return this.getState();
  }

  checkWinner() {
    //[a,b,c] //1st row
    return this.winningPairs.some((state) => {
      const [a, b, c] = state;

      return (
        this.game.board[a] !== null && //1st A
        this.game.board[a] === this.game.board[b] && //1st A === 2nd A
        this.game.board[b] === this.game.board[c] //2nd A === 3rd A
      );
    });
  }

  getState() {
    return {
      board: [...this.game.board],
      currentPlayer: this.game.currentPlayer,
      status: this.game.status,
      winner: this.game.winner,
      moves: this.game.moves,
    };
  }

  resetGame() {
    this.game.reset();
    this.getState();
  }
}
