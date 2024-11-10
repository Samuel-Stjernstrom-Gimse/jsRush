import Component from "../framework/component.js";

class Cones extends Component {
    render() {
        this.css(`
            #main-div {
            position: absolute;
            z-index: -1;
            top:0;
            left:0;
            width:100vw;
            display:flex;
            
            justify-content:center;
            flex-wrap: wrap;
            }
            
            img {
            height: 2rem;
            margin:2rem;
            }
        `)

        this.html(`
            <div id="main-div">
                ${
            Array.from({ length: parseInt(this.params.value) }).map(() => {
                return '<img src="https://www.svgrepo.com/show/10031/traffic-cone.svg" alt="cone">';
            }).join('')
        }
            </div>
        `);

    }
}

export default Cones;