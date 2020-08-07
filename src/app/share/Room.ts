export class Room {
    name:string;
    number:string;
    clinicId:string;

    constructor (name:string, number:string, clinicId:string) {
        this.name= name;
        this.number = number;
        this.clinicId = clinicId;
    }
}