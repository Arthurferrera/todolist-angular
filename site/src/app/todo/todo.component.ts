import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { KEY_MAILBOX } from 'src/environments/environment';
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
  public search: String;

  constructor(
    private http: RequisicoesService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.todoForm = {
      title: '',
      description: '',
      responsible_email: '',
      responsible_name: '',
    };
    this.loadFromLocalStorage();
  }

  async searchBy() {
    await this.http
      .get('tasks', { keyword: this.search })
      .toPromise()
      .then((result: TodoModel[]) => {
        this.todoList = result || [];
      })
      .catch((error) => {
        console.error(`Get error: ${error}`);
      });
  }

  async validateEmail(email: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient
        .get(
          `http://apilayer.net/api/check?access_key=${KEY_MAILBOX}&email=${email}`
        )
        .toPromise()
        .then((result: any) => {
          if (result.code === 104 && result.type === 'usage_limit_reached') {
            // TODO: IMPLEMENT TOAST ANGULAR
            // toastr.error('You have reached the limit of requests per month.');
          }
          resolve(true);
        })
        .catch((error) => {
          reject(false);
          console.error(`Get validateEmail error: ${error}`);
        });
    });
  }

  async taskAdd() {
    const validEmail = await this.validateEmail(
      this.todoForm.responsible_email
    );

    if (validEmail && this.todoForm.title && this.todoForm.description) {
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
