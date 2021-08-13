import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/common/book';
import { Category } from 'src/app/common/category';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookModel:Book = new Book(0,'','',0,'',true,0, new Date(), new Date(),0);
  editable: boolean = false;
  categories:Category[] = [];
  constructor(private bookService: BookService, private categoryService: CategoryService, private router:Router,
      private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => {
      this.getBookById();
    })
  }

  back(){
    this.router.navigateByUrl("/book");
  }

  getBookById(){ 
    const bookId = +this.activeRoute.snapshot.paramMap.get("id");
    if (bookId > 0){
    this.editable = true;
    this.bookService.getBookById(bookId).subscribe(
      data => {
        this.bookModel = data;
      } );
    }
    //get category list for drop down
    this.categoryService.getAllCategories()
    .subscribe(data => {
      this.categories = data
    });
  }

  onSubmit(){
    //set dates to current date
    console.log('in on submit');
    this.bookModel.dateCreated = new Date();
    this.bookModel.lastUpdated = new Date();

    if(this.editable){
      console.log(this.editable);
      //update the Product 
      this.bookService.updateBook(this.bookModel)
      .subscribe(data => {console.log(data);
        this.router.navigateByUrl("/book");
      });
    }else{
      console.log('in else block');
      console.log(this.bookModel);
      //save Product
      this.bookService.saveBook(this.bookModel)
    .subscribe(data => {console.log(data);
      this.router.navigateByUrl("/book");
    });
    }

    
  }

}
