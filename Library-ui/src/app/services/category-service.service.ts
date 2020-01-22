import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Category } from 'src/app/models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from 'src/app/models/book';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public API = 'http://localhost:8081';

  /**
   * Get all book's categories as reference data from Backend server.
   */
  loadCategories(): Observable<Category[]> {
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json');
    return this.http.get<Category[]>(this.API + '/library/rest/category/api/allCategories', {headers: headers});
  }
  /**
   * Save a new Category object in the Backend server data base.
   * @param Category parametre d'entree
   */
  saveCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.API + '/rest/category/api/addCategory', category);
  }

  /**
   * Update an existing Category object in the Backend server data base.
   * @param Category parametre d'entree
   */
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.API + '/rest/category/api/updateCategory', category);
  }

  /**
   * Delete an existing Book object in the Backend server data base.
   * @param Category parametre d'entree
   */
  deleteCategory(category: Category): Observable<string> {
    return this.http.delete<string>(this.API + '/rest/category/api/deleteCategory/' + category.code);
  }
  /**
   * Search books by title
   * @param title parametre d'entree
   */
/*  searchBookByTitle(title: string): Observable<Book[]> {
    return this.http.get<Book[]>('/library/rest/book/api/searchByTitle?title=' + title);
  }*/

}
