export class Clinic
{
    clinicId: string;
    name:string;
    address:string

    constructor
    (
      id:string,
      name:string,
      address:string,
    ){
      this.clinicId = id;
      this.name = name;
      this.address = address;
    }
}