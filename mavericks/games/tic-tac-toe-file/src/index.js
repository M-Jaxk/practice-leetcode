import { GameRepository } from "./repositories/gameRepository.js";
import { GameService } from "./services/gameService.js";
import { GameCLI } from "./cli/gameCLI.js";

const gameRepository = new GameRepository();
const gameService = new GameService(gameRepository);
const gameCLI = new GameCLI(gameService);

gameCLI.start();
