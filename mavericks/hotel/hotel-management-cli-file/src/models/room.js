export class Room{
    //initializie room properties
    //id
    //name
    //capacity
    //location
    //createdAt
    constructor(id,name,capacity,location){
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.location = location;
        this.createdAt = new Date();
    }
} 