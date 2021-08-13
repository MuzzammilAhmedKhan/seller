import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';


const routes:Routes =[
  {path:'category',component:CategoryListComponent},
  {path:'book',component:BookListComponent},
  
  {path:`categoryform/:id`,component:CategoryFormComponent},
  {path:`categoryform`,component:CategoryFormComponent},
  {path:`bookform/:id`,component:BookFormComponent},
  {path:`bookform`, component:BookFormComponent},
  {path:'',component:LandingPageComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    BookListComponent,
    LeftNavComponent,
    BookFormComponent,
    LandingPageComponent,
    CategoryFormComponent,
          
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
