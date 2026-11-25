import { FileStore } from "./fileStore.js";

export class TaskRepository {
  constructor(filePath = "data/tasks.json") {
    this.store = new FileStore(filePath, "task");

    const data = this.store.read();
    this.tasks = data.items.map((item) => this.toTask(item));
    this.nextId = data.nextId;
  }

  toTask(item) {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      status: item.status ?? "PENDING",
      createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
      completedAt: item.completedAt ? new Date(item.completedAt) : null,
    };
  }

  persist() {
    this.store.write({ nextId: this.nextId, items: this.tasks });
  }

  create(title, description) {
    const task = {
      id: this.nextId++,
      title: title,
      description: description,
      status: "PENDING",
      createdAt: new Date(),
      completedAt: null
    };

    this.tasks.push(task);
    this.persist();

    return task;
  }

  findAll() {
    return this.tasks;
  }

  findById(id) {
    return this.tasks.find(task => task.id === id);
  }

  update(task) {
    const index = this.tasks.findIndex(item => item.id === task.id);

    if (index === -1) {
      return false;
    }

    this.tasks[index] = task;
    this.persist();

    return true;
  }

  delete(id) {
    const index = this.tasks.findIndex(
      task => task.id === id
    );

    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);
    this.persist();

    return true;
  }
}
