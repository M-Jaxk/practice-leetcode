import readline from "node:readline";
export class HotelCLI {
  constructor(roomService, bookService) {
    this.roomService = roomService;
    this.bookService = bookService;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  question(message) {
    return new Promise((resolver) => {
      this.rl.question(message, resolver);
    });
  }

  async start() {
    let running = true;

    console.log("\n=======================");
    console.log("MEETING ROOM BOOKING SYSTEM");
    console.log("=======================");
    console.log("1. Add Room");
    console.log("2. List Rooms");
    console.log("3. Add Book");
    console.log("4. List Books");
    console.log("5. Cancle Booking");
    console.log("6. Check Availability");
    console.log("7. Exit");
    while (running) {
      const option = await this.question("Enter option: ");

      try {
        switch (option) {
          case "1":
            await this.addRoom();
            break;

          case "2":
            await this.listRooms();
            break;

          case "3":
            await this.addBook();
            break;

          case "4":
            await this.listBooks();
            break;

          case "5":
            await this.cancelBooking();
            break;
        
         case "6":
            await this.checkAvailability();
            break;

        case "7":
            running = false;
            console.log("Good Bye!");

          default:
            console.log("Invalid option");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    this.rl.close();
  }

  async addRoom() {
    const name = await this.question("Enter room name: ");
    if (!name.trim()) {
      throw new Error("Name is required!");
    }

    const capacity = Number(await this.question("Enter capacity: "));
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("Capacity is required!");
    }

    const location = await this.question("Enter location: ");
    if (!location.trim()) {
      throw new Error("Location is required!");
    }

    const room = this.roomService.addRoom(name, capacity, location);

    console.log(`${room.name} created.`);
  }

  async listRooms() {
    const rooms = this.roomService.listRooms();

    console.table(rooms);
  }

  async addBook() {
    const roomId = Number(await this.question("Enter Room Id: "));
    const title = await this.question("Enter title: ");
    const organizer = await this.question("Enter organizer: ");
    const date = await this.question("Enter date: ");
    const startTime = await this.question("Enter start Time: ");
    const endTime = await this.question("Enter end Time: ");

    const book = this.bookService.addBook(
      roomId,
      title,
      organizer,
      date,
      startTime,
      endTime,
    );

    console.log(`${book.title} created in ${book.roomId}.`)
  }

  async listBooks(){
    const books = this.bookService.listBooks();

    if(books.length === 0){
        console.log("No books found!");
    }

    console.table(books);
  }

  async cancelBooking(){
    const id = Number(await this.question("Enter booking ID: "))

    if(!Number.isInteger(id) || id <= 0){
        throw new Error("Invalid Booking ID");
    }

    const book = this.bookService.cancelBooking(id);

    console.log(`${book.title} already cancelled.`);
  }

  async checkAvailability(){
    const roomId = Number(await this.question("Enter Room Id: "));
     const date = await this.question("Enter date: ");
    const startTime = await this.question("Enter start Time: ");
    const endTime = await this.question("Enter end Time: ");

    const book = this.bookService.isRoomAvailable(roomId,date,startTime,endTime);
    console.table(book);
  }
}
