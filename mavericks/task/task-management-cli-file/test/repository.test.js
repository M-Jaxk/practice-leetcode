import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { TaskRepository } from "../src/repositories/taskRepository.js";

describe("TaskRepository", () => {
    let dataDir;
    let tasksPath;

    beforeEach(() => {
        dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "task-repo-"));
        tasksPath = path.join(dataDir, "tasks.json");
    });

    afterEach(() => {
        fs.rmSync(dataDir, { recursive: true, force: true });
    });

    describe("create()", () => {
        it("should start empty when no file exists", () => {
            const repository = new TaskRepository(tasksPath);

            assert.deepEqual(repository.findAll(), []);
            assert.equal(repository.findById(1), undefined);
        });

        it("should write new tasks to a file", () => {
            const repository = new TaskRepository(tasksPath);
            const task = repository.create("Learn Node.js", "Practice");

            const stored = JSON.parse(fs.readFileSync(tasksPath, "utf8"));

            assert.equal(task.id, 1);
            assert.equal(stored.nextId, 2);
            assert.equal(stored.items.length, 1);
            assert.equal(stored.items[0].title, "Learn Node.js");
            assert.equal(stored.items[0].status, "PENDING");
        });
    });

    describe("reloading", () => {
        it("should restore tasks and continue the id sequence", () => {
            new TaskRepository(tasksPath).create("Task 1", "First");
            new TaskRepository(tasksPath).create("Task 2", "Second");

            const reloaded = new TaskRepository(tasksPath);

            assert.equal(reloaded.findAll().length, 2);
            assert.equal(reloaded.findById(1).title, "Task 1");
            assert.ok(reloaded.findById(1).createdAt instanceof Date);
            assert.equal(reloaded.create("Task 3", "Third").id, 3);
        });

        it("should persist completion updates", () => {
            const repository = new TaskRepository(tasksPath);
            const task = repository.create("Task 1", "");
            task.status = "COMPLETED";
            task.completedAt = new Date();
            repository.update(task);

            const reloaded = new TaskRepository(tasksPath).findById(1);

            assert.equal(reloaded.status, "COMPLETED");
            assert.ok(reloaded.completedAt instanceof Date);
        });

        it("should persist deletions", () => {
            const repository = new TaskRepository(tasksPath);
            const task = repository.create("Task 1", "");
            repository.delete(task.id);

            assert.deepEqual(new TaskRepository(tasksPath).findAll(), []);
        });
    });

    describe("corrupted data", () => {
        it("should reject an invalid stored file", () => {
            fs.writeFileSync(tasksPath, "not json");

            assert.throws(
                () => new TaskRepository(tasksPath),
                { message: "Stored task data is corrupted" }
            );
        });
    });
});
