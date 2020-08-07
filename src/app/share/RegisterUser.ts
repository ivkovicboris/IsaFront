export class RegisterUser
{
    email:string;
    password:string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    jmbg: number;
    emailConfirmed: boolean;
    userRole: string;
    
   
    constructor
    (
        firstName:string,
        lastName:string,
        email: string,
        password: string,
        emailConfirmed: boolean,
        birthDate: Date,
        jmbg: number,
        userRole: string
    ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.emailConfirmed = emailConfirmed;
        this.birthDate = birthDate;
        this.jmbg = jmbg;
        this.userRole = userRole;
        
    }
}