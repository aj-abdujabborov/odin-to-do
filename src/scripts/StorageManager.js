import Todo from "./Todo.js";

const storageManager = (function () {
  let LM;

  const load = () => {
    const lists = JSON.parse(localStorage.getItem("todos"));

    lists.forEach((listEl) => {
      LM.addList(listEl.name);

      listEl.list.forEach((todoEl) => {
        const todo = new Todo();
        for (const prop in todoEl) {
          if (prop == "_date") {
            todo[prop] = new Date(todoEl[prop]);
          } else {
            todo[prop] = todoEl[prop];
          }
        }
        LM.getList(listEl.name).addTodo(todo);
      });
    });
  };

  const save = () => {
    localStorage.clear();
    localStorage.setItem("todos", JSON.stringify(LM.getAllLists()));
  };

  const initializer = (listManag) => {
    LM = listManag;
    return { load, save };
  };

  return initializer;
})();

export default storageManager;
