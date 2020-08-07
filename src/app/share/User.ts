export class User
{
    firstName: string;
    lastName: string;
   // userName: string;
   jmbg: Int32Array;
    email:string;
    password:string;
    //role: string;
    emailConfirmed: boolean;
    birthDate: any;

    constructor
    (
        firstName: string,
        lastName: string,
       // userName: string,
       jmbg: Int32Array,
        email: string,
        password: string,
        birthDate:any,
       // role:string,
        emailConfirmed: boolean,

    ){
        this.firstName = firstName;
        this.lastName = lastName;
       // this.userName = userName;
       this.jmbg = jmbg;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
        //this.role = role;
    }
}