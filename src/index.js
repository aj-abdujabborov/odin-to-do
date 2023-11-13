import "./styles/style.scss"
import Todo from './scripts/Todo.js';
import TodoList from './scripts/TodoList.js'
import ListManager from "./scripts/ListManager.js";
// import { DateFns } from 'date-fns';

const LM = new ListManager();
LM.addList("Chores");
LM.getList("Chores").addTodo(new Todo("Wash dishes"));
LM.getList("Chores").addTodo(new Todo("Vacuum carpet"));
LM.getList("Chores").addTodo(new Todo("Make presentation"));
LM.getList("Chores").moveTodoUp(1);
LM.addList("Work");
LM.moveTodoToProject("Chores", 2, "Work");
LM.getSuperList();
LM.getList("Chores").addTodo(new Todo("Trim nails", "", new Date(2023, 11, 12)), 1);
// LM.getListNames();


// ideal
// we have an object LM of class ListManager
// LM.getNames()
// LM.getList("chores")
// LM.getList("chores")[3].title = "bring back senior";
// LM.addList("work")
// LM.getList("work").addTodo("heyoo")
// LM.getList("work").moveTodoUp(4)
// LM.getList("work")[4].toggleComplete()
// LM.removeList("chores")