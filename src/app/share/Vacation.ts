
export class Vacation
{
    doctorID:string;
    startDate:Date;
    endDate:Date;
     
    constructor
    (
        doctorID:string,
        startDate:Date,
        endDate:Date,
      
    ){
        this.doctorID = doctorID;
        this.startDate = startDate;
        this.endDate = endDate;
       
    }
}