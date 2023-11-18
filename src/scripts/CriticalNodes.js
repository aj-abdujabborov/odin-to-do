export default (function CriticalNodes() {
  const page = {
    projects: document.querySelector("div.navbar div.projects"),
    filters: document.querySelector("div.navbar div.filters"),
    main: document.querySelector("div.main"),
    todos: document.querySelector("div.todos-container"),
    numTodayTodos: document.querySelector("div.head span#num-today-todos"),
  };

  const templProj = (function () {
    const node = document.querySelector("template#project-template").content;
    const name = node.querySelector("button.project-button");
    return { node, name };
  })();

  const templTodo = (function () {
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

    return {
      node,
      todo,
      check,
      title,
      description,
      date,
      project,
      moveUp,
      moveDown,
      deleteButton,
    };
  })();

  const templNewTodo = document.querySelector("template#new-todo").content;

  const getNewTodoNodes = function (parent) {
    const node = parent.querySelector("div.new-todo");
    const showNewTask = parent.querySelector("button#show-new-task");

    const form = parent.querySelector("form");
    const title = parent.querySelector("input#title");
    const description = parent.querySelector("textarea#description");
    const date = parent.querySelector("input#date");
    const project = parent.querySelector("input#project");
    const priorityInputName = "priority";
    const priorityRadios = [
      parent.querySelector("input#priority1"),
      parent.querySelector("input#priority2"),
      parent.querySelector("input#priority3"),
    ];
    const add = parent.querySelector("button#add");
    const cancel = parent.querySelector("button#cancel");

    return {
      showNewTask,
      node,
      form,
      title,
      description,
      date,
      project,
      priorityInputName,
      priorityRadios,
      add,
      cancel,
    };
  };

  return { page, templProj, templTodo, templNewTodo, getNewTodoNodes };
})();
