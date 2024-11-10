import Construct from "./construct.js";
import State from "./state.js";

/**
 * A class representing a Component, which extends from the `Construct` class.
 * It manages its internal state, listens for attribute changes, and attaches event listeners.
 *
 * @class
 * @extends Construct
 */
class Component extends Construct {
    /**
     * Creates an instance of the Component class.
     * Initializes the component's internal state and binds render updates to state changes.
     *
     * @constructor
     */
    constructor() {
        super();

        /**
         * @type {State}
         * State object for managing the 'params' property with an initial value of {name: 'samuel', params: ''}.
         */
        this.params = new State('');

        /**
         * @type {State}
         * State object for managing a 'subState' property with an initial value of 0.
         */
        this.subState = new State(0);

        // Bind subState and params to render updates
        this.subState.subRender(this);
        this.params.subRender(this);
    }

    newState(value) {
        const state = new State(value);
        state.subRender(this);
        return  state
    }

    /**
     * Specifies the observed attributes for the component.
     * When any of these attributes change, the `attributeChangedCallback` method will be triggered.
     *
     * @returns {string[]} List of observed attributes.
     */
    static get observedAttributes() {
        return ['params'];
    }

    /**
     * Callback method for when an observed attribute changes.
     * Updates the `params` value based on the new attribute value.
     *
     * @param {string} name - The name of the attribute that changed.
     * @param {string} oldValue - The previous value of the attribute.
     * @param {string} newValue - The new value of the attribute.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'params') {
            this.params.value = newValue;
        }
    }

    /**
     * Attaches an event listener to a target element within the component's shadow DOM.
     * Removes all duplicate listeners on elements.
     *
     * @param {string} target - The selector string of the target element to attach the event listener to.
     * @param {string} listener - The event type (e.g., 'click', 'mouseover') to listen for.
     * @param {Function} callback - The callback function to invoke when the event is triggered.
     */
    attachEvent(target, listener, callback) {
        const element = this.shadowRoot.querySelector(`${target}`);

        const eventHandler = () => {
            callback();
        };

        element?.removeEventListener(listener, eventHandler);
        element?.addEventListener(listener, eventHandler);
    }

    /**
     * Selects a single element within the component's shadow DOM based on the provided selector.
     *
     * @param {string} target - The CSS selector string of the element to select.
     * @returns {Element | null} The first element matching the selector, or null if no element matches.
     */
    select(target) {
        return this.shadowRoot.querySelector(`${target}`);
    }

    /**
     * Selects all elements within the component's shadow DOM that match the provided selector.
     *
     * @param {string} target - The CSS selector string of the elements to select.
     * @returns {NodeListOf<Element>} A NodeList of all matching elements within the shadow DOM.
     */
    selectAll(target) {
        return this.shadowRoot.querySelectorAll(`${target}`);
    }
}

export default Component;
