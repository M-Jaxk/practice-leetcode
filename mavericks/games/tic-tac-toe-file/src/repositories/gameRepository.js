import fs from "node:fs";
import path from "node:path";

import { Game } from "../models/game.js";

export class GameRepository {
  constructor(filePath = "data/game.json") {
    this.filePath = filePath;
  }

  find() {
    if (!fs.existsSync(this.filePath)) {
      return null;
    }

    let data;
    try {
      data = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
    } catch {
      throw new Error("Saved game data is corrupted");
    }

    return new Game(data);
  }

  save(game) {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
    fs.writeFileSync(this.filePath, JSON.stringify(game.toJSON(), null, 2));

    return game;
  }

  clear() {
    if (fs.existsSync(this.filePath)) {
      fs.unlinkSync(this.filePath);
    }
  }
}
