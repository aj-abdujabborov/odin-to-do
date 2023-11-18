import CritNodes from "./CriticalNodes.js";

export default function DOMManager(
  logicInterface,
  storage,
  navType = "project",
  projOrNavName = "General",
) {
  // todo: set min date attribute on input[type="date"] to current day
  // todo: make project buttons reflect status

  const NAV_TYPE_PROJECT = 1,
    NAV_TYPE_FILTER = 2;
  let NAV_TYPE;
  if (navType === "project") NAV_TYPE = NAV_TYPE_PROJECT;
  else if (navType == "filter") NAV_TYPE = NAV_TYPE_FILTER;

  let newTodo;

  const { page, templProj, templTodo, templNewTodo, getNewTodoNodes } =
    CritNodes;

  function populateNavbar() {
    page.projects.innerText = "";
    logicInterface.getListNames().forEach((element) => {
      templProj.name.textContent = element;

      const currProject = templProj.node.cloneNode(true);
      page.projects.appendChild(currProject);
    });
  }

  function populateTodosFromProject(projectName) {
    templTodo.moveUp.classList.remove("display-none");
    templTodo.moveDown.classList.remove("display-none");

    populateTodosFromArray(logicInterface.getTodosFromProject(projectName));
  }

  function populateTodosFromFilter(filterName) {
    templTodo.moveUp.classList.add("display-none");
    templTodo.moveDown.classList.add("display-none");

    populateTodosFromArray(logicInterface.getTodosFromFilter(filterName));
  }

  function populateTodosFromArray(list) {
    page.main.innerText = "";
    list.forEach((elem) => {
      templTodo.check.textContent = elem.status === true ? "check" : "";
      templTodo.title.textContent = elem.title;
      templTodo.description.textContent = elem.description;
      templTodo.date.textContent = elem.date.toDateString();
      templTodo.project.textContent = elem.project;
      templTodo.todo.dataset.index = elem.indexer;

      const currTodo = templTodo.todo.cloneNode(true);
      page.main.appendChild(currTodo);
    });
  }

  function populateNewTodo() {
    page.main.appendChild(templNewTodo.cloneNode(true));
    newTodo = getNewTodoNodes(page.main.lastElementChild);
  }

  function renderNewTodoForm() {
    newTodo.showNewTask.classList.add("display-none");
    newTodo.node.classList.remove("display-none");
  }

  function hideNewTodoForm() {
    newTodo.form.reset();
    newTodo.showNewTask.classList.remove("display-none");
    newTodo.node.classList.add("display-none");
  }

  function makeShowNewTaskButtonClickable() {
    newTodo.showNewTask.addEventListener("click", (elem) => {
      renderNewTodoForm();
    });
  }

  function addNewTaskEventHandler(elem) {
    elem.preventDefault();

    const dateValue =
      newTodo.date.value === "" ? null : new Date(newTodo.date.value);
    const priorityValue = newTodo.node.querySelector(
      `input[name='${newTodo.priorityInputName}']:checked`,
    ).value;

    const projectValue =
      NAV_TYPE === NAV_TYPE_FILTER
        ? newTodo.project.value
        : newTodo.project.value === ""
          ? projOrNavName
          : newTodo.project.value;

    logicInterface.addNewTask(
      newTodo.title.value,
      newTodo.description.value,
      dateValue,
      Number(priorityValue),
      projectValue,
    );

    repopulateData();
  }

  function editExistingTaskEventHandler() {}

  function makeAddTaskButtonClickable() {
    newTodo.form.addEventListener("submit", addNewTaskEventHandler);
  }

  function makeCancelTaskButtonClickable() {
    newTodo.cancel.addEventListener("click", () => {
      repopulateData();
    });
  }

  function handleNewTodo() {
    const newTodo = populateNewTodo();
    makeShowNewTaskButtonClickable();
    makeAddTaskButtonClickable();
    makeCancelTaskButtonClickable();
  }

  function editExistingTodo(element) {
    hideNewTodoForm();
    page.main.replaceChild(newTodo.node, element);

    renderNewTodoForm(); // newTodo is now the edit form. references are maintained
    const todoInfo = logicInterface.getTodoByIndexer(element.dataset.index);
    newTodo.title.value = todoInfo.title;
    newTodo.description.value = todoInfo.description;
    newTodo.date.value = todoInfo.date.toISOString().slice(0, 10);
    newTodo.priorityRadios[todoInfo.priority - 1].setAttribute("checked", true);
    newTodo.project.value = todoInfo.project;

    newTodo.add.textContent = "Update task";

    newTodo.form.removeEventListener("submit", addNewTaskEventHandler);
    newTodo.form.addEventListener("submit", () => {
      const dateValue =
        newTodo.date.value === "" ? null : new Date(newTodo.date.value);
      const priorityValue = newTodo.node.querySelector(
        `input[name='${newTodo.priorityInputName}']:checked`,
      ).value;

      logicInterface.editTodo(
        element.dataset.index,
        newTodo.title.value,
        newTodo.description.value,
        dateValue,
        priorityValue,
        newTodo.project.value,
      );

      repopulateData();
    });
  }

  (function setupClicks() {
    function makeFilterButtonsClickable() {
      page.filters.addEventListener("click", (e) => {
        const elem = e.target.closest("button");
        if (elem === null) return;
        if (!(elem.className === "filter-button")) return;

        NAV_TYPE = NAV_TYPE_FILTER;
        projOrNavName = elem.id;
        repopulateData();
      });
    }

    function makeProjectButtonsClickable() {
      page.projects.addEventListener("click", (e) => {
        if (!(e.target.className == "project-button")) return;

        NAV_TYPE = NAV_TYPE_PROJECT;
        projOrNavName = e.target.textContent;
        repopulateData();
      });
    }

    function makeTodosClickable() {
      page.main.addEventListener("click", (e) => {
        const elem = e.target.closest("button");
        const parElem = e.target.closest("div.todo");

        if (parElem === null) return;
        if (elem === null) {
          editExistingTodo(parElem);
          return;
        }

        if (typeof elem.dataset.action === "undefined") return;
        if (!(elem.dataset.action in logicInterface)) {
          throw Error(
            "The element has an action attribute but no programmed action",
          );
        }

        logicInterface[elem.dataset.action](parElem.dataset.index);
        repopulateData();
      });
    }

    makeFilterButtonsClickable();
    makeProjectButtonsClickable();
    makeTodosClickable();
  })();

  function repopulateData() {
    storage.save();

    populateNavbar();

    if (NAV_TYPE === NAV_TYPE_PROJECT) {
      populateTodosFromProject(projOrNavName);
    } else {
      populateTodosFromFilter(projOrNavName);
    }

    handleNewTodo();

    page.numTodayTodos.textContent = logicInterface.getNumTodayTodos();
  }

  repopulateData();
}
