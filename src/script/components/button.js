import Component from "../../framework/component.js";
import {store} from "../../framework/store.js";

class Button extends Component {
    constructor() {
        super();
        store.addState({counter: this.subState})
    }

    handleClick() {
        this.subState.value++;
        const imgCone = this.select('#img-cone');
        imgCone.style.transform = 'scale(1.1)';
        setTimeout(() => imgCone.style.transform = 'scale(1)', 100);
    }

    render() {
        this.css(`
            div {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
            }
            
            img {
                height: 10rem;
                transition: 0.1s;
            }
            
            img:hover {
                filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.8));
            }
        `);

        this.html(`
            <div>
                <img id="img-cone" src="src/misc/spark.png" alt="cone">
                <h1>${this.params.value}</h1>
                <button id="btn">count is ${this.subState.value} </button>
                <test-test></test-test>
                <div>
                ${Array.from({ length: this.subState.value }).map(i => '<test-test></test-test>').join('')}
                </div>
            </div>
        `)
        console.log()

        this.attachEvent('#btn', 'click', () => this.handleClick());
    }
}

export default Button;