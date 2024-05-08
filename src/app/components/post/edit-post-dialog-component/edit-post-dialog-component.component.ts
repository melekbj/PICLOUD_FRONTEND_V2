import {Component, OnInit, OnDestroy, SimpleChanges} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject, Subscription } from 'rxjs';
import {PostModel} from "../../shared/post-model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../category/category.service";

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog-component.component.html',
  styleUrls: ['./edit-post-dialog-component.component.css']
})
export class EditPostDialogComponent implements OnInit, OnDestroy {
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
