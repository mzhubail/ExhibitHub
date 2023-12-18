import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from '@angular/fire/firestore';
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
  messagesRef!: CollectionReference<Message>;

  constructor(
    public authService: AuthenticationService,
    public db: Firestore,
  ) {
    if (!authService.user) {
      authService.redirectUser()
      return;
    }

    this.messagesRef =
      collection(
        authService.UserCollection,
        authService.user.uid,
        'messages'
      ) as CollectionReference<Message>;


    const messagesQuery = query(this.messagesRef, orderBy('createdAt', 'asc'));

    onSnapshot(messagesQuery, doc => {
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
