import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, collectionData, doc, deleteDoc, query, where, getCountFromServer, orderBy, limit, updateDoc, 
          getDocs } from '@angular/fire/firestore';
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

  // async getColumna(id: string) {
  //   const columnaRef = doc(this.firestore, 'columnas', id);
  //   const columnaSnap = await getDoc(columnaRef);
  //   if (columnaSnap.exists()) {
  //     console.log("Columna:", columnaSnap.data());
  //   } else {
  //     console.log("No lo encuentra la columna");
  //   }
  // }

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

  updatePosicion(id:string, nuevaPosicion:number) {
    const columnaRef = doc(this.firestore, `columnas/${id}`);
    return updateDoc(columnaRef, {posicion: nuevaPosicion});
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
