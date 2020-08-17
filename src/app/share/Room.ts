export class Room {
    roomId:string;
    name:string;
    number:string;
    clinicId:string;

    constructor (roomId:string, name:string, number:string, clinicId:string ) {
        this.roomId = roomId;
        this.name= name;
        this.number = number;
        this.clinicId = clinicId;
    }
}