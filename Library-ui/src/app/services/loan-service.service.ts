import { Injectable } from '@angular/core';
import { SimpleLoan } from '../models/simple-loan';
import { Loan } from '../models/loan';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mail } from '../models/mail';
@Injectable({
  providedIn: 'root'
})
export class LoanService {
  constructor(private http: HttpClient) { }

  public API = 'http://localhost:8081';

  /**
   * Save a new simpleLoan object in the Backend server data base.
   * @param book param entree
   */
  saveLoan(simpleLoan: SimpleLoan): Observable<Loan> {
    return this.http.post<Loan>(this.API + '/rest/loan/api/addLoan', simpleLoan);
  }

  /**
   * Close an existing loan object in the Backend server data base.
   * @param loan param entree
   */
  closeLoan(simpleLoan: SimpleLoan): Observable<boolean> {
    return this.http.post<boolean>(this.API + '/rest/loan/api/closeLoan', simpleLoan);
  }

  /**
   * Search Loans by email
   * @param email entree mail
   */
  searchLoansByEmail(email: string): Observable<Loan[]> {
    return  this.http.get<Loan[]>(this.API + '/rest/loan/api/customerLoans?email=' + email);
  }

  /**
   * Search Loans by maximum date
   * @param maxDate param date
   */
  searchLoansByMaximumDate(maxDate: Date): Observable<Loan[]> {
    const month: string = maxDate.getMonth() < 10 ? '0' + (maxDate.getMonth() + 1) : '' + (maxDate.getMonth() + 1);
    const dayOfMonth: string = maxDate.getDate() < 10 ? '0' + maxDate.getDate() : '' + maxDate.getDate();
    const maxDateStr: string = maxDate.getFullYear() + '-' + month + '-' + dayOfMonth;
    return  this.http.get<Loan[]>(this.API + '/rest/loan/api/maxEndDate?date=' + maxDateStr);
  }

  /**
   * Send an email to a customer
   * @param mail param entree
   */
  sendEmail(mail: Mail): Observable<boolean> {
    // let headers = new HttpHeaders();
    // headers.append('responseType', 'arraybuffer'); , {headers: headers}
    return this.http.put<boolean>(this.API + '/rest/customer/api/sendEmailToCustomer', mail);
  }


}
