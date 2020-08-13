export class Clinic
{
    clinicId:string;
    name:string;
    address:string;
    about:string
    
    constructor
    (
      clinicId:string,
      name:string,
      address:string,
      about:string
    ){
      this.clinicId = clinicId;
      this.name = name;
      this.address = address;
      this.about = about;
    }
}