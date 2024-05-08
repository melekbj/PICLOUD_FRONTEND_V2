import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VotePayload } from './vote-button/vote-payload';
import { Observable } from 'rxjs';
import {JwtService} from "../../services/jwt.service";



@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  vote(votePayload: VotePayload): Observable<any> {
    return this.http.post(`http://localhost:8080/api/votes/${votePayload.postId}`, votePayload, { headers: this.jwtService.createAuhtorizationHeader() });
  }

  cancelVote(postId: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/votes/${postId}`, { headers: this.jwtService.createAuhtorizationHeader() });
  }
}
