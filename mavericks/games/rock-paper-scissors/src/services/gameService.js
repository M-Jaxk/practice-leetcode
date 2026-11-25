import { Game } from "../models/game.js";

export class GameService{
    constructor(random = Math.random){
        this.game = new Game();
        this.random = random;
        this.choices = [
            "ROCK",
            "PAPER",
            "SCISSORS"
        ];
    }

    getComputerChoice(){
        const index = Math.floor(
            this.random() * this.choices.length
        );

        return this.choices[index];
    }

    validateChoice(choice){
        if(!this.choices.includes(choice)){
            throw new Error("Invalid choice, please select ROCK, PAPER, or SEISSORS.");
        }
    }

    determineWinner(player,computer){
        if(player === computer){
            return "DRAW";
        }

        const playerWins = {
            ROCK: "SCISSORS",
            PAPER: "ROCK",
            SCISSORS: "PAPER"
        };

        if(playerWins[player] === computer){
            return "PLAYER";
        }

        return "COMPUTER";
    }

    playRound(playerChoice) {
        const player = playerChoice.trim().toUpperCase();

        this.validateChoice(player);

        const computer = this.getComputerChoice();

        const winner = this.determineWinner(
            player,
            computer
        );

        this.game.rounds++;

        if (winner === "PLAYER") {
            this.game.playerScore++;
        } else if (winner === "COMPUTER") {
            this.game.computerScore++;
        } else {
            this.game.draws++;
        }

        return {
            player,
            computer,
            winner,
            score: this.getScore()
        };
    }

    getScore() {
        return {
            player: this.game.playerScore,
            computer: this.game.computerScore,
            draws: this.game.draws,
            rounds: this.game.rounds
        };
    }

    resetGame() {
        this.game.reset();

        return this.getScore();
    }
}