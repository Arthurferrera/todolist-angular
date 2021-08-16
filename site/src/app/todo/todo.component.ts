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
  }

  addTodo() {
    this.todoList.push(
      new TodoModel(
        this.todoForm.title,
        this.todoForm.description,
        this.todoForm.done
      )
    );
    this.todoForm = { title: '', description: '', done: false };
  }
}
