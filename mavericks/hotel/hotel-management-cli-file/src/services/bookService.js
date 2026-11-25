import { toMinutes } from "../utils/time.js";

export class BookService {

  //initialize repo
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  //creat book
  //check is occupied or not 
  addBook(roomId, title, organizer, date, startTime, endTime) {
    const conflicts = this.checkOccupied(roomId, date, startTime, endTime);

    if (conflicts.length > 0) {
      throw new Error(`Room ${roomId} is already booked at that time: ${conflicts[0].startTime}-${conflicts[0].endTime}`);
    }

    return this.bookRepository.create(
      roomId,
      title,
      organizer,
      date,
      startTime,
      endTime,
    );
  }

  checkOccupied(roomId, date, startTime, endTime) {
    const id = roomId;

    //validation
    if (!Number.isInteger(roomId) || roomId <= 0) {
      throw new Error("Invalid room id");
    }

    if (typeof date !== "string" || !date.trim()) {
      throw new Error("Date is required");
    }

    //convert to minutes
    const start = toMinutes(startTime);
    const end = toMinutes(endTime);

    if (end <= start) {
      throw new Error("End time must be after start time");
    }

    return this.bookRepository
      .findByRoomAndDate(id, date)
      .filter(book => book.status !== "CANCELLED")
      .filter(book => {
        const bookedStart = toMinutes(book.startTime);
        const bookedEnd = toMinutes(book.endTime);
        return start < bookedEnd && bookedStart < end;
      });
  }


  //check available room
  isRoomAvailable(roomId, date, startTime, endTime) {
    return this.checkOccupied(roomId, date, startTime, endTime).length === 0;
  }



  listBooks() {
    return this.bookRepository.findMany();
  }

  cancelBooking(id) {
    const book = this.bookRepository.findByID(id);

    if (!book) {
      throw new Error("Book not found");
    }

    book.status = "CANCELLED";
    book.cancelledAt = new Date();

    this.bookRepository.update(book);
    return book;
  }
}
