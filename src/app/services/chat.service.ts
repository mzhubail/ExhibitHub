import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, Timestamp, Unsubscribe, addDoc, collection, collectionData, collectionGroup, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';

export interface Message {
  id?: string;
  text: string;
  createdAt: Timestamp;
  uid: string;
}


/**
 * The puropse of this interface is to indicate which chats exist in the
 * database.
 */
export interface ChatSurrogate {
  id?: string;
  username: string;
  lastMessageText: string;
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages: Message[] = [];
  messagesRef: CollectionReference<Message> | undefined;

  /** Reference to available chats in the database. */
  chatsRef;

  /** Unsubscribe from listening to messages */
  unsubscribe: Unsubscribe | undefined;

  constructor(
    public authService: AuthenticationService,
    public db: Firestore,
  ) {
    this.chatsRef =
      collection(db, 'chats') as CollectionReference<ChatSurrogate>;
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


  /**
   * Stores the given message and marks it as being sent by the current user.
   *
   * This method may fail if there is not user logged in, or the reference to
   * messages was not initialized properly
   *
   * @param text Message to be stored
   * @returns
   */
  async sendMessage(text: string) {
    console.log(serverTimestamp());

    const uid = this.authService.user?.uid,
      username = this.authService.username;
    if (!uid || !username)
      return;

    if (!this.messagesRef) {
      console.error(
        'this.messagesRef was not initialized preoperly.\n\n' +
        'Redirecting.'
      );
      this.authService.redirectUser();
      return;
    }

    // Store the message
    await addDoc(
      this.messagesRef,
      {
        uid: uid,
        text: text,
        createdAt: serverTimestamp(),
      },
    );

    // Ensure that the chat was added to the list of chats
    const chatDoc = doc(this.chatsRef, uid);
    setDoc(chatDoc, {
      username: username,
      lastMessageText: text,
    });
  }


  getChats() {
    return collectionData(this.chatsRef, { idField: 'id' });
  }
}
