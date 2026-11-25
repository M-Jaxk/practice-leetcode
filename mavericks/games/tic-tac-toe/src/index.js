import { GameService } from "./services/gameService.js";
import { GameCLI } from "./cli/gameCLI.js";

const gameService = new GameService();
const gameCLI = new GameCLI(gameService);

gameCLI.start();