import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  SimpleChanges
} from '@angular/core';
import { PostService } from '../post.service';
import { PostModel } from '../post-model';

import {ActivatedRoute, Router} from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons'; // Import faComments here
import {CategoryService} from "../../category/category.service";
import {JwtService} from "../../../services/jwt.service";
import Swal from "sweetalert2";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {EditPostDialogComponent} from "../../post/edit-post-dialog-component/edit-post-dialog-component.component";
import { faBookOpen, faShareAlt, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit {

  faComments = faComments;
  faBookOpen = faBookOpen;
  faShareAlt = faShareAlt;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  @Input() posts: PostModel[];
  @Output() voteUpdated = new EventEmitter<void>();  // Add this line
  isAdmin: boolean = false;
  currentUser: string;
  private bsModalRef: BsModalRef;
  private categoryService: CategoryService;

  constructor(
    private router: Router,
    private postService: PostService,
    private jwtService: JwtService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private changeDetector: ChangeDetectorRef,
  ) { }

  onVoteUpdated(): void {
    this.voteUpdated.emit();
  }

  ngOnInit(): void {
    this.jwtService.getUserRole().subscribe(role => {
      this.isAdmin = role === 'ADMIN';
    });
    this.jwtService.getCurrentUser().subscribe(userId => {
      this.currentUser = userId;
      this.voteUpdated.emit();  // Emit voteUpdated event after currentUser is set
    });
  }

  sharePost(id: number): void {
    this.postService.getShareableLink(id).subscribe((shareableLink) => {
      // Copy the shareable link to the clipboard
      navigator.clipboard.writeText(shareableLink).then(() => {
        // Notify the user that the link has been copied using Swal
        Swal.fire({
          icon: 'success',
          title: 'Copied!',
          text: 'Shareable link has been copied to clipboard',
          timer: 2000
        });
      });
    });
  }

  editPost(post: PostModel): void {
    this.bsModalRef = this.modalService.show(EditPostDialogComponent);
    this.bsModalRef.content.text = post.description;
    this.bsModalRef.content.onClose.subscribe(updatedText => {
      const updatedPost = {...post, description: updatedText};
      this.postService.editPost(post.postId, updatedPost).subscribe((updatedPostFromServer) => {
        // Find the index of the post in the posts array
        const index = this.posts.findIndex(p => p.postId === updatedPostFromServer.postId);
        // Replace the post at the found index with the updated post
        this.posts[index] = updatedPostFromServer;
      });
    });
  }

  deletePost(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.deletePost(id).subscribe(() => {
          // Remove the deleted post from the posts array
          this.posts = this.posts.filter(post => post.postId !== id);
          Swal.fire(
            'Deleted!',
            'Your post has been deleted.',
            'success'
          )
        }, error => {
          // Handle error here
          console.error(error);
        });
      }
    });
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
