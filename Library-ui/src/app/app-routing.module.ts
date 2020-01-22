import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MenuComponent } from 'src/app/menus/menu/menu.component';
import { BookPageComponent } from 'src/app/book-page/book-page.component';
import { CustomerPageComponent } from 'src/app/customer-page/customer-page.component';
import { LoanPageComponent } from './loan-page/loan-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'book-page', component: BookPageComponent},
  {path: 'customer-page', component: CustomerPageComponent},
  {path: 'loan-page', component: LoanPageComponent},
  {path: 'category-page', component: CategoryPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
