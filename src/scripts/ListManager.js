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

    getAllLists() {
        return this.lists;
    }

    getListNames() {
        return this.lists.map((element) => element.name);
    }

    getDefaultProject() {
        if (this.lists.length > 0) {
            return this.getListNames()[0];
        }

        this.addList('General');
        return this.getList('General');
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

    getAllTodos() {
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

    getHighPriorityTodos() {
        let newList = [];
        for (let i = 0; i < this.lists.length; i++) {
            newList = [...newList, ...this.lists[i].getHighPriorityTodos()];
        }
        return newList;
    }
}