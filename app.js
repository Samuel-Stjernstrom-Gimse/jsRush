import Component from "./framework/component.js";
import MyComponent from "./script/test.js";

class App extends Component {
    render() {
        this.html(`
            <cone-component params='Hello ConeJS!'></cone-component>
        `)
    }
}

customElements.define("cone-app", App);
customElements.define('cone-component', MyComponent);