import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
    public authService: AuthenticationService,
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
