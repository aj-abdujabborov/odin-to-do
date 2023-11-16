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
    }

    removeTodo(input) {
        const todoInd = this.#getTodoIndex(input);

        this.list.splice(todoInd, 1);
    }

    moveTodoUp(input) {
        const todoInd = this.#getTodoIndex(input);

        if (todoInd == 0 || todoInd == -1) return;
        this.list.splice(todoInd-1, 2, this.list[todoInd], this.list[todoInd-1]);
    }

    moveTodoDown(input) {
        const todoInd = this.#getTodoIndex(input);

        if (todoInd == this.list.length-1 || todoInd == -1) return;
        this.list.splice(todoInd, 2, this.list[todoInd+1], this.list[todoInd]);
    }

    #getTodoIndex(input) {
        if (input instanceof Todo) {
            return this.list.indexOf(input);
        }
        return input;
    }
}