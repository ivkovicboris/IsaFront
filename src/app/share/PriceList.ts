export class PriceList
{
    examinationType: string;
    price: number;
    clinicId :any;
   
    constructor
    (
        examinationType: string,
        price: number,
        clinicId :any,
    
    ){
        this.examinationType = examinationType;
        this.price = price;
        this.clinicId = clinicId;
    }
}