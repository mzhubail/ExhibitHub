import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, Timestamp, Unsubscribe, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from '@angular/fire/firestore';
import { AuthenticationService } from '../authentication.service';

export interface Message {
  id?: string;
  text: string;
  createdAt: Timestamp;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages: Message[] = [];
  messagesRef: CollectionReference<Message> | undefined;
  /** Unsubscribe from listening to messages */
  unsubscribe: Unsubscribe | undefined;

  constructor(
    public authService: AuthenticationService,
    public db: Firestore,
  ) {
    this.initializeMessages();
  }

  /**
   * Initializes messagesRef and updates the listener accordingly.
   */
  initializeMessages() {
    if (!this.authService.user) {
      this.authService.redirectUser()
      return;
    }

    this.messagesRef =
      collection(
        this.authService.UserCollection,
        this.authService.user.uid,
        'messages'
      ) as CollectionReference<Message>;


    const messagesQuery = query(this.messagesRef, orderBy('createdAt', 'asc'));

    this.unsubscribe = onSnapshot(messagesQuery, doc => {
      // Disables latency compensation
      if (doc.metadata.hasPendingWrites)
        return;
      const messages = doc
        .docs
        .map(x => x.data()) as Message[];
      this.messages = messages;
    });
  }


  async sendMessage(text: string) {
    console.log(serverTimestamp());
    if (!this.authService.user)
      return;

    if (!this.messagesRef) {
      console.error(
        'this.messagesRef was not initialized preoperly.\n\n' +
        'Redirecting.'
      );
      this.authService.redirectUser();
      return;
    }

    await addDoc(
      this.messagesRef,
      {
        uid: this.authService.user.uid,
        text: text,
        createdAt: serverTimestamp(),
      },
    );
  }
}
