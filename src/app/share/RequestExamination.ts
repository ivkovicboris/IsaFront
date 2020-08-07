export class RequestExamination {
    type:string;
    dateTime:Date;
    
    constructor (type:string, dateTime:Date) {
        this.type= type;
        this.dateTime = dateTime;
        
    }
}