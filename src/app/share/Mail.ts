export class Mail
{
    subject: string;
    sender: string;
    receiver:string;
    body:string;
   
    constructor
    (
        subject: string,
        sender: string,
        receiver: string,
        body: string,
        
    ){
        this.subject = subject;
        this.sender = sender;
        this.receiver = receiver;
        this.body = body;
    }
}