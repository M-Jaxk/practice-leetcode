import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import { GameService } from "../src/services/gameService.js";

describe("GameService", () => {
    let gameService;

    beforeEach(() => {
        gameService = new GameService();
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
});
