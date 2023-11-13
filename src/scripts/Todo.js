export default class Todo {
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
        if (!(date instanceof Date) || Date.now() > date) return;
        this.#inDate = date;
    }

    setPriority(priority) {
        if (![1, 2, 3].includes(priority)) return;
        this.#inPriority = priority;
    }

    getTitle() {
        return this.#inTitle;
    }

    getDescription() {
        return this.#inDescription;
    }

    getDate() {
        return this.#inDate.toDateString();
    }

    getPriority() {
        return this.#inPriority;
    }
}