import Component from "./src/framework/component.js";
import MyComponent from "./src/script/test.js";

class App extends Component {
    render() {
        this.html(`
            <cone-component params='Hello ConeJS!'></cone-component>
        `)
    }
}

customElements.define("cone-app", App);
customElements.define('cone-component', MyComponent);