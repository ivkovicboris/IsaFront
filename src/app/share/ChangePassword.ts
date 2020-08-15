export class ChangePassword
{
    userId:string;
    oldPassword:string;
    newPassword:string;
    
    constructor
    (
      userId:string,
      oldPassword:string,
      newPassword:string,
    
    ){
      this.userId = userId;
      this.oldPassword = oldPassword;
      this.newPassword = newPassword;
    }
}