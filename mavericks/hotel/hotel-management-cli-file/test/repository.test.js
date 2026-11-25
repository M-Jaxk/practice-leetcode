import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { Booking } from "../src/models/booking.js";
import { Room } from "../src/models/room.js";
import { BookRepository } from "../src/repositories/bookRepository.js";
import { RoomRepository } from "../src/repositories/roomRepository.js";

describe("File repositories", () => {
    let dataDir;
    let booksPath;
    let roomsPath;

    beforeEach(() => {
        dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "hotel-repo-"));
        booksPath = path.join(dataDir, "books.json");
        roomsPath = path.join(dataDir, "rooms.json");
    });

    afterEach(() => {
        fs.rmSync(dataDir, { recursive: true, force: true });
    });

    describe("RoomRepository", () => {
        it("should start empty when no file exists", () => {
            const repository = new RoomRepository(roomsPath);

            assert.deepEqual(repository.findAll(), []);
            assert.equal(repository.findByID(1), undefined);
        });

        it("should write rooms to a file", () => {
            const repository = new RoomRepository(roomsPath);
            const room = repository.create("Boardroom", 10, "Floor 2");
            const stored = JSON.parse(fs.readFileSync(roomsPath, "utf8"));

            assert.equal(room.id, 1);
            assert.equal(stored.nextId, 2);
            assert.equal(stored.items.length, 1);
            assert.equal(stored.items[0].name, "Boardroom");
        });

        it("should reload rooms and continue the id sequence", () => {
            new RoomRepository(roomsPath).create("Boardroom", 10, "Floor 2");

            const reloaded = new RoomRepository(roomsPath);
            const rooms = reloaded.findAll();

            assert.equal(rooms.length, 1);
            assert.ok(rooms[0] instanceof Room);
            assert.equal(reloaded.findByID(1).name, "Boardroom");
            assert.ok(rooms[0].createdAt instanceof Date);
            assert.equal(reloaded.create("Small", 4, "Floor 1").id, 2);
        });
    });

    describe("BookRepository", () => {
        it("should write bookings to a file", () => {
            const repository = new BookRepository(booksPath);
            repository.create(1, "Standup", "Jax", "2026-11-20", "09:00", "10:00");
            const stored = JSON.parse(fs.readFileSync(booksPath, "utf8"));

            assert.equal(stored.nextId, 2);
            assert.equal(stored.items.length, 1);
            assert.equal(stored.items[0].title, "Standup");
        });

        it("should reload bookings and continue the id sequence", () => {
            new BookRepository(booksPath).create(
                1, "Standup", "Jax", "2026-11-20", "09:00", "10:00"
            );

            const reloaded = new BookRepository(booksPath);
            const books = reloaded.findMany();

            assert.equal(books.length, 1);
            assert.ok(books[0] instanceof Booking);
            assert.equal(books[0].organizer, "Jax");
            assert.ok(books[0].createdAt instanceof Date);
            assert.equal(
                reloaded.create(2, "Review", "Kim", "2026-11-20", "11:00", "12:00").id,
                2
            );
        });

        it("should persist cancellation updates", () => {
            const repository = new BookRepository(booksPath);
            const booking = repository.create(
                1, "Standup", "Jax", "2026-11-20", "09:00", "10:00"
            );
            booking.status = "CANCELLED";
            booking.cancelledAt = new Date();
            repository.update(booking);

            const reloaded = new BookRepository(booksPath).findByID(1);

            assert.equal(reloaded.status, "CANCELLED");
            assert.ok(reloaded.cancelledAt instanceof Date);
        });

        it("should update the matching booking, not always the first", () => {
            const repository = new BookRepository(booksPath);
            repository.create(1, "First", "Jax", "2026-11-20", "09:00", "10:00");
            const second = repository.create(
                1, "Second", "Jax", "2026-11-20", "11:00", "12:00"
            );
            second.status = "CANCELLED";
            repository.update(second);

            assert.equal(repository.findByID(1).status, "CONFIRMED");
            assert.equal(repository.findByID(2).status, "CANCELLED");
        });

        it("should reject corrupted stored data", () => {
            fs.writeFileSync(booksPath, "not json");

            assert.throws(
                () => new BookRepository(booksPath),
                { message: "Stored book data is corrupted" }
            );
        });
    });
});
