
import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from 'src/app/services/todo.service';
import { NavController, ModalController, PopoverController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'Firebase';

@Component({
  selector: 'app-info-post',
  templateUrl: './info-post.page.html',
  styleUrls: ['./info-post.page.scss'],
})
export class InfoPostPage implements OnInit {
  todos: Todo[];

  /*
  todo: Todo = {
    task: 'Test 123',
    createAt: new Date().getTime(),
    priority: 2
  }
  todoId = null;
  */

  constructor(
    private nav: NavController,
    private alertController: AlertController,
    private todoService: TodoService,
    private modalCtr: ModalController,
    private route: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private loadingController: LoadingController,
    private router: Router

  ) { }

  /*
    ngOnInit() {
      this.todoService.getTodos().subscribe(res=>{
        this.todos=res;
      });
  
      this.todoId = this.route.snapshot.params['id'];
      if (this.todoId) {
        this.loadTodo();
      }
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
  */

  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });
  }

  async remove(item) {
  //  this.todoService.removeTodo(item.id);

   // this.todoService.removeTodo(item.id);

   
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: 'Are you sure want to delete this info?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('cancel');
        }
      }, {
        text: 'Okay',
        handler: () => {
          //firebase.database().ref(item.id).remove();
          this.todoService.removeTodo(item.id);
        }
      }
    ]
  });
  
  await alert.present(); 
  }

}
