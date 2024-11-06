/**
 * Base component that can render HTML content
 * and manage its child components.
 */
class Component {
    /**
     * Creates an instance of the Component class.
     *
     * @param {string} containerId - The ID of the DOM element where the component will be rendered.
     * @throws {Error} Will throw an error if the container with the specified ID is not found.
     */
    constructor(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with ID "${containerId}" not found.`);
        }
        this.container = container;
        this.children = [];
    }
    /**
     * Sets the child components of this component and renders them.
     *
     * @param {Component[]} childrenComponent - An array of child components to be set.
     */
    setChildren(childrenComponent) {
        this.children = childrenComponent;
        this.children.forEach((child) => child.render());
    }

    /**
     * Renders the component by updating the container's HTML with the generated HTML.
     */
    render() {
        this.update(this.generateHTML());
    }

    /**
     * Generates the HTML content for the component.
     *
     * @returns {string} The generated HTML string for the component.
     */
    generateHTML() {
        return '';
    }

    unHackify(htmlDirty) {
        if (typeof htmlDirty !== 'string') {
            return String(htmlDirty);
        }

        // Step 1: Remove <script> tags
        let cleanedHtml = htmlDirty.replace(/<script[^>]*>([\S\s]*?)<\/script>/g, '');

        // Step 2: Remove inline event handlers (e.g., onclick, onload, etc.)
        cleanedHtml = cleanedHtml.replace(/<([a-z]+)([^>]*)\s(on\w+\s*=\s*["'][^"']*["'])/gi, '<$1$2');

        // Step 3: Escape HTML special characters to prevent XSS
        cleanedHtml = cleanedHtml.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/\//g, '&#47;');

        // Step 4: Remove common SQL injection patterns
        cleanedHtml = cleanedHtml.replace(/(\b(SELECT|UPDATE|DELETE|INSERT|DROP|ALTER|CREATE|TRUNCATE|MERGE|--|\*|FROM|WHERE|AND|OR|UNION|LIKE|HAVING|ORDER|GROUP|BY|TABLE|DATABASE)\b)/gi, '');

        // Step 5: Use a temporary DOM element to extract the text content (removes all other tags)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cleanedHtml;

        // Return the text content (which is now free of HTML tags, dangerous content, and SQL patterns)
        return tempDiv.textContent || tempDiv.innerText || "";
    }

    /**
     * Updates the inner HTML of the container with the provided HTML string.
     *
     * @param {string} html - The HTML string to set as the container's inner HTML.
     */
    update(html) {
        this.container.innerHTML = html;
    }
}

export default Component;
