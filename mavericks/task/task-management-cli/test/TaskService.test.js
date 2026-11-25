
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import { TaskRepository } from "../src/repositories/taskRepository.js";
import { TaskService } from "../src/services/taskService.js";

describe("TaskService", () => {
    let taskService;

    beforeEach(() => {
        const repository = new TaskRepository();
        taskService = new TaskService(repository);
    });

    describe("addTask()", () => {
        it("should create a new task", () => {
            const task = taskService.addTask(
                "Learn Node.js",
                "Practice readline"
            );

            assert.equal(task.id, 1);
            assert.equal(task.title, "Learn Node.js");
            assert.equal(task.status, "PENDING");
        });

        it("should reject an empty title", () => {
            assert.throws(
                () => taskService.addTask("", "Description"),
                {
                    message: "Task title is required"
                }
            );
        });

        it("should trim whitespace from title", () => {
            const task = taskService.addTask(
                "  Learn Node.js  ",
                ""
            );

            assert.equal(task.title, "Learn Node.js");
        });
    });

    describe("getAllTasks()", () => {
        it("should return all tasks", () => {
            taskService.addTask("Task 1", "Description 1");
            taskService.addTask("Task 2", "Description 2");

            const tasks = taskService.getAllTasks();

            assert.equal(tasks.length, 2);
        });

        it("should return an empty array when no tasks exist", () => {
            const tasks = taskService.getAllTasks();

            assert.deepEqual(tasks, []);
        });
    });

    describe("completeTask()", () => {
        it("should complete an existing task", () => {
            const created = taskService.addTask(
                "Learn Node.js",
                ""
            );

            const completed = taskService.completeTask(
                created.id
            );

            assert.equal(completed.status, "COMPLETED");
            assert.ok(completed.completedAt instanceof Date);
        });

        it("should reject an invalid task ID", () => {
            assert.throws(
                () => taskService.completeTask(999),
                { message: "Task not found" }
            );
        });

        it("should reject completing an already completed task", () => {
            const task = taskService.addTask("Task 1", "");

            taskService.completeTask(task.id);

            assert.throws(
                () => taskService.completeTask(task.id),
                { message: "Task is already completed" }
            );
        });
    });

    describe("filterByStatus()", () => {
        it("should return only pending tasks", () => {
            const task1 = taskService.addTask("Task 1", "");
            taskService.addTask("Task 2", "");

            taskService.completeTask(task1.id);

            const tasks = taskService.filterByStatus("PENDING");

            assert.equal(tasks.length, 1);
            assert.equal(tasks[0].title, "Task 2");
        });

        it("should reject an invalid status", () => {
            assert.throws(
                () => taskService.filterByStatus("INVALID"),
                { message: "Invalid task status" }
            );
        });
    });

    describe("deleteTask()", () => {
        it("should delete an existing task", () => {
            const task = taskService.addTask("Task 1", "");

            taskService.deleteTask(task.id);

            assert.equal(
                taskService.getAllTasks().length,
                0
            );
        });

        it("should reject deleting a nonexistent task", () => {
            assert.throws(
                () => taskService.deleteTask(999),
                { message: "Task not found" }
            );
        });
    });
});
