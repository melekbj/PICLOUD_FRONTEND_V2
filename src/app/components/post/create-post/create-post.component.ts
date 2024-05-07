import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoryModel } from 'src/app/components/category/category-response';
import { Router } from '@angular/router';
import { PostService } from 'src/app/components/shared/post.service';
import { CategoryService } from 'src/app/components/category/category.service';
import { throwError } from 'rxjs';
import { CreatePostPayload } from './create-post.payload';

import Filter from 'bad-words';
import { JwtService } from "../../../services/jwt.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  filter = new Filter();
  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  categories: Array<CategoryModel>;
  selectedFile: File;

  constructor(
    private router: Router,
    private postService: PostService,
    private categoryService: CategoryService,
    private jwtService: JwtService
  ) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      categoryId: null,
    };
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      categoryName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  // createPost() {
  //   if (this.createPostForm.invalid) {
  //     this.createPostForm.markAllAsTouched();
  //     return;
  //   }
  //   this.postPayload.postName = this.createPostForm.get('postName').value;
  //   this.postPayload.url = this.createPostForm.get('url').value;
  //   let description=this.createPostForm.get('description').value;
  //   description=this.filter.clean(description); // Clean the description
  //   this.postPayload.description = description; // Assign the cleaned value
  //
  //   const selectedCategory = this.categories.find(
  //     (category) => category.name === this.createPostForm.get('categoryName').value
  //   );
  //   this.postPayload.categoryId = selectedCategory ? selectedCategory.idCategory : null;
  //
  //   this.postService.createPost(this.postPayload, this.postPayload.categoryId).subscribe(
  //     (data) => {
  //       this.router.navigateByUrl('/forum');
  //     },
  //     (error) => {
  //       throwError(error);
  //     }
  //   );
  // }
  createPost() {
    if (this.createPostForm.invalid) {
      this.createPostForm.markAllAsTouched();
      return;
    }
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.url = this.createPostForm.get('url').value;
    let description=this.createPostForm.get('description').value;
    description=this.filter.clean(description); // Clean the description
    this.postPayload.description = description; // Assign the cleaned value

    const selectedCategory = this.categories.find(
      (category) => category.name === this.createPostForm.get('categoryName').value
    );
    this.postPayload.categoryId = selectedCategory ? selectedCategory.idCategory : null;
    this.postPayload.image = this.selectedFile; // Assign the selected file

    const postData = new FormData();
    postData.append('postName', this.postPayload.postName);
    postData.append('url', this.postPayload.url);
    postData.append('description', this.postPayload.description);
    postData.append('categoryId', this.postPayload.categoryId.toString());
    if (this.postPayload.image) {
      postData.append('image', this.postPayload.image, this.postPayload.image.name);
    }

    this.postService.createPost(postData, this.postPayload.categoryId).subscribe(
      (data) => {
        this.router.navigateByUrl('/forum');
      },
      (error) => {
        throwError(error);
      }
    );
  }
  discardPost() {
    this.router.navigateByUrl('/');
  }
}
