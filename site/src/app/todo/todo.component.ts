import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../model/todo.model';
import { RequisicoesService } from '../services/requisicoes/requisicoes.service';
import { UtilService } from '../services/utils/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoList: TodoModel[] = [];
  public todoForm: TodoModel;
  public todoSelected: TodoModel;
  public search: String;
  public passConfirm: String;
  public passConfirmVisible: Boolean = false;

  constructor(
    private http: RequisicoesService,
    private utils: UtilService,
    private toast: ToastrService
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

  async taskAdd() {
    const validEmail = await this.utils.validateEmail(
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

  viewInputConfirm(condition: boolean, todo?: TodoModel) {
    this.passConfirmVisible = condition;
    if (!condition) {
      this.passConfirm = '';
      this.todoSelected = todo;
    }

    if (condition) this.todoSelected = todo;
  }

  taskRemove(todo: TodoModel) {
    if (this.utils.validatePasswordDelete(this.passConfirm)) {
      this.http
        .delete('tasks', { task_id: todo.id })
        .toPromise()
        .then((result) => {
          this.viewInputConfirm(false);
          this.loadFromLocalStorage();
        })
        .catch((error) => {
          console.error(`Delete error: ${error}`);
        });
    } else {
      this.toast.error('Ops... Invalid Password!');
    }
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
