import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../category-response';
import { CategoryService } from '../category.service';
import { throwError } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-all-categories-dialog',
  templateUrl: './all-categories-dialog-component.component.html',
  styleUrls: ['./all-categories-dialog-component.component.css']
})
export class AllCategoriesDialogComponent implements OnInit {
  categories: Array<CategoryModel>;

  constructor(private categoryService: CategoryService, public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      throwError(error);
    });
  }
  onCategoryClick() {
    this.bsModalRef.hide();
  }
}