import Component from "../framework/component.js";

class MyComponent extends Component {
    handleClick() {
        this.subState.value++;
        this.select('#img-cone').style.transform = 'scale(1.1)';

        setTimeout(() => {
            this.select('#img-cone').style.transform = 'scale(1)';
        }, 100);
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
                filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.8)); /* Orange glow effect */
            }

        `);

        this.html(`
            <div>
                <img id="img-cone" src="https://www.svgrepo.com/show/10031/traffic-cone.svg" alt="cone">
                <h1>${this.params.value}</h1>
                <button id="btn">count is ${this.subState.value} </button>
            </div>
        `)

        this.attachEvent('#btn', 'click', () => this.handleClick());
    }
}

export default MyComponent;