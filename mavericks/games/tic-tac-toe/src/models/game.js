export class Game{
    //initializie game properties
    //3x3 board
    //player
    //gameStatus
    //winner
    //moves (for draw)
    constructor(){
        this.board = Array(9).fill(null);//[null,null,...]
        this.currentPlayer = 'X';
        this.status = 'playing';
        this.winner = null;
        this.moves = 0;
    }

    reset(){
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.status = 'playing';
        this.winner = null;
        this.moves = 0;
    }
}
