
export class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    addTask(title, description) {
        if (!title || !title.trim()) {
            throw new Error("Task title is required");
        }

        return this.taskRepository.create(
            title.trim(),
            description
        );
    }

    getAllTasks() {
        return this.taskRepository.findAll();
    }

    completeTask(id) {
        const task = this.taskRepository.findById(id);

        if (!task) {
            throw new Error("Task not found");
        }

        if (task.status === "COMPLETED") {
            throw new Error("Task is already completed");
        }

        task.status = "COMPLETED";
        task.completedAt = new Date();

        this.taskRepository.update(task);

        return task;
    }

    filterByStatus(status) {
        const allowedStatuses = [
            "PENDING",
            "COMPLETED"
        ];

        if (!allowedStatuses.includes(status)) {
            throw new Error("Invalid task status");
        }

        return this.taskRepository
            .findAll()
            .filter(task => task.status === status);
    }

    deleteTask(id) {
        const deleted = this.taskRepository.delete(id);

        if (!deleted) {
            throw new Error("Task not found");
        }

        return true;
    }
}

