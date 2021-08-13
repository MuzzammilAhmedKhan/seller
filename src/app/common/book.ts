export class Book {
    bookId: number;
    bookName : string;
    bookDescription : string;
    unitPrice : number; 
    bookImage : string;
    active : boolean;
    availableStock : number;
    dateCreated : Date;
    lastUpdated : Date;
    categoryId : number;

constructor(
        bookId: number,
        bookName : string,
        bookDescription : string,
        unitPrice : number,
        bookImage : string,
        active : boolean,
        availableStock : number,
        dateCreated : Date,
        lastUpdated : Date,
        categoryId : number){
            this.bookId = bookId;
            this.bookName = bookName;
            this.bookDescription = bookDescription;
            this.unitPrice = unitPrice;
            this.bookImage = bookImage;
            this.active = active;
            this.availableStock = availableStock;
            this.dateCreated = dateCreated;
            this.lastUpdated = lastUpdated;
            this.categoryId = categoryId;
        }

}
