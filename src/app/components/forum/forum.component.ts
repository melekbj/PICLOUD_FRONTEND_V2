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

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
    } else {
      console.log("JWT token not found in local storage");
    }

    this.loadPosts();
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

  onVoteUpdated(): void {
    this.loadPosts();
  }
}
