import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
  // animations : [slideInAnimation]
})
export class AppComponent implements OnInit {
  constructor(public _router : Router, private _auth : AuthService, private contexts: ChildrenOutletContexts) {
  }

  ngOnInit(){
    this._auth.SignOut();
    setTimeout(() => {
      //make time for android unskippable icon screen to end
      this._router.navigateByUrl('splash');
    }, 1600);
  }
}
