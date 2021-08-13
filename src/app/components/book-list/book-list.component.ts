import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/common/book';
import { Category } from 'src/app/common/category';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books:Book[] = [];
  categories: Category[] = [];

  constructor(private bookService: BookService,private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.getAllCategories();
  }
  getAllCategories() {
    //get category list for drop down
    this.categoryService.getAllCategories()
    .subscribe(data => {
      this.categories = data;
      console.log(data);
    })
  }
  getAllBooks(){
    this.bookService.getBooks() 
    .subscribe(data => {
      console.log(data);
      this.books = data
    });
  }

  onEdit(id:number){
    console.log(id);
    console.log(`bookform/${id}`);
    this.router.navigateByUrl(`bookform/${id}`); 
  }

  onDelete(id:number){
    console.log(id);
    if(confirm("Do you want to delete?")){

      this.bookService.deleteBook(id).
      subscribe(data => {console.log('deleted');
      //reload the list
      this.getAllBooks();
    });
     
    }
  }

  categoryChange(category:string){
    if(category == '0'){
      //gives all books without filter
      this.getAllBooks();
    }else{
      //comes here when a category is selected
      this.bookService.getBooksByCategoryId(+category).subscribe(data => {
        this.books = data;
      });
    }
  }

}
