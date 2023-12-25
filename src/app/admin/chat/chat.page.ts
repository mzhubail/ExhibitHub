import { Component, OnInit } from '@angular/core';
import { ChatService, ChatSurrogate } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chats$;
  chats!: ChatSurrogate[];

  constructor(
    public chatService: ChatService,
  ) {
    // Listen to chats
    this.chats$ = this.chatService.getChats();
    this.chats$.subscribe(chats => {
      this.chats = chats;
    });
  }

  ngOnInit() {
  }

}
