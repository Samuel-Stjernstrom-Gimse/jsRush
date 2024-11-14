import Component from "./src/framework/component.js";

class App extends Component {
    render() {
        this.html(`
            <spark-button params='getRekt!'></spark-button>
        `)
    }
}

export default App;


