import TodoList from './TodoList.js';

export default class ListManager {
    constructor() {
        this.lists = [];
    }

    getIndexOfList(name) {
        return this.lists.findIndex((element) => element.name == name);
    }

    getList(name) {
        return this.lists.find((element) => element.name == name);
    }

    getListNames() {
        return this.lists.map((element) => element.name);
    }

    addList(name) {
        if (this.getListNames().includes(name)) {
            throw Error("List with this name already exists");
        }
        this.lists.push(new TodoList(name));
    }

    removeList(name) {
        const listInd = this.getIndexOfList(name);
        if (listInd == -1) return;
        this.lists.splice(listInd, 1);
    }

    moveTodoToProject(oldProjectName, index, newProjectName) {
        const todo = this.getList(oldProjectName).getTodo(index);
        this.getList(newProjectName).addTodo(todo);
        this.getList(oldProjectName).removeTodo(todo);
    }

    getSuperList() {
        let newList = [];
        for (let i = 0; i < this.lists.length; i++) {
            newList = [...newList, ...this.lists[i].getAllTodos()];
        }
        return newList;
    }

    getTodayTodos() {
        let newList = [];
        for (let i = 0; i < this.lists.length; i++) {
            newList = [...newList, ...this.lists[i].getTodayTodos()];
        }
        return newList;
    }
}