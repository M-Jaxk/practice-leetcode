export class Game{
    constructor(){
        this.playerScore = 0;
        this.computerScore = 0;
        this.draws = 0;
        this.rounds = 0;
    }

    reset(){
        this.playerScore = 0;
        this.computerScore = 0;
        this.draws = 0;
        this.rounds = 0;
    }
}