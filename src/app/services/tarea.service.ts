import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getCountFromServer, getDocs, orderBy, query, runTransaction, updateDoc, where } from '@angular/fire/firestore';
import { TareaInterface } from '../interfaces/tarea.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private firestore: Firestore) { }

  addTarea(tarea: TareaInterface) {
    const tareaRef = collection(this.firestore, 'tareas');
    return addDoc(tareaRef, tarea);
  }

  getTareasColumna(idColumna:string): Observable<TareaInterface[]> {
    const tareaRef = collection(this.firestore, 'tareas');
    const q = query(tareaRef, where("columna", "==", idColumna), orderBy("posicion"));
    return collectionData(q, {idField: 'id'}) as Observable<TareaInterface[]>;
  }

  async getNumTareasColumna(idColumna:string):Promise<number> {
    const tareaRef = collection(this.firestore, 'tareas');
    const q = query(tareaRef, where("columna", "==", idColumna));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  }

  updateTarea(id: string, nuevoNombre: string, descripcion: string) {
    const tareaRef = doc(this.firestore, `tareas/${id}`);
    return updateDoc(tareaRef, {
      nombreTarea: nuevoNombre,
      descripcion: descripcion
    })
  }

  updateColumnaTarea(id:string, nuevaColumna:string) {
    const tareaRef = doc(this.firestore, `tareas/${id}`);
    updateDoc(tareaRef, {columna: nuevaColumna});
  }

  updateAllPosicionesColumna(idColumna:string, tareasColumna:TareaInterface[]) {
    runTransaction(this.firestore, async (transaction) => {
      const tareasRef = collection(this.firestore, 'tareas');
      const q = query(tareasRef, where("columna", "==", idColumna));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const nuevaPosicion = tareasColumna.findIndex(tarea => tarea.id === doc.id) + 1;
        if(nuevaPosicion>=0) {
          transaction.update(doc.ref, { posicion: nuevaPosicion });
        }
      })
    });
  }

  dropTransaction(id:string, nuevaColumna:string, tareasColumnaNueva:TareaInterface[], tareasColumnaAnterior:TareaInterface[], currentIndex:number) {
    runTransaction(this.firestore, async (transaction) => {
      let idColumnaAnterior:string = "";
      if(tareasColumnaAnterior.length>0) {idColumnaAnterior = tareasColumnaAnterior[0].columna}
      transaction.update(doc(this.firestore, `tareas/${id}`), {columna: nuevaColumna});
      transaction.update(doc(this.firestore, `tareas/${id}`), {posicion: currentIndex+1});
      /* COLUMNA NUEVA */
      const tareasRef = collection(this.firestore, 'tareas');
      const q = query(tareasRef, where("columna", "==", nuevaColumna));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const nuevaPosicion = tareasColumnaNueva.findIndex(tarea => tarea.id === doc.id) + 1;
        if(nuevaPosicion>=0) {
          transaction.update(doc.ref, { posicion: nuevaPosicion });
        }
      }) 
      /* COLUMNA ANTIGUA */ 
      const q2 = query(tareasRef, where("columna", "==", idColumnaAnterior));
      const querySnapshot2 = await getDocs(q2);
      querySnapshot2.forEach(async (doc) => {
        const nuevaPosicionAnt = tareasColumnaAnterior.findIndex(tarea => tarea.id === doc.id) + 1;
        if(nuevaPosicionAnt>=0 && doc.id!=id) {
          transaction.update(doc.ref, { posicion: nuevaPosicionAnt });
        }
      })
    })
  }

  async deleteTarea(id:string, posicion:number, idColumna:string) {
    const tareaRef = doc(this.firestore, `tareas/${id}`);
    const tareasRef = collection(this.firestore, 'tareas');
    const q = query(tareasRef, where("columna", "==", idColumna), where("posicion", ">", posicion));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(tarea => {
      updateDoc(tarea.ref, { posicion: tarea.data()['posicion'] - 1 });
    });

    return deleteDoc(tareaRef);
  }

}
