import { Room } from "../models/room.js";

export class RoomRepository{

    //initialize empty data set for storing
    constructor(){
        this.rooms = [];
        this.nextId = 1;
    }

    create(name,capacity,location){
        const room = new Room(
            this.nextId++,
            name,
            capacity,
            location
        );

        this.rooms.push(room);
        return room;
    }

    findAll(){
        return this.rooms;
    }

    findByID(id){
        return this.rooms.find(room=>
            room.id === id
        );
    }
}