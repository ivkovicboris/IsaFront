export class RequestExamination {
    clinicId:string;
    dateTime:Date;
    type:string;
    
    
    constructor (clinicId:string, dateTime:Date, type:string ) {
        this.type= type;
        this.dateTime = dateTime;
        this.clinicId=clinicId;
        
    }
}