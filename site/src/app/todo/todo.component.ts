import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../model/todo.model';
import { RequisicoesService } from '../services/requisicoes/requisicoes.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoList: TodoModel[] = [];
  public todoForm: TodoModel;

  constructor(private http: RequisicoesService) {}

  ngOnInit(): void {
    this.todoForm = {
      title: '',
      description: '',
      responsible_email: '',
      responsible_name: '',
    };
    this.loadFromLocalStorage();
  }

  taskAdd() {
    console.log(this.todoList);

    if (this.todoForm.title && this.todoForm.description) {
      this.http
        .post('tasks', this.todoForm)
        .toPromise()
        .then((result: TodoModel) => {
          this.loadFromLocalStorage();

          // empty form
          this.todoForm = {
            title: '',
            description: '',
            responsible_email: '',
            responsible_name: '',
          };
        })
        .catch((error) => {
          console.error(`Post error: ${error}`);
        });
    }
  }

  taskRemove(todo: TodoModel) {
    this.http
      .delete('tasks', { task_id: todo.id })
      .toPromise()
      .then((result) => {
        this.loadFromLocalStorage();
      })
      .catch((error) => {
        console.error(`Delete error: ${error}`);
      });
  }

  taskDone(todo: TodoModel) {
    const index = this.todoList.indexOf(todo);
    if (index !== -1) {
      todo.done = true;
    }
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    this.http
      .get('tasks', {})
      .toPromise()
      .then((result: TodoModel[]) => {
        this.todoList = result || [];
      })
      .catch((error) => {
        console.error(`Get error: ${error}`);
      });
  }
}
