class Stash {
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

const stash =  new Stash
export { stash }