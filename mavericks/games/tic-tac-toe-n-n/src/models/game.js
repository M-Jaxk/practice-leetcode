export class Game {
    constructor(size = 3) {
        if (!Number.isInteger(size) || size < 2) {
            throw new Error("Board size must be an integer of at least 2.");
        }

        this.size = size;
        this.reset();
    }

    reset() {
        this.board = Array(this.size * this.size).fill(null);
        this.currentPlayer = "X";
        this.status = "playing";
        this.winner = null;
        this.moves = 0;
    }
}
