export class User
{
    firstName: string;
    lastName: string;
   // userName: string;
    jmbg: Int32Array;
    email:string;
    password:string;
    userRole: string;
    emailConfirmed: boolean;
    birthDate: any;
    address:string;
    city:string;
    state:string;
    specialization:string;
    employeeId:string;
    examinations:any

    constructor
    (
        firstName: string,
        lastName: string,
       // userName: string,
       jmbg: Int32Array,
        email: string,
        password: string,
        birthDate:any,
        userRole: string,
        emailConfirmed: boolean,
        address:string,
        city:string,
        state:string,
        specialization:string,
        employeeId:string,
        examinations:any[]

    ){
        this.firstName = firstName;
        this.lastName = lastName;
       // this.userName = userName;
       this.jmbg = jmbg;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
        this.userRole = userRole;
        this.address = address;
        this.city = city;
        this.state = state;
        this.specialization = specialization;
        this.employeeId = employeeId;

    }
}