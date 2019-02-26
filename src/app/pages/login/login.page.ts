import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalController, NavController, LoadingController, MenuController } from '@ionic/angular';

import { TodoService, Todo } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { MenuControllerI } from '@ionic/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
  isenabled:boolean=false;
  

  constructor(private todoService: TodoService,
              private route: ActivatedRoute,
              private loadingController: LoadingController,
               private modalCtr:ModalController,
              private nav:NavController ,
              private menuCtrl:MenuController) { }
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
    /*
    if(this.todo.mobile !== null){
      //enable the button
      this.isenabled=true; 
      }else{
      //disable the button
      this.isenabled=false;
      }
      */
   // this.enable();
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
    this.todoService.getTodo(this.todoId).subscribe(rec => {
      loading.dismiss();
      this.todo = rec;
    });
  }
  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'saving TodoService..'
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
