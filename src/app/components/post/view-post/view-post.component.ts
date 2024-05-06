// ViewPostComponent
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/components/shared/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/components/shared/post-model';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/components/comment/comment.payload';
import { CommentService } from 'src/app/components/comment/comment.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditCommentDialogComponent } from "../../comment/edit-comment-dialog/edit-comment-dialog.component";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  bsModalRef: BsModalRef;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
              private commentService: CommentService, private router: Router, private modalService: BsModalService) {
    this.postId = this.activateRoute.snapshot.params['id'];

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();

    // Initialize CommentPayload here
    this.commentPayload = {
      text: '',
      postId: this.postId,
    };
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text').setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }

  editComment(comment: CommentPayload): void {
    console.log('Comment Text:', comment.text); // Add this line for debugging

    this.bsModalRef = this.modalService.show(EditCommentDialogComponent, {
      initialState: {
        text: comment.text
      }
    });

    this.bsModalRef.content.onCloseSubscription = this.bsModalRef.content.onClose.subscribe(result => { // Capture the subscription
      console.log('Result:', result);
      console.log('Text:', result);

      if (result) {
        this.commentService.editComment(comment.idComment, result).subscribe(updatedComment => {
          const index = this.comments.findIndex(c => c.idComment === updatedComment.idComment);
          this.comments[index].text = updatedComment.text;
        }, error => {
          throwError(error);
        });
      }
    });
  }

  deleteComment(comment: CommentPayload) {
    this.commentService.deleteComment(comment.idComment).subscribe(data => {
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    });
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }
}
