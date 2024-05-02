import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from './chat-message';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from '../jwt.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private stompClient: any;
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<
    ChatMessage[]
  >([]);
  url = 'http://localhost:8087/api';

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  getEmailFromToken(): string | null {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return null;
    }

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(tokenParts[1]));
    console.log(payload);

    return payload.sub;
  }

  getAllUsers(currentUserEmail): Observable<any> {
    return this.http.get(this.url + '/getAllUsers/' + currentUserEmail, {
      headers: this.jwtService.createAuhtorizationHeader(),
    });
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }

  loadChat(channelName) {
    return this.http.post<Array<any>>(this.url + '/getMessages', channelName, {
      headers: this.jwtService.createAuhtorizationHeader(),
    });
  }
  getUserByNickname(nickname) {
    return this.http.get(this.url + '/findByNickname/' + nickname, {
      headers: this.jwtService.createAuhtorizationHeader(),
    });
  }
  getUserByEmail(email) {
    return this.http.get(this.url + '/findByEmail/' + email, {
      headers: this.jwtService.createAuhtorizationHeader(),
    });
  }

  getTheLastMsg(channelName) {
    return this.http.get(this.url + '/getlastmsg/' + channelName, {
      headers: this.jwtService.createAuhtorizationHeader(),
    });
  }
}
