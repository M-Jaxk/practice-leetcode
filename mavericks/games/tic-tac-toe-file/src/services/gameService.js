import { Game } from "../models/game.js";
import { GameRepository } from "../repositories/gameRepository.js";

export class GameService {
  constructor(gameRepository = new GameRepository()) {
    this.gameRepository = gameRepository;
    this.game = this.gameRepository.find() ?? new Game();

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

    if (this.checkWinner()) {
      this.game.status = "won";
      this.game.winner = this.game.currentPlayer;
    } else if (this.game.moves === 9) {
      this.game.status = "draw";
    } else {
      this.game.currentPlayer = this.game.currentPlayer === "X" ? "O" : "X";
    }

    this.gameRepository.save(this.game);

    return this.getState();
  }

  checkWinner() {
    return this.winningPairs.some((state) => {
      const [a, b, c] = state;

      return (
        this.game.board[a] !== null &&
        this.game.board[a] === this.game.board[b] &&
        this.game.board[b] === this.game.board[c]
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
    this.gameRepository.clear();
  }
}
