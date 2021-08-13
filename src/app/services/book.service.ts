import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../common/book';
import { map } from "rxjs/operators";
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookUrl = "http://localhost:8080/magic-api/book";
  private categoryUrl = "http://localhost:8080/magic-api/category";
  private findByCategoryId = "http://localhost:8080/magic-api/book/search/findByBook?categoryId=";


  constructor(private httpClient : HttpClient) { }

  getBooks():Observable<Book[]>{
    return this.httpClient.get<GetResponseBook>(this.bookUrl)
    .pipe(map(response => response._embedded.books));
  }

  saveBook(book:Book):Observable<Book>{
    console.log('in save book');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-origin':'*'
        //,mode :'no-cors'
      })
    };
    return this.httpClient.post<Book>(this.bookUrl,book,httpOptions);
  }

  updateBook(book:Book):Observable<Book>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-origin':'*'
        
      })
    };
    return this.httpClient.put<Book>(this.bookUrl+`/${book.bookId}`,book,httpOptions);
  }

  deleteBook(bookId:number):Observable<Book>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.httpClient.delete<Book>(`${this.bookUrl}/${bookId}`,httpOptions);
  }

  getBookById(bookId: number):Observable<Book> {
    const bookDetailUrl = `${this.bookUrl}/${bookId}`;

    return this.httpClient.get<Book>(bookDetailUrl);
  }

  getBooksByCategoryId(categoryId:number):Observable<Book[]>{
    const searchUrl= `${this.bookUrl}/search/findByBook?categoryId=${categoryId}`;

    return this.httpClient.get<GetResponseBook>(searchUrl)
    .pipe(map((response) => response._embedded.books));
  }
}

interface GetResponseBook{
  _embedded:{
    books:Book[]
  }
}

interface GetResponseCategory{
  _embedded:{
    bookCategories: Category[]
  }
}
