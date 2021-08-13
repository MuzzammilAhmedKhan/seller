import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit { 
  categoryModel: Category = new Category(0,'');
  editable: boolean = false;


  constructor(private categoryService: CategoryService, private router:Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() => {
      this.getCategoryById();
    })
  }
  back(){
    this.router.navigateByUrl("/category");
  }
  getCategoryById() {
    const categoryId = +this.activeRoute.snapshot.paramMap.get("id");
    if(categoryId > 0){
      this.editable = true;
    this.categoryService.getCategoryById(categoryId).subscribe(
      data => {
        this.categoryModel = data;
      });
    
    }
  }

  onSubmit(){
    if(this.editable){
      this.categoryService.updateCategory(this.categoryModel)
      .subscribe(data => {console.log(data);
      this.router.navigateByUrl("/category");
    })
    }else{
      this.categoryService.saveCategory(this.categoryModel)
      .subscribe(data => {console.log(data);
      this.router.navigateByUrl("/category");
    });
    }
  }

}
 