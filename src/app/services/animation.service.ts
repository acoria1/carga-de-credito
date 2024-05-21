import { Injectable } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor(private animationCtrl: AnimationController) {}

  createSlideOutAnimation(element: HTMLElement, directionTo: 'left' | 'right') {
    const offset = directionTo === 'left' ? '-100%' : '100%';
    
    return this.animationCtrl.create()
      .addElement(element)
      .duration(500)
      .easing('ease-in-out')
      .fromTo('transform', 'translateX(0)', `translateX(${offset})`);
  }

  createSlideInAnimation(element: HTMLElement, directionFrom: 'left' | 'right') {
    const offset = directionFrom === 'left' ? '-100%' : '100%';
    
    return this.animationCtrl.create()
      .addElement(element)
      .duration(500)
      .easing('ease-in-out')
      .fromTo('transform', `translateX(${offset})`, 'translateX(0)');
  }
}