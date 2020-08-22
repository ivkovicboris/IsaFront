
export class Examination
{
    examinationId: string;
    date:Date;
    roomId:string;
    doctorId: string;
    patientId:string;
    //status:string;
    type:string;
    price:number;
    
    constructor(
        examinationId: string,
        date:Date,
        roomId:string,
        doctorId: string,
        patientId:string,
        //status:string,
        type:string,
        price:number,
    ){
        this.examinationId = examinationId;
        this.dateTime = date;
        this.roomId=roomId;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.type = type;
        this.price= price;
    }
}