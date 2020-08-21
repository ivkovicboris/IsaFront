
export class Vacation
{
    doctorId:string;
    startDate:Date;
    endDate:Date;
     
    constructor
    (
        doctorId:string,
        startDate:Date,
        endDate:Date,
      
    ){
        this.doctorId = doctorId;
        this.startDate = startDate;
        this.endDate = endDate;
       
    }
}