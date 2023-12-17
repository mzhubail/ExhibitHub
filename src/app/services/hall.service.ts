//@ts-nocheck
import { Injectable } from '@angular/core';
// AngularFire
import {Firestore, collection, collectionData, CollectionReference, DocumentReference } from '@angular/fire/firestore';
import { getDocs, getDoc, doc, deleteDoc,snapshot,  updateDoc, docData, setDoc,where, addDoc, query } from '@angular/fire/firestore';
import { DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface Hall {
  id: string;
  name: string;
  description: string;
  booths: number;
  price: number;
  capacity: string;
  avalability: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HallService {

  // public hall$: Observable<Hall[]>;
  public hallData: Hall;

  public halls$: Observable<Hall[]>;
  
  public halls: any = [];
  

  constructor(public firestore: Firestore) {
    this.getHalls();
   }
 

  
  // updateCourse(course: Course): Promise<DocumentReference> {
  //   return updateDoc(doc(this.firestore, 'Courses', course.id),{
  //       id?: course.id,
  //       Code: course.Code,
  //       Name: course.Name
  //   })
  // }

  async getHall(hallID: string) {
    let docSnap = await getDoc(doc(this.firestore, 'halls', hallID));
    let hallData = docSnap.data();
    // console.log(hallData); working showng the data
    return hallData;
  }
  
  //   getHalls(hall: Hall): Promise<DocumentReference>{
  //   const q = query(collection(this.firestore, 'halls'));
  //   this.halls$$ = collectionData(q, { idField: 'id' }) as Observable<Hall[]>;
  // }
  async getHalls(){
      const querySnapshot = await getDocs(collection(this.firestore,"halls"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data()); 
        this.halls.push(doc.data());
      }); }




}
