// Construct.js
import State from "./state.js";

/**
 * Base component class for creating custom elements with child component management.
 */
class Construct extends HTMLElement {
    constructor() {
        super();
        this.state = new State({});
        this.childrenComponents = [];
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.update(``)
    }

    /**
     * Sets and renders child components.
     *
     * @param {Construct[]} childrenComponents - Array of child components.
     */
    setChildren(childrenComponents) {
        this.childrenComponents = childrenComponents;
        this.renderChildren();
    }

    /**
     * Generates the HTML content for the component.
     *
     * @returns {string} HTML string for the component.
     */

    /**
     * Renders the children components into the shadow DOM.
     */
    renderChildren() {
        this.childrenComponents.forEach(child => {
            this.shadowRoot.appendChild(child);
            if (typeof child.render === 'function') {
                child.render();
            }
        });
    }

    /**
     * Updates the inner HTML of the shadow root.
     *
     * @param {string} html - HTML content to update the shadow root with.
     */
    update(html) {
        this.shadowRoot.innerHTML = html;
        this.renderChildren(); // Ensure children are rendered after the update
    }

}

customElements.define('x-construct', Construct);
export default Construct;
