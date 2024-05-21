import { Component, OnDestroy, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccelListenerEvent, Motion } from '@capacitor/motion';
import { CapacitorFlash } from '@capgo/capacitor-flash';
import { BehaviorSubject, Observable, Subscription, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { Haptics } from '@capacitor/haptics';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio';
import { AudioService } from '../services/audio.service';
import { audios } from '../constants/audios';
import { PluginListenerHandle } from '@capacitor/core/types/definitions';
import { AlertController } from '@ionic/angular';
import { Barcode, BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { credits } from '../constants/credits';
import { UsersService } from '../services/users.service';
import { Credito } from '../interfaces/credito';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, SpinnerComponent, CommonModule],
})
export class HomePage implements OnInit, OnDestroy{
  signingOut : boolean = false;
  isSupported = false;
  barcodes: Barcode[] = [];
  user$? : Observable<any>;
  userID? : string;
  creditoTotal$? : Observable<number>;
  private subscription? : Subscription;
  animatedCounter: number = 0;

  constructor(public _auth: AuthService, private _router : Router, private _audioService : AudioService, private alertController : AlertController, private renderer : Renderer2, private _usersService :  UsersService) {
    this._auth.afAuth.currentUser.then((u) => {
      this.userID = u?.uid!;
      this.user$ = this._usersService.getUserAsObservable(u?.uid!);
      this.creditoTotal$ = this.user$.pipe(map((user) => {
        return user.credits
          .reduce(((puntajeTotal : number, credito : { veces : number, credito : Credito}) => {
            return puntajeTotal + (credito.credito.puntaje * credito.veces);
          }),0)
      }));
      this.subscription = this.creditoTotal$!.pipe(
        distinctUntilChanged(),
        switchMap(newValue => {
            return this.animateCounter(this.animatedCounter, newValue)
        })
      )
      .subscribe((value : any) => this.animatedCounter = value);
    });
  }

  ngOnInit(): void {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  animateCounter(start: number, end: number): Observable<number> {
    if (start === end){
      return of(end);
    }
    return new Observable(observer => {
      const steps = Math.abs(end - start);
      const increment = end > start ? 1 : -1;

      const minStepTime = 10;
      const maxStepTime = 40;
      const stepTime = Math.max(minStepTime, maxStepTime - Math.floor(steps / 4))

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep += 1;
        this.animatedCounter = start + (increment * currentStep);

        observer.next(this.animatedCounter);

        if (currentStep === steps) {
          clearInterval(interval);
          observer.complete();
        }
      }, stepTime);
    });
  }

  async onQrScanBtnClicked(){
    this.scanCode();
  }

  async scanCode(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlertPermisos();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan({
      formats : [BarcodeFormat.QrCode]
    });
    this.barcodes.push(...barcodes);
    //
    let barcode : string = barcodes[0].rawValue;
    let creditoACargar = credits.find((c)=> {
      return c.id.trim() === barcode.trim();
    });
    if (creditoACargar != undefined){
      let creditoCargadoConExito : boolean = await this._usersService.cargarCredito(creditoACargar,this.userID!);
      if (!creditoCargadoConExito){
        this.presentAlertLimite(this._usersService.getCurrentUser().typename == 'Admin' ? 2 : 1);
        Haptics.vibrate({duration : 1000});
      }
    } else {
      this.presentAlertCodeNotValid();
      Haptics.vibrate({duration : 1000});
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlertPermisos(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Por favor permitirle a la aplicación el acceso a la cámara',
      buttons: ['OK'],
      cssClass : "custom-alert"
    });
    await alert.present();
  }
  
  async presentAlertLimite(cantidad : number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Límite excedido',
      message: `Ha llegado a la cantidad máxima permitida de cargas para este crédito: ${cantidad.toString()}`,
      buttons: ['OK'],
      cssClass : "custom-alert-3"
    });
    await alert.present();
  }

  async presentAlertCodeNotValid(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Código QR no reconocido',
      message: "No hemos podido reconocer el código escaneado. Por favor intente nuevamente",
      buttons: ['OK'],
      cssClass : "custom-alert-2"
    });
    await alert.present();
  }

  onBorrarCreditosBtnClicked(){
    this.presentAlertConfirmarResetCreditos();
  }

  async presentAlertConfirmarResetCreditos(): Promise<void> {
    const alert = await this.alertController.create({
      header: '¿Está seguro que desea borrar sus créditos?',
      buttons : [
        {
          text : "No", 
          role : 'cancel',
          cssClass : "alert-button-cancel"
        },
        {
          text : "Sí",
          role : 'confirm',
          cssClass : "alert-button-confirm",
          handler : (alertData) => {
            this._usersService.borrarCreditos(this.userID!);
          }
        }
      ],
      cssClass : "custom-alert",
      backdropDismiss : true
    });
    await alert.present();
  }

  // async handleAlarmOff(){
  //   const alert = await this.alertController.create({
  //     header : "Ingresar Contraseña",
  //     subHeader : "Contraseña de inicio de sesión",
  //     buttons : [
  //       {
  //         text : "Cancelar", 
  //         role : 'cancel',
  //         cssClass : "alert-button-cancel"
  //       },
  //       {
  //         text : "Confirmar",
  //         role : 'confirm',
  //         cssClass : "alert-button-confirm",
  //         handler : (alertData) => {
  //           this._auth.checkPassword(alertData.password).then((correct)=> {
  //             if (correct){
  //               this.turnAlarmOff();
  //             } else {
  //               this.triggerSpecialAlert();
  //             }
  //           });
  //         }
  //       }
  //     ],
  //     inputs : [{
  //       name : 'password',
  //       placeholder : "contraseña",
  //       id : "alert-input-password",
  //       type : "password",
  //       cssClass : "alert-input-text",
  //     }],
  //     backdropDismiss : false,
  //     cssClass : "custom-alert"
  //   });
  //   await alert.present();
  // }

  async handleSignOut(){
    this.signingOut = true;
    await setTimeout(() => {
        this._auth.SignOut().then(() => {
          this.signingOut = false;
          this._router.navigate(['login']);
        });
      }, 2000);
    }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}



