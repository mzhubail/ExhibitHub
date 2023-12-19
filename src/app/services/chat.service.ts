import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, Timestamp, Unsubscribe, addDoc, collection, collectionData, collectionGroup, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from '@angular/fire/firestore';
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


/**
 * Each index is a date and its values are all the messages in that date
 *
 * Note that we do guarantee dates to be stored as they all are strings.
 * See https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order
 */
type GroupedMessages = { [date: string]: Message[]; };


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

  /**
   * Represents the id of the client, which will be either (A) initialized to
   * the current user for clients only, or (B) initialized to the client we want
   * to view the chat of, if the current user is admin.
   *
   * All firestore opartions should rely on this id.
   */
  clientId!: string;


  constructor(
    public authService: AuthenticationService,
    public db: Firestore,
  ) {
    this.chatsRef =
      collection(db, 'chats') as CollectionReference<ChatSurrogate>;
  }


  /**
   * Initializes messagesRef and updates the listener accordingly.
   *
   * If no `uid` was given, the method will grab the user id of the currently
   * logged in user.
   *
   * @param uid user id of the client
   */
  initializeMessages(uid: string | null) {
    if (!this.authService.user) {
      this.authService.redirectUser()
      return;
    }

    this.clientId = uid ?? this.authService.user.uid;

    console.log(`Initializing with ${uid}`);

    this.messagesRef =
      collection(
        this.authService.UserCollection,
        this.clientId,
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

      const groupedM = this.groupMessages(messages);
      console.log(groupedM);

      this.messages = messages;
    });
  }


  private groupMessages(messages: Message[]) {
    const out: GroupedMessages = {};
    messages.forEach(m => {
      const date = m.createdAt
        .toDate()
        .toLocaleDateString();

      if (date in out) {
        out[date].push(m);
      } else {
        out[date] = [m];
      }
    });
    return out;
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

    const senderId = this.authService.user?.uid,
      username = this.authService.username;
    if (!senderId || !username)
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
        uid: senderId,
        text: text,
        createdAt: serverTimestamp(),
      },
    );

    // Get the current chat
    const chatDoc = doc(this.chatsRef, this.clientId);

    if (this.clientId === senderId) {
      setDoc(chatDoc, {
        username: username,
        lastMessageText: text,
      });
    } else {
      updateDoc(chatDoc, {
        lastMessageText: text,
      });
    }
  }


  getChats() {
    return collectionData(this.chatsRef, { idField: 'id' });
  }
}
