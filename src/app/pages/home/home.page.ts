import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
value=0;

constructor(private nav: NavController, 
            private modalCtr: ModalController,
            private popoverCtrl: PopoverController,
            private router:Router
            ){
}
openInfoPost(){
  
}

/*
pushFunction(){
   // this.router.navigate(['second']);
 this.nav.navigateForward('/second/${this.value}');
 //this.nav.navigateForward('/second');
  }

  async openModal(){
    const modal= await this.modalCtr.create({
      component:ModalPage,
      componentProps:{
        custom_id:this.value
        //foo:'hello'
      }
    });
   return await modal.present();
  }

 async openPopover(event: Event){
const popover= await this.popoverCtrl.create({
  component:PopoverPage,
  componentProps:{
    custom_id:this.value
  },
  event : event
});
return await popover.present();
  }
*/

}
