import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getCountFromServer, getDocs, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
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

  updateTarea(id: string, nuevoNombre: string) {
    const tareaRef = doc(this.firestore, `tareas/${id}`);
    return updateDoc(tareaRef, {nombreTarea: nuevoNombre})
  }

  updateColumnaTarea(id:string, nuevaColumna:string) {
    const tareaRef = doc(this.firestore, `tareas/${id}`);
    return updateDoc(tareaRef, {columna: nuevaColumna});
  }

  async updateAllPosicionesColumna(idColumnaNueva:string, tareasColumnaNueva:TareaInterface[], tareasColumnaAnterior:TareaInterface[]) {
    const tareasRef = collection(this.firestore, 'tareas');
    let idColumnaAnterior:string = "";
    if(tareasColumnaAnterior.length>0) {idColumnaAnterior = tareasColumnaAnterior[0].columna}

    // Actualiza las posiciones de todas las tareas de una columna
    /* COLUMNA NUEVA */
    const q = query(tareasRef, where("columna", "==", idColumnaNueva));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      const nuevaPosicion = tareasColumnaNueva.findIndex(tarea => tarea.id === doc.id) + 1;
      if(nuevaPosicion>=0) {
        await updateDoc(doc.ref, { posicion: nuevaPosicion });
      }
    })
    /* COLUMNA ANTIGUA */
    const q2 = query(tareasRef, where("columna", "==", idColumnaAnterior));
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach(async (doc) => {
      const nuevaPosicionAnt = tareasColumnaAnterior.findIndex(tarea => tarea.id === doc.id) + 1;
      if(nuevaPosicionAnt>=0) {
        await updateDoc(doc.ref, { posicion: nuevaPosicionAnt });
      }
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
