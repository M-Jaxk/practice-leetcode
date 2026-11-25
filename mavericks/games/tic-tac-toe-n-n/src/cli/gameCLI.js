import readline from "node:readline";

export class GameCLI {
  constructor(gameService) {
    this.gameService = gameService;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  question(msg) {
    return new Promise((rsl, rej) => {
      this.rl.question(msg, rsl);
    });
  }

  async start() {
    console.log("\n=== TIC-TAC-TOE ===");
    console.log("Player X vs Player O");
    let running = true;

    while (running) {
      await this.playGame();

      const answer = await this.question("Play again? (y/n): ");

      if (answer.trim().toLowerCase() === "y") {
        this.gameService.resetGame();
      } else {
        running = false;
      }
    }

    console.log("\nThanks for playing!");
    this.rl.close();
  }

  displayBoard(board, size) {
    console.log("\n");
    const separator = Array(size).fill("---").join("+");

    for (let row = 0; row < size; row++) {
      const cells = board.slice(row * size, row * size + size).map((cell, index) => {
        const position = row * size + index + 1;
        return cell || position;
      });

      console.log(` ${cells.join(" | ")} `);

      if (row < size - 1) {
        console.log(separator);
      }
    }

    console.log("\n");
  }

  async playGame() {
    let state = this.gameService.getState();
    console.log(`Board: ${state.size} x ${state.size}`);

    while (state.status === "playing") {
      this.displayBoard(state.board, state.size);

      const answer = await this.question(
        `Player ${state.currentPlayer}, choose a position (1-${state.size ** 2}): `,
      );

      const position = Number(answer.trim());

      try {
        state = this.gameService.play(position);
      } catch (error) {
        console.log(`\nError: ${error.message}`);
      }
    }

    this.displayBoard(state.board, state.size);

    if (state.status === "won") {
      console.log(`Congratulations! Player ${state.winner} wins!`);
    } else {
      console.log("It's a draw!");
    }
  }
}
