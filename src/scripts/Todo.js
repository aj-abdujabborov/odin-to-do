export default class Todo {
    _status = false;
    _title;
    _description = "";
    _date = new Date();
    _priority = 1;

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
        this._title = title.toString();
    }

    setDescription(description) {
        if (description === undefined) {
            return;
        }
        this._description = description.toString();
    }

    setDate(date) {
        if (!(date instanceof Date) || Date.now() > date.getTime()) return;
        this._date = date;
    }

    setPriority(priority) {
        if (![1, 2, 3].includes(priority)) return;
        this._priority = priority;
    }

    toggleStatus() {
        this._status = !this._status;
    }

    getTitle() {
        return this._title;
    }

    getDescription() {
        return this._description;
    }

    getDate() {
        return this._date;
    }

    getPriority() {
        return this._priority;
    }

    getStatus() {
        return this._status;
    }
}