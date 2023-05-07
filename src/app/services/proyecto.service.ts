import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProyectoInterface } from '../interfaces/proyecto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private firestore: Firestore) { }

  addProyecto(proyecto: ProyectoInterface) {
    const proyectoRef = collection(this.firestore, 'proyectos');
    return addDoc(proyectoRef, proyecto);
  }

  getProyectos(usuario: string): Observable<ProyectoInterface[]> {
    const proyectoRef = collection(this.firestore, 'proyectos');
    const q = query(proyectoRef, where("usuario", "==", usuario), orderBy("nombre"));
    return collectionData(q, {idField: 'id'}) as Observable<ProyectoInterface[]>;
  }

  updateProyecto(id: string, nuevoNombre: string) {
    const proyectoRef = doc(this.firestore, `proyectos/${id}`);
    return updateDoc(proyectoRef, {nombre: nuevoNombre})
  }

  deleteProyecto(id: string) {
    const proyectoRef = doc(this.firestore, `proyectos/${id}`);
    return deleteDoc(proyectoRef);
  }

}
