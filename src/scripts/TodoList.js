export default class TodoList {
    constructor() {
        this.list = [];
    }

    addTodo(todo) {
        if (!(todo instanceof Todo)) {
            throw Error("todo must be instance of Todo class");
        }
        this.list.push(todo);
    }

    removeTodo(todo) {
        this.list.splice(this.list.indexOf(todo), 1);
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