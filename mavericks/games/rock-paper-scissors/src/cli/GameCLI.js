
import readline from "node:readline"
export class GameCLI {
    constructor(gameService) {
        this.gameService = gameService;

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    question(message) {
        return new Promise(resolve => {
            this.rl.question(message, resolve);
        });
    }

    async start() {
        let running = true;

        console.log("\n=================================");
        console.log("     ROCK PAPER SCISSORS GAME");
        console.log("=================================");

        while (running) {
            console.log("\n1. Rock");
            console.log("2. Paper");
            console.log("3. Scissors");
            console.log("4. View Score");
            console.log("5. Reset Game");
            console.log("6. Exit");

            const option = (
                await this.question("\nSelect an option: ")
            ).trim();

            try {
                switch (option) {
                    case "1":
                        await this.play("ROCK");
                        break;

                    case "2":
                        await this.play("PAPER");
                        break;

                    case "3":
                        await this.play("SCISSORS");
                        break;

                    case "4":
                        this.displayScore();
                        break;

                    case "5":
                        this.gameService.resetGame();
                        console.log("Game reset successfully!");
                        break;

                    case "6":
                        running = false;
                        console.log("Thanks for playing!");
                        break;

                    default:
                        console.log("Invalid option!");
                }
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

        this.rl.close();
    }

    async play(playerChoice) {
        const result = this.gameService.playRound(playerChoice);

        console.log("\n-------------------------------");
        console.log(`You: ${result.player}`);
        console.log(`Computer: ${result.computer}`);

        if (result.winner === "PLAYER") {
            console.log("You won this round!");
        } else if (result.winner === "COMPUTER") {
            console.log("Computer won this round!");
        } else {
            console.log("It's a draw!");
        }

        console.log("-------------------------------");

        this.displayScore();
    }

    displayScore() {
        const score = this.gameService.getScore();

        console.log("\n========== SCORE ==========");
        console.log(`Player:   ${score.player}`);
        console.log(`Computer: ${score.computer}`);
        console.log(`Draws:    ${score.draws}`);
        console.log(`Rounds:   ${score.rounds}`);
        console.log("===========================");
    }
}

