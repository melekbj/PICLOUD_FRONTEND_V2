// forum.component.ts

import { Component, OnInit } from '@angular/core';
import { PostModel } from "../shared/post-model";
import { PostService } from "../shared/post.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  posts: Array<PostModel> = [];
  pagedPosts: Array<PostModel> = []; // posts for the current page
  currentPage: number = 1;
  postsPerPage: number = 2; // adjust this value as needed

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
    } else {
      console.log("JWT token not found in local storage");
    }

    this.loadPosts().add(() => {
      this.updatePagedPosts(); // Call updatePagedPosts() here
    });
  }

  loadPosts(): Subscription {
    return this.postService.getPostsOrderedByVotes().subscribe(
      posts => {
        this.posts = posts;
      },
      error => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  handlePageChange(event: any): void {
    this.currentPage = event; // event is the page number emitted by ngb-pagination
    this.updatePagedPosts(); // Update the posts for the new page
  }

  updatePagedPosts(): void {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    this.pagedPosts = this.posts.slice(startIndex, startIndex + this.postsPerPage);
  }

  onVoteUpdated(): void {
    this.loadPosts().add(() => {
      this.updatePagedPosts(); // Call updatePagedPosts() here
    });
  }
}
