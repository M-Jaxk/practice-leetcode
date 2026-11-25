export class Game {
  constructor(state = {}) {
    this.board = state.board ? [...state.board] : Array(9).fill(null);
    this.currentPlayer = state.currentPlayer ?? "X";
    this.status = state.status ?? "playing";
    this.winner = state.winner ?? null;
    this.moves = state.moves ?? 0;
  }

  reset() {
    this.board = Array(9).fill(null);
    this.currentPlayer = "X";
    this.status = "playing";
    this.winner = null;
    this.moves = 0;
  }

  toJSON() {
    return {
      board: [...this.board],
      currentPlayer: this.currentPlayer,
      status: this.status,
      winner: this.winner,
      moves: this.moves,
    };
  }
}
