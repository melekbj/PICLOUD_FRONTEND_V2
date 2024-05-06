// EditCommentDialogComponent
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-comment-dialog',
  templateUrl: './edit-comment-dialog.component.html',
  styleUrls: ['./edit-comment-dialog.component.css']
})
export class EditCommentDialogComponent implements OnInit, OnDestroy {
  public onClose: Subject<any>;
  private _text: string;
  public onCloseSubscription: Subscription;

  constructor(public bsModalRef: BsModalRef) {
    this.onClose = new Subject();
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  ngOnInit(): void {
    if (this.bsModalRef.content) {
      this.text = this.bsModalRef.content.text;
    }
    this.onCloseSubscription = this.onClose.subscribe();
  }


  onCancel(): void {
    this.bsModalRef.hide();
    if (this.onCloseSubscription) {
      this.onCloseSubscription.unsubscribe();
    }
  }

  onUpdate(): void {
    if (this.text) {
      this.onClose.next(this.text);
      this.bsModalRef.hide();
      if (this.onCloseSubscription) {
        this.onCloseSubscription.unsubscribe();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.onCloseSubscription) {
      this.onCloseSubscription.unsubscribe();
    }
  }
}
