/**
 * Reactive state management class that allows for state
 * subscriptions and notifications on state changes.
 */
class State {
    /**
     * Creates an instance of the State class.
     *
     * @param {any} initialState - The initial value of the state.
     */
    constructor(initialState) {
        this._state = initialState;
        this.subscribers = [];
    }

    /**
     * Gets the current state value.
     *
     * @returns {any} The current state value.
     */
    get value() {
        return this._state;
    }

    /**
     * Sets a new state value and notifies subscribers if the value has changed.
     *
     * @param {any} newValue - The new value to set for the state.
     */
    set value(newValue) {
        if (newValue !== this._state) {
            this._state = newValue;
            this.notify();
        }
    }

    /**
     * Subscribes a new subscriber to state changes.
     *
     * @param {Function} subscriber - A callback function that will be called when the state changes.
     */
    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    /**
     * Subscribes a new subscriber that has a render method to be called on state changes.
     *
     * @param {this} subscriber  An object that implements a render method.
     * - usage- - this.state.subRender(this)
     */
    subRender(subscriber) {
        this.subscribers.push(() => subscriber.render());
    }

    /**
     * Notifies all subscribers of a state change by calling their respective callback functions.
     */
    notify() {
        this.subscribers.forEach((subscriber) => subscriber());
    }
}

export default State;
