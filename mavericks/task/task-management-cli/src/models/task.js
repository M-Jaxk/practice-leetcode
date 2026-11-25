export class Task{
    constructor(id,title,description=""){
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = "PENDING";
        this.createdAt = new Date();
        this.completedAt = null;
    }
}
