
import { GameService } from "./services/gameService.js";
import { GameCLI } from "./cli/GameCLI.js";

const gameService = new GameService();

const gameCLI = new GameCLI(gameService);

gameCLI.start();
