import { Component, OnInit } from '@angular/core';
import { PostModel } from "../shared/post-model";
import { PostService } from "../shared/post.service";
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  posts: Array<PostModel> = [];

  constructor(private postService: PostService) {

  }

  ngOnInit(): void {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
    } else {
      console.log("JWT token not found in local storage");
    }

    this.postService.getPostsOrderedByVotes().subscribe(post => {
      this.posts = post;
    }, error => {
      console.log(error);
      throwError(error);
    });
    this.loadPosts();
  }
  loadPosts(): void {
    this.postService.getPostsOrderedByVotes().subscribe(post => {
      this.posts = post;
    }, error => {
      console.log(error);+
      throwError(error);
    });
  }

  onVoteUpdated(): void {
    this.loadPosts();
  }
}
