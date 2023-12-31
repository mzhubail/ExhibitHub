import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService, Message } from '../services/chat.service';
import { Timestamp } from '@angular/fire/firestore';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    public alertController: AlertController,
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
    const lastMessage = document.querySelector('.message:last-of-type');
    if (!lastMessage)
      return;
    lastMessage.scrollIntoView({
      behavior: "smooth", block: "start"
    });
  }

  async sendMessage() {
    if (this.text === '')
      return;

    if (this.text.length > 120) {
      const alert = await this.alertController.create({
        header: 'Your message is too long',
        message: 'Try splitting it into multiple shorter messages',
        buttons: ['OK'],
      })
      alert.present();
      return;
    }

    await this.chatService.sendMessage(this.text);
    this.text = '';
  }


  /**
   * Determines whether a given message should be marked as being sent by the
   * current user.
   *
   * @param m   a message
   * @returns   whether this message should be marked as being sent by the
   * current uesr.
   */
  isSent(m: Message): boolean {
    // Determine whether the message was sent by the client.
    const isClientMessage = m.uid === this.chatService.clientId;
    // If the current use is an admin then all messages sent by client should be
    // marked as recieved; and if the current use is a client then all messages
    // sent by client should be marked as sent.
    const isSentMessage = this.authService.userInfo?.Role === 'admin'
      ? !isClientMessage
      : isClientMessage;

    return isSentMessage
  }

  formatTimestamp = (t: Timestamp) => t.toDate()
    .toLocaleTimeString()
    .match(/\d+:\d+/)
    ?.[0];
}
