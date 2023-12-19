import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService, Message } from '../services/chat.service';
import { Timestamp } from '@angular/fire/firestore';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';

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
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    // If the user is an admin, the chat page should only be used with the
    // client id given.  However, if the user is a client, then the id will be
    // grabbed automatically from the auth service.

    // Get the id of the client, if any
    let clientId = this.activatedRoute.snapshot.paramMap.get('id');

    // Ensures messages collection reference is initialized properly
    this.chatService.initializeMessages(clientId);
  }

  ionViewWillLeave() {
    this.chatService.unsubscribe?.();
  }

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
