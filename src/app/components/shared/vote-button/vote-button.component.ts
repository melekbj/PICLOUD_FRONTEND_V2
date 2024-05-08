import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { PostModel } from '../post-model';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { VotePayload } from './vote-payload';
import { VoteType } from './vote-type';
import { VoteService } from '../vote.service';
import { PostService } from '../post.service';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;
  @Output() voteUpdated = new EventEmitter<void>();
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  constructor(private voteService: VoteService,
              private postService: PostService,
              private toastr: ToastrService) {

    this.votePayload = {
      voteType: undefined,
      postId: undefined
    };
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    this.castVote(VoteType.UPVOTE);
  }

  downvotePost() {
    this.castVote(VoteType.DOWNVOTE);
  }

  private castVote(voteType: VoteType) {
    this.votePayload.voteType = voteType;
    this.votePayload.postId = this.post.postId;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.voteUpdated.emit();
      this.updateVoteDetails();
    }, error => {
      if (error.error) {
        this.toastr.error(error.error.message);
      } else {
        this.toastr.error('An error occurred');
      }
      throwError(error);
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.postId).subscribe(post => {
      this.post = post;
    }, error => {
      console.error('Error fetching post:', error);
      this.toastr.error('Failed to fetch post details');
    });
  }
}
