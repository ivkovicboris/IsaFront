export class Mail
{
    subject: string;
    sender: string;
    receivers:Array<string>;
    body:string;
   
    constructor
    (
        subject: string,
        sender: string,
        receivers: Array<string>,
        body: string,
        
    ){
        this.subject = subject;
        this.sender = sender;
        this.receivers = receivers;
        this.body = body;
    }
}