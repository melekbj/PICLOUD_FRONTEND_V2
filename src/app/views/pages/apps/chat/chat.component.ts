import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { DatePipe } from '@angular/common';
import { ChatService } from 'src/app/services/chat/chat.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked, AfterViewInit {
  url = 'http://localhost:8087';
  otherUser?: any;
  thisUser?: any = '';
  thisUserEmail: string;
  otherUserEmail: string;
  channelName?: string;
  socket?: WebSocket;
  stompClient?: any;
  newMessage = new FormControl('');
  messages?: Array<any> = [];
  users: any;
  currentDate: any;
  searchQuery: string = '';

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private el: ElementRef,
    private datePipe: DatePipe,
    private jwtService: JwtService
  ) {}
  ngAfterViewChecked(): void {
    //this.scrollDown();
  }
  ngAfterViewInit(): void {
    // Show chat-content when clicking on chat-item for tablet and mobile devices
    document.querySelectorAll('.chat-list .chat-item').forEach((item) => {
      item.addEventListener('click', (event) => {
        document.querySelector('.chat-content')!.classList.toggle('show');
      });
    });
  }
  backToChatList() {
    document.querySelector('.chat-content')!.classList.toggle('show');
  }

  scrollDown() {
    var container = this.el.nativeElement.querySelector('#chat');
    container.scrollTop = container.scrollHeight;
  }

  ngOnInit(): void {
    this.thisUserEmail = this.chatService.getEmailFromToken();

    this.route.paramMap.subscribe((params: ParamMap) => {
      let exist = this.route.snapshot.paramMap.has('email');
      this.otherUserEmail = params.get('email');

      if (!exist) {
        this.getthisUser();
      } else {
        this.getthisUser();
        this.getOtherUser();
      }
    });

    this.chatService.getAllUsers(this.thisUserEmail).subscribe((data) => {
      this.users = data;
      console.log(data);
    });
    this.getCurrentDate();
  }
  getthisUser() {
    this.chatService.getUserByEmail(this.thisUserEmail).subscribe((data) => {
      this.thisUser = data;
      this.thisUser.propic = './assets/images/avatar1.png';
    });
  }
  getOtherUser() {
    this.chatService.getUserByEmail(this.otherUserEmail).subscribe((data) => {
      this.otherUser = data;
      this.otherUser.propic = './assets/images/avatar2.png';

      this.connectToChat();

      //this.el.nativeElement.querySelector('#chat').scrollIntoView();

      //this.scrollDown();
      console.log(this.otherUser);
    });
  }

  connectToChat() {
    const id1 = this.thisUser.id!;
    const nick1 = this.thisUser.email;
    const id2 = this.otherUser?.id!;
    const nick2 = this.otherUser?.email!;

    if (id1 > id2) {
      this.channelName = nick1 + '&' + nick2;
    } else {
      this.channelName = nick2 + '&' + nick1;
    }

    this.loadChat(this.channelName);
    this.socket = new SockJS(this.url + '/chat-socket', [
      'Authorization',
      `${this.jwtService.createAuhtorizationHeader()}`,
    ]);
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, (frame) => {
      this.stompClient!.subscribe('/topic/' + this.channelName, (response) => {
        this.loadChat(this.channelName);
      });
    });
  }
  loadChat(channelName) {
    this.chatService.loadChat(channelName).subscribe((data) => {
      let mgs: Array<any> = data;
      mgs.sort((a, b) => (a.ms_id > b.ms_id ? 1 : -1));
      this.messages = mgs;
    });
  }

  sendMsg() {
    console.log(this.newMessage);

    if (this.newMessage.value !== '') {
      this.stompClient!.send(
        '/app/chat/' + this.channelName,
        {},
        JSON.stringify({
          sender: this.thisUser.email,
          t_stamp: 'to be defined in server',
          content: this.newMessage.value,
        })
      );
      this.newMessage.setValue('');
    }
    setTimeout(() => {
      //this.scrollDown();
    }, 400);
  }

  deletefor(id, forr) {
    this.stompClient!.send(
      '/app/chat/' + this.channelName,
      {},
      JSON.stringify({
        deleteForAll: forr,
        ms_id: id,
        whoMakeDelete: this.thisUserEmail,
      })
    );
  }

  whenWasItPublished(myTimeStamp: string) {
    const endDate = myTimeStamp.indexOf('-');
    return (
      myTimeStamp.substring(0, endDate) +
      ' at ' +
      myTimeStamp.substring(endDate + 1)
    );
  }
  whenTheDAteWasItPublished(myTimeStamp: string) {
    const endDate = myTimeStamp.indexOf('-');
    return myTimeStamp.substring(0, endDate);
  }

  whenWastheTimeItPublished(myTimeStamp: string) {
    if (myTimeStamp == '') {
      return '';
    }
    const endDate = myTimeStamp.indexOf('-');
    return myTimeStamp.substring(endDate + 1);
  }

  getCurrentDate() {
    const currentDate = new Date();
    this.currentDate = this.datePipe.transform(currentDate, 'yyyy/MM/dd');
  }

  compareDates(providedDate: string): string {
    console.log(providedDate);
    const currentDate = new Date();
    if (this.currentDate === providedDate) {
      return '';
    } else if (
      providedDate === this.datePipe.transform(currentDate, 'yyyy/MM/dd')
    ) {
      this.currentDate = providedDate;
      return 'Today';
    }
    this.currentDate = providedDate;

    return providedDate;
  }

  react(id: any, react: boolean) {
    this.stompClient!.send(
      '/app/chat/' + this.channelName,
      {},
      JSON.stringify({
        reaction: react,
        ms_id: id,
      })
    );
  }

  get filteredUsers(): any {
    if (this.users) {
      return this.users.filter((user) =>
        user.user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
