class Store {
    constructor() {
        this.store = { test: 69 }
    }

    addState(newStateObject) {
        this.store = { ...this.store, ...{hei:33}, ...newStateObject }
    }

    getState() {
        return this.store;
    }
}

export const store =  new Store