import Construct from "./construct.js";
import State from "./state.js";

class Component extends Construct  {
    constructor() {
        super();
        this.state = new State({name: 'samuel', params:''})
        this.state.subRender(this)
    }

    static get observedAttributes() {
        return ['params']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'params') {
            this.state.value.params = newValue;
        }
    }
}

export default Component