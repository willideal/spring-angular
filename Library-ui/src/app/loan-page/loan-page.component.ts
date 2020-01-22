import { Component, OnInit } from '@angular/core';
import {SimpleLoan} from '../models/simple-loan';
import {Loan} from '../models/loan';
import {LoanService} from '../services/loan-service.service';
import {BookService} from '../services/book-service.service';
import {CustomerService} from '../services/customer-service.service';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgForm} from '@angular/forms';
import {Book} from '../models/book';
import {Customer} from '../models/customer';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-loan-page',
  templateUrl: './loan-page.component.html',
  styleUrls: ['./loan-page.component.css']
})
export class LoanPageComponent implements OnInit {

  public types = [ 'Email', 'Maximum date'];
  public email: string;
  public maxDate: Date;
  public displayType = 'Email';
  public headsTab = ['ISBN', 'TITLE', 'EMAIL', 'LAST NAME', 'BEGIN DATE', 'END DATE'];
  public isNoResult = true;
  public isFormSubmitted = false;
  public actionButton = 'Save';
  public titleSaveOrUpdate = 'Add New Loan Form';
  public customerId: number;
  public isDisplaySendEmailForm = false;
  public disabledBackground  = false;
  public messageModal: string;
  public displayMessageModal = false;

  public simpleLoan = new SimpleLoan();
  public searchLoansResult: Loan[] = [];

  constructor(private loanService: LoanService, private bookService: BookService,
              private customerService: CustomerService, private http: HttpClient, private spinner: NgxSpinnerService) {

  }


  ngOnInit() {
  }

/**
 *  Method that save in the Backend server,
 *  a new loan data retreived from the form
 * @param addCustomerForm param entree
 */
  saveLoan(addLoanForm: NgForm) {
    this.spinner.show();
    this.displayMessageModal = false;
    if (!addLoanForm.valid) {
      window.alert('Error in the form');
    }
    const book = this.http.get<Book>('/library/rest/book/api/searchByIsbn?isbn=' + this.simpleLoan.isbn);
    const customer = this.http.get<Customer>('/library/rest/customer/api/searchByEmail?email=' + this.simpleLoan.email);
    forkJoin([book, customer]).subscribe(results => {
      if ((results[0] && results[0].id) && (results[1] && results[1].id)) {
        this.simpleLoan.bookId = results[0].id;
        this.simpleLoan.customerId = results[1].id;
        this.saveNewLoan(this.simpleLoan);
      } else {
        this.buildMessageModal('An error occurs when saving the loan data. May be data are not correct');
        this.spinner.hide();
      }
    });
  }

  /**
   * Save new loan
   * @param loan param d'entree
   */
  saveNewLoan(simpleLoan: SimpleLoan) {
    simpleLoan.beginDate = this.setLocalDateDatePicker(simpleLoan.beginDate);
    simpleLoan.endDate = this.setLocalDateDatePicker(simpleLoan.endDate);
    this.loanService.saveLoan(simpleLoan).subscribe(
      (result: Loan) => {
        if (result) {
          this.spinner.hide();
          this.buildMessageModal('Save operation correctly done');
        }
      },
      error => {
        this.spinner.hide();
        this.buildMessageModal('An error occurs when saving the loan data');
      }
    );
  }

  /**
   * Save local date from the date parameter :
   *   there is a recognized problem with datepicker @angular/material timezone conversion.
   * @param book param entree
   */
  setLocalDateDatePicker(date: Date): Date {
    const localDate = new Date(date);
    if (localDate.getTimezoneOffset() < 0) {
      localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset() );
    } else {
      localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset() );
    }
    return localDate;
  }

  /**
   * Delete an existing loan
   * @param loan param entree
   */
  closeLoan(loan: Loan) {
    this.spinner.show();
    this.displayMessageModal = false;
    const simpleLoan = new SimpleLoan();
    const book = this.http.get<Book>('/library/rest/book/api/searchByIsbn?isbn=' + loan.bookDTO.isbn);
    const customer = this.http.get<Customer>('/library/rest/customer/api/searchByEmail?email=' + loan.customerDTO.email);
    forkJoin([book, customer]).subscribe(results => {
      if ((results[0] && results[0].id) && (results[1] && results[1].id)) {
        simpleLoan.bookId = results[0].id;
        simpleLoan.customerId = results[1].id;
        this.loanService.closeLoan(simpleLoan).subscribe(
          result => {
            if (result) {
              this.spinner.hide();
              this.buildMessageModal('Loan closed');
            }
          });
      }
    });

  }

  /**
   * Erase all data from this NgForm.
   * @param addLoanForm param entree
   */
  clearForm(addLoanForm: NgForm) {
    addLoanForm.form.reset();
    this.displayMessageModal = false;
  }

  /**
   * Search loans by email or by max date
   * @param searchLoanForm param entree
   */
  searchLoansByType(searchLoanForm: NgForm) {
    this.spinner.show();
    this.displayMessageModal = false;
    if (!searchLoanForm.valid) {
      window.alert('Error in the form');
    }
    if (this.displayType === 'Email') {
      this.searchLoansResult = [];
      this.loanService.searchLoansByEmail(this.email).subscribe(
        (result: Loan[]) => {
          this.treatResult(result);
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          this.buildMessageModal('An error occurs when searching the loan data');
        }
      );
    } else if (this.displayType === 'Maximum date') {
      this.searchLoansResult = [];
      this.loanService.searchLoansByMaximumDate(this.maxDate).subscribe(
        (result: Loan[]) => {
          this.treatResult(result);
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
          this.buildMessageModal('An error occurs when searching the loan data');
        }
      );
    }
    this.isFormSubmitted = searchLoanForm.submitted;
  }

  treatResult(result: Loan[]) {
    if (result && result != null) {
      this.searchLoansResult = result;
      this.isNoResult = false;
      return;
    }
    this.isNoResult = true;
  }

  displaySendEmailForm(id: number) {
    this.customerId = id;
    this.isDisplaySendEmailForm = true;
    this.disabledBackground = true;
    this.displayMessageModal = false;
  }

  closeEmailForm() {
    this.isDisplaySendEmailForm = false;
    this.disabledBackground = false;
    this.displayMessageModal = false;
  }

  /**
   * Construit le message à afficher suite à une action utilisateur.
   * @param msg param entree param entree
   */
  buildMessageModal(msg: string) {
    this.messageModal = msg;
    this.displayMessageModal = true;
  }
}
