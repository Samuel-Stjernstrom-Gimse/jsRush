class Component {
    constructor(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with ID "${containerId}" not found.`);
        }
        this.container = container;
        this.children = [];
    }

    setChildren(childrenComponent) {
        this.children = childrenComponent;
        this.children.forEach((child) => child.render());
    }

    render() {
        this.update(this.generateHTML());
        //this.children.forEach((child) => child.render());
    }

    generateHTML() {
        return '';
    }

    update(html) {
        this.container.innerHTML = html;
    }
}

export default Component; // test
