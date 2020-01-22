import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';


@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private http: HttpClient) { }

  public API = 'http://localhost:8081';

  /**
   * Save a new Customer object in the Backend server data base.
   * @param book parametre d'entree
   */
  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.API + '/rest/customer/api/addCustomer', customer);
  }

  /**
   * Update an existing Customer object in the Backend server data base.
   * @param customer parametre d'entree
   */
  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.API + '/rest/customer/api/updateCustomer', customer);
  }

  /**
   * Delete an existing Customer object in the Backend server data base.
   * @param customer parametre d'entree
   */
  deleteCustomer(customer: Customer): Observable<string> {
    return this.http.delete<string>(this.API + '/rest/customer/api/deleteCustomer/' + customer.id);
  }

  /**
   * Search customer by email
   * @param email parametre d'entree
   */
  searchCustomerByEmail(email: string): Observable<Customer> {
    return  this.http.get<Customer>(this.API + '/rest/customer/api/searchByEmail?email=' + email);
  }

  /**
   * Search books by pagination
   * @param beginPage parametre d'entree
   * @param endPage,
   */
  searchCustomerByLastName(lastName: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.API + '/rest/customer/api/searchByLastName?lastName=' + lastName);
  }

}
