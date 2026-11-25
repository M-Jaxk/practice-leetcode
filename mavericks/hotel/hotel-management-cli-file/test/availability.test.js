import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { BookRepository } from "../src/repositories/bookRepository.js";
import { BookService } from "../src/services/bookService.js";

describe("BookService", () => {
    let bookService;
    let dataDir;

    beforeEach(() => {
        dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "hotel-books-"));
        bookService = new BookService(
            new BookRepository(path.join(dataDir, "books.json"))
        );
    });

    afterEach(() => {
        fs.rmSync(dataDir, { recursive: true, force: true });
    });

    describe("isRoomAvailable()", () => {
        it("should report a room available when there are no bookings", () => {
            const available = bookService.isRoomAvailable(
                1,
                "2026-11-20",
                "09:00",
                "10:00"
            );

            assert.equal(available, true);
        });

        it("should reject an overlapping booking", () => {
            bookService.addBook(1, "Standup", "Jax", "2026-11-20", "09:00", "10:00");

            assert.equal(
                bookService.isRoomAvailable(1, "2026-11-20", "09:30", "10:30"),
                false
            );
            assert.throws(
                () => bookService.addBook(1, "Conflict", "Jax", "2026-11-20", "09:30", "10:30"),
                { message: "Room 1 is already booked at that time: 09:00-10:00" }
            );
            assert.equal(bookService.listBooks().length, 1);
        });

        it("should report a different room or date as available", () => {
            bookService.addBook(1, "Standup", "Jax", "2026-11-20", "09:00", "10:00");

            assert.equal(
                bookService.isRoomAvailable(2, "2026-11-20", "09:00", "10:00"),
                true
            );
            assert.equal(
                bookService.isRoomAvailable(1, "2026-11-21", "09:00", "10:00"),
                true
            );
        });

        it("should ignore cancelled bookings", () => {
            const existing = bookService.addBook(
                1,
                "Standup",
                "Jax",
                "2026-11-20",
                "09:00",
                "10:00"
            );
            existing.status = "CANCELLED";

            assert.equal(
                bookService.isRoomAvailable(1, "2026-11-20", "09:00", "10:00"),
                true
            );
        });
    });

    describe("addBook()", () => {
        it("should allow back-to-back bookings", () => {
            bookService.addBook(1, "Standup", "Jax", "2026-11-20", "09:00", "10:00");

            const next = bookService.addBook(
                1,
                "Planning",
                "Jax",
                "2026-11-20",
                "10:00",
                "11:00"
            );

            assert.equal(next.id, 2);
        });

        it("should reject invalid input", () => {
            assert.throws(
                () => bookService.addBook(1, "Bad", "Jax", "2026-11-20", "10:00", "09:00"),
                { message: "End time must be after start time" }
            );
            assert.throws(
                () => bookService.addBook(1, "Bad", "Jax", "2026-11-20", "9:00", "10:00"),
                { message: 'Invalid time "9:00". Use HH:MM (24-hour format).' }
            );
            assert.throws(
                () => bookService.addBook("abc", "Bad", "Jax", "2026-11-20", "09:00", "10:00"),
                { message: "Invalid room id" }
            );
        });
    });
});
