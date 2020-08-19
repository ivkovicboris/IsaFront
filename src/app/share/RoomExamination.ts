export class RoomExamination {
    roomId:string;
    examinationId:string;
    
    constructor (roomId:string, examinationId:string ) {
        this.roomId = roomId;
        this.examinationId = examinationId;
    }
}