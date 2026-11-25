import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { Game } from "../src/models/game.js";
import { GameRepository } from "../src/repositories/gameRepository.js";
import { GameService } from "../src/services/gameService.js";

describe("GameService", () => {
    let gameService;
    let dataDir;
    let savePath;

    beforeEach(() => {
        dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "tic-tac-toe-"));
        savePath = path.join(dataDir, "game.json");
        gameService = new GameService(new GameRepository(savePath));
    });

    afterEach(() => {
        fs.rmSync(dataDir, { recursive: true, force: true });
    });

    describe("getState()", () => {
        it("should initialize an empty board", () => {
            const state = gameService.getState();

            assert.equal(state.board.length, 9);
            assert.equal(state.currentPlayer, "X");
            assert.equal(state.status, "playing");
            assert.equal(state.winner, null);
        });
    });

    describe("play()", () => {
        it("should allow player X to make the first move", () => {
            const state = gameService.play(1);

            assert.equal(state.board[0], "X");
            assert.equal(state.currentPlayer, "O");
        });

        it("should switch players after each valid move", () => {
            gameService.play(1);
            const state = gameService.play(2);

            assert.equal(state.board[1], "O");
            assert.equal(state.currentPlayer, "X");
        });

        it("should reject invalid positions", () => {
            assert.throws(
                () => gameService.play(10),
                { message: "Position must be a number between 1 and 9." }
            );

            assert.throws(
                () => gameService.play(0),
                { message: "Position must be a number between 1 and 9." }
            );
        });
    });

    describe("file persistence", () => {
        it("should save the game state after a move", () => {
            gameService.play(1);
            const saved = JSON.parse(fs.readFileSync(savePath, "utf8"));

            assert.equal(saved.board[0], "X");
            assert.equal(saved.currentPlayer, "O");
            assert.equal(saved.moves, 1);
        });

        it("should restore the game state on startup", () => {
            gameService.play(1);
            gameService.play(2);

            const restored = new GameService(new GameRepository(savePath));
            const state = restored.getState();

            assert.deepEqual(state.board.slice(0, 2), ["X", "O"]);
            assert.equal(state.currentPlayer, "X");
            assert.equal(state.moves, 2);
        });

        it("should clear the saved game on reset", () => {
            gameService.play(1);
            assert.equal(fs.existsSync(savePath), true);

            gameService.resetGame();

            assert.equal(fs.existsSync(savePath), false);
            assert.deepEqual(
                new GameService(new GameRepository(savePath)).getState().board,
                Array(9).fill(null)
            );
        });

        it("should not save a rejected move", () => {
            assert.throws(
                () => gameService.play(0),
                { message: "Position must be a number between 1 and 9." }
            );

            assert.equal(fs.existsSync(savePath), false);
        });
    });
});

describe("GameRepository", () => {
    let dataDir;
    let savePath;
    let repository;

    beforeEach(() => {
        dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "tic-tac-toe-repo-"));
        savePath = path.join(dataDir, "game.json");
        repository = new GameRepository(savePath);
    });

    afterEach(() => {
        fs.rmSync(dataDir, { recursive: true, force: true });
    });

    describe("find()", () => {
        it("should return null when no save file exists", () => {
            assert.equal(repository.find(), null);
        });

        it("should return a Game restored from the file", () => {
            const saved = new Game();
            saved.board[0] = "X";
            saved.currentPlayer = "O";
            saved.moves = 1;
            fs.writeFileSync(savePath, JSON.stringify(saved));

            const game = repository.find();

            assert.ok(game instanceof Game);
            assert.equal(game.board[0], "X");
            assert.equal(game.currentPlayer, "O");
            assert.equal(game.moves, 1);
        });

        it("should reject corrupted save data", () => {
            fs.writeFileSync(savePath, "not json");

            assert.throws(
                () => repository.find(),
                { message: "Saved game data is corrupted" }
            );
        });
    });

    describe("save()", () => {
        it("should create the file and any missing directories", () => {
            const nestedPath = path.join(dataDir, "nested", "game.json");
            new GameRepository(nestedPath).save(new Game());

            assert.equal(fs.existsSync(nestedPath), true);
            assert.deepEqual(
                JSON.parse(fs.readFileSync(nestedPath, "utf8")).board,
                Array(9).fill(null)
            );
        });
    });

    describe("clear()", () => {
        it("should remove the save file", () => {
            repository.save(new Game());
            repository.clear();

            assert.equal(fs.existsSync(savePath), false);
        });

        it("should do nothing when no save file exists", () => {
            assert.doesNotThrow(() => repository.clear());
        });
    });
});
