import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalController, NavController, LoadingController, MenuController } from '@ionic/angular';

import { TodoService, Todo } from 'src/app/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuControllerI } from '@ionic/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 // splash: true;
  todo: Todo = {
    task: 'Your ride',
    createAt: new Date().getTime(),
    priority: null,

    name:null,
    lastName:null,
    gender:null,
    email:null,
    mobile: null,

  start:null,
  end:null,
  timing:null,
  vehical:null,
  seat:null,
  }
  todoId = null;
  static splash: boolean=true;
 
  

  constructor(private todoService: TodoService,
              private route: ActivatedRoute,
              private loadingController: LoadingController,
               private modalCtr:ModalController,
              private nav:NavController ,
              private menuCtrl:MenuController,
              private router:Router) { }

              ionViewDidLoad(){
    
                setTimeout(()=>{
                  LoginPage.splash=false;
            
                },4000);
              }
/*
  async openModal(){
    const modal= await this.modalCtr.create({
      component:ModalPage,
      componentProps:{
       // custom_id:this.value
        //foo:'hello'
      }
    });
   return await modal.present();
  }*/
  ionViewWillEnter() {

    this.menuCtrl.swipeEnable(false)
 }
/*
  ionViewDidLeave() {


    this.menuCtrl.swipeEnable(true)
 }*/
  ngOnInit() {
    this.menuCtrl.swipeEnable(false)
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId) {
      this.loadTodo();
    }
  }

  login() {
    (<any>window).AccountKitPlugin.loginWithPhoneNumber({
      useAccessToken: true,
	    defaultCountryCode: "IN",
	    facebookNotificationsEnabled: true
    }, (successdata) => {
      (<any>window).AccountKitPlugin.getAccount((user) => {
       // this.nav.setRoot('home');
       this.router.navigateByUrl('/home');
      })
      }, (err) => {
        alert(err);
    })
  }


  async loadTodo() {
    const loading = await this.loadingController.create({
      message: ''
    });
    await loading.present();
    this.todoService.getTodo(this.todoId).subscribe(rec => {
      loading.dismiss();
      this.todo = rec;
    });
  }
  async saveTodo() {
    const loading = await this.loadingController.create({
      message: ''
    });
    await loading.present();

    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/home');
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/home');
      });
    }

  }

  


}
