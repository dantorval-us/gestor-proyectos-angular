import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProyectoInterface } from '../interfaces/proyecto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private firestore: Firestore) { }

  getProyectos(): Observable<ProyectoInterface[]> {
    const proyectoRef = collection(this.firestore, 'proyectos');
    const q = query(proyectoRef, orderBy("nombre"));
    return collectionData(q, {idField: 'id'}) as Observable<ProyectoInterface[]>;
  }

}
