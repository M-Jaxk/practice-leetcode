import { Booking } from "../models/booking.js";

export class BookRepository{
    constructor(){
        this.bookeds=[];
        this.nextId = 1; 
    }

    create(roomId, title, organizer, date, startTime, endTime){
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
        return book;
    }

    findMany(){
        return this.bookeds;
    }

    findByRoomAndDate(roomId, date){
        return this.bookeds.filter(book =>
            book.roomId === roomId && book.date === date
        );
    }

    findByID(id){
        return this.bookeds.find(book=>
            book.id === id
        )
    }

    update(book){
        const index = this.bookeds.findIndex(book=>book.id===book.id);

        if(index <= -1){
            throw new Error("Booking not found!");
        }

        this.bookeds[index] = book;
        return true;
    }
}