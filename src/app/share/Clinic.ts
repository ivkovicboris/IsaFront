import { Price } from './Price';

export class Clinic
{
    clinicId:string;
    name:string;
    address:string;
    about:string;
    priceList:Price[];
    
    constructor
    (
      clinicId:string,
      name:string,
      address:string,
      about:string,
      priceList:Price[]
    ){
      this.clinicId = clinicId;
      this.name = name;
      this.address = address;
      this.about = about;
      this.priceList=priceList;
    }
}