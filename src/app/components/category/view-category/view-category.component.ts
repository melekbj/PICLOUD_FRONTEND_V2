import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PostModel} from "../../shared/post-model";
import {PostService} from "../../shared/post.service";

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  posts: PostModel[]= [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['id'];
      this.postService.getPostsByCategory(categoryId).subscribe(posts => {
        this.posts = posts;
      });
    });
  }
}
