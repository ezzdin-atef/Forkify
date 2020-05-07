import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        // Perist data in localStorage
        this.peristData();
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
        // Perist data in localStorage
        this.peristData();
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
        // Perist data in localStorage
        this.peristData();
    }

    peristData() {
        localStorage.setItem('list', JSON.stringify(this.items));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('list'));
        // Restoring likes from like storage
        if (storage)  this.items = storage;
    }
};
