import { Room } from "../models/room.js";
import { FileStore } from "./fileStore.js";

export class RoomRepository {
  constructor(filePath = "data/rooms.json") {
    this.store = new FileStore(filePath, "room");

    const data = this.store.read();
    this.rooms = data.items.map((item) => this.toRoom(item));
    this.nextId = data.nextId;
  }

  toRoom(item) {
    const room = new Room(
      item.id,
      item.name,
      item.capacity,
      item.location
    );

    room.createdAt = item.createdAt ? new Date(item.createdAt) : new Date();

    return room;
  }

  persist() {
    this.store.write({ nextId: this.nextId, items: this.rooms });
  }

  create(name, capacity, location) {
    const room = new Room(
      this.nextId++,
      name,
      capacity,
      location
    );

    this.rooms.push(room);
    this.persist();

    return room;
  }

  findAll() {
    return this.rooms;
  }

  findByID(id) {
    return this.rooms.find(room => room.id === id);
  }
}
