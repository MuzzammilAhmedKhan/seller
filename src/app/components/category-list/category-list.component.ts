//category-list is the book_category table in MySQL-->
//category-list is the book_category table in MySQL-->
//category-list is the book_category table in MySQL-->
//category-list is the book_category table in MySQL-->
//category-list is the book_category table in MySQL-->
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories:Category[] = [];

  constructor(private categoryService:CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories(){
    this.categoryService.getAllCategories()
    .subscribe(data => {
      console.log(data);
      this.categories = data
    });
  }

  onEdit(id:number){
    this.router.navigateByUrl(`categoryform/${id}`);
  }

  onDelete(id:number){
    console.log(id);
    if(confirm("Do you want to delete?")){

      this.categoryService.deleteCategory(id).
      subscribe(data => {console.log('deleted');
      this.listCategories});
     
    }
  }
  


}
