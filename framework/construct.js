import sharedStyles from "../misc/shadowStyles.js";
/**
 * Base component class for creating custom elements with child component management.
 */
class Construct extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).adoptedStyleSheets = [sharedStyles];
    }

    connectedCallback() {
        this.render();
    }
    /**
     * Method to apply scoped CSS to the shadow DOM.
     * Ensures CSS persists without overwriting HTML content.
     * @param {string} styles - CSS styles as a string.
     */
    css(styles) {
        if (!this._styleElement) {
            // Create style element only if it doesn't already exist
            this._styleElement = document.createElement('style');
            this.shadowRoot.appendChild(this._styleElement);
        }
        this._styleElement.textContent = styles;
    }
    /**
     * Updates the inner HTML of the shadow root.
     * @param {string} html - HTML content to update the shadow root with.
     */
    html(html) {
        // Check if the new HTML is different from the current content
        const currentHTML = this.shadowRoot.innerHTML;

        // Only update if the new HTML is different
        if (currentHTML !== html) {
            const currentStyles = this._styleElement ? this._styleElement.outerHTML : '';
            this.shadowRoot.innerHTML = html;

            // Reapply styles if they were part of the shadow DOM
            if (this._styleElement) {
                this.shadowRoot.appendChild(this._styleElement);
            }

            console.log('HTML has been updated.');
        } else {
            console.log('No changes in HTML.');
        }
    }
}

export default Construct;
