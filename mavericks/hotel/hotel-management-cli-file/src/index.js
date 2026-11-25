import { RoomRepository } from "./repositories/roomRepository.js";
import { RoomService } from "./services/roomService.js";
import { BookService } from "./services/bookService.js";
import { HotelCLI } from "./cli/hotelCLI.js";
import { BookRepository } from "./repositories/bookRepository.js";

const roomRepository = new RoomRepository();
const bookRepository = new BookRepository;
const roomService = new RoomService(roomRepository);
const bookService = new BookService(bookRepository);
const hotelCLI = new HotelCLI(roomService,bookService);

hotelCLI.start();