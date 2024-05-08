import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { PostModel } from './post-model';
import {catchError, Observable, throwError} from 'rxjs';
import { CreatePostPayload } from "../post/create-post/create-post.payload";
import {JwtService} from "../../services/jwt.service";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts', { headers: this.jwtService.createAuhtorizationHeader() });
  }
  getShareableLink(id: number): Observable<string> {
    return this.http.get('http://localhost:8080/api/posts/share/' + id, {
      headers: this.jwtService.createAuhtorizationHeader(),
      responseType: 'text'
    });
  }

  createPost(postData: FormData, categoryId: number): Observable<any> {
    return this.http.post('http://localhost:8080/api/posts/' + categoryId, postData, { headers: this.jwtService.createAuhtorizationHeader() });
  }
  editPost(id: number, post: PostModel): Observable<PostModel> {
    return this.http.put<PostModel>('http://localhost:8080/api/posts/edit/' + id, post, { headers: this.jwtService.createAuhtorizationHeader() });
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:8080/api/posts/' + id, { headers: this.jwtService.createAuhtorizationHeader() });
  }
  // getPostsByCategory(categoryId: string): Observable<PostModel[]> {
  //   return this.http.get<PostModel[]>('http://localhost:8080/api/posts/by-category/' + categoryId, { headers: this.jwtService.createAuhtorizationHeader() });
  // }

  getPostsByCategory(categoryId: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`http://localhost:8080/api/posts/by-category/${categoryId}`, { headers: this.jwtService.createAuhtorizationHeader() });

  }
  getPostsOrderedByVotes(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/posts/by-votes', { headers: this.jwtService.createAuhtorizationHeader() })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/posts/by-user/' + name, { headers: this.jwtService.createAuhtorizationHeader() });
  }
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/api/posts/' + id, { headers: this.jwtService.createAuhtorizationHeader() });
  }
  updateVoteCount(postId: number, voteCount: number): Observable<PostModel> {
    return this.http.put<PostModel>('http://localhost:8080/api/posts/vote/' + postId, voteCount, { headers: this.jwtService.createAuhtorizationHeader() });
  }
  getCommentCountByPostId(postId: number): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/api/posts/count/${postId}`, { headers: this.jwtService.createAuhtorizationHeader() });
  }
}
