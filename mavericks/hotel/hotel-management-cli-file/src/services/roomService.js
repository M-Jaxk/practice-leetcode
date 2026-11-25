export class RoomService{
    constructor(roomRepository){
        this.roomRepository = roomRepository;
    }

    addRoom(name,capacity,location){
        return this.roomRepository.create(name,capacity,location);
    }

    listRooms(){
        return this.roomRepository.findAll();
    }
}