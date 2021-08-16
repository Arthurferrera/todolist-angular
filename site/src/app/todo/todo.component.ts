import { Component, OnInit } from '@angular/core';
import { TodoModel } from '../model/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoList: TodoModel[] = [];
  // todoList = [
  //   { title: 'Ir ao mercado', description: 'teste', done: false },
  //   { title: 'Reunião', description: 'teste', done: false },
  //   { title: 'Levar o lixo para fora', description: 'teste', done: false },
  //   { title: 'Fazer o jantar', description: 'teste', done: false },
  // ];

  public todoForm: TodoModel;

  constructor() {}

  ngOnInit(): void {
    this.todoForm = { title: '', description: '', done: false };
    this.loadFromLocalStorage();
  }

  taskAdd() {
    console.log(this.todoList);

    if (this.todoForm.title && this.todoForm.description) {
      this.todoList.push(
        new TodoModel(
          this.todoForm.title,
          this.todoForm.description,
          this.todoForm.done
        )
      );
      this.todoForm = { title: '', description: '', done: false };
      this.saveOnLocalStorage();
    }
  }

  taskRemove(todo: TodoModel) {
    const index = this.todoList.indexOf(todo);
    if (index !== -1) {
      this.todoList.splice(index, 1);
    }
    this.saveOnLocalStorage();
  }
  taskDone(todo: TodoModel) {
    const index = this.todoList.indexOf(todo);
    if (index !== -1) {
      todo.done = true;
    }
    this.saveOnLocalStorage();
  }

  saveOnLocalStorage() {
    const data = JSON.stringify(this.todoList);
    localStorage.setItem('todos', data);
  }
  loadFromLocalStorage() {
    const data = localStorage.getItem('todos');
    this.todoList = JSON.parse(data) || [];
  }
}
