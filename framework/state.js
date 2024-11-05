class State {
    constructor(initialState) {
        this._state = initialState;
        this.subscribers = [];
    }

    get value() {
        return this._state;
    }

    set value(newValue) {
        if (newValue !== this._state) {
            this._state = newValue;
            this.notify();
        }
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    subRender(subscriber) {
        this.subscribers.push(() => subscriber.render());
    }

    notify() {
        this.subscribers.forEach((subscriber) => subscriber());
    }
}

export default State11