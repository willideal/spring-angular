import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Book} from '../models/book';
import {Category} from '../models/category';
import {CategoryService} from 'src/app/services/category-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  public code;
  public label: string;
  public headsTab = ['CODE', 'LABEL'];
  public isNoResult = true;
  public isFormSubmitted = false;
  public actionButton = 'Save';
  public titleSaveOrUpdate = 'Add New Category Form';
  public messageModal: string;
  public displayMessageModal = false;

  public categories: Category[] = [{code: '', label: ''}];
  public category = new Category();
  public searchCategoriesResult: Category[] = [];

  constructor(private categoryService: CategoryService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  /**
   * Method that save in the Backend server,
   *  a new Category data retreived from the form
   * @param addCategoryForm parametre d'entree
   */
  saveOrUpdateCategory(addCategoryForm: NgForm) {
    this.displayMessageModal = false;
    if (!addCategoryForm.valid) {
      window.alert('Error in the form');
    }
    if (this.actionButton && this.actionButton === 'Save') {
      this.saveNewCategory(this.category);
    } else if (this.actionButton && this.actionButton === 'Update') {
      this.updateCategory(this.category);
    }
    this.titleSaveOrUpdate = 'Add New Category Form';
    this.actionButton = 'Save';
  }
  /**
   * Save new category
   * @param category parametre d'entree
   */
  saveNewCategory(category: Category) {
    this.spinner.show();
    this.categoryService.saveCategory(category).subscribe(
      (result: Category) => {
        if (result.code) {
          this.spinner.hide();
          this.buildMessageModal('Save operation correctly done');
        }
      },
      error => {
        this.spinner.hide();
        this.buildMessageModal('An error occurs when saving the book data');
      }
    );
  }

  /**
   * Update an existing book
   * @param book parametre d'entree
   */
  updateCategory(category: Category) {
    this.spinner.show();
    this.categoryService.updateCategory(category).subscribe(
      (result: Category) => {
        if (result.code) {
         // this.updateResearchBooksTab(book);
          this.spinner.hide();
          this.buildMessageModal('Update operation correctly done');
        }
      },
      error => {
        this.spinner.hide();
        this.buildMessageModal('An error occurs when updating the book data');
      }
    );
  }
  /**
   * Delete an existing book
   * @param category parametre d'entree
   */
  deleteCategory(category: Category) {
    this.spinner.show();
    this.displayMessageModal = false;
    this.categoryService.deleteCategory(category).subscribe(
      result => {
       /* for ( let i = 0; i < this.searchBooksResult.length; i++) {
          if ( this.searchBooksResult[i].id === book.id) {
            this.searchBooksResult.splice(i, 1);
          }
        }*/
        this.spinner.hide();
        this.buildMessageModal('End of delete operation');
       /* if (this.searchBooksResult.length === 0) {
          this.isNoResult = true;
        }*/
      });
  }
  /**
   * Set the selected book as the book to be updated
   * @param category parametre d'entree
   */
  setUpdateCategory(category: Category) {
    this.titleSaveOrUpdate = 'Update Cateogry Form';
    this.actionButton = 'Update';
    this.category = Object.assign({}, category);
    this.displayMessageModal = false;
  }
  /**
   * Erase all data from this NgForm.
   * @param addCategoryForm parametre d'entree
   */
  clearForm(addCategoryForm: NgForm) {
    addCategoryForm.form.reset();
    this.displayMessageModal = false;
  }
  /**
   * Construit le message à afficher suite à une action utilisateur.
   * @param msg parametre d'entree
   */
  buildMessageModal(msg: string) {
    this.messageModal = msg;
    this.displayMessageModal = true;
  }

}
