import "./styles/style.scss"
import Todo from './scripts/Todo.js';
import TodoList from './scripts/TodoList.js'
import ListManager from "./scripts/ListManager.js";
import storageManager from "./scripts/StorageManager.js";

const critNodes = (function CriticalNodes() {
    const page = {
        projects: document.querySelector("div.navbar div.projects"),
        main: document.querySelector("div.main"),
        todos: document.querySelector("div.todos-container"),
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

    return {page, templProj, templTodo};
})();

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
    DOMManager('General');
}
else {
    storageManager.load(LM);
    DOMManager('General'); // 
}



function DOMManager(projName) {
    const {page, templProj, templTodo} = critNodes;

    const todoActions = {
        "move-up": (elem, parElem) => {
            LM.getList(projName).moveTodoUp(Number(parElem.dataset.index));
        },
        "move-down": (elem, parElem) => {
            LM.getList(projName).moveTodoDown(Number(parElem.dataset.index));
        },
        "delete-task": (elem, parElem) => {
            LM.getList(projName).removeTodo(Number(parElem.dataset.index));
        },
        "check": (elem, parElem) => {
            LM.getList(projName).getTodo(Number(parElem.dataset.index)).toggleStatus();
        },
        "edit": (elem, parElem) => {

        },
    };

    function populateNavbar() {
        page.projects.innerText = "";
        LM.getListNames().forEach((element) => {
            templProj.name.textContent = element;

            const currProject = templProj.node.cloneNode(true);
            page.projects.appendChild(currProject);
        })
    }

    function makeProjectButtonsClickable() {
        page.projects.addEventListener("click", (e) => {
            if (!(e.target.className == "project-button")) return;
            populateTodosOfProject(e.target.textContent);
        })
    }

    function populateTodosOfProject(projectName) {
        projName = projectName; // TODO: getting spaghetti-ish. fix.

        page.todos.innerText = "";
        LM.getList(projectName).getAllTodos().forEach( (elem, ind) => {
            templTodo.check.textContent = elem.getStatus() === true ? "check" : "";
            templTodo.title.textContent = elem.getTitle();
            templTodo.description.textContent = elem.getDescription();
            templTodo.date.textContent = elem.getDate().toDateString();
            templTodo.project.textContent = projectName;
            templTodo.todo.dataset.index = ind;

            const currTodo = templTodo.todo.cloneNode(true);
            page.todos.appendChild(currTodo);
        })
    }

    function makeTodosClickable() {
        page.todos.addEventListener("click", (e) => {
            const elem = e.target.closest("button, div.todo");
            const parElem = e.target.closest("div.todo");

            if (elem.dataset.action == undefined) return;
            if (!(elem.dataset.action in todoActions)) {
                throw Error("The element has an action attribute but no programmed action");
                return;
            }

            todoActions[elem.dataset.action](elem, parElem);
            populateTodosOfProject(projName);
        })

        // function searchForElementTypeUntilParent(startElem, searchSelector, parentSelector) {
        //     if (startElem.matches(parentSelector)) return startElem;
        //     if (startElem.matches("body")) return false;

        //     if (startElem.matches(searchSelector)) {
        //         return startElem;
        //     }
        //     else {
        //         return searchForElementTypeUntilParent(startElem.parentNode, searchSelector, parentSelector);
        //     }
        // }
    }

    populateNavbar();
    makeProjectButtonsClickable();
    populateTodosOfProject(projName);
    makeTodosClickable();
};





// storageManager.load(LM);

// storageManager.save(LM);
// plan: use save and load on storageManager whenever DOM is re-rendered

