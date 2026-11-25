import readline from "node:readline";
export class GameCLI {
  //initialize the game service and readline
  //massage the board data
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
    console.log("Player A vs Player B");
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

  displayBoard(board) {
    //massage the board data
    console.log("\n");

    for (let row = 0; row < 3; row++) {
      const cells = board.slice(row * 3, row * 3 + 3).map((cell, index) => {
        const position = row * 3 + index + 1;
        return cell || position;
      });

      console.log(` ${cells.join(" | ")} `);

      if (row < 2) {
        console.log("---+---+---");
      }
    }

    console.log("\n");
  }

  async playGame() {
    let state = this.gameService.getState();

    while (state.status === "playing") {
      this.displayBoard(state.board);

    const answer = await this.question(
        `Player ${state.currentPlayer}, choose a position (1-9): `,
      );

      const position = Number(answer.trim());

      try {
        state = this.gameService.play(position);
      } catch (error) {
        console.log(`\nError: ${error.message}`);
      }
    }

    this.displayBoard(state.board);

    if (state.status === "won") {
      console.log(`Congratulations! Player ${state.winner} wins!`);
    } else {
      console.log("It's a draw!");
    }
  }
}
