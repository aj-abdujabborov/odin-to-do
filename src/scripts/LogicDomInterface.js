import Todo from './Todo.js';

export default (function() {
    let initialized = false;
    let LM;
    let currentList;

    const logicDomInterface = {
        "move-up": (projName, parElem) => {
            LM.getList(projName).moveTodoUp(Number(parElem.dataset.index));
        },
        "move-down": (projName, parElem) => {
            LM.getList(projName).moveTodoDown(Number(parElem.dataset.index));
        },
        "delete-task": (projName, parElem) => {
            LM.getList(projName).removeTodo(Number(parElem.dataset.index));
        },
        "check": (projName, parElem) => {
            LM.getList(projName).getTodo(Number(parElem.dataset.index)).toggleStatus();
        },
        "edit": (elem, parElem) => {

        },
        addNewTask: (title, description, date, priority, projectName) => {
            if (projectName === '') {
                projectName = LM.getDefaultProject();
            }

            const todo = new Todo(title, description, date, priority);
            if (typeof todo === 'undefined') return;

            if (!LM.getListNames().includes(projectName)) {
                LM.addList(projectName);
            }

            LM.getList(projectName).addTodo(todo);
        },
        getListNames: () => {
            return LM.getListNames();
        },
        getTodosFromProject: (projectName) => {
            return LM.getList(projectName).getAllTodos();
        },
        getTodosFromFilter: (filterName) => {
            switch (filterName.toLowerCase()) {
                case 'today':
                    return LM.getTodayTodos();
                case 'high-priority':
                    return LM.getHighPriorityTodos();
                case 'all':
                    return LM.getAllTodos();
            }
        },
        getNumTodayTodos: () => {
            return LM.getTodayTodos().length;
        }
    }

    function initializer(listManager) {
        if (initialized == true) return logicDomInterface;

        initialized = true;
        LM = listManager;
        return logicDomInterface;
    }

    return initializer;
})();