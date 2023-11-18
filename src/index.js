import "./styles/style.scss";
import Todo from "./scripts/Todo.js";
import ListManager from "./scripts/ListManager.js";
import StorageManager from "./scripts/StorageManager.js";
import LogicDomInterface from "./scripts/LogicDomInterface.js";
import DOMManager from "./scripts/DomManager.js";

const LM = new ListManager();
const storage = StorageManager(LM);
if (localStorage.length == 0) {
  LM.addList("General");
  LM.getList("General").addTodo(
    new Todo(
      "Wash dishes",
      "Morning time while making coffee",
      new Date("2023-11-18"),
    ),
  );
  LM.getList("General").addTodo(new Todo("Take fiber"));
  LM.addList("Work");
  LM.getList("Work").addTodo(
    new Todo("Supervise exams", "", new Date("2023-11-22"), 3),
  );
  storage.save();
} else {
  storage.load();
}

const logicInterface = LogicDomInterface(LM);
DOMManager(logicInterface, storage, "project", LM.getDefaultProject());
