import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { AuthService } from './auth.service';
import { FilesService } from './files.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserFactory } from '../entities/user-factory';
import { Credito } from '../interfaces/credito';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usuarios: AngularFirestoreCollection<any>;

  constructor(public fileService : FilesService, public auth : AuthService, private _db : AngularFirestore) { 
    this.usuarios = this._db.collection('users');
  }

  // async registerNewUser(user : User, password : string, imagenes : string[]){
  //   user.imagenes =  await this.uploadUserImages(user, imagenes);
  //   let response = await this.auth.SignUp(user, password);
  //   return new Promise( (res,rej)=>{
  //     res(response);
  //   })
  // }

  async uploadUserPhoto(user : User, image : string) : Promise<string>{
    let url : string = "";
    let fileName = `${user.email.substring(0, user.email.lastIndexOf("@"))}_${Date.now()}`;
    try {
      url = await this.fileService.uploadFile(
        fileName,
        image,
        {nombre : user.nombre});
    } catch (error) {
      console.log(error);
    }
    return url;
  }

  getUsuario(uid : string){
    return this.usuarios.doc(uid).get();
  }

  getUserAsObservable(uid : string){
    return this.usuarios.doc(uid).valueChanges();
  }
  
  getUsuarios() : Observable<any>{
    return this.usuarios.valueChanges({idField : 'uid'});
  }

  getCurrentUser(){
    return UserFactory.constructUser(JSON.parse(localStorage.getItem('user')!));
  }

  getCurrentAuthData(){
    return UserFactory.constructUser(JSON.parse(localStorage.getItem('auth')!));
  }

  getUserLogs(uid : string){
    return this._db.collection('logs').doc(uid).get();
  }

  async cargarCredito(credito : Credito, userID : string) : Promise<boolean>{
    let doc = await firstValueFrom(this.usuarios.doc(userID).get());
    let currentUser : User = UserFactory.constructUser(doc.data());
    let creditoCargadoConExito = currentUser.cargarCredito(credito);
    if (creditoCargadoConExito){
      this.usuarios.doc(userID).update(JSON.parse(JSON.stringify(currentUser)));
    };
    return creditoCargadoConExito;
  }

  async borrarCreditos(userID : string){
    let doc = await firstValueFrom(this.usuarios.doc(userID).get());
    let currentUser : User = UserFactory.constructUser(doc.data());
    currentUser.credits = [];
    this.usuarios.doc(userID).update(JSON.parse(JSON.stringify(currentUser)));
  }
}
