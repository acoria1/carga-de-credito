"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1453],{1453:(M,m,r)=>{r.r(m),r.d(m,{LogniPage:()=>Z});var u=r(5861),t=r(4650),d=r(6895),s=r(4006),a=r(9972),p=r(6159),f=r(4670),v=r(4132);const h=[{uid:"100001",email:"admin@admin.com",password:"111111",label:"Admin",imagen:"/assets/images/dummy-users/avatar_1.png"},{uid:"100002",email:"usuario@usuario.com",password:"333333",label:"Usuario",imagen:"/assets/images/dummy-users/avatar_2.png"},{uid:"100003",email:"anonimo@anonimo.com",password:"444444",label:"Anonimo",imagen:"/assets/images/dummy-users/avatar_3.png"},{uid:"100004",email:"invitado@invitado.com",password:"222222",label:"Invitado",imagen:"/assets/images/dummy-users/avatar_4.png"}];var b=r(3651),_=r(7067);const x=["loginRoot"];function y(n,l){1&n&&(t.TgZ(0,"ion-note",29),t._uU(1,"formato inv\xe1lido de email"),t.qZA())}function C(n,l){if(1&n){const o=t.EpF();t.TgZ(0,"div",30)(1,"ion-chip",31),t.NdJ("click",function(){const g=t.CHM(o).$implicit,c=t.oxw(2);return t.KtG(c.loadLoginForm(g))}),t.TgZ(2,"ion-avatar"),t._UZ(3,"img",32),t.qZA(),t.TgZ(4,"ion-label"),t._uU(5),t.qZA()()()}if(2&n){const o=l.$implicit;t.xp6(3),t.Q6J("src",o.backgroundImg,t.LSH),t.xp6(2),t.Oqu(o.label)}}function P(n,l){if(1&n){const o=t.EpF();t.TgZ(0,"div",4)(1,"div",5)(2,"div",6),t._UZ(3,"ion-img",7),t.qZA(),t.TgZ(4,"div",8)(5,"div",9)(6,"form",10),t.NdJ("ngSubmit",function(){t.CHM(o);const e=t.oxw();return t.KtG(e.handleLogIn())}),t.TgZ(7,"ion-item",11)(8,"ion-label",12),t._uU(9,"Correo electr\xf3nico"),t.qZA(),t._UZ(10,"ion-input",13),t.YNc(11,y,2,0,"ion-note",14),t.qZA(),t.TgZ(12,"ion-item",15)(13,"ion-label",12),t._uU(14,"Contrase\xf1a"),t.qZA(),t._UZ(15,"ion-input",16),t.TgZ(16,"ion-button",17),t.NdJ("click",function(){t.CHM(o);const e=t.oxw();return t.KtG(e.togglePasswordVisibility())}),t._UZ(17,"ion-icon",18),t.qZA()(),t.TgZ(18,"div",19),t._uU(19," \xbfNo ten\xe9s una cuenta? \xa0 "),t.TgZ(20,"a",20),t.NdJ("click",function(){t.CHM(o);const e=t.oxw();return t.KtG(e.goToRegister())}),t.TgZ(21,"u",21),t._uU(22,"Registrate"),t.qZA()()(),t.TgZ(23,"div",22)(24,"ion-button",23)(25,"h3",24),t._uU(26,"Ingresar"),t.qZA()(),t.TgZ(27,"div",25),t._uU(28,"O"),t.qZA(),t.TgZ(29,"div",26)(30,"div",27),t.YNc(31,C,6,2,"div",28),t.qZA()()()()()()()()}if(2&n){const o=t.oxw();t.xp6(6),t.Q6J("formGroup",o.loginForm),t.xp6(5),t.Q6J("ngIf",o.loginForm.get("email").touched),t.xp6(4),t.Q6J("type",o.hidePassword?"password":"text"),t.xp6(2),t.Q6J("name",o.hidePassword?"eye-off-outline":"eye-outline"),t.xp6(7),t.Q6J("disabled",!o.loginForm.valid||o.invalidCredentials),t.xp6(7),t.Q6J("ngForOf",o.mockUsersButtons)}}function w(n,l){1&n&&(t.TgZ(0,"div",33),t._UZ(1,"app-spinner",34),t.qZA()),2&n&&(t.xp6(1),t.Q6J("optionalMessage","Ingresando"))}let Z=(()=>{class n{constructor(o,i,e,g,c,T){this.auth=o,this._router=i,this.fb=e,this.toastController=g,this.animationService=c,this.gestureCtrl=T,this.attemptingSingIn=!1,this.hidePassword=!0,this.invalidCredentials=!1,this.mockUsersButtons=[]}ngOnInit(){h.forEach(o=>{this.mockUsersButtons.push({id:o.uid,color:"grey",label:o.label,backgroundImg:o.imagen})}),this.loginForm=this.fb.group({email:["",[s.kI.required,s.kI.email]],password:["",[s.kI.required]]}),this.loginForm.valueChanges.subscribe(()=>{this.invalidCredentials=!1})}ngAfterViewInit(){this.initializeGesture()}initializeGesture(){this.gesture=this.gestureCtrl.create({el:this.loginRoot.nativeElement,gestureName:"swipe-left",onStart:()=>{},onMove:o=>{},onEnd:o=>{o.deltaX<-50&&this.goToRegister()}}),this.gesture.enable()}ngOnDestroy(){console.log("Cleared")}loadLoginForm(o){var i,e;let g=h.find(c=>c.uid==o.id);null===(i=this.loginForm.get("email"))||void 0===i||i.setValue(g.email),null===(e=this.loginForm.get("password"))||void 0===e||e.setValue(g.password)}togglePasswordVisibility(){this.hidePassword=!this.hidePassword}handleLogIn(){this.attemptingSingIn=!0,this.auth.SignIn(this.loginForm.get("email").value,this.loginForm.get("password").value).then(()=>{this.auth.afAuth.authState.subscribe(o=>{o&&setTimeout(()=>{var i,e;this.attemptingSingIn=!1,null===(i=this.loginForm.get("email"))||void 0===i||i.setValue(""),null===(e=this.loginForm.get("password"))||void 0===e||e.setValue(""),this._router.navigate(["/home"])},1500)})}).catch(o=>{this.attemptingSingIn=!1,this.invalidCredentials=!0,this.presentToast("bottom","No pudimos verificar tus credenciales, por favor vuelve a ingresarlas.")})}presentToast(o,i){var e=this;return(0,u.Z)(function*(){yield(yield e.toastController.create({message:i,duration:2500,position:o,icon:"alert-circle-outline",buttons:[{text:"Minimizar",role:"cancel"}],color:"warning"})).present()})()}handleGoogleAuth(){this.auth.GoogleAuth()}goToRegister(){var o=this;return(0,u.Z)(function*(){o.animationService.createSlideOutAnimation(o.loginRoot.nativeElement,"left").play(),o._router.navigateByUrl("/register").then(()=>{const e=document.querySelector("app-register ion-content");o.animationService.createSlideInAnimation(e,"right").play()})})()}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(b.e),t.Y36(p.F0),t.Y36(s.qu),t.Y36(a.yF),t.Y36(_.Y),t.Y36(a.TH))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-logni"]],viewQuery:function(o,i){if(1&o&&t.Gf(x,5,t.SBq),2&o){let e;t.iGM(e=t.CRH())&&(i.loginRoot=e.first)}},standalone:!0,features:[t.jDz],decls:5,vars:3,consts:[[1,"main",3,"fullscreen"],["loginRoot",""],["class","d-flex flex-column p-4 justify-content-start",4,"ngIf","ngIfElse"],["spinner",""],[1,"d-flex","flex-column","p-4","justify-content-start"],[1,"w-100"],[1,"row","mt-2"],["src",".\\assets\\icon\\tarjeta-de-credito_icon.png",2,"height","28vh"],[1,"row","align-self-center","mt-3"],[1,"form-container"],[1,"px-2","py-3",3,"formGroup","ngSubmit"],["lines","full",1,"mb-4"],["position","floating",2,"color","var(--ion-color-light-shade)"],["type","email","placeholder","nombre.apellido@dominio.com","formControlName","email","legacy","true"],["slot","error",4,"ngIf"],["lines","full",1,"mb-5"],["placeholder","**********","formControlName","password","legacy","true",3,"type"],["size","default","slot","end","fill","clear",1,"pt-3","icon-button",3,"click"],["color","success",1,"iconEye",3,"name"],[1,"signup-text","mb-3"],[1,"mat-subheading-2",3,"click"],[1,"font-weight-bold",2,"color","#0f0"],[1,"mt-4"],["color","success","strong","true","type","submit","expand","block",1,"login-button","mt-4","mb-3",3,"disabled"],[2,"margin","0"],[1,"separator","mb-3","col-10","offset-1"],[1,"chips","container"],[1,"row"],["class","col-6",4,"ngFor","ngForOf"],["slot","error"],[1,"col-6"],[3,"click"],["alt","",3,"src"],[1,"signin"],[3,"optionalMessage"]],template:function(o,i){if(1&o&&(t.TgZ(0,"ion-content",0,1),t.YNc(2,P,32,6,"div",2),t.YNc(3,w,2,1,"ng-template",null,3,t.W1O),t.qZA()),2&o){const e=t.MAs(4);t.Q6J("fullscreen",!0),t.xp6(2),t.Q6J("ngIf",!i.attemptingSingIn)("ngIfElse",e)}},dependencies:[a.Pc,a.BJ,a.YG,a.hM,a.W2,a.gu,a.Xz,a.pK,a.Ie,a.Q$,a.uN,a.j9,d.ez,d.sg,d.O5,s.u5,s._Y,s.JJ,s.JL,p.Bz,s.UX,s.sg,s.u,f.h,v.O],styles:[".heading[_ngcontent-%COMP%]{font-size:32px;font-weight:700}.para[_ngcontent-%COMP%]{font-size:22px;font-weight:500;color:#a6abb1}.login-button[_ngcontent-%COMP%]{height:50px;--border-radius: 12px;--box-shadow: none;--ion-color-base: rgb(66, 255, 66) !important}.google-button[_ngcontent-%COMP%]{height:50px;--border-radius: 12px;--box-shadow: none}.signup-text[_ngcontent-%COMP%]{padding-right:20px;text-align:end}.signup-text[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:var(--ion-color-primary)}ion-footer[_ngcontent-%COMP%]{display:block;order:1;width:100%;z-index:10}.copyright[_ngcontent-%COMP%]{text-align:center}.iconEye[_ngcontent-%COMP%]{font-size:26px}.icon-button[_ngcontent-%COMP%]{--ripple-color: transparent}.full-width[_ngcontent-%COMP%]{width:100%}ion-input[_ngcontent-%COMP%]{color:#fff}ion-fab-button.header[_ngcontent-%COMP%]{width:95vw!important;height:50px!important;--border-radius: 10px !important;--border-color: black;--border-style: solid;--border-width: 2px}ion-fab-button.detail[_ngcontent-%COMP%]{width:30vw!important;height:30vw!important;--border-radius: 50% !important;--border-color: black;--border-style: solid;--border-width: 2px;margin-left:5px;margin-right:5px}.fab-list-active[_ngcontent-%COMP%]{display:flex!important;flex-direction:row}.low-opacity[_ngcontent-%COMP%]{opacity:50%!important}.custom-opacity[_ngcontent-%COMP%]{opacity:75%}ion-content.main[_ngcontent-%COMP%]{--background: transparent !important}.form-container[_ngcontent-%COMP%]{border-radius:20px;border-style:solid;border-color:#ccc;background:#222}ion-avatar[_ngcontent-%COMP%]{width:45px!important;height:45px!important}ion-chip[_ngcontent-%COMP%]{height:6vh;width:100%;border-style:solid;border-color:#0f0;border-width:2px}"]}),n})()}}]);