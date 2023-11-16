export default (function CriticalNodes() {
    const page = {
        projects: document.querySelector("div.navbar div.projects"),
        filters: document.querySelector("div.navbar div.filters"),
        main: document.querySelector("div.main"),
        todos: document.querySelector("div.todos-container"),
        showNewTask: document.querySelector("div.new-todo-container button#show-new-task"),
        numTodayTodos: document.querySelector("div.head span#num-today-todos"),
    }

    const templProj = (function(){
        const node = document.querySelector("template#project-template").content;
        const name = node.querySelector("button.project-button");
        return {node, name};
    })();

    const templTodo = (function(){
        const node = document.querySelector("template#todo-template").content;
        const todo = node.querySelector("div.todo");
        const check = node.querySelector("button.check span");
        const title = node.querySelector("p.todo-title");
        const description = node.querySelector("p.todo-description");
        const date = node.querySelector("span.date");
        const project = node.querySelector("span.project");
        const moveUp = node.querySelector("#move-up");
        const moveDown = node.querySelector("#move-down");
        const deleteButton = node.querySelector("#delete-task");

        return {node, todo, check, title, description, date, project, moveUp, moveDown, deleteButton}
    })();

    const newTodo = (function(){
        const node = document.querySelector("div.new-todo");
        const form = document.querySelector("form");
        const title = node.querySelector("input#title");
        const description = node.querySelector("textarea#description");
        const date = node.querySelector("input#date");
        const project = node.querySelector("input#project");
        const priorityInputName = "priority";
        const priority1 = node.querySelector("input#priority1");
        const priority2 = node.querySelector("input#priority2");
        const priority3 = node.querySelector("input#priority3");
        const add = node.querySelector("button#add");
        const cancel = node.querySelector("button#cancel");

        return {node, form, title, description, date, project, priorityInputName, priority1, priority2, priority3, add, cancel};
    })();

    return {page, templProj, templTodo, newTodo};
})();