import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './views/layout/layout.module';
import { AuthGuardService } from './services/auth-guard.service';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ForumComponent} from "./components/forum/forum.component";
import {CategorySideBarComponent} from "./components/shared/category-side-bar/category-side-bar.component";
import {CreatePostComponent} from "./components/post/create-post/create-post.component";
import {CreateCategoryComponent} from "./components/category/create-category/create-category.component";
import {ListCategoriesComponent} from "./components/category/list-categories/list-categories.component";
import {ViewPostComponent} from "./components/post/view-post/view-post.component";
import {PostTileComponent} from "./components/shared/post-tile/post-tile.component";
import {VoteButtonComponent} from "./components/shared/vote-button/vote-button.component";
import {SideBarComponent} from "./components/shared/side-bar/side-bar.component";
import {ViewCategoryComponent} from "./components/category/view-category/view-category.component";
import {EditCommentDialogComponent} from "./components/comment/edit-comment-dialog/edit-comment-dialog.component";
import { AllCategoriesDialogComponent } from "./components/category/all-categories-dialog-component/all-categories-dialog-component.component";
import {JwtInterceptor} from "./components/JwtInterceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {FontAwesomeModule, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {MonacoEditorModule} from "ngx-monaco-editor-v13";
import {QuillModule} from "ngx-quill";
import {MatButtonModule} from "@angular/material/button";
import {ModalModule} from "ngx-bootstrap/modal";
import {RouterModule} from "@angular/router";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {
  EditPostDialogComponent
} from "./components/post/edit-post-dialog-component/edit-post-dialog-component.component";
import {NgbDropdownModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    ForumComponent,
    CategorySideBarComponent,
    CreateCategoryComponent,
    CreatePostComponent,
    ListCategoriesComponent,
    ViewPostComponent,
    PostTileComponent,
    VoteButtonComponent,
    SideBarComponent,
    ViewCategoryComponent,
    EditCommentDialogComponent,
    AllCategoriesDialogComponent,
    EditPostDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,

    HttpClientModule,
    FontAwesomeModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    CKEditorModule,
    MatInputModule,
    ModalModule.forRoot(),
    QuillModule.forRoot(),
    MonacoEditorModule.forRoot(),
    ToastrModule.forRoot(),
    NgbDropdownModule,
    NgbPaginationModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ToastrService,
    AuthGuardService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faEdit, faTrash);
  }
}
