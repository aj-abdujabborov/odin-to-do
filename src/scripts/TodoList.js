import Todo from './Todo.js';
import { isSameDay } from 'date-fns';

export default class TodoList {
    constructor(name) {
        if (name === undefined || name.length < 1) return;
        this.name = name.toString();
        this.list = [];
    }

    getTodo(index) {
        return this.list[index];
    }

    getAllTodos() {
        return this.list;
    }

    getTodayTodos() {
        const now = new Date();
        return this.list.filter((element) => isSameDay(element.getDate(), now));
    }

    getHighPriorityTodos() {
        return this.list.filter((element) => element.getPriority() === 3);
    }

    addTodo(todo) {
        if (!(todo instanceof Todo)) {
            throw Error("todo must be instance of Todo class");
        }
        todo.setProject(this.name);
        this.list.push(todo);

        this._reindex();
    }

    removeTodo(index) {
        this.list.splice(index, 1);
        this._reindex();
    }

    moveTodoUp(index) {
        if (index == 0 || index == -1) return;
        this.list.splice(index-1, 2, this.list[index], this.list[index-1]);
    }

    moveTodoDown(index) {
        if (index == this.list.length-1 || index == -1) return;
        this.list.splice(index, 2, this.list[index+1], this.list[index]);
    }

    _reindex() {
        this.list.forEach((elem, ind) => {
            elem.setIndex(ind);
        })
    }
}