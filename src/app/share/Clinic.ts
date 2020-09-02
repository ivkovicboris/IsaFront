import { Price } from './Price';

export class Clinic
{
    clinicId:string;
    name:string;
    about:string;
    address:string;
    longitude: number;
    latitude:number;
    priceList:Price[];
    
    constructor
    (
      clinicId:string,
      name:string,
      about:string,
      address:string,
      longitude: number,
      latitude:number,
      priceList:Price[]
    ){
      this.clinicId = clinicId;
      this.name = name;
      this.about = about;
      this.address = address;
      this.longitude = longitude;
      this.latitude = latitude;
      this.priceList=priceList;
    }
}