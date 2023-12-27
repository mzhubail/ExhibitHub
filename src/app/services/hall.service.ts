import { Injectable } from '@angular/core';

// AngularFire
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { getDocs, getDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Hall {
  id: string;
  name: string;
  description: string;
  booths: number;
  price: number;
  capacity: string;
  availability: number;
}

@Injectable({
  providedIn: 'root',
})
export class HallService {
  public hallsRef;
  public halls$: Observable<Hall[]>;
  halls!: Hall[];

  constructor(public firestore: Firestore) {
    this.hallsRef = collection(firestore, 'halls') as CollectionReference<Hall>;
    this.halls$ = collectionData(this.hallsRef, { idField: 'id' });

    this.halls$.subscribe((halls) => {
      this.halls = halls;
    });
  }

  findHallById(hallId: string) {
    return this.halls.find((hall) => hall.id === hallId);
  }

  // async getHall(hallID: string) {
  //   let docSnap = await getDoc(doc(this.firestore, 'halls', hallID));
  //   let hallData = docSnap.data();
  //   // console.log(hallData); working showng the data
  //   return hallData;
  // }

  //   getHalls(hall: Hall): Promise<DocumentReference>{
  //   const q = query(collection(this.firestore, 'halls'));
  //   this.halls$$ = collectionData(q, { idField: 'id' }) as Observable<Hall[]>;
  // }
  // async getHalls() {
  //   const querySnapshot = await getDocs(collection(this.firestore, 'halls'));
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, ' => ', doc.data());
  //     this.halls.push(doc.data());
  //   });
  // }
}
