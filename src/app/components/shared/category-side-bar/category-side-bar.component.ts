import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../category/category-response';
import { CategoryService } from '../../category/category.service';
import { MatDialog } from '@angular/material/dialog';
import {
  AllCategoriesDialogComponent
} from "../../category/all-categories-dialog-component/all-categories-dialog-component.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {JwtService} from "../../../services/jwt.service";  // Add this line

@Component({
  selector: 'app-category-side-bar',
  templateUrl: './category-side-bar.component.html',
  styleUrls: ['./category-side-bar.component.css']
})


export class CategorySideBarComponent implements OnInit {
  categories: Array<CategoryModel> = [];
  displayViewAll: boolean;
  bsModalRef: BsModalRef;
  isAdmin: boolean = false;
  constructor(private categoryService: CategoryService, private modalService: BsModalService,private jwtService: JwtService) {
    this.categoryService.getAllCategories().subscribe(data => {
      if (data.length > 3) {
        this.categories = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.categories = data;
      }
    });
  }
  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(category => category.idCategory !== id);
    });
  }
  ngOnInit(): void {
    this.jwtService.getUserRole().subscribe(role => {
      this.isAdmin = role === 'ADMIN';
    });
  }

  onViewAll() {
    this.bsModalRef = this.modalService.show(AllCategoriesDialogComponent);
  }
}
