import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
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

  getTareas(): Observable<TareaInterface[]> {
    const tareaRef = collection(this.firestore, 'tareas');
    return collectionData(tareaRef, {idField: 'id'}) as Observable<TareaInterface[]>;
  }

  getTareasColumna(idColumna:string): Observable<TareaInterface[]> {
    const tareaRef = collection(this.firestore, 'tareas');
    const q = query(tareaRef, where("columna", "==", idColumna));
    return collectionData(q, {idField: 'id'}) as Observable<TareaInterface[]>;
  }

  updateTarea(id: string, nuevoNombre: string) {
    const tareaRef = doc(this.firestore, `tareas/${id}`);
    return updateDoc(tareaRef, {nombreTarea: nuevoNombre})
  }

  deleteTarea(id:string) {
    const tareaRef = doc(this.firestore, `tareas/${id}`);
    return deleteDoc(tareaRef);
  }

}
