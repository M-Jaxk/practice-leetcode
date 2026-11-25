export class Booking{
    //initializie booking properties
    //id
    //roomId
    //title
    //booker(ornagizer)
    //date
    //startTime
    //endTime
    //status
    //createdAt
    //cancelledAt
    constructor(id,roomId,title,organizer,date,startTime,endTime){

        this.id = id;
        this.roomId = roomId;
        this.title = title;
        this.organizer = organizer;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = "CONFIRMED";
        this.createdAt = new Date();
        this.cancelledAt = null;
    }
}