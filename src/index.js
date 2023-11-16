import "./styles/style.scss"
import Todo from './scripts/Todo.js';
import ListManager from "./scripts/ListManager.js";
import StorageManager from "./scripts/StorageManager.js";
import LogicDomInterface from "./scripts/LogicDomInterface.js";
import DOMManager from "./scripts/DomManager.js";

const LM = new ListManager();
const logicInterface = LogicDomInterface(LM);

if (localStorage.length == 0) {
    LM.addList("General");
    LM.getList("General").addTodo(new Todo("Wash dishes", "Use new scrubber", new Date("2023-11-28")));
    LM.getList("General").addTodo(new Todo("Order groceries"));
    LM.addList("Work");
    LM.getList("Work").addTodo(new Todo("Make presentation"));
    StorageManager.saveFrom(LM);
}
else {
    StorageManager.loadInto(LM);
}

DOMManager(logicInterface,  'project', LM.getDefaultProject());