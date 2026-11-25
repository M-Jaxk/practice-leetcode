import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import { Game } from "../src/models/game.js";
import { GameService } from "../src/services/gameService.js";

describe("GameService", () => {
    let gameService;

    beforeEach(() => {
        gameService = new GameService();
    });

    describe("getState()", () => {
        it("should initialize an empty board", () => {
            const state = gameService.getState();

            assert.equal(state.size, 3);
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

        it("should reject an occupied position", () => {
            gameService.play(1);

            assert.throws(
                () => gameService.play(1),
                { message: "This position is occupied." }
            );
        });

        it("should detect a diagonal win", () => {
            [1, 4, 5, 8, 9].forEach((pos) => gameService.play(pos));
            const state = gameService.getState();

            assert.equal(state.status, "won");
            assert.equal(state.winner, "X");
        });
    });

    describe("NxN boards", () => {
        it("should initialize a board with the requested size", () => {
            const service = new GameService(new Game(5));
            const state = service.getState();

            assert.equal(state.size, 5);
            assert.equal(state.board.length, 25);
            assert.equal(state.status, "playing");
        });

        it("should reject positions outside the board", () => {
            const service = new GameService(new Game(4));

            assert.throws(
                () => service.play(17),
                { message: "Position must be a number between 1 and 16." }
            );
        });

        it("should detect a horizontal win", () => {
            const service = new GameService(new Game(4));

            [1, 5, 2, 6, 3, 7, 4].forEach((pos) => service.play(pos));
            const state = service.getState();

            assert.equal(state.status, "won");
            assert.equal(state.winner, "X");
        });

        it("should detect a vertical win", () => {
            const service = new GameService(new Game(4));

            [1, 2, 5, 3, 9, 4, 13].forEach((pos) => service.play(pos));
            const state = service.getState();

            assert.equal(state.status, "won");
            assert.equal(state.winner, "X");
        });

        it("should detect a diagonal win", () => {
            const service = new GameService(new Game(4));

            [1, 2, 6, 3, 11, 4, 16].forEach((pos) => service.play(pos));
            const state = service.getState();

            assert.equal(state.status, "won");
            assert.equal(state.winner, "X");
        });

        it("should declare a draw when the board fills", () => {
            const service = new GameService(new Game(4));

            [1, 3, 2, 4, 7, 5, 8, 6, 9, 11, 10, 12, 15, 13, 16, 14].forEach(
                (pos) => service.play(pos)
            );
            const state = service.getState();

            assert.equal(state.status, "draw");
            assert.equal(state.moves, 16);
        });

        it("should reject an invalid board size", () => {
            assert.throws(
                () => new Game(1),
                { message: "Board size must be an integer of at least 2." }
            );

            assert.throws(
                () => new Game(2.5),
                { message: "Board size must be an integer of at least 2." }
            );
        });
    });
});
