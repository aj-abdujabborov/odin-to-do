import CritNodes from "./CriticalNodes.js";

export default function DOMManager(logicInterface, navType = "project", projOrNavName = "General") {
    // todo: how to make filters work? right now, you need to make a separate method for each filter because you
    //       need to get a new list every time. have some "list" attribute in the interface that keeps track of the list.
    //       then DOM manager has to update interface regarding which list it wants.
    //       because you don't have to implement up and down in filters, this is possible.
    // todo: set min date attribute on input[type="date"] to current day
    // todo: make todos editable with a click on anywhere that's non-button.
    
    const NAV_TYPE_PROJECT = 1, NAV_TYPE_FILTER = 2;
    let NAV_TYPE;
    if (navType === "project") NAV_TYPE = NAV_TYPE_PROJECT; 
    else if (navType == "filter") NAV_TYPE = NAV_TYPE_FILTER;

    const {page, templProj, templTodo, newTodo} = CritNodes;

    (function setupClicks() {
        function makeFilterButtonsClickable() {
            page.filters.addEventListener("click", (e) => {
                const elem = e.target.closest("button");
                if (elem === null) return;
                if (!(elem.className === "filter-button")) return;

                NAV_TYPE = NAV_TYPE_FILTER;
                projOrNavName = elem.id;
                repopulateData();
            })
        }

        function makeProjectButtonsClickable() {
            page.projects.addEventListener("click", (e) => {
                if (!(e.target.className == "project-button")) return;

                NAV_TYPE = NAV_TYPE_PROJECT;
                projOrNavName = e.target.textContent;
                repopulateData();
            })
        }

        function makeTodosClickable() {
            page.todos.addEventListener("click", (e) => {
                const elem = e.target.closest("button"); 
                const parElem = e.target.closest("div.todo");
                
                if (typeof elem.dataset.action === 'undefined') return;
                if (!(elem.dataset.action in logicInterface)) {
                    throw Error("The element has an action attribute but no programmed action");
                }


                logicInterface[elem.dataset.action](projOrNavName, parElem);
                repopulateData();
            })
        }
    
        function makeShowNewTaskButtonClickable() {
            page.showNewTask.addEventListener("click", (elem) => {
                renderNewTodoForm();
            })
        }
    
        function makeAddTaskButtonClickable() {
            newTodo.form.addEventListener("submit", (elem) => {
                elem.preventDefault();
                
                const dateValue = newTodo.date.value === '' ? null : new Date(newTodo.date.value);
                const priorityValue = newTodo.node.querySelector(`input[name='${newTodo.priorityInputName}']:checked`).value;
    
                logicInterface.addNewTask(newTodo.title.value, newTodo.description.value, dateValue, Number(priorityValue), newTodo.project.value);
                
                hideNewTodoForm();
                repopulateData();
            })
        }
    
        function makeCancelTaskButtonClickable() {
            newTodo.cancel.addEventListener("click", () => {
                hideNewTodoForm();
            })
        }
    
        makeFilterButtonsClickable();
        makeProjectButtonsClickable();
        makeTodosClickable();
        makeShowNewTaskButtonClickable();
        makeAddTaskButtonClickable();
        makeCancelTaskButtonClickable();
    })();

    function renderNewTodoForm() {
        page.showNewTask.classList.add("display-none");
        newTodo.node.classList.remove("display-none");
    }

    function hideNewTodoForm() {
        newTodo.form.reset();
        page.showNewTask.classList.remove("display-none");
        newTodo.node.classList.add("display-none");
    }
    
    function repopulateData() {
        function populateNavbar() {
            page.projects.innerText = "";
            logicInterface.getListNames().forEach((element) => {
                templProj.name.textContent = element;
    
                const currProject = templProj.node.cloneNode(true);
                page.projects.appendChild(currProject);
            })
        }
    
        function populateTodosFromProject(projectName) {
            populateTodosFromArray(logicInterface.getTodosFromProject(projectName));
        }

        function populateTodosFromFilter(filterName) {
            populateTodosFromArray(logicInterface.getTodosFromFilter(filterName));
        }

        function populateTodosFromArray(list) {
            page.todos.innerText = "";
            list.forEach( (elem, ind) => {
                templTodo.check.textContent = elem.getStatus() === true ? "check" : "";
                templTodo.title.textContent = elem.getTitle();
                templTodo.description.textContent = elem.getDescription();
                templTodo.date.textContent = elem.getDate().toDateString();
                templTodo.project.textContent = elem.getProject();
                templTodo.todo.dataset.index = ind;
    
                const currTodo = templTodo.todo.cloneNode(true);
                page.todos.appendChild(currTodo);
            })
        }

        populateNavbar();
        if (NAV_TYPE === NAV_TYPE_PROJECT) {populateTodosFromProject(projOrNavName);}
        else {populateTodosFromFilter(projOrNavName);}
        hideNewTodoForm();
        page.numTodayTodos.textContent = logicInterface.getNumTodayTodos();
    }

    repopulateData();
};