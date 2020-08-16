export class Price
{
    
    priceId:string;
    examinationType: string;
    priceValue: any;
    discount: any;
    discountedPrice:any;
    clinicId :any;
   
    constructor
    (
        priceId:string,
        examinationType: string,
        priceValue: any,
        discount: any,
        discountedPrice:any,
        clinicId :any,
    
    ){
        this.priceId = priceId;
        this.examinationType = examinationType;
        this.priceValue = priceValue;
        this.discount = discount;
        this.discountedPrice = discountedPrice;
        this.clinicId = clinicId;
    }
}