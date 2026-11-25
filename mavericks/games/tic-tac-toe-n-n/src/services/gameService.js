import { Game } from "../models/game.js";

export class GameService {
  constructor(game = new Game()) {
    this.game = game;
    this.winningLines = this.buildWinningLines();
  }

  buildWinningLines() {
    const { size } = this.game;
    const lines = [];

    for (let row = 0; row < size; row++) {
      lines.push(Array.from({ length: size }, (_, col) => row * size + col));
    }

    for (let col = 0; col < size; col++) {
      lines.push(Array.from({ length: size }, (_, row) => row * size + col));
    }

    lines.push(Array.from({ length: size }, (_, i) => i * size + i));
    lines.push(Array.from({ length: size }, (_, i) => i * size + (size - 1 - i)));

    return lines;
  }

  play(pos) {
    const cellCount = this.game.size * this.game.size;

    if (!Number.isInteger(pos) || pos < 1 || pos > cellCount) {
      throw new Error(`Position must be a number between 1 and ${cellCount}.`);
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

    if (this.checkWinner()) {
      this.game.status = "won";
      this.game.winner = this.game.currentPlayer;
    } else if (this.game.moves === cellCount) {
      this.game.status = "draw";
    } else {
      this.game.currentPlayer = this.game.currentPlayer === "X" ? "O" : "X";
    }

    return this.getState();
  }

  checkWinner() {
    return this.winningLines.some((line) => {
      const first = this.game.board[line[0]];

      return first !== null && line.every((index) => this.game.board[index] === first);
    });
  }

  getState() {
    return {
      size: this.game.size,
      board: [...this.game.board],
      currentPlayer: this.game.currentPlayer,
      status: this.game.status,
      winner: this.game.winner,
      moves: this.game.moves,
    };
  }

  resetGame() {
    this.game.reset();
  }
}
