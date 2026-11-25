
import { TaskRepository } from "./repositories/taskRepository.js";
import { TaskService } from "./services/taskService.js";
import {TaskCLI} from "./cli/taskCLI.js";

const taskRepository = new TaskRepository();

const taskService = new TaskService(
    taskRepository
);

const taskCLI = new TaskCLI(
    taskService
);

taskCLI.start();
