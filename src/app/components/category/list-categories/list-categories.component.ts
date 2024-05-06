import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../category-response';
import {CategoryService} from '../category.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  categories: Array<CategoryModel>;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
    } else {
      console.log("JWT token not found in local storage");
    }

    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
      console.log(data);
    }, error => {
      console.log(error);
      throwError(error);
    });
  }
}