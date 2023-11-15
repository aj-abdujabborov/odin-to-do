import Todo from './Todo.js'

const storageManager = (function(){
    const load = (listManag) => {
        const lists = JSON.parse(localStorage.getItem("todos"));

        lists.forEach((listEl) => {
            listManag.addList(listEl.name);

            listEl.list.forEach((todoEl) => {
                const todo = new Todo();
                for (const prop in todoEl) {
                    if (prop == "_date") {
                        todo[prop] = new Date(todoEl[prop]);
                    }
                    else {
                        todo[prop] = todoEl[prop];
                    }
                }
                listManag.getList(listEl.name).addTodo(todo);
            })
        })
    }

    const save = (listManag) => {
        localStorage.clear();
        localStorage.setItem("todos", JSON.stringify(listManag.getAllLists()));
    }

    return {load, save};
})();

export default storageManager;