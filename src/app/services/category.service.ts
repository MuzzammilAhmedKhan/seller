import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryUrl ="http://localhost:8080/magic-api/category";
  
  constructor(private httpClient:HttpClient) { }

  getAllCategories():Observable<Category[]>{

    return this.httpClient.get<GetResponseCategory>(this.categoryUrl)
    .pipe(map((response) => response._embedded.bookCategories));
  }
  getCategoryById(category_id: number):Observable<Category> {
    const categoryDetailUrl = `${this.categoryUrl}/${category_id}`;

  return this.httpClient.get<Category>(categoryDetailUrl);
  }

  saveCategory(bookCategories:Category):Observable<Category>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-origin':'*'
        //,mode :'no-cors'
      })
    };
    return this.httpClient.post<Category>
     (this.categoryUrl,bookCategories,httpOptions);

  }

  updateCategory(categories:Category):Observable<Category>{
    

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-origin':'*'
        
      })
    };
    return this.httpClient.put<Category>
    (this.categoryUrl+`/${categories.categoryId}`,categories,httpOptions);

    }

    deleteCategory(category_id:number):Observable<Category>{
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
  
      };
      return this.httpClient.delete<Category>(`${this.categoryUrl}/${category_id}`,httpOptions);
    }

    
}

interface GetResponseCategory{
  _embedded:{
    bookCategories:Category[];
  }
}
