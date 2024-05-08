import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentPayload } from './comment.payload';
import { Observable } from 'rxjs';
import {JwtService} from "../../services/jwt.service";


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient,private jwtService: JwtService) { }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>('http://localhost:8080/api/comments/by-post/' + postId, { headers: this.jwtService.createAuhtorizationHeader() });
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/comments/' + commentPayload.postId, commentPayload, { headers: this.jwtService.createAuhtorizationHeader() });
  }
  editComment(commentId: number, text: string): Observable<CommentPayload> {
    if (!text || text.trim().length === 0) {
      // Handle the error appropriately, e.g., throw an error or return an Observable that emits an error
      throw new Error('Comment text must not be empty');
    }

    const commentPayload = { text };
    return this.httpClient.put<CommentPayload>('http://localhost:8080/api/comments/' + commentId, commentPayload, { headers: this.jwtService.createAuhtorizationHeader() });
  }

  deleteComment(commentId: number): Observable<any> {
    return this.httpClient.delete<any>('http://localhost:8080/api/comments/' + commentId, { headers: this.jwtService.createAuhtorizationHeader() });
  }
  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentPayload[]>('http://localhost:8080/api/comments/by-user/' + name, { headers: this.jwtService.createAuhtorizationHeader() });
  }
}
