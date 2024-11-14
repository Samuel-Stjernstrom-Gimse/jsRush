class Store {
    constructor() {
        this.store = { }
    }

    addState(newStateObject) {
        this.store = { ...this.store, ...newStateObject }
    }

    getState() {
        return this.store;
    }
}

export const store =  new Store