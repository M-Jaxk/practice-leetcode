
import readline from "node:readline";

export class TaskCLI {
    constructor(taskService) {
        this.taskService = taskService;

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    question(message) {
        return new Promise(resolve => {
            this.rl.question(message, resolve);
        });
    }

    async start() {
        let running = true;

        while (running) {
            console.log("\n==============================");
            console.log("      TASK MANAGEMENT CLI");
            console.log("==============================");
            console.log("1. Add Task");
            console.log("2. List Tasks");
            console.log("3. Complete Task");
            console.log("4. Filter Tasks");
            console.log("5. Delete Task");
            console.log("6. Exit");

            const option = await this.question(
                "\nSelect an option: "
            );

            try {
                switch (option.trim()) {
                    case "1":
                        await this.addTask();
                        break;

                    case "2":
                        this.listTasks();
                        break;

                    case "3":
                        await this.completeTask();
                        break;

                    case "4":
                        await this.filterTasks();
                        break;

                    case "5":
                        await this.deleteTask();
                        break;

                    case "6":
                        running = false;
                        console.log("Goodbye!");
                        break;

                    default:
                        console.log("Invalid option!");
                }
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

        this.rl.close();
    }

    async addTask() {
        const title = await this.question("Task title: ");

        const description = await this.question(
            "Task description: "
        );

        const task = this.taskService.addTask(
            title,
            description
        );

        console.log(`Task created! ID: ${task.id}`);
    }

    listTasks() {
        const tasks = this.taskService.getAllTasks();

        if (tasks.length === 0) {
            console.log("No tasks found.");
            return;
        }

        console.table(tasks);
    }

    async completeTask() {
        const id = Number(
            await this.question("Enter task ID: ")
        );

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Invalid task ID");
        }

        const task = this.taskService.completeTask(id);

        console.log(`Task "${task.title}" completed!`);
    }

    async filterTasks() {
        const status = (
            await this.question(
                "Enter status (PENDING/COMPLETED): "
            )
        ).trim().toUpperCase();

        const tasks = this.taskService.filterByStatus(status);

        console.table(tasks);
    }

    async deleteTask() {
        const id = Number(
            await this.question("Enter task ID: ")
        );

        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("Invalid task ID");
        }

        this.taskService.deleteTask(id);

        console.log("Task deleted successfully!");
    }
}

