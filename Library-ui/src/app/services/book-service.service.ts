import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from 'src/app/models/book';


@Injectable({
  providedIn: 'root'
})

export class BookService {
  constructor(private http: HttpClient) { }

  public API = 'http://localhost:8081';
  /**
   * Get all book's categories as reference data from Backend server.
   */
  loadCategories(): Observable<Category[]> {
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json');
    return this.http.get<Category[]>(this.API + '/rest/category/api/allCategories');
  }

  /**
   * Save a new Book object in the Backend server data base.
   * @param book parametre d'entree
   */
  saveBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.API + '/rest/book/api/addBook', book);
  }

  /**
   * Update an existing Book object in the Backend server data base.
   * @param book parametre d'entree
   */
  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(this.API + '/rest/book/api/updateBook', book);
  }

  /**
   * Delete an existing Book object in the Backend server data base.
   * @param book parametre d'entree
   */
  deleteBook(book: Book): Observable<string> {
    return this.http.delete<string>(this.API + '/rest/book/api/deleteBook/' + book.id);
  }

  /**
   * Search books by isbn
   * @param isbn parametre d'entree
   */
  searchBookByIsbn(isbn: string): Observable<Book> {
    return  this.http.get<Book>(this.API + '/rest/book/api/searchByIsbn?isbn=' + isbn);
  }

  /**
   * Search books by title
   * @param title parametre d'entree
   */
  searchBookByTitle(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.API + '/rest/book/api/searchByTitle?title=' + title);
  }


}
