import "./styles/style.scss"
import Todo from './scripts/Todo.js';
import TodoList from './scripts/TodoList.js'
import ListManager from "./scripts/ListManager.js";
import storageManager from "./scripts/StorageManager.js";

const LM = new ListManager();

if (localStorage.length === 0) {
    LM.addList("Chores");
    LM.getList("Chores").addTodo(new Todo("Wash dishes"));
    LM.getList("Chores").addTodo(new Todo("Vacuum carpet"));
    LM.getList("Chores").addTodo(new Todo("Make presentation"));
    LM.getList("Chores").moveTodoUp(1);
    LM.addList("Work");
    LM.moveTodoToProject("Chores", 2, "Work");
    LM.getSuperList();
    LM.getList("Chores").addTodo(new Todo("Trim nails", "", new Date(2023, 11, 12)), 1);
    LM.getListNames();
    storageManager.save(LM);
}
else {
    storageManager.load(LM);
}

// storageManager.load(LM);

// storageManager.save(LM);
// plan: use save and load on storageManager whenever DOM is re-rendered

