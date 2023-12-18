import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService, Message } from '../services/chat.service';
import { Timestamp } from '@angular/fire/firestore';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  text = '';

  constructor(
    public chatService: ChatService,
    public authService: AuthenticationService,
  ) { }

  ngOnInit() { }

  /* Scroll to last child of chatArea */
  scroll() {
    const elem = this.messagesContainer.nativeElement;
    const children = elem.childNodes;
    children[children.length - 2]
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async sendMessage() {
    await this.chatService.sendMessage(this.text);
    this.text = '';
  }

  isSent = (m: Message) => m.uid === this.authService.user?.uid;

  formatTimestamp = (t: Timestamp) => t.toDate()
    .toISOString()
    .match(/\d+:\d+/)
    ?.[0];
}
