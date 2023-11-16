import Todo from './Todo.js';

export default (function() {
    let initialized = false;
    let LM;

    function formatTodosIntoObjects(list) {
        return list.map((elem) => {
            return {
                title: elem.getTitle(),
                description: elem.getDescription(),
                date: elem.getDate().toDateString(),
                priority: elem.getPriority(),
                status: elem.getStatus(),
                project: elem.getProject(),
                indexer: makeIndexer(elem.getProject(), elem.getIndex()),
            };
        })
    }

    function makeIndexer(projectName, index) {
        return [projectName, index].join('-');
    }

    function splitIndexer(indexer) {
        return indexer.split('-');
    }

    const logicDomInterface = {
        "move-up": (indexer) => {
            const [projName, index] = splitIndexer(indexer);
            LM.getList(projName).moveTodoUp(Number(index));
        },
        "move-down": (indexer) => {
            const [projName, index] = splitIndexer(indexer);
            LM.getList(projName).moveTodoDown(Number(index));
        },
        "delete-task": (indexer) => {
            const [projName, index] = splitIndexer(indexer);
            LM.getList(projName).removeTodo(Number(index));
        },
        "check": (indexer) => {
            const [projName, index] = splitIndexer(indexer);
            LM.getList(projName).getTodo(Number(index)).toggleStatus();
        },
        "edit": (indexer) => {
            const [projName, index] = splitIndexer(indexer);

            
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
            return formatTodosIntoObjects(LM.getList(projectName).getAllTodos());
        },
        getTodosFromFilter: (filterName) => {
            switch (filterName.toLowerCase()) {
                case 'today':
                    return formatTodosIntoObjects(LM.getTodayTodos());
                case 'high-priority':
                    return formatTodosIntoObjects(LM.getHighPriorityTodos());
                case 'all':
                    return formatTodosIntoObjects(LM.getAllTodos());
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