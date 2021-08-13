export class User {
        id:number;
        firstName:string;
        lastName:string;
        userName:string;
        password:string;
        address1:string;
        address2:string;
    constructor(id:number, firstName:string, lastName:string,
        userName:string,password:string,address1:string,address2:string){
                this.id = id;
                this.firstName = firstName;
                this.lastName = lastName;
                this.userName = userName;
                this.password = password;
                this.address1 = address1;
                this.address2 = address2;
        }
}
