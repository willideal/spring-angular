import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BookPageComponent } from './book-page/book-page.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { LoanPageComponent } from './loan-page/loan-page.component';
import { MenuComponent } from './menus/menu/menu.component';
import { BackToMenuComponent } from './menus/back-to-menu/back-to-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MailModalComponent } from './modal/mail-modal/mail-modal.component';
import { MessageModalComponent } from './modal/message-modal/message-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule, MatInputModule, MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material';




@NgModule({
  declarations: [
    AppComponent,
    BookPageComponent,
    CustomerPageComponent,
    CategoryPageComponent,
    LoanPageComponent,
    MenuComponent,
    BackToMenuComponent,
    MailModalComponent,
    MessageModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,   /* for using form elements like NgForm */
    HttpClientModule, /* for using http request elements end verbs like GET, POST, ... */
    NgxSpinnerModule, /* for using spinner */
    MatDatepickerModule, MatInputModule, MatNativeDateModule, BrowserAnimationsModule, ReactiveFormsModule,
    /* for using input date picker -> need to install @angular/material package*/



  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
