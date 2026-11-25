import { Booking } from "../models/booking.js";
import { FileStore } from "./fileStore.js";

export class BookRepository {
  constructor(filePath = "data/books.json") {
    this.store = new FileStore(filePath, "book");

    const data = this.store.read();
    this.bookeds = data.items.map((item) => this.toBooking(item));
    this.nextId = data.nextId;
  }

  toBooking(item) {
    const booking = new Booking(
      item.id,
      item.roomId,
      item.title,
      item.organizer,
      item.date,
      item.startTime,
      item.endTime
    );

    booking.status = item.status ?? "CONFIRMED";
    booking.createdAt = item.createdAt ? new Date(item.createdAt) : new Date();
    booking.cancelledAt = item.cancelledAt ? new Date(item.cancelledAt) : null;

    return booking;
  }

  persist() {
    this.store.write({ nextId: this.nextId, items: this.bookeds });
  }

  create(roomId, title, organizer, date, startTime, endTime) {
    const book = new Booking(
      this.nextId++,
      roomId,
      title,
      organizer,
      date,
      startTime,
      endTime
    );

    this.bookeds.push(book);
    this.persist();

    return book;
  }

  findMany() {
    return this.bookeds;
  }

  findByRoomAndDate(roomId, date) {
    return this.bookeds.filter(book =>
      book.roomId === roomId && book.date === date
    );
  }

  findByID(id) {
    return this.bookeds.find(book => book.id === id);
  }

  update(book) {
    const index = this.bookeds.findIndex(item => item.id === book.id);

    if (index === -1) {
      throw new Error("Booking not found!");
    }

    this.bookeds[index] = book;
    this.persist();

    return true;
  }
}
