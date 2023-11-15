import "./styles/style.scss"
import Todo from './scripts/Todo.js';
import TodoList from './scripts/TodoList.js'
import ListManager from "./scripts/ListManager.js";
import storageManager from "./scripts/StorageManager.js";

const LM = new ListManager();

if (localStorage.length === 0) {
    LM.addList("General");
    LM.getList("General").addTodo(new Todo("Wash dishes"));
    LM.getList("General").addTodo(new Todo("Vacuum carpet"));
    LM.getList("General").addTodo(new Todo("Make presentation"));
    LM.getList("General").moveTodoUp(1);
    LM.addList("Work");
    LM.moveTodoToProject("General", 2, "Work");
    LM.getSuperList();
    LM.getList("General").addTodo(new Todo("Pick up kids", "", new Date(2023, 11, 12)), 1);
    LM.getListNames();
    storageManager.save(LM);
}
else {
    storageManager.load(LM);
}

const critNodes = (function CriticalNodes() {
    const page = {
        projects: document.querySelector("div.navbar div.projects"),
        main: document.querySelector("div.main"),
    }

    const templProj = (function(){
        const node = document.querySelector("template#project-template").content;
        const name = node.querySelector("button.project-button");
        return {node, name};
    })();

    const templTodo = (function(){
        const node = document.querySelector("template#todo-template").content;
        const check = node.querySelector("button.check");
        const title = node.querySelector("p.todo-title");
        const description = node.querySelector("p.todo-description");
        const date = node.querySelector("span.date");
        const project = node.querySelector("span.project");
        const moveUp = node.querySelector("#move-up");
        const moveDown = node.querySelector("#move-down");
        const deleteButton = node.querySelector("#delete-task");

        return {node, check, title, description, date, project, moveUp, moveDown, deleteButton}
    })();

    return {page, templProj, templTodo};
})();


(function DOMManager() {
    const {page, templProj, templTodo} = critNodes;

    function populateNavbar() {
        page.projects.innerText = "";
        LM.getListNames().forEach((element) => {
            templProj.name.textContent = element;

            const currProject = templProj.node.cloneNode(true);
            page.projects.appendChild(currProject);
        })
    }

    function populateTodosOfProject(projectName) {
        page.main.innerText = "";
        LM.getList(projectName).getAllTodos().forEach( (elem) => {
            templTodo.title.textContent = elem.getTitle();
            templTodo.description.textContent = elem.getDescription();
            templTodo.date.textContent = elem.getDate().toDateString();
            templTodo.project.textContent = projectName;

            const currTodo = templTodo.node.cloneNode(true);
            page.main.appendChild(currTodo);
        })
    }

    function makeProjectButtonsClickable() {
        page.projects.addEventListener("click", (e) => {
            if (!(e.target.className == "project-button")) return;
            console.log(e);
            populateTodosOfProject(e.target.textContent);
        })
    }

    populateNavbar();
    populateTodosOfProject('General');
    makeProjectButtonsClickable();
})();

// storageManager.load(LM);

// storageManager.save(LM);
// plan: use save and load on storageManager whenever DOM is re-rendered

