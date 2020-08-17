export class RoomDate {
    roomId:string;
    date:Date;
    
    constructor (roomId:string, date: Date ) {
        this.roomId = roomId;
        this.date = date;
    }
}