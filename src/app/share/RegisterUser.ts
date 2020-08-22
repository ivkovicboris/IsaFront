export class RegisterUser
{
    email:string;
    password:string;
    firstName: string;
    lastName: string;
    jmbg: number;
    emailConfirmed: boolean;
    address: string;
    city: string;
    state: string;
    userRole: string;
    specialization:string;
    clinicId:string;
    am:number;
    
   
    constructor
    (
        firstName:string,
        lastName:string,
        email: string,
        password: string,
        emailConfirmed: boolean,
        jmbg: number,
        address:string,
        city:string,
        state:string,
        userRole: string,
        specialization:string,
        clinicId:string,
        am:number
    ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.emailConfirmed = emailConfirmed;
        this.jmbg = jmbg;
        this.address = address;
        this.city = city;
        this.state = state;
        this.userRole = userRole;
        this.specialization = specialization;
        this.clinicId = clinicId;
        this.am=am;
        
    }
}