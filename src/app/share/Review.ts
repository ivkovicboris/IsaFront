export class Review {
    
    patientId:string;
    mark:number;
    comment:string;
    reviewedId:string;

    constructor (
        patientId:string,
        mark:number,
        comment:string,
        reviewedId:string,
        ) 
         {
             this.patientId = patientId;
             this.mark = mark;
             this.comment = comment;
             this.reviewedId = reviewedId;
         }

}       