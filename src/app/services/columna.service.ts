import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, doc, deleteDoc, query, getCountFromServer, orderBy, limit, updateDoc } from '@angular/fire/firestore';
import { ColumnaInterface } from '../interfaces/columna.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColumnaService {

  constructor(private firestore: Firestore) { }

  addColumna(columna: ColumnaInterface) {
    const columnaRef = collection(this.firestore, 'columnas');
    return addDoc(columnaRef, columna);
  }

  getColumnas(): Observable<ColumnaInterface[]> {
    const columnaRef = collection(this.firestore, 'columnas');
    const q = query(columnaRef, orderBy("posicion"))
    return collectionData(q, {idField: 'id'}) as Observable<ColumnaInterface[]>;
  }

  updateColumna(id: string, nuevoNombre: string) {
    const columnaRef = doc(this.firestore, `columnas/${id}`);
    return updateDoc(columnaRef, {nombre: nuevoNombre})
  }

  deleteColumna(id: string) {
    const columnaRef = doc(this.firestore, `columnas/${id}`);
    return deleteDoc(columnaRef);
  }

  async getNumColumnas() {
    const columnaRef = collection(this.firestore, 'columnas');
    const snapshot = await getCountFromServer(columnaRef);
    return snapshot.data().count;
  }

  async getPosicion() {
    const columnaRef = collection(this.firestore, 'columnas');
    const q =  query(columnaRef, orderBy("posicion", "desc"), limit(1))
    return collectionData(q, {idField: 'id'}) as Observable<ColumnaInterface[]>;
  }

}
