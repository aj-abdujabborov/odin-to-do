export default class Todo {
    #status = false;
    #inTitle;
    #inDescription = "";
    #inDate = new Date();
    #inPriority = 1;

    constructor(title, description, date, priority) {
        this.setTitle(title);
        this.setDescription(description);
        this.setDate(date);
        this.setPriority(priority);
    }

    setTitle(title) {
        if (title === undefined || title.length < 1) {
            throw new Error('Task title is required');
        }
        this.#inTitle = title.toString();
    }

    setDescription(description) {
        if (description === undefined) {
            return;
        }
        this.#inDescription = description.toString();
    }

    setDate(date) {
        if (!(date instanceof Date) || Date.now() > date.getTime()) return;
        this.#inDate = date;
    }

    setPriority(priority) {
        if (![1, 2, 3].includes(priority)) return;
        this.#inPriority = priority;
    }

    toggleStatus() {
        this.#status = !this.#status;
    }

    getTitle() {
        return this.#inTitle;
    }

    getDescription() {
        return this.#inDescription;
    }

    getDate() {
        return this.#inDate;
    }

    getPriority() {
        return this.#inPriority;
    }

    getStatus() {
        return this.#status;
    }
}