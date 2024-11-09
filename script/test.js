import Component from "../framework/component.js";

class MyComponent extends Component {
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
            }
            
            img:hover {
                filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.8)); /* Orange glow effect */
            }

        `);

        this.html(`
            <div>
                <img src="../misc/traffic-cone-svgrepo-com.svg" alt="cone">
                <h1>${this.params.value}</h1>
                <button id="btn">count is ${this.subState.value} </button>
            </div>
        `)

        this.attachEvent('#btn', 'click', () => this.subState.value  ++);
    }
}

export default MyComponent;