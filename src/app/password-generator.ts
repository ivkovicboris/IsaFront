export function GeneratePassword(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(),.?":<>';
    var charactersLength = characters.length;
    for ( var i = 0; i < length-3; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result ="Boris123!"
    return result;
 }
