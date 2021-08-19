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
  public todoDoneList: TodoModel[] = [];
  public todoPendingList: TodoModel[] = [];
  public todoForm: TodoModel;
  public todoSelected: TodoModel;
  public search: String;
  public passConfirm: String;
  public updateStatus: String;
  public tab = 'pending';
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
  changeTab(tab: string) {
    this.tab = tab;
  }
  async searchBy() {
    await this.http
      .get('tasks', { keyword: this.search })
      .toPromise()
      .then((result: TodoModel[]) => {
        this.todoDoneList = result.filter((todo) => todo.done);
        this.todoPendingList = result.filter((todo) => !todo.done);
      })
      .catch((error) => {
        this.toast.error('Ops... Occurred error when try search the tasks');
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
          this.toast.error('Ops... Occurred error when try create a new task');
        });
    }
  }

  viewInputConfirm(
    condition: boolean,
    todo?: TodoModel,
    type: string = 'done'
  ) {
    this.passConfirmVisible = condition;
    if (!condition) {
      this.passConfirm = '';
      this.todoSelected = todo;
    }

    if (condition) this.todoSelected = todo;
    this.updateStatus = type;
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
        .catch((resultError) => {
          if (resultError.error.type === 'not_found') {
            this.toast.error(resultError.error.error);
          } else {
            this.toast.error(
              'Ops... Occurred error when try update status the task'
            );
          }
        });
    } else {
      this.toast.error('Ops... Invalid Password!');
    }
  }

  taskDone(todo: TodoModel) {
    if (this.updateStatus === 'pending') {
      const validPass = this.utils.validatePasswordDelete(this.passConfirm);
      if (!validPass) {
        this.toast.error('Ops... Invalid Password!');
        return;
      }
    }

    this.http
      .put('tasks', { task_id: todo.id, done: !todo.done })
      .toPromise()
      .then((result: any) => {
        this.loadFromLocalStorage();
      })
      .catch((resultError) => {
        if (
          resultError.error.type === 'not_found' ||
          resultError.error.type === 'exceded_limit_change_for_pending'
        ) {
          this.toast.error(resultError.error.error);
        } else {
          this.toast.error(
            'Ops... Occurred error when try update status the task'
          );
        }
      })
      .finally(() => {
        this.viewInputConfirm(false);
      });
  }

  loadFromLocalStorage() {
    this.http
      .get('tasks', {})
      .toPromise()
      .then((result: TodoModel[]) => {
        this.todoDoneList = result.filter((todo) => todo.done);
        this.todoPendingList = result.filter((todo) => !todo.done);
        // this.todoList = result || [];
      })
      .catch((error) => {
        this.toast.error('Ops... Occurred error when try get the tasks');
      });
  }

  insertTasks() {
    this.utils
      .getFactsDog()
      .then((facts) => {
        facts.forEach((fact) => {
          let newTask = new TodoModel(
            'Fact Dog',
            fact.text,
            'eu@me.com',
            'eu',
            false,
            0
          );

          this.http
            .post('tasks', newTask)
            .toPromise()
            .then((result: TodoModel) => {
              console.log('Task added');
            })
            .catch((error) => {
              this.toast.error(
                'Ops... Occurred error when try create a new task'
              );
            });
        });
      })
      .catch((error) => {
        this.toast.error('Ops... Occurred error when try get the facts');
      })
      .finally(() => {
        this.loadFromLocalStorage();
      });
  }
}
