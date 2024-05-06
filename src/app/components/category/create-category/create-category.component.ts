import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryModel } from '../category-response';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import Swal from 'sweetalert2';
 // Import JwtAuthServiceService
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {JwtService} from "../../../services/jwt.service";
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  createCategoryForm: FormGroup;
  categoryModel: CategoryModel;
  name = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router, private categoryService: CategoryService, private jwtService: JwtService) {
   this.createCategoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.categoryModel = {
      name: '',
      description: ''
    }
  }

  ngOnInit() {
  }

  discard() {
    this.router.navigateByUrl('/');
  }
  createCategory() {
    this.categoryModel.name = this.createCategoryForm.get('name').value;
    this.categoryModel.description = this.createCategoryForm.get('description').value;
    this.categoryService.createCategory(this.categoryModel).subscribe(data => {
      this.router.navigateByUrl('/forum');
    }, error => {
      if (error.status === 403) { // Assuming the server returns a 403 Forbidden status code for this case
        Swal.fire({
          title: 'Error!',
          text: 'Only admins can create categories',
          icon: 'error',
          confirmButtonText: 'Close'
        });
      }
      throwError(error);
    })
  }
}
