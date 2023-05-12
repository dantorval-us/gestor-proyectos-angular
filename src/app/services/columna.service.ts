import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, doc, deleteDoc, query, where, getCountFromServer, orderBy, limit, updateDoc, 
          getDocs, runTransaction} from '@angular/fire/firestore';
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

  getColumnas(idProyecto: string): Observable<ColumnaInterface[]> {
    const columnaRef = collection(this.firestore, 'columnas');
    const q = query(columnaRef, where("proyecto", "==", idProyecto), orderBy("posicion"))
    return collectionData(q, {idField: 'id'}) as Observable<ColumnaInterface[]>;
  }

  async getColumnasIntermedias(pos: number, avanza: boolean) {
    const columnaRef = collection(this.firestore, 'columnas');
    const q = query(columnaRef, where("posicion", "==", pos))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      const docRef = doc.ref;
      if(avanza) {
        await updateDoc(docRef, { posicion: pos-1 }); 
      } else {
        await updateDoc(docRef, { posicion: pos+1 }); 
      }
    })
  }

  updateColumna(id: string, nuevoNombre: string) {
    const columnaRef = doc(this.firestore, `columnas/${id}`);
    return updateDoc(columnaRef, {nombre: nuevoNombre})
  }

  updatePosicionColumnaTransaction(id:string, posicionPrevia:number, posicionNueva:number) {
    runTransaction(this.firestore, async (transaction) => {
      posicionPrevia = posicionPrevia + 1;
      posicionNueva = posicionNueva + 1;
      const columnaRef = collection(this.firestore, 'columnas');
      
      // Actualiza columnas intermedias afectadas
      if(posicionPrevia < posicionNueva) { 
        for(let i=posicionPrevia+1; i<=posicionNueva; i++ ) {
          const q = query(columnaRef, where("posicion", "==", i))
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (doc) => {
            transaction.update(doc.ref, { posicion: i-1 });
          })
        }
      } else {
        for(let i=posicionPrevia-1; i>=posicionNueva; i-- ) {
          const q = query(columnaRef, where("posicion", "==", i))
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(async (doc) => {
            transaction.update(doc.ref, { posicion: i+1 });
          })
        }
      }

      // Actualiza columna seleccionada
      transaction.update(doc(this.firestore, `columnas/${id}`), {posicion: posicionNueva});
    });
  }

  async updateIndicesService(pos: number, idProyecto:string) {
    const columnaRef = collection(this.firestore, 'columnas');
    const q = query(columnaRef, where("proyecto", "==", idProyecto), where("posicion", ">", pos))
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      const docRef = doc.ref;
      const posActualizada = doc.data()['posicion'] - 1;

      await updateDoc(docRef, { posicion: posActualizada}); 
    })
  }

  deleteColumna(id: string) {
    const columnaRef = doc(this.firestore, `columnas/${id}`);
    return deleteDoc(columnaRef);
  }

  async getNumColumnas(idProyecto: string) {
    const columnaRef = collection(this.firestore, 'columnas');
    const q = query(columnaRef, where("proyecto", "==", idProyecto));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  }

  async getLastPosicion(idProyecto: string) {
    const columnaRef = collection(this.firestore, 'columnas');
    const q = query(columnaRef, where("proyecto", "==", idProyecto), orderBy("posicion", "desc"), limit(1))
    return collectionData(q, {idField: 'id'}) as Observable<ColumnaInterface[]>;
  }

}
