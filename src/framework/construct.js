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
        if(this._styleElement?.textContent !== styles) {
            if (!this._styleElement) {
                // Create style element only if it doesn't already exist
                this._styleElement = document.createElement('style');
                this.shadowRoot.appendChild(this._styleElement);
            }
            this._styleElement.textContent = styles;
        }

    }

    /**
     * Updates the inner HTML of the shadow root.
     * @param {string} html - HTML content to update the shadow root with.
     */

    /*
    html(html) {
            // Check if the new HTML is different from the current content (excluding custom elements)
            const currentHTML = this.shadowRoot.innerHTML;

            // Create a helper function to check if an element is a custom element
            const isCustomElement = (tagName) => tagName.includes('-');

            // Function to compare HTML contents, excluding custom elements
            const cleanHTML = (html) => {
                // Create a temporary container to parse the HTML string
                const tempDiv = document.createElement('div');
                //tempDiv.innerHTML = html;

                // Return a cleaned version of the HTML that excludes custom elements
                const elements = tempDiv.querySelectorAll('*');
                elements.forEach(el => {
                    if (isCustomElement(el.tagName)) {
                       // el.replaceWith(el.cloneNode(true)); // Keep custom elements, but clone them (not recreate)
                    }
                });

                return html //tempDiv.innerHTML;
            }

            Only update if the cleaned HTML (excluding custom elements) is different
            if (cleanHTML(currentHTML) !== cleanHTML(html)) {
                // Store the current custom elements to prevent them from being recreated
                const customElements = this.shadowRoot.querySelectorAll('*');
                const existingCustomElements = [];

                customElements.forEach(el => {
                    if (isCustomElement(el.tagName)) {
                        existingCustomElements.push(el);
                    }
                });

                // Avoid triggering constructor by directly modifying innerHTML
                const previousInnerHTML = this.shadowRoot.innerHTML;

                // Temporarily suspend updates to prevent constructor calls
                this._skipConstructor = true;

                // Update the shadow root HTML
                this.shadowRoot.innerHTML = html;

                //Reattach the existing custom elements after the update
                existingCustomElements.forEach(el => {
                    const existing = this.shadowRoot.querySelector(el.tagName);
                    if (existing) {
                        existing.replaceWith(el);
                    }
                });

                // Restore constructor behavior after update
                this._skipConstructor = false;

                // Reapply styles if they were part of the shadow DOM
                if (this._styleElement) {
                    this.shadowRoot.appendChild(this._styleElement);
                }
            }
    } */

    html(newHTML) {
        // Helper function to check if an element is a custom element
        const isCustomElement = (tagName) => tagName.includes('-');

        // Function to clean the HTML by removing custom elements
        const cleanHTML = (html) => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Remove custom elements from the HTML content
            tempDiv.querySelectorAll('*').forEach(el => {
                if (isCustomElement(el.tagName)) {
                    el.replaceWith(document.createComment(`custom-element ${el.tagName}`));
                }
            });

            return tempDiv.innerHTML;
        };

        // Only update if cleaned HTML content is different
        const currentHTML = this.shadowRoot.innerHTML;
        if (cleanHTML(currentHTML) !== cleanHTML(newHTML)) {
            // Store references to custom elements with unique identifiers
            const customElementsMap = new Map();
            let elementIndex = 0;

            // Find and map each custom element in the shadow root
            this.shadowRoot.querySelectorAll('*').forEach(el => {
                if (isCustomElement(el.tagName)) {
                    const key = `${el.tagName}-${elementIndex++}`;
                    customElementsMap.set(key, el);
                }
            });

            // Temporarily disable constructor calls
            this._skipConstructor = true;

            // Update the shadow root HTML
            this.shadowRoot.innerHTML = newHTML;

            // Reattach each custom element by using the stored mapping
            elementIndex = 0;
            this.shadowRoot.querySelectorAll('*').forEach(el => {
                if (isCustomElement(el.tagName)) {
                    const key = `${el.tagName}-${elementIndex++}`;
                    const savedElement = customElementsMap.get(key);

                    if (savedElement) {
                        // Replace the placeholder with the original custom element
                        el.replaceWith(savedElement);
                    }
                }
            });

            // Re-enable constructor behavior
            this._skipConstructor = false;

            // Reapply styles if they are part of the shadow DOM
            if (this._styleElement) {
                this.shadowRoot.appendChild(this._styleElement);
            }
        }
    }

}

export default Construct;
