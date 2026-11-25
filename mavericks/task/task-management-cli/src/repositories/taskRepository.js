export class TaskRepository{
    constructor(){
        this.tasks = [];
        this.nextId = 1;
    }

    create(title,description) {
        const task = {
            id: this.nextId++,
            title:title,
            description:description,
            status: "PENDING",
            createdAt: new Date(),
            completedAt: null
        };

        this.tasks.push(task);

        return task;
    }

    findAll(){
        return this.tasks;
    }

    findById(id){
        return this.tasks.find(task=>task.id===id);
    }

    update(task){
        const index = this.tasks.findIndex(item=>item.id===task.id);

        if(index === -1){
            return false;
        }

        this.tasks[index] = task;

        return true;
    }

    delete(id){
        const index = this.tasks.findIndex(
            task => task.id === id
        );

        if (index === -1) {
            return false;
        }

        this.tasks.splice(index, 1);

        return true;
    }
}
