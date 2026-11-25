import { Game } from "./models/game.js";
import { GameService } from "./services/gameService.js";
import { GameCLI } from "./cli/gameCLI.js";

const size = process.argv[2] === undefined ? 3 : Number(process.argv[2]);
const gameService = new GameService(new Game(size));
const gameCLI = new GameCLI(gameService);

gameCLI.start();
