import Component from "../../framework/component.js";
import { store } from "../../framework/store.js";

class Test extends Component {
    constructor() {
        super();
        this.counter = store.getState().counter;
        this.MyName = this.newState('Samuel');
        this.inCounter = this.newState(0);

       // console.log(this.MyName)
    }

    render() {
        this.css(`
            div {
                cursor:pointer;
            }
        `)

        this.html(`
            <div> ${this.MyName.value} ${this.counter.value} ${this.inCounter.value} </div>
        `)

        this.attachEvent('div', 'click', () => {
            this.MyName.value = this.MyName.value === 'NEiiiiiiin'
                ? 'Samuel'
                : 'NEiiiiiiin'
            this.counter.value++
            this.inCounter.value++

            console.log(this.shadowRoot)
        });
    }
}

export default Test;
